import { useParams } from 'react-router';

import { ListCursos } from '@/components/list-cursos';
import { ListTurmas } from '@/components/list-turmas';
import { Page } from '@/components/page';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useRequest } from '@/hooks/use-request';

export function UsuarioId() {
  const { usuarioId } = useParams<{ usuarioId: string }>();

  const { data, isLoading } = useRequest({
    route: '/usuarios/:id',
    params: { id: usuarioId || '' },
    method: 'get',
    autoFetch: !!usuarioId,
  });

  const usuario = data?.data;

  const cursos = usuario?.turmas.map((item) => item.curso);
  const turmas = usuario?.turmas;

  return (
    <Page.Root>
      <SuspenseLoading
        fallback={<>Carregando dados...</>}
        isLoading={isLoading}
      >
        <Page.Content>
          <Page.Header title={`Informações de ${usuario?.nome}`} hasBack />
          <div>
            <p>
              <strong>Email:</strong> {usuario?.email}
            </p>
          </div>
          <h3
            style={{
              margin: '1.5rem 0',
              borderBottom: '2px solid black',
              paddingBottom: '0.5rem',
            }}
          >
            Cursos
          </h3>
          <ListCursos data={cursos} />
          <h3
            style={{
              margin: '1.5rem 0',
              borderBottom: '2px solid black',
              paddingBottom: '0.5rem',
            }}
          >
            Turmas
          </h3>
          <ListTurmas data={turmas} />
        </Page.Content>
      </SuspenseLoading>
    </Page.Root>
  );
}
