import { Outlet } from 'react-router';

import { Sidebar } from './components/sidebar';
import styles from './styles/main-layout.module.css';

export function MainLayout() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <section className={styles.content}>
        <Outlet />
      </section>
    </main>
  );
}
