'use client';

import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

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

  useEffectOnce(() => {
    const fetchToken = async () => {
      await getToken();
      setTokenReceived(true);
    };

    fetchToken();
  });

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
      } = await getAllCards({ page });

      setCardCount(cardCountData);
      setPageCount(pageCountData);
      setCards((prev) => [...prev, ...cardsData]);
    };

    if (tokenReceived) {
      fetchCards(page);
    }
  }, [page, tokenReceived]);

  // useEffect(() => {
  //   const fetchCards = async (manaCost: string) => {
  //     if (page > pageCount) return;
  //     const { cards: cardsData, pageCount: pageCountData } = await getAllCards({ manaCost });
  //     setPageCount(pageCountData);
  //     setCards((prev) => [...prev, ...cardsData]); // setCards(cardsData)
  //   };

  //   if (tokenReceived) {
  //     fetchCards(manaCost);
  //   }
  // }, [manaCost, page]);

  if (!metadata) return null; // FIXME make it better

  return (
    <>
      <Navbar metadata={metadata} cardCount={cardCount} />
      <CardList cards={cards} metadata={metadata} setPage={setPage} page={page} />
    </>
  );
};

export default Home;
