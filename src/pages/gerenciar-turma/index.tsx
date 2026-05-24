import { useMemo } from 'react';
import { useParams } from 'react-router';

import { Page } from '@/components/page';
import { useRequest } from '@/hooks/use-request';

import { FilterUsuarios } from './components/filter-usuarios';
import { ListUsuariosTurma } from './components/list-usuarios-turma';

export function GerenciarTurma() {
  const { turmaId } = useParams<{ turmaId: string }>();

  const { data: turmaData } = useRequest({
    route: '/turmas/:id',
    method: 'get',
    params: { id: turmaId || '' },
    autoFetch: !!turmaId,
  });

  const turma = turmaData?.data;

  const { statusText, isDisponivel } = useMemo(() => {
    const now = new Date();
    const dataInicio = turma?.dataInicio ? new Date(turma.dataInicio) : now;
    const dataFim = turma?.dataFim ? new Date(turma.dataFim) : now;

    if (turma?.status === 'ENCERRADO' || now > dataFim) {
      return { statusText: 'Encerrado', isDisponivel: false };
    }

    if (now < dataInicio) {
      return { statusText: 'Em breve', isDisponivel: false };
    }

    return { statusText: 'Disponível', isDisponivel: true };
  }, [turma?.status, turma?.dataInicio, turma?.dataFim]);

  const vagasRestantes = Math.max(
    0,
    (turma?.quantidadeVagas ?? 0) - (turma?.usuariosIds?.length || 0),
  );

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Gerenciar turma" hasBack />
        <p>
          Adicione alunos à turma <strong>{turma?.titulo}</strong>. Restam{' '}
          {vagasRestantes} vagas. <br />
          Status da turma: <strong>{statusText}</strong>
        </p>

        <FilterUsuarios />

        <ListUsuariosTurma
          turmaId={turmaId}
          turmaUsuariosIds={turma?.usuariosIds}
          isDisponivel={isDisponivel}
        />
      </Page.Content>
    </Page.Root>
  );
}
