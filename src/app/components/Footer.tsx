import Container from '@/shared/Container';
import {
  BiLogoFacebook,
  BiLogoGithub,
  BiLogoDiscordAlt,
  BiLogoDribbble,
} from 'react-icons/bi';
import { RiTwitterXFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <div className='bg-light-1 py-6 text-dark-1'>
      <Container>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm  sm:text-center'>
            © 2023{' '}
            <a href='https://flowbite.com/' className='hover:underline'>
              DEVxMISSION
            </a>
            . All Rights Reserved.
          </span>
          <div className='mt-4 flex space-x-5 sm:mt-0 sm:justify-center'>
            <a href='#' className='text-dark-1 hover:text-primary-2'>
              <BiLogoFacebook />
              <span className='sr-only'>Facebook page</span>
            </a>
            <a href='#' className='text-dark-1 hover:text-primary-2'>
              <BiLogoDiscordAlt />
              <span className='sr-only'>Discord community</span>
            </a>
            <a href='#' className='text-dark-1 hover:text-primary-2'>
              <RiTwitterXFill />
              <span className='sr-only'>Twitter page</span>
            </a>
            <a href='#' className='text-dark-1 hover:text-primary-2'>
              <BiLogoGithub />
              <span className='sr-only'>GitHub account</span>
            </a>
            <a href='#' className='text-dark-1 hover:text-primary-2'>
              <BiLogoDribbble />
              <span className='sr-only'>Dribbble account</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
