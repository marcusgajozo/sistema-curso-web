import { Page } from '@/components/page';

export function Dashboard() {
  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Painel" />
        <p>
          Bem-vindo ao sistema de cursos! Escolha uma opção no menu lateral.
        </p>
      </Page.Content>
    </Page.Root>
  );
}
