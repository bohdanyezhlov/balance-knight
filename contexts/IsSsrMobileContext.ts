import { createContext, useContext } from 'react';

export const IsSsrMobileContext = createContext(false);

export const useIsSsrMobileContext = () => useContext(IsSsrMobileContext);
