import type { EFilterableField, ENumericFields } from '@/enums';

export type TCardData = {
  cardCount: number;
  cards: TCard[];
  page: number;
  pageCount: number;
};

export type TCard = {
  artistName: string;
  attack: number;
  cardSetId: number;
  childIds: number[];
  cardTypeId: number;
  classId: number;
  collectible: number;
  cropImage: string;
  flavorText: string;
  health: number;
  id: number;
  image: string;
  imageGold: string;
  keywordIds?: number[];
  manaCost: number;
  minionTypeId: number;
  multiClassIds: number[];
  multiTypeIds: number[];
  name: string;
  rarityId: number;
  runeCost?: {
    blood: number;
    frost: number;
    unholy: number;
  };
  slug: string;
  spellSchoolId: number;
  text: string;
  ghostCard?: boolean;
};

export type TCardsByClassId = {
  classId: number;
  groupOfCards: TCard[];
};

export type TOption = {
  slug: string;
  name: string;
  param?: string;
  id: number | string;
};
