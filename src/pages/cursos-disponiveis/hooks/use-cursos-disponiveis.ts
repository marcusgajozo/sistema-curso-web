import { useSearchParams } from 'react-router';

import { useRequest } from '@/hooks/use-request';

export function useCursosDisponiveis() {
  const [searchParams] = useSearchParams();

  const queryParams: Record<string, string> = {};

  const titulo = searchParams.get('titulo');

  if (titulo) {
    queryParams.titulo = titulo;
  }

  const temasStr = searchParams.get('temas');
  if (temasStr) {
    queryParams.temas = temasStr;
  }

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
