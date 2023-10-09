import { useState } from 'react';

import type { TCard, TCardsByClassId, TMetadata } from '@/types';
import { splitCardsByClassId } from '@/utils/splitCardsByClassId';

import { Modal } from './Modal';
import { RenderAllCards } from './RenderAllCards';
import { RenderCardsByGroup } from './RenderCardsByGroup';

type Props = {
  cards: TCard[];
  metadata: TMetadata;
  setPage: (page: number) => void;
  page: number;
  isGroupByClass: boolean;
};

export const CardList: React.FC<Props> = ({ cards, metadata, setPage, page, isGroupByClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalCardId, setModalCardId] = useState(0);
  const { classes } = metadata;
  const cardsData = isGroupByClass ? splitCardsByClassId(cards) : cards;

  if (!cardsData.length) return null;

  const showModal = (id: number) => {
    setIsOpen(true);
    setModalCardId(id);
  };

  return (
    <div className="mx-auto max-w-[1600px] overflow-x-hidden px-2.5 pt-10">
      {isGroupByClass ? (
        <RenderCardsByGroup
          cards={cardsData as TCardsByClassId[]}
          page={page}
          setPage={setPage}
          classes={classes}
          showModal={showModal}
        />
      ) : (
        <RenderAllCards
          cards={cardsData as TCard[]}
          page={page}
          setPage={setPage}
          showModal={showModal}
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
