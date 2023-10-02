import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';

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
      <body className={`${openSans.variable} ${belwe.variable} text-[14px] leading-normal`}>
        <div className="bg-[#f1d4ab] bg-[url(../public/parchment.jpeg)] bg-center">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
