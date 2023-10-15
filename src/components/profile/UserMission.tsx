import { ROUTES } from '@/utils/routes';
import EditBtns from './EditBtns';
import Link from 'next/link';

const UserMission = () => {
  return (
    <div className='relative flex min-h-[220px] items-center justify-center rounded border border-gray-2 bg-gradient-to-b from-[#F4F6F0] to-[#eee] p-8 text-center'>
      <div className='absolute right-4 top-4'>
        <EditBtns mission_slug='mission-slug' />
      </div>
      <Link href={`${ROUTES.USER_PROFILE}/mission-slug`}>
        <h3 className='text-4xl hover:text-primary-2'>
          Mission #1: Anime Recommendation App
        </h3>
      </Link>
    </div>
  );
};

export default UserMission;
