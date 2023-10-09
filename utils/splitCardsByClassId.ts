import type { TCard, TCardsByClassId } from '@/types';

export const splitCardsByClassId = (cards: TCard[]) => {
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
