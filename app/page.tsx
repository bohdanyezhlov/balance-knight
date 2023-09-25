'use client';

import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { getAllCards } from '@/api/getAllCards';
import { getToken } from '@/api/getToken';
import { getMetadata } from '@/api/getMetadata';
import { Navbar } from '@/components/Navbar';
import type { Card as CardType, Metadata } from '@/types';
import { CardList } from '@/components/CardList';

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [metadata, setMetadata] = useState<Metadata>();
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
      const metadata = await getMetadata();
      setMetadata(metadata);
    };

    if (tokenReceived) {
      fetchMetadata();
    }
  }, [tokenReceived]);

  useEffect(() => {
    const fetchCards = async (page: number) => {
      if (page > pageCount) return;

      const { cards: cardsData, pageCount: pageCountData, cardCount } = await getAllCards({ page });

      setCardCount(cardCount);
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
