'use client';
import { ROUTES } from '@/utils/routes';
import { ChangeEvent, FC } from 'react';
import { useRouter } from 'next/navigation';
import { missionFilters } from '@/data';
import { camelCaseString } from '@/helpers/camelCase';

type SelectProps = {
  label: string;
  options: string[];
  onFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput: FC<SelectProps> = ({ label, options, onFilterChange }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className='mb-2 block text-sm font-medium text-gray-3'
      >
        {label}:
      </label>
      <select
        id={label}
        className='block w-full border border-gray-5 bg-light-4 p-2.5 text-sm text-gray-3  outline-none focus:border-primary-1 focus:ring-primary-1'
        onChange={onFilterChange}
      >
        <option selected disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

type Props = {
  setQuery: (query: string) => void;
  query: string;
};

const Filter = ({ setQuery, query }: Props) => {
  const router = useRouter();
  const onFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const label = camelCaseString(event.target.id);
    const option = event.target.value;
    const updatedQuery = new URLSearchParams(query);

    if (updatedQuery.has(label)) {
      updatedQuery.set(label, encodeURIComponent(option));
    } else {
      updatedQuery.append(label, encodeURIComponent(option));
    }

    const updatedQueryString = `?${updatedQuery.toString()}`;
    setQuery(updatedQueryString);
    router.push(`${ROUTES.MISSIONS}${updatedQueryString}`);
  };

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
      {missionFilters.map((filter) => (
        <SelectInput
          onFilterChange={onFilterChange}
          key={filter.label}
          label={filter.label}
          options={filter.options}
        />
      ))}
    </div>
  );
};

export default Filter;
