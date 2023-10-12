import { Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { Control } from 'react-hook-form';

type SelectProps<TFieldValues extends FieldValues> = {
  label: string;
  options: string[];
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  error: FieldError | undefined;
};

const SelectInput = <TFieldValues extends FieldValues>({
  label,
  options,
  name,
  control,
  error,
}: SelectProps<TFieldValues>) => {
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
          <select
            id={name}
            className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none focus:border-primary-1 focus:ring-primary-1'
            {...field}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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

export default SelectInput;
