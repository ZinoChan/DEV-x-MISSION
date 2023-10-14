import { Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { Control } from 'react-hook-form';

type TextareaProps<TFieldValues extends FieldValues> = {
  label: string;
  rows: number;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  error: FieldError | undefined;
};

const TextareaField = <TFieldValues extends FieldValues>({
  label,
  rows,
  name,
  control,
  error,
}: TextareaProps<TFieldValues>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-sm font-medium text-dark-1'
      >
        {label}:
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            id={name}
            rows={rows}
            className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none focus:border-primary-1 focus:ring-primary-1'
            {...field}
          ></textarea>
        )}
      />
      {error != null && (
        <span className='mt-2 inline-block text-sm text-red-600'>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default TextareaField;
