'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Twirl as Hamburger } from 'hamburger-react';
import { ROUTES } from '@/utils/routes';
import { AuthButton, SignInButton, SignOutButton } from '../Button/AuthBtns';
import { useSession } from 'next-auth/react';

type Route = {
  name: string;
  path: string;
};

const routes: Route[] = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Missions', path: ROUTES.MISSIONS },
];

const NavBar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <nav className='relative'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <Link href={ROUTES.HOME}>
          <div className='flex items-start'>
            <h2 className='text-4xl font-bold text-dark-1'>dev</h2>
            <span className='text-2xl font-bold'>x</span>
            <h2 className='text-4xl font-bold text-dark-1'>mission</h2>
          </div>
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
            {status === 'authenticated' ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  href={ROUTES.USER_PROFILE}
                  className='block rounded py-2 pl-3 pr-4 font-medium text-dark-1 hover:underline md:hidden md:p-0 md:hover:bg-transparent'
                >
                  Dashboard
                </Link>
                <li
                  className='block rounded py-2 pl-3 pr-4 font-medium text-dark-1 hover:underline md:hidden md:p-0 md:hover:bg-transparent'
                  onClick={() => setOpen(false)}
                >
                  <SignOutButton />
                </li>
              </>
            ) : (
              <li
                className='block rounded py-2 pl-3 pr-4 font-medium text-dark-1 hover:underline md:hidden md:p-0 md:hover:bg-transparent'
                onClick={() => setOpen(false)}
              >
                <SignInButton />
              </li>
            )}
          </ul>
        </div>
        <div className='hidden md:flex'>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
