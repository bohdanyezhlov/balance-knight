'use client';

import { useEffect, useState } from 'react';

import { getToken } from '@/api/getToken';
import { TokenContext } from '@/contexts/TokenContext';

type Props = {
  children: React.ReactNode;
};

export const TokenContextProvider: React.FC<Props> = ({ children }) => {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
      setIsToken(true);
    };

    fetchToken();
  }, []);

  return <TokenContext.Provider value={isToken}>{children}</TokenContext.Provider>;
};
