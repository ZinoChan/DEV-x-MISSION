'use client';

import { ROUTES } from '@/utils/routes';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Avatar } from '../Avatar';
import useClickOutside from '../../hooks/useClickOutside';

export function AuthButton() {
  const { data: session, status } = useSession();
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeDropDown = () => {
    setDropDownOpen(false);
  };

  useClickOutside(dropdownRef, closeDropDown);

  if (status === 'loading') {
    return <>loading...</>;
  }

  if (status === 'authenticated') {
    return (
      <div
        onClick={() => setDropDownOpen(!isDropDownOpen)}
        ref={dropdownRef}
        data-testid='profile-dropdown'
        className='relative hidden cursor-pointer md:block'
      >
        <div className='flex items-center space-x-2'>
          <Avatar
            size='sm'
            src={session.user?.image}
            alt={session.user?.name}
          />
        </div>
        <div
          data-testid='dropdown-menu'
          className={`right-0 top-full z-10 translate-y-2 rounded bg-light-2 transition-all duration-150 ease-linear md:absolute ${
            isDropDownOpen ? 'md:min-h-[104px]' : 'overflow-hidden md:h-0'
          } `}
        >
          <ul className='flex flex-col items-center'>
            <li className='border-b border-gray-1 px-6 py-4 text-sm font-medium text-gray-4 hover:bg-lime-50'>
              <button>
                <Link href={ROUTES.USER_PROFILE}>Dashboard</Link>
              </button>
            </li>
            <li className='w-full px-6 py-4 text-center text-sm font-medium text-gray-4 hover:bg-lime-50'>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <SignInButton />;
}

export function SignOutButton() {
  return (
    <button className=' text-red-500' onClick={() => signOut()}>
      Sign out
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className='w-full rounded-lg border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 hover:bg-primary-1/90 hover:shadow-md hover:shadow-primary-1 md:w-auto'
    >
      Register
    </button>
  );
}
