import './globals.css';
import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';

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
    <html lang='en'>
      <body className={`${inter.variable} ${bebas.variable}`}>{children}</body>
    </html>
  );
}
