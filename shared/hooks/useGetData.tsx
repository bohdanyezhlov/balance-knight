'use client';

import { useEffect } from 'react';

import { getMetadata } from '@/shared/network/getMetadata';
import { getToken } from '@/shared/network/getToken';
import { useStore } from '@/shared/store/store';

export const useGetData = () => {
  const hasToken = useStore((state) => state.hasToken);
  const setHasToken = useStore((state) => state.setHasToken);

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();

      if (hasToken) {
        await getMetadata();
        setHasToken(true);
      }
    };

    fetchToken();
  }, [setHasToken, hasToken]);
};
