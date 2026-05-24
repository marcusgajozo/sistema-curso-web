import { useState } from 'react';
import z from 'zod';

import { Pagination } from '@/components/pagination';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { turmaSchema } from '@/services/api/turmas/schemas';

import { TurmaCard } from '../turma-card';
import { ModalGerenciarAlunos } from './components/modal-gerenciar-alunos';
import styles from './styles/list-turmas.module.css';

interface ListTurmasProps {
  data?: z.output<typeof turmaSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListTurmas({ data = [], meta }: ListTurmasProps) {
  const [turmaGerenciada, setTurmaGerenciada] = useState<z.output<
    typeof turmaSchema
  > | null>(null);

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className={styles.grid}>
            {data?.map((turma) => (
              <TurmaCard
                key={turma.id}
                turma={turma}
                listAction={[
                  {
                    name: 'Editar Turma',
                    function: () => alert(`Editar ${turma.titulo}`),
                  },
                  {
                    name: 'Gerenciar Alunos',
                    function: () => setTurmaGerenciada(turma),
                  },
                  {
                    name: 'Excluir',
                    function: () => alert(`Excluir ${turma.titulo}`),
                    destructive: true,
                  },
                ]}
              />
            ))}
          </div>

          <Pagination meta={meta} />
        </>
      ) : (
        <div className={styles.empty}>Nenhuma turma disponível no momento.</div>
      )}

      <ModalGerenciarAlunos
        turma={turmaGerenciada}
        onClose={() => setTurmaGerenciada(null)}
      />
    </>
  );
}
