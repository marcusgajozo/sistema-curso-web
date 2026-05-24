import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import styles from './styles/badge.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant])}>{children}</span>
  );
}
