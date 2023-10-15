import { createContext, useContext } from 'react';

type TPageContext = {
  page: number;
  setPage: (v: number) => void;
};

export const PageContext = createContext<TPageContext | null>(null);

export const usePageContext = () => useContext(PageContext);
