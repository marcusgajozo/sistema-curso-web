import { ListTurmas } from '@/components/list-turmas';
import { Page } from '@/components/page';
import { useRequest } from '@/hooks/use-request';

export function Turmas() {
  const { data: turmaData } = useRequest({
    route: '/turmas',
    method: 'get',
    autoFetch: true,
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
