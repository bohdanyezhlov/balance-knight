'use client';

import { useEffect, useState } from 'react';

import { getMetadata } from '@/api/getMetadata';
import { MetadataContext } from '@/contexts/MetadataContext';
import { useTokenContext } from '@/contexts/TokenContext';
import type { TMetadata } from '@/types';

type Props = {
  children: React.ReactNode;
};

export const MetadataContextProvider: React.FC<Props> = ({ children }) => {
  const token = useTokenContext();
  const [metadata, setMetadata] = useState<TMetadata | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await getMetadata();
      setMetadata(response);
    };

    if (token) {
      fetchMetadata();
    }
  }, [token]);

  return <MetadataContext.Provider value={metadata}>{children}</MetadataContext.Provider>;
};
