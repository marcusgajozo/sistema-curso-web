import { clsx } from 'clsx';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { useNavigate } from 'react-router';

import { Icon } from '@/components/icon';
import type { listIconsConstant } from '@/components/icon/constants/list-icons.constant';

import styles from './styles/button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'normal' | 'outline' | 'ghost' | 'danger';
  iconName?: keyof typeof listIconsConstant;
  to?: string;
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
      to,
      type,
      onClick,
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const buttonClass = clsx(styles.button, styles[variant], className);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (to) {
        e.preventDefault();
        void navigate(to);
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type={to ? 'button' : type}
        className={buttonClass}
        disabled={isLoading || disabled}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <Icon name="loader-2" className={styles.spinner} />
        ) : iconName ? (
          <Icon name={iconName} size={16} />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
