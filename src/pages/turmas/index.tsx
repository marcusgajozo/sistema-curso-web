import { ListTurmas } from '@/components/list-turmas';
import { Page } from '@/components/page';
import { useQueryParams } from '@/hooks/use-query-params';
import { useRequest } from '@/hooks/use-request';

export function Turmas() {
  const { queryParams } = useQueryParams();

  const { data: turmaData } = useRequest({
    route: '/turmas',
    method: 'get',
    autoFetch: true,
    queryParams,
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Turmas" />
        <ListTurmas data={turmaData?.data} meta={turmaData?.meta} />
      </Page.Content>
    </Page.Root>
  );
}
