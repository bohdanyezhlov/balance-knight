import localFont from 'next/font/local';
import { Open_Sans } from 'next/font/google';
import '@/styles/globals.css';

import type { Metadata } from 'next';

const belwe = localFont({
  src: '../public/fonts/Belwe-Bold.woff',
  variable: '--font-belwe',
});
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' });

export const metadata: Metadata = {
  title: 'Hearthstone',
  description: 'NextJS App',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${belwe.variable}`}>{children}</body>
    </html>
  );
};

export default RootLayout;
