import { Link } from 'react-router';

import { Icon } from '@/components/icon';

import styles from './styles/not-found.module.css';

export function NotFound() {
  return (
    <div className={styles.container}>
      <Icon name="file-code" size={64} className={styles.icon} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>
        Ops! A página que você está procurando não existe.
      </p>
      <Link to="/" className={styles.backButton}>
        Voltar para a Home
      </Link>
    </div>
  );
}
