import Image from 'next/image';
import about from '@/assets/about.jpg';
import Container from '@/shared/Container';
import SectionTitle from './SectionTitle';

const About = () => {
  return (
    <section className='py-12'>
      <Container>
        <SectionTitle h3Text='About' h2Text='Discover Our Mission' />
        <div className='grid grid-cols-1 justify-center gap-8 lg:grid-cols-2'>
          <div className='relative hidden w-max justify-self-center px-6 before:absolute before:-right-10 before:-top-10 before:z-0 before:h-40 before:w-40 before:bg-primary-2/40 after:absolute after:-bottom-10 after:-left-10 after:z-0 after:h-40 after:w-40 after:bg-primary-1/40 md:flex'>
            <Image
              className='relative z-10'
              src={about}
              width={495}
              height={350}
              alt='about us'
            />
          </div>
          <div className='self-center'>
            <p className=' mb-6 text-gray-4'>
              we&apos;re driven by a shared passion for web development and
              community collaboration. Our mission is to connect like-minded
              individuals from around the world, providing them with a platform
              to explore, contribute to, and shape the future of web
              development. We believe in the power of collective creativity, and
              our goal is to make it easy for you to find, engage with, and make
              a difference in web development missions that matter most to you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
