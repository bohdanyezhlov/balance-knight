import type { AppProps } from 'next/app';

import { IsSsrMobileContext } from '@/contexts/IsSsrMobileContext';

const App = ({ Component, pageProps }: AppProps<{ isSsrMobile: boolean }>) => {
  return (
    <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
      <Component {...pageProps} />
    </IsSsrMobileContext.Provider>
  );
};

export default App;
