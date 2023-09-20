'use client';

import { useCallback, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { getAllCards } from '@/api/getAllCards';
import { getAllClasses } from '@/api/getAllClasses';
import { getToken } from '@/api/getToken';
import { Card } from '@/components/Card';
import { ClassBanner } from '@/components/ClassBanner';
// import { Navbar } from '@/components/Navbar';
import type { Card as CardType, Class } from '@/types';
import { generateGhostCards } from '@/utils/generateGhostCards';
import { getClassNameByClassId } from '@/utils/getClassNameByClassId';

type CardsByClassId = {
  classId: number;
  groupOfCards: CardType[];
};

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [page, setPage] = useState(1);
  const [classes, setClasses] = useState<Class[]>([]);

  const NUM_GHOST_CARDS = 5;
  let globalCardsIndex = -1; // NOTE count global card index for each class array, to be able to detect the last one (it needs for infinity scroll)

  const fetchToken = async () => {
    await getToken();
  };

  const fetchClasses = async () => {
    const classesData = await getAllClasses();
    setClasses(classesData);
  };

  const fetchCards = useCallback(async () => {
    const { cards: cardsData } = await getAllCards(page);
    setCards((prev) => [...prev, ...cardsData]);
  }, [page]);

  useEffectOnce(() => {
    fetchToken();
    fetchClasses();
  });

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // NOTE Split cards into groups based on classId
  const splitCardsByClassId = () => {
    const cardsByClassId: CardsByClassId[] = [];

    cards.forEach((card) => {
      const { classId } = card;
      const existingEntry = cardsByClassId.find((entry) => entry.classId === classId);

      if (!existingEntry) {
        cardsByClassId.push({ classId, groupOfCards: [card] });
      } else {
        existingEntry.groupOfCards.push(card);
      }
    });

    return cardsByClassId;
  };

  const cardsByClassId: CardsByClassId[] = splitCardsByClassId();

  return (
    <>
      {/* <Navbar /> */}

      <div className="mx-auto max-w-[1600px] px-2.5">
        <div className="flex flex-wrap justify-evenly">
          {cardsByClassId.map(({ classId, groupOfCards }) => {
            const className = getClassNameByClassId(classId, classes);

            return (
              <div key={classId}>
                {className && <ClassBanner className={className} />}
                <div className="flex flex-wrap justify-evenly">
                  {groupOfCards.map(({ image, id, slug, name }) => {
                    globalCardsIndex += 1;
                    return (
                      <Card
                        key={id}
                        slug={slug}
                        imgSrc={image}
                        alt={name}
                        isLast={globalCardsIndex === cards.length - 1}
                        newLimit={() => setPage(page + 1)}
                      />
                    );
                  })}

                  {generateGhostCards(NUM_GHOST_CARDS)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
