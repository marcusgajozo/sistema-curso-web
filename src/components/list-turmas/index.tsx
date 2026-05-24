import { generatePath, useNavigate } from 'react-router';
import z from 'zod';

import { Pagination } from '@/components/pagination';
import { ROUTES } from '@/routes/constants/routes-constants';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { turmaSchema } from '@/services/api/turmas/schemas';

import { TurmaCard } from '../turma-card';
import styles from './styles/list-turmas.module.css';

interface ListTurmasProps {
  data?: z.output<typeof turmaSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListTurmas({ data = [], meta }: ListTurmasProps) {
  const navigate = useNavigate();
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
                    name: 'Gerenciar turma',
                    function: () =>
                      navigate(
                        generatePath(ROUTES.GERENCIAR_TURMA, { id: turma.id }),
                      ),
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
    </>
  );
}
