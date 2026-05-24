import { ListCurso } from '@/components/list-curso';
import { Page } from '@/components/page';

import { useCursosDisponiveis } from './hooks/use-cursos-disponiveis';

export function CursosDisponiveis() {
  const { cursos } = useCursosDisponiveis();

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cursos Disponíveis" />
        <ListCurso data={cursos?.data} meta={cursos?.meta} />
      </Page.Content>
    </Page.Root>
  );
}
