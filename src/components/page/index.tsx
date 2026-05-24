import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import styles from './styles/page.module.css';

interface PageRootProps {
  children: ReactNode;
}

function PageRoot({ children }: PageRootProps) {
  return <section className={styles.root}>{children}</section>;
}

interface PageHeaderProps {
  title: string;
  hasBack?: boolean;
}

function PageHeader({ title, hasBack }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        {hasBack && (
          <button
            type="button"
            className={styles.backButton}
            onClick={() => void navigate(-1)}
            aria-label="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
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
