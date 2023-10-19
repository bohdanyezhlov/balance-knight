import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

type TPageContext = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const PageContext = createContext<TPageContext | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }

  return context;
};
