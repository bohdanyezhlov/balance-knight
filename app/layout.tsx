import '@/styles/globals.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import { Wrapper } from '@/components/Wrapper/Wrapper';
import { CardsProvider, MetadataProvider, PageProvider, TokenProvider } from '@/providers';

const belwe = localFont({
  src: '../public/fonts/Belwe-Bold.woff',
  variable: '--font-belwe',
});

const openSans = localFont({
  src: [
    {
      path: '../public/fonts/open-sans-400.woff',
      weight: '400',
    },
    {
      path: '../public/fonts/open-sans-600.woff',
      weight: '600',
    },
  ],
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Hearthstone Card Library',
  description: 'Explore the latest cards and discover your next big idea!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${openSans.variable} ${belwe.variable} `}>
      <body>
        <Suspense>
          <TokenProvider>
            <MetadataProvider>
              <PageProvider>
                <CardsProvider>
                  <Wrapper>{children}</Wrapper>
                </CardsProvider>
              </PageProvider>
            </MetadataProvider>
          </TokenProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
