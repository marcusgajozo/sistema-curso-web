import { ListUsuarios } from '@/components/list-usuarios';
import { Page } from '@/components/page';
import { SuspenseLoading } from '@/components/suspense-loading';
import { useQueryParams } from '@/hooks/use-query-params';
import { useRequest } from '@/hooks/use-request';

import { FilterUsuarios } from './components/filter-usuarios';

export function Usuarios() {
  const { queryParams } = useQueryParams();

  const { data: usuariosResponse, isLoading } = useRequest({
    route: '/usuarios',
    method: 'get',
    autoFetch: true,
    queryParams,
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Usuários" />

        <FilterUsuarios />

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
            data={usuariosResponse?.data}
            meta={usuariosResponse?.meta}
          />
        </SuspenseLoading>
      </Page.Content>
    </Page.Root>
  );
}
