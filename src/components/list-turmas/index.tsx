import { generatePath, useNavigate } from 'react-router';
import z from 'zod';

import { GenericList } from '@/components/generic-list';
import { ROUTES } from '@/routes/constants/routes-constants';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { turmaSchema } from '@/services/api/turmas/schemas';

import { TurmaCard } from '../turma-card';

interface ListTurmasProps {
  data?: z.output<typeof turmaSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListTurmas({ data = [], meta }: ListTurmasProps) {
  const navigate = useNavigate();
  return (
    <GenericList
      data={data}
      meta={meta}
      emptyMessage="Nenhuma turma disponível no momento."
      renderItem={(turma) => (
        <TurmaCard
          key={turma.id}
          turma={turma}
          listAction={[
            {
              name: 'Editar Turma',
              function: () => alert(`Editar ${turma.titulo}`),
            },
            {
              name: 'Gerenciar turma',
              function: () =>
                navigate(
                  generatePath(ROUTES.GERENCIAR_TURMA, { turmaId: turma.id }),
                ),
            },
            {
              name: 'Excluir',
              function: () => alert(`Excluir ${turma.titulo}`),
              destructive: true,
            },
          ]}
        />
      )}
    />
  );
}
