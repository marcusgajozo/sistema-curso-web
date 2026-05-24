import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Check, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import z from 'zod';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { Page } from '@/components/page';
import { Pagination } from '@/components/pagination';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useRequest } from '@/hooks/use-request';

import styles from './styles/gerenciar-turma.module.css';

const formSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
});

export function GerenciarTurma() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { id: turmaId } = useParams<{ id: string }>();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    data: usuariosResponse,
    isLoading,
    refetch,
  } = useRequest({
    route: '/usuarios',
    method: 'get',
    autoFetch: true,
    queryParams: { page, limit: 5 },
  });

  const { mutate, isLoading: isMutating } = useRequest({
    route: '/usuarios/matricular',
    method: 'post',
  });

  const { data: turmaData } = useRequest({
    route: '/turmas/:id',
    method: 'get',
    params: { id: turmaId || '' },
    autoFetch: true,
  });

  const turma = turmaData?.data;
  const usuarios = usuariosResponse?.data || [];
  const meta = (usuariosResponse as any)?.meta;

  const handleMatricular = (usuarioId: string) => {
    if (!turmaId) return;

    mutate(
      { usuarioId, turmasIds: [turmaId] },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['/turmas'] });
          await refetch();
        },
      },
    );
  };

  const onClear = () => {
    reset({ nome: undefined, email: undefined });
  };

  const onSubmit = handleSubmit(() => {});

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Gerenciar turma" />
        <p>
          Adicione alunos à turma <strong>{turma?.titulo}</strong>. Restam{' '}
          {Math.max(
            0,
            turma?.quantidadeVagas - (turma?.usuariosIds?.length || 0),
          )}{' '}
          vagas.
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <FormInput label="Nome do usuário" name="nome" control={control} />
            <FormInput
              label="Email do usuário"
              name="email"
              control={control}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'end',
              marginTop: 10,
            }}
          >
            <Button type="button" variant="outline" onClick={onClear}>
              Limpar filtro
            </Button>
            <Button type="submit">Pesquisar</Button>
          </div>
        </form>

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
                const isMatriculado = turma?.usuariosIds?.includes(usuario.id);

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
                        variant="outline"
                        disabled
                        className={styles.matriculadoBtn}
                      >
                        <Check size={16} /> Matriculado
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleMatricular(usuario.id)}
                        disabled={isMutating}
                      >
                        <UserPlus size={16} /> Matricular
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </SuspenseLoading>
        </div>

        <Pagination meta={meta} onPageChange={setPage} />
      </Page.Content>
    </Page.Root>
  );
}
