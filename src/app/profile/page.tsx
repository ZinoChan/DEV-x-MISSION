import UserMission from '@/components/profile/UserMission';
import { ROUTES } from '@/utils/routes';
import Link from 'next/link';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Profile = () => {
  return (
    <section className='py-6'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='flex border-spacing-3 items-center justify-center rounded border-[3px] border-dashed border-gray-2 p-8'>
          <div className='flex flex-col items-center justify-center text-center'>
            <AiOutlinePlusCircle className='text-5xl text-primary-1' />
            <p className='my-4 text-sm text-gray-4'>
              Launch your mission, attract collaborators, and navigate through
              development together.
            </p>
            <Link
              href={ROUTES.CREATE_MISSION_STEP_1}
              className='rounded-md bg-dark-1  px-4 py-2 text-white  transition-colors hover:bg-dark-1/80'
            >
              Add new mission
            </Link>
          </div>
        </div>
        <UserMission />
        <UserMission />
      </div>
    </section>
  );
};

export default Profile;
