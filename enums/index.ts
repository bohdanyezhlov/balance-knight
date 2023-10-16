export enum EFilterableField {
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

export enum ENumericFields {
  ManaCost = 'manaCost',
  Attack = 'attack',
  Health = 'health',
  Armor = 'armor',
}

export enum ECardPropertiesKeys {
  Type = 'Type',
  MinionTypeId = 'Minion Type',
  SpellSchool = 'Spell School',
  Rarity = 'Rarity',
  Set = 'Set',
  Class = 'Class',
  CostToCraft = 'Cost to Craft',
  DisenchantingYield = 'Disenchanting Yield',
  Artist = 'Artist',
  Collectible = 'Collectible',
}

export enum ECardProperties {
  Type = 'cardTypeId',
  MinionType = 'minionTypeId',
  SpellSchool = 'spellSchoolId',
  Rarity = 'rarityId',
  Set = 'cardSetId',
  Class = 'classId',
  CostToCraft = 'costToCraft',
  DisenchantingYield = 'disenchantingYield',
  Artist = 'artistName',
  Collectible = 'collectible',
}

export enum ESortParamsOptions {
  ManaCost = 'manaCost',
  Class = 'class',
  Attack = 'attack',
  Health = 'health',
  GroupByClass = 'groupByClass',
  DataAdded = 'dataAdded',
  Name = 'name',
}
