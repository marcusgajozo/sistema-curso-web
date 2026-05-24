import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { CheckboxGroup, type CheckboxGroupProps } from '../checkbox-group';

type FormCheckboxGroupProps<T extends FieldValues> = Omit<
  CheckboxGroupProps,
  'name' | 'value' | 'onChange'
> & {
  name: Path<T>;
  control: Control<T>;
};

export function FormCheckboxGroup<T extends FieldValues>({
  name,
  control,
  ...props
}: FormCheckboxGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <CheckboxGroup
          name={name}
          value={value ?? []}
          onChange={onChange}
          ref={ref}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
