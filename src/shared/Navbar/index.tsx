'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Twirl as Hamburger } from 'hamburger-react';
import { ROUTES } from '@/utils/routes';

type Route = {
  name: string;
  path: string;
};

const routes: Route[] = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Missions', path: ROUTES.MISSIONS },
];

const AuthLinks = () => {
  return (
    <div className='flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-3 md:space-y-0'>
      <Link href={ROUTES.REGISTER}>
        <button className='w-full rounded-lg border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 hover:bg-primary-1/90 hover:shadow-md hover:shadow-primary-1 md:w-auto'>
          Register
        </button>
      </Link>
    </div>
  );
};

const NavBar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className='relative'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <Link href={ROUTES.HOME}>
          <h2 className='font-main text-4xl font-bold text-dark-1'>
            dev x mission
          </h2>
        </Link>
        <div className='md:hidden'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div
          className={`absolute left-0 top-full z-20 w-full overflow-hidden  transition-all duration-300 ease-in-out md:static md:w-auto ${
            isOpen ? 'max-h-96 bg-light-1' : 'max-h-0 md:max-h-full'
          } md:flex md:w-auto`}
        >
          <ul className='mt-4 flex flex-col p-4 font-medium md:flex-row md:space-x-8 md:p-0 '>
            {routes.map((route: Route) => (
              <li key={route.name}>
                <Link
                  onClick={() => setOpen(false)}
                  href={route.path}
                  className='block rounded py-2 pl-3 pr-4 font-medium text-dark-1 hover:underline md:p-0 md:hover:bg-transparent'
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='p-4 md:hidden'>
            <AuthLinks />
          </div>
        </div>
        <div className='hidden md:flex'>
          <AuthLinks />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
