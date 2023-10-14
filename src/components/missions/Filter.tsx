import { FC } from 'react';

type Props = {
  label: string;
  options: string[];
};

const SelectInput: FC<Props> = ({ label, options }) => {
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
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const Filter = () => {
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const skillRequired = [
    'Front-end',
    'Backend',
    'FullStack',
    'Design',
    'Mobile',
  ];
  const projectTypes = [
    'Web Development',
    'Mobile Development',
    'UX/UI Design',
  ];
  const userRating = ['High', 'Low'];
  const userLikes = ['High', 'Low'];
  const statuses = ['Ideation', 'Prototype', 'Development'];

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
      <SelectInput label='Skill Level' options={skillLevels} />
      <SelectInput label='Skill Required' options={skillRequired} />
      <SelectInput label='Project Type' options={projectTypes} />
      <SelectInput label='User Rating' options={userRating} />
      <SelectInput label='User Likes' options={userLikes} />
      <SelectInput label='Status' options={statuses} />
    </div>
  );
};

export default Filter;
