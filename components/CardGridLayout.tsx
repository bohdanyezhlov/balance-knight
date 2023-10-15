import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import { SortParamsOptions } from '@/enums';
import type { TCard, TCardsByClassId } from '@/types';
import { extractParameterValue } from '@/utils/extractParameterValue';
import { splitCardsByClassId } from '@/utils/splitCardsByClassId';

import { Modal } from './Modal';
import { RenderAllCards } from './RenderAllCards';
import { RenderCardsByGroup } from './RenderCardsByGroup';

type Props = {
  cards: TCard[];
};

export const CardGridLayout: React.FC<Props> = ({ cards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalCardId, setModalCardId] = useState(0);
  const metadata = useMetadataContext();
  const searchParams = useSearchParams();
  const sortParam =
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'; // REVIEW
  const [isGroupByClass, setIsGroupByClass] = useState(
    extractParameterValue(sortParam, SortParamsOptions.GroupByClass)
  );

  useEffect(() => {
    const newSortParam =
      searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc';
    const newIsGroupByClass = extractParameterValue(newSortParam, SortParamsOptions.GroupByClass);

    if (newIsGroupByClass !== isGroupByClass) {
      setIsGroupByClass(newIsGroupByClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
