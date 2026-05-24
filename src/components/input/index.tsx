import { forwardRef, type InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={`${styles.container} ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        {description && (
          <span className={styles.description}>{description}</span>
        )}

        <div className={styles.inputWrapper}>
          <input
            id={inputId}
            ref={ref}
            className={styles.input}
            data-error={!!error}
            {...props}
          />
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
