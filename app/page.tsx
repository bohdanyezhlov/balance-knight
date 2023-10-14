'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCards } from '@/api/getCards';
import { getToken } from '@/api/getToken';
import { CardGridLayout } from '@/components/CardGridLayout';
import { FilterBar } from '@/components/FilterBar';
import { StatusBar } from '@/components/StatusBar';
import { useTokenContext } from '@/contexts/TokenContext';
import type { TCard } from '@/types';

const Home: React.FC = () => {
  const token = useTokenContext();
  const [cards, setCards] = useState<TCard[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isGroupByClass, setIsGroupByClass] = useState(true);

  const searchParams = useSearchParams();
  const textFilter = searchParams.get('textFilter') || '';
  const cardSet = searchParams.get('set') || 'standard';

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCards = async (numPage: number) => {
      if (numPage > pageCount) return;

      const {
        cards: cardsData,
        pageCount: pageCountData,
        cardCount: cardCountData,
      } = await getCards({ page, isGroupByClass, textFilter, cardSet });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards(page === 1 ? cardsData : (prev) => [...prev, ...cardsData]);
    };

    if (token) {
      fetchCards(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token, isGroupByClass, textFilter, cardSet]);

  return (
    <>
      <FilterBar
        cardCount={cardCount}
        isGroupByClass={isGroupByClass}
        setIsGroupByClass={setIsGroupByClass}
        setPage={setPage}
      />

      <div className="mt-[104px]">
        <StatusBar cardCount={cardCount} />

        <CardGridLayout
          cards={cards}
          setPage={setPage}
          page={page}
          isGroupByClass={isGroupByClass}
        />
      </div>
    </>
  );
};

export default Home;
