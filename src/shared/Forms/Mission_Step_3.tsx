import { CommunityLink, Step_3_FormValues } from '@/types/mission.types';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Step_3_FormValues>;
  errors: FieldErrors | undefined;
  links: CommunityLink[];
  setAddLinkOpen: (b: boolean) => void;
};

const Mission_Step_3 = ({ links, errors, register, setAddLinkOpen }: Props) => {
  const isError = errors && Object.keys(errors).length > 0;
  return (
    <>
      {(isError ?? false) && (
        <div className='mt-1 text-center text-red-500'>
          <span>At least one community link is required</span>
        </div>
      )}
      <div className='mx-auto mb-6 grid max-w-md gap-y-5'>
        {links.map((link, index) => (
          <div key={index}>
            <label
              htmlFor={`mission-name-${index}`}
              className='mb-2 block text-sm font-medium text-dark-1'
            >
              {link.name}
            </label>
            <input
              id={link.name}
              type='text'
              placeholder='www.example.com'
              className={`${
                (isError ?? false) && 'border-red-500'
              } block w-full border border-gray-5 bg-white p-2.5 text-sm text-gray-3  outline-none focus:border-primary-1 focus:ring-primary-1`}
              {...register(link.name)}
            />
          </div>
        ))}
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => setAddLinkOpen(true)}
            className='rounded bg-secondary-3 p-2 text-xl text-white shadow-md shadow-secondary-3/60 hover:bg-secondary-3/70'
          >
            <AiOutlinePlusCircle className='text-xl' />
          </button>
        </div>
      </div>
    </>
  );
};

export default Mission_Step_3;
