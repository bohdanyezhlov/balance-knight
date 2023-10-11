'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCards } from '@/api/getCards';
import { getToken } from '@/api/getToken';
import { CardGridLayout } from '@/components/CardGridLayout';
import { FilterBar } from '@/components/FilterBar';
import { StatusBar } from '@/components/StatusBar';
import { MetadataContextProvider } from '@/providers/MetadataContextProvider';
import { TokenContextProvider } from '@/providers/TokenContextProvider';
import type { TCard } from '@/types';

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [tokenReceived, setTokenReceived] = useState(false);
  const [isGroupByClass, setIsGroupByClass] = useState(true);
  const queryClient = new QueryClient();

  const searchParams = useSearchParams();
  const textFilter = searchParams.get('textFilter') || '';
  const set = searchParams.get('set') || 'standard';

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
      setTokenReceived(true);
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
      } = await getCards({ page, isGroupByClass, textFilter, set });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards(page === 1 ? cardsData : (prev) => [...prev, ...cardsData]);
    };

    if (tokenReceived) {
      fetchCards(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tokenReceived, isGroupByClass, textFilter, set]);

  return (
    <TokenContextProvider>
      <MetadataContextProvider>
        <QueryClientProvider client={queryClient}>
          <FilterBar
            cardCount={cardCount}
            isGroupByClass={isGroupByClass}
            setIsGroupByClass={setIsGroupByClass}
            setPage={setPage}
          />

          <div className="mt-[104px]">
            <StatusBar />

            <CardGridLayout
              cards={cards}
              setPage={setPage}
              page={page}
              isGroupByClass={isGroupByClass}
            />
          </div>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </MetadataContextProvider>
    </TokenContextProvider>
  );
};

export default Home;
