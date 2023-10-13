import { CommunityLink } from '@/types/mission.types';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  setCommunityLinks: (l: CommunityLink[]) => void;
  community_links: CommunityLink[];
};

type FormData = {
  community_link: string;
};

const AddLink = ({
  isOpen,
  setOpen,
  setCommunityLinks,
  community_links,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const link = { id: uuidv4(), name: data.community_link };
    const newLink = [...community_links, link];
    setCommunityLinks(newLink);
    setOpen(false);
  };
  return (
    <div
      className={`fixed ${
        isOpen ? 'flex' : 'hidden'
      } inset-0 z-20 items-center justify-center bg-light-1/90`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-96 rounded bg-light-2 p-6'
      >
        <div className='mb-4'>
          <label
            htmlFor='community-name'
            className='mb-2 block text-sm font-medium text-dark-1'
          >
            Community Name
          </label>
          <input
            id='community-name'
            type='text'
            placeholder='Enter your community name'
            className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1  outline-none focus:border-primary-1 focus:ring-primary-1'
            {...register('community_link', { required: true })}
          />
          {errors.community_link && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>

        <div className='mt-4 flex justify-between'>
          <button
            onClick={() => setOpen(false)}
            className='rounded bg-red-500 px-4 py-2 text-white'
            type='button'
          >
            close
          </button>
          <button
            type='submit'
            className='rounded bg-secondary-3 px-4 py-2 text-white'
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLink;
