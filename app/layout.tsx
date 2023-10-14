import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';

import { Wrapper } from '@/components/Wrapper';
import { MetadataContextProvider } from '@/providers/MetadataContextProvider';
import { TokenContextProvider } from '@/providers/TokenContextProvider';

const belwe = localFont({
  src: '../public/fonts/Belwe-Bold.woff',
  variable: '--font-belwe',
});
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' });

export const metadata: Metadata = {
  title: 'Hearthstone Card Library',
  description: 'NextJS App',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${openSans.variable} ${belwe.variable}`}>
      <body className="bg-[#f1d4ab] font-sansSerif text-[14px] font-normal leading-normal text-black">
        <TokenContextProvider>
          <MetadataContextProvider>
            <Wrapper>
              <div className="bg-[url(../public/parchment.jpeg)] bg-center">{children}</div>
            </Wrapper>
          </MetadataContextProvider>
        </TokenContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
