import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Input, type InputProps } from '../input';

type FormInputProps<T extends FieldValues> = Omit<InputProps, 'name'> & {
  name: Path<T>;
  control: Control<T>;
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Input
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
}
