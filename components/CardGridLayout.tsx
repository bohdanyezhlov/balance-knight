import { useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import type { TCard, TCardsByClassId } from '@/types';
import { splitCardsByClassId } from '@/utils/splitCardsByClassId';

import { Modal } from './Modal';
import { RenderAllCards } from './RenderAllCards';
import { RenderCardsByGroup } from './RenderCardsByGroup';

type Props = {
  cards: TCard[];
  setPage: (page: number) => void;
  page: number;
  isGroupByClass: boolean;
};

export const CardGridLayout: React.FC<Props> = ({ cards, setPage, page, isGroupByClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalCardId, setModalCardId] = useState(0);
  const metadata = useMetadataContext();

  if (!metadata || !cards) return null;

  const { classes } = metadata;
  const cardsData = isGroupByClass ? splitCardsByClassId(cards) : cards;

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
          cardsLength={cards.length - 1}
        />
      ) : (
        <RenderAllCards
          cards={cardsData as TCard[]}
          page={page}
          setPage={setPage}
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
