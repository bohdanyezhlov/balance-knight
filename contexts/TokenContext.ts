import { createContext, useContext } from 'react';

export const TokenContext = createContext<boolean | null>(null);

export const useTokenContext = () => useContext(TokenContext);
