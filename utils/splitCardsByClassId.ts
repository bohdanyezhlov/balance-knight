import type { TCard } from '@/types';

type CardsByClassId = {
  classId: number;
  groupOfCards: TCard[];
};

export const splitCardsByClassId = (cards: TCard[]) => {
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
