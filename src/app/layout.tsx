import NavBar from '@/shared/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import AuthProvider from '@/utils/AuthProvider';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/utils/ReactQuery/QueryProvider';
import ProgressProvider from '@/shared/Progress';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-main',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'DEV x MISSION',
  description: 'Unite Developers, Construct the Future.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <QueryProvider>
          <body className={`bg-light-1 ${inter.variable} ${bebas.variable}`}>
            <NavBar />
            <ProgressProvider>
              <main>{children}</main>
            </ProgressProvider>
            <Toaster />
          </body>
        </QueryProvider>
      </html>
    </AuthProvider>
  );
}
