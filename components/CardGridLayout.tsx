'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCardsContext } from '@/contexts/CardsContext';
import { useMetadataContext } from '@/contexts/MetadataContext';
import { ESortParamsOptions } from '@/enums';
import type { TCard, TCardsByClassId } from '@/types';
import { extractParameterValue } from '@/utils/extractParameterValue';

import { EmptyCardGrid } from './EmptyCardGrid';
import { Modal } from './Modal';
import { RenderAllCards } from './RenderAllCards';
import { RenderCardsByGroup } from './RenderCardsByGroup';

const splitCardsByClassId = (cards: TCard[]) => {
  const cardsByClassId: TCardsByClassId[] = [];

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

type Props = {};

export const CardGridLayout: React.FC<Props> = () => {
  const cardsContext = useCardsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [modalCardId, setModalCardId] = useState(0);
  const metadata = useMetadataContext();
  const searchParams = useSearchParams();
  const sortParam =
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'; // REVIEW
  const [isGroupByClass, setIsGroupByClass] = useState(
    extractParameterValue(sortParam, ESortParamsOptions.GroupByClass)
  );

  useEffect(() => {
    const newSortParam =
      searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc';
    const newIsGroupByClass = extractParameterValue(newSortParam, ESortParamsOptions.GroupByClass);

    if (newIsGroupByClass !== isGroupByClass) {
      setIsGroupByClass(newIsGroupByClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!metadata || !cardsContext) return null;

  const { cards } = cardsContext;
  const { classes } = metadata;
  const cardsData = isGroupByClass ? splitCardsByClassId(cards) : cards;

  const showModal = (id: number) => {
    setIsOpen(true);
    setModalCardId(id);
  };

  if (cards.length === 0) {
    return <EmptyCardGrid />;
  }

  return (
    <div className="mx-auto max-w-[1600px] overflow-x-hidden px-2.5 pt-10">
      {isGroupByClass ? (
        <RenderCardsByGroup
          cards={cardsData as TCardsByClassId[]}
          classes={classes}
          showModal={showModal}
          cardsLength={cards.length - 1}
        />
      ) : (
        <RenderAllCards
          cards={cardsData as TCard[]}
          showModal={showModal}
          cardsLength={cards.length - 1}
        />
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={modalCardId}
        cards={cards}
        metadata={metadata}
      />
    </div>
  );
};
