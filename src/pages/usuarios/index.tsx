import { ListUsuarios } from '@/components/list-usuarios';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useQueryParams } from '@/hooks/use-query-params';
import { useRequest } from '@/hooks/use-request';

export function Usuarios() {
  const { queryParams } = useQueryParams();

  const { data: usuariosResponse, isLoading } = useRequest({
    route: '/usuarios',
    method: 'get',
    autoFetch: true,
    queryParams,
  });

  return (
    <div
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          Usuários
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginTop: '0.5rem',
          }}
        >
          Gerencie os usuários do sistema.
        </p>
      </div>

      <SuspenseLoading
        isLoading={isLoading}
        fallback={
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-secondary)',
            }}
          >
            Carregando usuários...
          </div>
        }
      >
        <ListUsuarios
          data={usuariosResponse?.data || []}
          meta={(usuariosResponse as any)?.meta}
        />
      </SuspenseLoading>
    </div>
  );
}
