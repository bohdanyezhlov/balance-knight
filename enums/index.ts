export enum FilterableField {
  Collectible = 'collectible',
  CardSetId = 'cardSetId',
  SpellSchoolId = 'spellSchoolId',
  RarityId = 'rarityId',
  CardTypeId = 'cardTypeId',
  ManaCost = 'manaCost',
  Attack = 'attack',
  Health = 'health',
  Armor = 'armor',
}

export enum NumericFields {
  ManaCost = 'manaCost',
  Attack = 'attack',
  Health = 'health',
  Armor = 'armor',
}

export enum CardAttributes {
  Type = 'Type',
  Rarity = 'Rarity',
  Set = 'Set',
  Class = 'Class',
  CostToCraft = 'Cost to Craft',
  DisenchantingYield = 'Disenchanting Yield',
  Artist = 'Artist',
  Collectible = 'Collectible',
}

export enum SortParamsOptions {
  ManaCost = 'manaCost',
  Classes = 'classes',
  Attack = 'attack',
  Health = 'health',
  GroupByClass = 'groupByClass',
}
