'use client';
import { profileLinks } from '@/data';
import Avatar from '@/shared/Avatar';
import Container from '@/shared/Container';
// import { ROUTES } from '@/utils/routes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  return (
    <main className='py-20'>
      <Container>
        <div className='mb-16 flex items-center justify-center'>
          {status === 'authenticated' && (
            <div className='flex items-center space-x-2'>
              <Avatar
                size='md'
                src={session?.user?.image}
                alt={session.user?.name}
              />
              <div className='text-center'>
                <p className='mb-2 text-lg font-bold text-dark-1'>
                  {session?.user?.name}
                </p>
                {/* <Link
                  href={`${ROUTES.USER_PROFILE}/edit-profile`}
                  className='rounded-full border border-gray-4 px-3 py-1.5 text-sm font-medium capitalize text-gray-4 transition-all hover:bg-gray-4 hover:text-white'
                >
                  edit profile
                </Link> */}
              </div>
            </div>
          )}
        </div>
        <div className='mb-10 flex items-center space-x-4 border-b border-gray-200 py-2'>
          {profileLinks.map((link) => (
            <Link
              className={`${
                pathname === link.route
                  ? 'bg-gray-1 hover:bg-gray-2 hover:text-dark-1'
                  : ''
              } rounded-full px-4 py-2 text-sm font-bold capitalize text-dark-1 hover:text-gray-500`}
              key={link.route}
              href={link.route}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {children}
      </Container>
    </main>
  );
}
