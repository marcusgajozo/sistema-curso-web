import { useMutation } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';

import { GenericList } from '@/components/generic-list';
import { httpClient } from '@/libs/http-client';
import { queryClient } from '@/libs/query-client';
import { ROUTES } from '@/routes/constants/routes-constants';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { turmaSchema } from '@/services/api/turmas/schemas';
import type { ActionOption } from '@/types/card';

import { TurmaCard } from '../turma-card';

interface ListTurmasProps {
  data?: z.output<typeof turmaSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
  hiddenAction?: boolean;
  listAction?: (turma: z.output<typeof turmaSchema>) => ActionOption[];
}

export function ListTurmas({
  data = [],
  meta,
  hiddenAction,
  listAction,
}: ListTurmasProps) {
  const navigate = useNavigate();

  const { mutate: deleteTurma } = useMutation({
    mutationFn: (id: string) => httpClient.delete(`/turmas/${id}`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['/turmas'] }),
        queryClient.invalidateQueries({ queryKey: ['/cursos/:id'] }),
        queryClient.invalidateQueries({ queryKey: ['/cursos/disponiveis'] }),
        queryClient.invalidateQueries({ queryKey: ['/cursos'] }),
      ]);
      toast.success('Turma excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir o curso.');
    },
  });

  return (
    <GenericList
      data={data}
      meta={meta}
      emptyMessage="Nenhuma turma disponível no momento."
      renderItem={(turma) => (
        <TurmaCard
          key={turma.id}
          data={turma}
          hiddenAction={hiddenAction}
          listAction={
            listAction
              ? listAction(turma)
              : [
                  {
                    name: 'Gerenciar turma',
                    function: () =>
                      navigate(
                        generatePath(ROUTES.GERENCIAR_TURMA, {
                          turmaId: turma.id,
                        }),
                      ),
                  },
                  {
                    name: 'Excluir',
                    function: () => deleteTurma(turma.id),
                    destructive: true,
                  },
                ]
          }
        />
      )}
    />
  );
}
