import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { Pagination } from '@/components/pagination';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useQueryParams } from '@/hooks/use-query-params';
import { useRequest } from '@/hooks/use-request';

import styles from './styles/list-usuarios-turma.module.css';

interface ListUsuariosTurmaProps {
  turmaId?: string;
  turmaUsuariosIds?: string[];
  isDisponivel: boolean;
}

export function ListUsuariosTurma({
  turmaId,
  turmaUsuariosIds,
  isDisponivel,
}: ListUsuariosTurmaProps) {
  const queryClient = useQueryClient();
  const { queryParams } = useQueryParams();

  const {
    data: usuariosResponse,
    isLoading,
    refetch,
  } = useRequest({
    route: '/usuarios',
    method: 'get',
    autoFetch: true,
    queryParams: { ...queryParams, limit: 5 },
  });

  const usuarios = usuariosResponse?.data || [];
  const meta = usuariosResponse?.meta;

  const { mutate: matricular, isLoading: isMatriculating } = useRequest({
    route: '/usuarios/matricular',
    method: 'post',
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleMatricular = (usuarioId: string) => {
    if (!turmaId) return;

    matricular(
      { usuarioId, turmasIds: [turmaId] },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['/turmas'] });
          await refetch();
          toast.success('Aluno matriculado com sucesso!');
        },
      },
    );
  };

  const handleCancelarMatricula = (_usuarioId: string) => {
    toast.info(
      'Funcionalidade de cancelar matrícula será implementada em breve.',
    );
  };

  return (
    <>
      <div className={styles.userList}>
        <SuspenseLoading
          isLoading={isLoading}
          fallback={
            <div className={styles.loading}>Carregando usuários...</div>
          }
        >
          {usuarios.length === 0 ? (
            <div className={styles.empty}>Nenhum usuário encontrado.</div>
          ) : (
            usuarios.map((usuario) => {
              const isMatriculado = turmaUsuariosIds?.includes(usuario.id);

              return (
                <div key={usuario.id} className={styles.userCard}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {usuario.nome.charAt(0)}
                    </div>
                    <div>
                      <h4 className={styles.userName}>{usuario.nome}</h4>
                      <p className={styles.userEmail}>{usuario.email}</p>
                    </div>
                  </div>

                  {isMatriculado ? (
                    <Button
                      variant="danger"
                      iconName="user-fill"
                      onClick={() => handleCancelarMatricula(usuario.id)}
                    >
                      Cancelar Matrícula
                    </Button>
                  ) : (
                    <Button
                      iconName="user-fill"
                      onClick={() => handleMatricular(usuario.id)}
                      disabled={isMatriculating || !isDisponivel}
                    >
                      Matricular
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </SuspenseLoading>
      </div>

      <Pagination meta={meta} />
    </>
  );
}
