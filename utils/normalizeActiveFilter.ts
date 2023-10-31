import type { TMetadata } from '@/types';

export const normalizeActiveFilter = (param: string, value: string, metadata: TMetadata) => {
  switch (param) {
    case 'class': {
      return metadata.classes.filter(({ slug }) => slug === value)[0].name;
    }
    case 'keyword': {
      return metadata.keywords.filter(({ slug }) => slug === value)[0].name;
    }
    case 'spellSchool': {
      return metadata.spellSchools.filter(({ slug }) => slug === value)[0].name;
    }
    case 'type': {
      return metadata.types.filter(({ slug }) => slug === value)[0].name;
    }
    case 'minionType': {
      return metadata.minionTypes.filter(({ slug }) => slug === value)[0].name;
    }
    case 'rarity': {
      return metadata.rarities.filter(({ slug }) => slug === value)[0].name;
    }
    case 'manaCost': {
      return `Mana: ${value}`;
    }
    case 'health': {
      return `Health: ${value}`;
    }
    case 'attack': {
      return `Attack: ${value}`;
    }
    case 'textFilter': {
      return value;
    }
    case 'set': {
      return `"${value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}"`;
    }
    default:
      throw new Error(`Unexpected param: ${param} or value: ${value}}`);
  }
};
