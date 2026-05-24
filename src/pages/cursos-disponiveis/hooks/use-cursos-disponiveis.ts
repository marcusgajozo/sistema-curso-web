import { useQueryParams } from '@/hooks/use-query-params';
import { useRequest } from '@/hooks/use-request';

export function useCursosDisponiveis() {
  const { queryParams } = useQueryParams();

  const {
    data: cursos,
    isLoading,
    refetch,
  } = useRequest({
    route: '/cursos/disponiveis',
    method: 'get',
    autoFetch: true,
    queryParams,
  });

  return {
    cursos,
    isLoading,
    refetch,
  };
}
