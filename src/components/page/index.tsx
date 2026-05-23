import type { ReactNode } from 'react';

import styles from './styles/page.module.css';

interface PageRootProps {
  children: ReactNode;
}

function PageRoot({ children }: PageRootProps) {
  return <section className={styles.root}>{children}</section>;
}

interface PageHeaderProps {
  title: string;
}

function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

interface PageContentProps {
  children: ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return <section className={styles.content}>{children}</section>;
}

export const Page = {
  Root: PageRoot,
  Header: PageHeader,
  Content: PageContent,
};
