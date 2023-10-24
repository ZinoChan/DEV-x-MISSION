import MissionHeader from '@/components/missions/MissionHeader';
import { xprisma } from '@/lib/prismaExtentions';
import MissionCard from '@/shared/Card';
import Container from '@/shared/Container';

export default async function Missions() {
  const missions = await xprisma.mission.getMissions();
  return (
    <section className='py-16'>
      <MissionHeader />
      <Container>
        <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          ) : (
            <div>no mission found</div>
          )}
        </div>
      </Container>
    </section>
  );
}
