import { clsx } from 'clsx';
import { forwardRef } from 'react';

import styles from './styles/checkbox-group.module.css';

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface CheckboxGroupProps {
  label?: string;
  description?: string;
  error?: string;
  options: CheckboxOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  name?: string;
  className?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      description,
      error,
      options,
      value = [],
      onChange,
      name,
      className,
    },
    ref,
  ) => {
    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      if (!onChange) return;

      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    };

    return (
      <div className={clsx(styles.container, className)} ref={ref}>
        {label && <span className={styles.label}>{label}</span>}
        {description && (
          <span className={styles.description}>{description}</span>
        )}

        <div className={styles.optionsContainer}>
          {options.map((option) => {
            const isChecked = value.includes(option.value);
            const inputId = `${name}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={inputId}
                className={styles.optionLabel}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={(e) =>
                    handleCheckboxChange(option.value, e.target.checked)
                  }
                  className={styles.checkbox}
                />
                {option.label}
              </label>
            );
          })}
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
