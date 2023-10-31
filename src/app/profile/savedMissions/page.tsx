import { xprisma } from '@/lib/prismaExtentions';
import SavedMissionCard from './components/SavedMissionCard';
import Container from '@/shared/Container';
import { ROUTES } from '@/utils/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/AuthOptions';

export default async function SavedMissions() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=${ROUTES.USER_STATS}`);

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;
  const missions = await xprisma.savedMission.getSavedMissions(user.id);
  return (
    <section className='py-4'>
      <Container>
        <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
          {missions.length > 0 ? (
            missions.map((el) => (
              <SavedMissionCard key={el.id} mission={el.mission} />
            ))
          ) : (
            <div>no mission found</div>
          )}
        </div>
      </Container>
    </section>
  );
}
