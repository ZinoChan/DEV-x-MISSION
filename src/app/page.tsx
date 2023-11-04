import Image from 'next/image';
import home_img from '@/assets/home-img.svg';
import styles from './styles.module.css';
import star_1 from '@/assets/star_1.svg';
import star_2 from '@/assets/star_2.svg';
import Link from 'next/link';
import { ROUTES } from '@/utils/routes';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <section className='py-10 md:py-5'>
        <div className='mx-auto max-w-screen-xl px-2'>
          <div className='grid items-center lg:grid-cols-2'>
            <div>
              <h1 className='mb-6 text-5xl text-dark-1 sm:text-7xl md:text-8xl md:tracking-wide'>
                <span
                  className={`${styles.home_title_astric} relative before:absolute before:right-0 before:top-0 before:-translate-y-full before:translate-x-full`}
                >
                  Launch Your
                </span>
                <br /> next coding <br />
                <span className='before: relative  before:absolute before:left-1/2 before:z-[-1] before:inline-block before:h-1/2 before:w-[110%] before:-translate-x-1/2 before:translate-y-1/3 before:rotate-3 before:bg-primary-1'>
                  mission
                </span>
              </h1>
              <p className='mb-10 max-w-lg text-sm text-gray-4 sm:text-base'>
                Pair up with fellow coders, embark on thrilling missions, and
                wrrite legendary stories together. Your mission, should you
                choose to accept it, begins here.
              </p>
              <Link
                href={ROUTES.MISSIONS}
                className='rounded bg-primary-1 px-5 py-2.5 text-center text-sm font-bold text-dark-1 shadow-md shadow-primary-1/50 transition-all hover:bg-primary-1/90 hover:shadow-lg focus:ring focus:ring-lime-400'
              >
                Get Started
              </Link>
            </div>
            <div className='relative hidden justify-end lg:flex '>
              <Image
                src={star_1}
                alt='star_1'
                className='absolute bottom-0 left-0'
              />
              <Image
                src={star_2}
                alt='star_2'
                className='absolute -right-10 top-1/2'
              />
              <Image src={home_img} alt='home-illustration' />
            </div>
          </div>
        </div>
      </section>
      <div className='bg-light-2'>
        <HowItWorks />
        <Features />
      </div>
      <Footer />
    </div>
  );
}
