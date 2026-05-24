import z from 'zod';

import type { cursoSchema } from '@/services/api/cursos/schemas';
import type { metaSchema } from '@/services/api/schemas/api-schema';

import { CursoCard } from '../curso-card';
import styles from './styles/list-curso.module.css';

interface ListCursoProps {
  data?: z.output<typeof cursoSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListCurso({ data = [] }: ListCursoProps) {
  return (
    <>
      {data.length > 0 ? (
        <div className={styles.grid}>
          {data?.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>Nenhum curso disponível no momento.</div>
      )}
    </>
  );
}
