import { xprisma } from '@/lib/prismaExtentions';
import { ROUTES } from '@/utils/routes';
import { BiGroup, BiHeart, BiSolidUpvote, BiTask } from 'react-icons/bi';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/services/AuthOptions';

function mapStats(
  likes: number | undefined,
  votes: number | undefined,
  followers: number | undefined,
  missions: number | undefined
) {
  return [
    {
      icon: <BiHeart className='text-3xl text-red-400' />,
      name: 'Likes',
      value: likes ?? 0,
    },
    {
      icon: <BiGroup className='text-3xl text-primary-2' />,
      name: 'Followers',
      value: followers ?? 0,
    },
    {
      icon: <BiTask className='text-3xl text-secondary-3' />,
      name: 'Missions',
      value: missions ?? 0,
    },
    {
      icon: <BiSolidUpvote className='text-3xl text-secondary-2' />,
      name: 'Votes',
      value: votes ?? 0,
    },
  ];
}

export default async function Stats() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=${ROUTES.USER_STATS}`);

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;
  const userStats = await xprisma.user.getUserStats(user.id);
  return (
    <section className='grid min-w-[300px] max-w-full justify-center gap-10 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {mapStats(
        userStats?.missions.reduce(
          (sum, mission) => sum + mission.likes.length,
          0
        ),
        userStats?.votes.length,
        userStats?.followers.length,
        userStats?.missions.length
      ).map((item) => (
        <div
          key={item.name}
          className='flex min-h-[150px] max-w-sm flex-col items-center justify-center space-y-2 rounded-lg border border-gray-200 bg-white bg-gradient-to-b from-[#F4F6F0] to-[#eee] p-6 text-center shadow'
        >
          {item.icon}
          <span className='mt-3 text-xl font-bold'>{item.value}</span>
          <p className='text-sm font-medium text-dark-1'>{item.name}</p>
        </div>
      ))}
    </section>
  );
}
