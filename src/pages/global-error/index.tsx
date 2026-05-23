import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

import { Icon } from '../../components/icon';
import styles from './styles/global-error.module.css';

export function GlobalError() {
  const error = useRouteError();

  let errorMessage =
    'Ocorreu um erro inesperado no sistema. Por favor, tente novamente.';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={styles.container}>
      <Icon name="thunder" size={64} className={styles.icon} />
      <h1 className={styles.title}>Ops! Algo deu errado.</h1>
      <p className={styles.description}>{errorMessage}</p>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </button>
        <Link to="/" className={styles.linkButton}>
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
