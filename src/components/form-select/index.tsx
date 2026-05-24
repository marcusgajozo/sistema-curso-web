import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Select, type SelectProps } from '../select';

type FormSelectProps<T extends FieldValues> = Omit<SelectProps, 'name'> & {
  name: Path<T>;
  control: Control<T>;
};

export function FormSelect<T extends FieldValues>({
  name,
  control,
  ...selectProps
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Select
          name={name}
          value={(value as string) ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          error={error?.message}
          {...selectProps}
        />
      )}
    />
  );
}
