import { useMutation } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { ListCursos } from '@/components/list-cursos';
import { Page } from '@/components/page';
import { httpClient } from '@/libs/http-client';
import { ROUTES } from '@/routes/constants/routes-constants';

import { FilterCursosDisponiveis } from './components/filter-cursos-disponiveis';
import { useCursosDisponiveis } from './hooks/use-cursos-disponiveis';

export function Cursos() {
  const { cursos, refetch } = useCursosDisponiveis();
  const navigate = useNavigate();

  const { mutate: deleteCurso } = useMutation({
    mutationFn: (id: string) => httpClient.delete(`/cursos/${id}`),
    onSuccess: () => {
      toast.success('Curso excluído com sucesso!');
      void refetch();
    },
    onError: () => {
      toast.error('Erro ao excluir o curso.');
    },
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cursos" />
        <FilterCursosDisponiveis />
        <ListCursos
          data={cursos?.data}
          meta={cursos?.meta}
          listAction={(curso) => [
            {
              name: 'Mais informações',
              function: () =>
                navigate(
                  generatePath(ROUTES.CURSO_ID, {
                    cursoId: curso.id,
                  }),
                ),
            },
            {
              name: 'Criar turma',
              function: () =>
                navigate(
                  generatePath(ROUTES.CREATE_TURMA, {
                    cursoId: curso.id,
                  }),
                ),
            },
            {
              name: 'Excluir curso',
              function: () => {
                deleteCurso(curso.id);
              },
              destructive: true,
            },
          ]}
        />
      </Page.Content>
    </Page.Root>
  );
}
