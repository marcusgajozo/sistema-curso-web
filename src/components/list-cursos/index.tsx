import z from 'zod';

import { GenericList } from '@/components/generic-list';
import type { cursoSchema } from '@/services/api/cursos/schemas';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { ActionOption } from '@/types/card';

import { CursoCard } from '../curso-card';

interface ListCursoProps {
  data?: z.output<typeof cursoSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
  listAction?: (curso: z.output<typeof cursoSchema>) => ActionOption[];
  hiddenAction?: boolean;
}

export function ListCursos({
  data = [],
  meta,
  listAction,
  hiddenAction,
}: ListCursoProps) {
  return (
    <GenericList
      data={data}
      meta={meta}
      emptyMessage="Nenhum curso disponível no momento."
      renderItem={(curso) => (
        <CursoCard
          key={curso.id}
          data={curso}
          hiddenAction={hiddenAction}
          listAction={
            listAction
              ? listAction(curso)
              : [
                  {
                    name: 'Editar Curso',
                    function: () => alert(`Editar ${curso.titulo}`),
                  },
                  {
                    name: 'Gerenciar Turmas',
                    function: () =>
                      alert(`Gerenciar turmas de ${curso.titulo}`),
                  },
                  {
                    name: 'Excluir',
                    function: () => alert(`Excluir ${curso.titulo}`),
                    destructive: true,
                  },
                ]
          }
        />
      )}
    />
  );
}
