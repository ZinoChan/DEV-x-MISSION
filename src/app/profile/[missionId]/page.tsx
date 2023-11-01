import { xprisma } from '@/lib/prismaExtentions';
import Post from '@/shared/Post';
import { authOptions } from '@/utils/AuthOptions';
import { ROUTES } from '@/utils/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function UserMissionDetails({
  params,
}: {
  params: { missionId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session)
    redirect(
      `/api/auth/signin?callbackUrl=${ROUTES.USER_PROFILE}/${params.missionId}`
    );

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;

  const mission = await xprisma.mission.getMissionById(params.missionId);
  if (mission != null)
    return (
      <section className='pt-10 '>
        <div className='mx-auto max-w-screen-md'>
          <Post mission={mission} />
        </div>
      </section>
    );
  return <div>mission not found</div>;
}
