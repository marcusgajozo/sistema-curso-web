import z from 'zod';

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/dropdown-menu';
import { GenericList } from '@/components/generic-list';
import type { cursoSchema } from '@/services/api/cursos/schemas';
import type { metaSchema } from '@/services/api/schemas/api-schema';

import { CursoCard } from '../curso-card';

interface ListCursoProps {
  data?: z.output<typeof cursoSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListCursos({ data = [], meta }: ListCursoProps) {
  return (
    <GenericList
      data={data}
      meta={meta}
      emptyMessage="Nenhum curso disponível no momento."
      renderItem={(curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          listAction={
            <>
              <DropdownMenuItem onClick={() => alert(`Editar ${curso.titulo}`)}>
                Editar Curso
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Gerenciar turmas de ${curso.titulo}`)}
              >
                Gerenciar Turmas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Excluir ${curso.titulo}`)}
                style={{ color: 'var(--destructive)' }}
              >
                Excluir
              </DropdownMenuItem>
            </>
          }
        />
      )}
    />
  );
}
