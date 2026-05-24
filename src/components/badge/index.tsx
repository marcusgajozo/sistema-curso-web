import type { ReactNode } from 'react';

import styles from './styles.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
  );
}
