import z from 'zod';

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/dropdown-menu';
import { Pagination } from '@/components/pagination';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { turmaSchema } from '@/services/api/turmas/schemas';

import { TurmaCard } from '../turma-card';
import styles from './styles/list-turmas.module.css';

interface ListTurmasProps {
  data?: z.output<typeof turmaSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListTurmas({ data = [], meta }: ListTurmasProps) {
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className={styles.grid}>
            {data?.map((turma) => (
              <TurmaCard
                key={turma.id}
                turma={turma}
                listAction={
                  <>
                    <DropdownMenuItem
                      onClick={() => alert(`Editar ${turma.titulo}`)}
                    >
                      Editar Turma
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        alert(`Gerenciar alunos da turma ${turma.titulo}`)
                      }
                    >
                      Gerenciar Alunos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => alert(`Excluir ${turma.titulo}`)}
                      style={{ color: 'var(--destructive)' }}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </>
                }
              />
            ))}
          </div>

          <Pagination meta={meta} />
        </>
      ) : (
        <div className={styles.empty}>Nenhuma turma disponível no momento.</div>
      )}
    </>
  );
}
