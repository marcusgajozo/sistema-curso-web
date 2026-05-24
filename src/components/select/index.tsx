import { clsx } from 'clsx';
import { forwardRef, type SelectHTMLAttributes } from 'react';

import styles from './styles/select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      description,
      error,
      className,
      id,
      options,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const selectId = id || props.name;

    return (
      <div className={clsx(styles.container, className)}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}

        {description && (
          <span className={styles.description}>{description}</span>
        )}

        <div className={styles.inputWrapper}>
          <select
            id={selectId}
            ref={ref}
            className={styles.select}
            data-error={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
