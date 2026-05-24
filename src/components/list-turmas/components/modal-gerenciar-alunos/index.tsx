import { useQueryClient } from '@tanstack/react-query';
import { Check, UserPlus } from 'lucide-react';
import { useState } from 'react';
import type z from 'zod';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog';
import { Pagination } from '@/components/pagination';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useRequest } from '@/hooks/use-request';
import type { turmaSchema } from '@/services/api/turmas/schemas';

import styles from './styles/modal-gerenciar-alunos.module.css';

interface ModalGerenciarAlunosProps {
  turma: z.output<typeof turmaSchema> | null;
  onClose: () => void;
}

export function ModalGerenciarAlunos({
  turma,
  onClose,
}: ModalGerenciarAlunosProps) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: usuariosResponse,
    isLoading,
    refetch,
  } = useRequest({
    route: '/usuarios',
    method: 'get',
    autoFetch: !!turma,
    queryParams: { page, limit: 5 },
  });

  const { mutate, isLoading: isMutating } = useRequest({
    route: '/usuarios/matricular',
    method: 'post',
  });

  if (!turma) return null;

  const usuarios = usuariosResponse?.data || [];
  const meta = (usuariosResponse as any)?.meta;

  const handleMatricular = (usuarioId: string) => {
    mutate(
      { usuarioId, turmasIds: [turma.id] },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['/turmas'] });
          await refetch();
        },
      },
    );
  };

  return (
    <Dialog open={!!turma} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Alunos</DialogTitle>
          <DialogDescription>
            Adicione alunos à turma <strong>{turma.titulo}</strong>. Restam{' '}
            {Math.max(
              0,
              turma.quantidadeVagas - (turma.usuariosIds?.length || 0),
            )}{' '}
            vagas.
          </DialogDescription>
        </DialogHeader>

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
                const isMatriculado = turma.usuariosIds?.includes(usuario.id);

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
      </DialogContent>
    </Dialog>
  );
}
