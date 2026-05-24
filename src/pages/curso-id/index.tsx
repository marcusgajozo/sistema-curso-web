import { useParams } from 'react-router';

import { ListTurmas } from '@/components/list-turmas';
import { Page } from '@/components/page';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useRequest } from '@/hooks/use-request';

export function CursoId() {
  const { cursoId } = useParams<{ cursoId: string }>();

  const { data, isLoading } = useRequest({
    route: '/cursos/:id',
    params: { id: cursoId || '' },
    method: 'get',
    autoFetch: !!cursoId,
  });

  const curso = data?.data;
  const turmas = curso?.turmas;

  return (
    <Page.Root>
      <SuspenseLoading
        fallback={<>Carregando dados...</>}
        isLoading={isLoading}
      >
        <Page.Content>
          <Page.Header
            title={`Informações do Curso ${curso?.titulo}`}
            hasBack
          />
          <div>
            <p>
              <strong>Descição:</strong> {curso?.descricao}
            </p>
          </div>
          <div>
            <p>
              <strong>Descição:</strong> {curso?.descricao}
            </p>
          </div>
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
