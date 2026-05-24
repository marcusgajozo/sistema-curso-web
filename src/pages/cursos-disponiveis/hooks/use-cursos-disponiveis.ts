import { useRequest } from '@/hooks/use-request';

export function useCursosDisponiveis() {
  const { data: cursos } = useRequest({
    route: '/cursos/disponiveis',
    method: 'get',
    autoFetch: true,
  });

  return {
    cursos,
  };
}
