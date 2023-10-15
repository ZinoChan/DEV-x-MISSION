import { ROUTES } from '@/utils/routes';
import Link from 'next/link';
import { BiEdit, BiTrash } from 'react-icons/bi';

const EditBtns = ({ mission_slug }: { mission_slug: string }) => {
  return (
    <div className='flex items-baseline space-x-3'>
      <Link
        href={`${ROUTES.USER_PROFILE}/${mission_slug}/edit-mission/step_1`}
        className='text-secondary-3 hover:text-purple-500'
      >
        <BiEdit className='text-xl' />
      </Link>
      <button className='text-red-500 hover:text-red-400'>
        <BiTrash className='text-xl' />
      </button>
    </div>
  );
};

export default EditBtns;
