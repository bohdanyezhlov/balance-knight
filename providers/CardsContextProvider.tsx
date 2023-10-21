'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { getCards } from '@/api/getCards';
import { CardsContext } from '@/contexts/CardsContext';
import { usePageContext } from '@/contexts/PageContext';
import { useTokenContext } from '@/contexts/TokenContext';
import type { TCard } from '@/types';

type Props = {
  children: React.ReactNode;
};

export const CardsContextProvider: React.FC<Props> = ({ children }) => {
  const token = useTokenContext();
  const { page } = usePageContext();
  const [cards, setCards] = useState<TCard[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const searchParams = useSearchParams();
  const classParam = searchParams.get('class') || 'all';
  const typeParam = searchParams.get('type') || '';
  const minionTypeParam = searchParams.get('minionType') || '';
  const spellSchoolParam = searchParams.get('spellSchool') || '';
  const rarityParam = searchParams.get('rarity') || '';
  const keywordParam = searchParams.get('keyword') || '';
  const textFilterParam = searchParams.get('textFilter') || '';
  const manaCostParam = searchParams.get('manaCost') || '';
  const attackParam = searchParams.get('attack') || '';
  const healthParam = searchParams.get('health') || '';
  const cardSetParam = searchParams.get('set') || 'standard';
  const gameModeParam = cardSetParam === 'duels' || cardSetParam === 'arena' ? cardSetParam : '';
  const sortParam =
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'; // REVIEW this string repeats many times

  useEffect(() => {
    const fetchCards = async (numPage = page) => {
      if (numPage > pageCount && pageCount !== 0) return;

      const {
        cards: cardsData,
        pageCount: pageCountData,
        cardCount: cardCountData,
      } = await getCards({
        page,
        classParam,
        textFilterParam,
        cardSetParam,
        sortParam,
        gameModeParam,
        manaCostParam,
        attackParam,
        healthParam,
        spellSchoolParam,
        rarityParam,
        keywordParam,
        typeParam,
        minionTypeParam,
      });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards(page === 1 ? cardsData : (prev) => [...prev, ...cardsData]);
    };

    if (token) {
      fetchCards();
    }
    // NOTE DO NOT add pageCount to dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    token,
    classParam,
    textFilterParam,
    cardSetParam,
    sortParam,
    gameModeParam,
    manaCostParam,
    attackParam,
    healthParam,
    spellSchoolParam,
    rarityParam,
    keywordParam,
    typeParam,
    minionTypeParam,
  ]);

  const contextValue = useMemo(() => ({ cards, cardCount }), [cards, cardCount]);

  return <CardsContext.Provider value={contextValue}>{children}</CardsContext.Provider>;
};
