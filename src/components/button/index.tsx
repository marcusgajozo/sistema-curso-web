import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'normal' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, isLoading, variant = 'normal', disabled, ...props },
    ref,
  ) => {
    const buttonClass =
      `${styles.button} ${styles[variant]} ${className || ''}`.trim();

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className={styles.spinner} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
