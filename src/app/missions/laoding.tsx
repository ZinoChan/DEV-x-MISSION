import CardLoader from '@/shared/Loader/CardLoader';
import Container from '@/shared/Container';

const laoding = () => {
  return (
    <section className='py-16'>
      <Container>
        <div className='mb-10 flex items-center justify-between'>
          <div className='mb-1 h-12 w-48 rounded bg-gray-300 '></div>
          <div className='mb-1 h-10 w-32 rounded-full bg-gray-300 '></div>
        </div>
        <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
          {[0, 1, 2, 3, 4, 5].map((el) => (
            <CardLoader key={`el-${el}`} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default laoding;
