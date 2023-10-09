'use client';

import { ROUTES } from '@/utils/routes';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export function SignInButton() {
  const { data: session, status } = useSession();
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeDropDown = () => {
    setDropDownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target !== event.currentTarget
      ) {
        closeDropDown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  if (status === 'loading') {
    return <>loading...</>;
  }

  if (status === 'authenticated') {
    return (
      <div
        onClick={() => setDropDownOpen(!isDropDownOpen)}
        ref={dropdownRef}
        className='relative cursor-pointer'
      >
        <div className='flex items-center space-x-2'>
          {session.user?.image != null ? (
            <Image
              src={session.user?.image}
              width={32}
              height={32}
              className='rounded-full'
              alt={session.user?.name != null ? session.user?.name : 'user'}
            />
          ) : (
            <div className='h-8 w-8 rounded-full bg-gray-1'></div>
          )}
        </div>
        <div
          className={`absolute right-0 top-full z-10 translate-y-2 rounded bg-light-2 transition-all duration-150 ease-linear ${
            isDropDownOpen ? ' min-h-[104px]' : 'h-0 overflow-hidden'
          } `}
        >
          <ul className='flex flex-col items-center'>
            <li className='border-b border-gray-1 px-6 py-4 text-sm font-medium text-gray-4 hover:bg-lime-50'>
              <button>
                <Link href={ROUTES.USER_DASHBOARD}>Dashboard</Link>
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

  return (
    <button
      onClick={() => signIn()}
      className='w-full rounded-lg border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 hover:bg-primary-1/90 hover:shadow-md hover:shadow-primary-1 md:w-auto'
    >
      Register
    </button>
  );
}

export function SignOutButton() {
  return (
    <button className=' text-red-500' onClick={() => signOut()}>
      Sign out
    </button>
  );
}
