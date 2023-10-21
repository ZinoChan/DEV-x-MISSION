import UserMission from '@/components/profile/UserMission';
import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/utils/AuthOptions';
import { ROUTES } from '@/utils/routes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=${ROUTES.USER_PROFILE}`);

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;

  const userMissions = await xprisma.mission.getUserMissions(user.id);

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
        {userMissions.length > 0 &&
          userMissions.map(({ missionName, id, published }) => (
            <UserMission
              key={id}
              missionName={missionName}
              published={published}
              id={id}
            />
          ))}
      </div>
    </section>
  );
}
