import { generatePath, useNavigate } from 'react-router';
import z from 'zod';

import { GenericList } from '@/components/generic-list';
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
                    name: 'Editar Turma',
                    function: () => alert(`Editar ${turma.titulo}`),
                  },
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
                    function: () => alert(`Excluir ${turma.titulo}`),
                    destructive: true,
                  },
                ]
          }
        />
      )}
    />
  );
}
