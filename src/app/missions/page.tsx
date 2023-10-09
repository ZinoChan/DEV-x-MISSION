import MissionHeader from '@/components/missions/MissionHeader';
import MissionCard from '@/shared/Card';
import Container from '@/shared/Container';

const Missions = () => {
  return (
    <section className='py-16'>
      <MissionHeader />
      <Container>
        <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
          <MissionCard />
          <MissionCard />
          <MissionCard />
        </div>
      </Container>
    </section>
  );
};

export default Missions;
