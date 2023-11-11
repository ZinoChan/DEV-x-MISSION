import MissionHeader from '@/components/missions/MissionHeader';
import { xprisma } from '@/lib/prismaExtentions';
import MissionCard from '@/shared/Card';
import Container from '@/shared/Container';
import {
  createMissionFilters,
  createOrderFilters,
} from '@/helpers/filterMission';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/AuthOptions';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Missions({ searchParams }: Props) {
  const missions = await xprisma.mission.getMissions(
    createMissionFilters(searchParams),
    createOrderFilters(searchParams)
  );
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email;
  let userId = '';
  if (currentUserEmail != null) {
    const user = await xprisma.user.findByEmail(currentUserEmail);
    if (user != null) userId = user.id;
  }

  return (
    <section className='py-16'>
      <MissionHeader isFilterEmpty={Object.keys(searchParams).length === 0} />
      <Container>
        <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <MissionCard key={mission.id} userId={userId} mission={mission} />
            ))
          ) : (
            <div>no mission found</div>
          )}
        </div>
      </Container>
    </section>
  );
}
