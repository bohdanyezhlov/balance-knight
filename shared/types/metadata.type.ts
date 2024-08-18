import type { EFilterableField, ENumericFields } from './metadata.enum';

export type TMetadata = {
  cardBackCategories: TCardBackCategory[];
  classes: TClass[];
  filterableFields: EFilterableField;
  gameModes: TGameMode[];
  keywords: TKeyword[];
  minionTypes: TMinionType[];
  ENumericFields: ENumericFields;
  rarities: TRarity[];
  setGroups: TSetGroup[];
  sets: TCardSet[];
  spellSchools: TSpellSchool[];
  types: TType[];
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
  craftingCost?: number[] | null[];
  dustValue?: number[] | null[];
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
