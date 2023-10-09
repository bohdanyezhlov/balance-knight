'use client';

import { useEffect, useState } from 'react';

import { getAllCards } from '@/api/getAllCards';
import { getMetadata } from '@/api/getMetadata';
import { getToken } from '@/api/getToken';
import { CardList } from '@/components/CardList';
import { Navbar } from '@/components/Navbar';
import type { TCard, TMetadata } from '@/types';

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [metadata, setMetadata] = useState<TMetadata>();
  const [tokenReceived, setTokenReceived] = useState(false);
  const [isGroupByClass, setIsGroupByClass] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
      setTokenReceived(true);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await getMetadata();
      setMetadata(response);
    };

    if (tokenReceived) {
      fetchMetadata();
    }
  }, [tokenReceived]);

  useEffect(() => {
    const fetchCards = async (numPage: number) => {
      if (numPage > pageCount) return;

      const {
        cards: cardsData,
        pageCount: pageCountData,
        cardCount: cardCountData,
      } = await getAllCards({ page, isGroupByClass });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards(page === 1 ? cardsData : (prev) => [...prev, ...cardsData]);
    };

    if (tokenReceived) {
      fetchCards(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tokenReceived, isGroupByClass]);

  if (!metadata) return null; // REVIEW

  return (
    <>
      <Navbar
        metadata={metadata}
        cardCount={cardCount}
        isGroupByClass={isGroupByClass}
        setIsGroupByClass={setIsGroupByClass}
        setPage={setPage}
      />
      <CardList
        cards={cards}
        metadata={metadata}
        setPage={setPage}
        page={page}
        isGroupByClass={isGroupByClass}
      />
    </>
  );
};

export default Home;
