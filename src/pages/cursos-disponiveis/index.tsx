import { Page } from '@/components/page';

import { useCursosDisponiveis } from './hooks/use-cursos-disponiveis';

export function CursosDisponiveis() {
  const { cursos } = useCursosDisponiveis();

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cursos Disponíveis" />
        {cursos?.data.map((item) => {
          return <>{item.temas}</>;
        })}
      </Page.Content>
    </Page.Root>
  );
}
