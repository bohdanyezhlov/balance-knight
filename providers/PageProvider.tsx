'use client';

import { useMemo, useState } from 'react';

import { PageContext } from '@/contexts/PageContext';

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState(1);
  const contextValue = useMemo(() => ({ page, setPage }), [page]);

  return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
};
