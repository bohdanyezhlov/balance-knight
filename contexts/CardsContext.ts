import { createContext, useContext } from 'react';

import type { TCardData } from '@/types';

type TCardContextData = Omit<TCardData, 'page' | 'pageCount'>;

export const CardsContext = createContext<TCardContextData | null>(null);

export const useCardsContext = () => useContext(CardsContext);
