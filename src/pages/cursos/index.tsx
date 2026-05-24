import { ListCursos } from '@/components/list-cursos';
import { Page } from '@/components/page';

import { FilterCursosDisponiveis } from './components/filter-cursos-disponiveis';
import { useCursosDisponiveis } from './hooks/use-cursos-disponiveis';

export function Cursos() {
  const { cursos } = useCursosDisponiveis();

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cursos" />
        <FilterCursosDisponiveis />
        <ListCursos data={cursos?.data} meta={cursos?.meta} />
      </Page.Content>
    </Page.Root>
  );
}
