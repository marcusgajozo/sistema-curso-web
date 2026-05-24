import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { Icon } from '@/components/icon';
import type { listIconsConstant } from '@/components/icon/constants/list-icons.constant';

import styles from './styles.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'normal' | 'outline' | 'ghost' | 'danger';
  iconName?: keyof typeof listIconsConstant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      variant = 'normal',
      disabled,
      iconName,
      ...props
    },
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
        {isLoading ? (
          <Loader2 className={styles.spinner} />
        ) : iconName ? (
          <Icon name={iconName} size={16} />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
