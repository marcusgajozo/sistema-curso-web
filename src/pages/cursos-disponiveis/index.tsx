import { generatePath, useNavigate } from 'react-router';

import { ListCursos } from '@/components/list-cursos';
import { Page } from '@/components/page';
import { ROUTES } from '@/routes/constants/routes-constants';

import { FilterCursosDisponiveis } from './components/filter-cursos-disponiveis';
import { useCursosDisponiveis } from './hooks/use-cursos-disponiveis';

export function CursosDisponiveis() {
  const { cursos } = useCursosDisponiveis();
  const navigate = useNavigate();

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cursos Disponíveis" />
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
          ]}
        />
      </Page.Content>
    </Page.Root>
  );
}
