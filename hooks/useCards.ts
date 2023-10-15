'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCards } from '@/api/getCards';
import { usePageContext } from '@/contexts/PageContext';
import { useTokenContext } from '@/contexts/TokenContext';
import type { TCard } from '@/types';

export const useCards = () => {
  const token = useTokenContext();
  const { page } = usePageContext()!; // REVIEW
  const [cards, setCards] = useState<TCard[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const searchParams = useSearchParams();
  const textFilterParam = searchParams.get('textFilter') || '';
  const cardSetParam = searchParams.get('set') || 'standard';
  const sortParam =
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'; // REVIEW this string repeats many times

  useEffect(() => {
    const fetchCards = async (numPage: number) => {
      if (numPage > pageCount && pageCount !== 0) return;

      const {
        cards: cardsData,
        pageCount: pageCountData,
        cardCount: cardCountData,
      } = await getCards({ page, textFilterParam, cardSetParam, sortParam });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards(page === 1 ? cardsData : (prev) => [...prev, ...cardsData]);
    };

    if (token) {
      fetchCards(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token, textFilterParam, cardSetParam, sortParam]);

  return { cards, cardCount };
};
