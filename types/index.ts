import type { FilterableField, NumericFields } from '@/enums';

export type CardList = {
  cardCount: number;
  cards: Card[];
  page: number;
  pageCount: number;
};

export type Card = {
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

export type CardBackCategory = {
  slug: string;
  id: number;
  name: string;
};

export type Class = {
  id: number;
  name: string;
  slug: string;
  alternateHeroCardIds?: number[];
  cardId?: number;
  heroPowerCardId?: number;
};

export type GameMode = {
  slug: string;
  id: number;
  name: string;
};

export type Keyword = {
  id: number;
  slug: string;
  name: string;
  refText: string;
  text: string;
};

export type MinionType = {
  slug: string;
  id: number;
  name: string;
  gameModes?: GameMode[];
};

export type Rarity = {
  slug: string;
  id: number;
  craftingCost: number[];
  dustValue: number[];
  name: string;
};

export type SetGroup = {
  slug: string;
  year?: number;
  svg?: string | null;
  cardSets: string[];
  name: string;
  standard?: boolean;
  yearRange?: string;
};

export type CardSet = {
  id: number;
  name: string;
  slug: string;
  type: string;
  collectibleCount: number;
  collectibleRevealedCount: number;
  nonCollectibleCount: number;
  nonCollectibleRevealedCount: number;
};

export type SpellSchool = {
  slug: string;
  id: number;
  name: string;
};

export type Type = {
  slug: string;
  id: number;
  name: string;
  gameModes: GameMode[];
};

export type Metadata = {
  cardBackCategories: CardBackCategory[];
  classes: Class[];
  filterableFields: FilterableField;
  gameModes: GameMode[];
  keywords: Keyword[];
  minionTypes: MinionType[];
  numericFields: NumericFields;
  rarities: Rarity[];
  setGroups: SetGroup[];
  sets: CardSet[];
  spellSchools: SpellSchool[];
  types: Type[];
};
