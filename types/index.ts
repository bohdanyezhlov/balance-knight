import type { FilterableField, NumericFields } from '@/enums';

export type TCardList = {
  cardCount: number;
  cards: TCard[];
  page: number;
  pageCount: number;
};

export type TCard = {
  artistName: string;
  cardSetId: number;
  cardTypeId: number;
  classId: number;
  collectible: number;
  cropImage: string;
  duels: { relevant: boolean; constructed: boolean };
  flavorText: string;
  id: number;
  image: string;
  imageGold: string;
  keywordIds: number[];
  manaCost: number;
  multiClassIds: number[];
  name: string;
  rarityId: number;
  slug: string;
  spellSchoolId: number;
  text: string;
  ghostCard?: boolean;
};

export type TCardBackCategory = {
  slug: string;
  id: number;
  name: string;
};

export type TClass = {
  id: number | string;
  name: string;
  slug: string;
  alternateHeroCardIds?: number[];
  cardId?: number;
  heroPowerCardId?: number;
};

export type TGameMode = {
  slug: string;
  id: number;
  name: string;
};

export type TKeyword = {
  id: number;
  slug: string;
  name: string;
  refText: string;
  text: string;
};

export type TMinionType = {
  slug: string;
  id: number;
  name: string;
  gameModes?: TGameMode[];
};

export type TRarity = {
  slug: string;
  id: number | string;
  craftingCost?: number[];
  dustValue?: number[];
  name: string;
};

export type TSetGroup = {
  slug: string;
  year?: number;
  svg?: string | null;
  cardSets: string[];
  name: string;
  standard?: boolean;
  yearRange?: string;
};

export type TCardSet = {
  id: number;
  name: string;
  slug: string;
  type: string;
  collectibleCount: number;
  collectibleRevealedCount: number;
  nonCollectibleCount: number;
  nonCollectibleRevealedCount: number;
};

export type TSpellSchool = {
  slug: string;
  id: number;
  name: string;
};

export type TType = {
  slug: string;
  id: number | string;
  name: string;
  gameModes?: TGameMode[];
};

export type TMetadata = {
  cardBackCategories: TCardBackCategory[];
  classes: TClass[];
  filterableFields: FilterableField;
  gameModes: TGameMode[];
  keywords: TKeyword[];
  minionTypes: TMinionType[];
  numericFields: NumericFields;
  rarities: TRarity[];
  setGroups: TSetGroup[];
  sets: TCardSet[];
  spellSchools: TSpellSchool[];
  types: TType[];
};

export type TCardsByClassId = {
  classId: number;
  groupOfCards: TCard[];
};
