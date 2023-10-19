import type { TOption } from '@/types';

type Key = 'attack' | 'health' | 'manaCost';

const capitalizeFirstLetter = (key: Key) => {
  switch (key) {
    case 'attack':
      return 'Attack';
    case 'health':
      return 'Health';
    case 'manaCost':
      return 'Mana';
    default:
      throw new Error(`Invalid input: ${key}`);
  }
};

const getOptions = (key: Key): TOption[] => {
  return [
    { slug: '', name: 'Any Cost' },
    { slug: '0', name: `${capitalizeFirstLetter(key)}:0` },
    { slug: '1', name: `${capitalizeFirstLetter(key)}:1` },
    { slug: '2', name: `${capitalizeFirstLetter(key)}:2` },
    { slug: '3', name: `${capitalizeFirstLetter(key)}:3` },
    { slug: '4', name: `${capitalizeFirstLetter(key)}:4` },
    { slug: '5', name: `${capitalizeFirstLetter(key)}:5` },
    { slug: '6', name: `${capitalizeFirstLetter(key)}:6` },
    { slug: '7', name: `${capitalizeFirstLetter(key)}:7` },
    { slug: '8', name: `${capitalizeFirstLetter(key)}:8` },
    { slug: '9', name: `${capitalizeFirstLetter(key)}:9` },
    { slug: '10+', name: `${capitalizeFirstLetter(key)}:10+` },
  ];
};

export const getStaticFilterOptions = (key: Key): [TOption, TOption[]] => {
  return [getOptions(key)[0], getOptions(key)];
};
