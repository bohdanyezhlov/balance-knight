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
      throw new Error(`Invalid key: ${key}`);
  }
};

const getDefaultName = (key: Key) => {
  switch (key) {
    case 'manaCost':
      return 'Cost';
    case 'health':
      return 'Health';
    case 'attack':
      return 'Attack';
    default:
      throw new Error(`Invalid key: ${key}`);
  }
};

const getOptions = (key: Key): TOption[] => [
  { slug: '', id: key, name: `Any ${getDefaultName(key)}` },
  { slug: '0', id: key, name: `${capitalizeFirstLetter(key)}:0` },
  { slug: '1', id: key, name: `${capitalizeFirstLetter(key)}:1` },
  { slug: '2', id: key, name: `${capitalizeFirstLetter(key)}:2` },
  { slug: '3', id: key, name: `${capitalizeFirstLetter(key)}:3` },
  { slug: '4', id: key, name: `${capitalizeFirstLetter(key)}:4` },
  { slug: '5', id: key, name: `${capitalizeFirstLetter(key)}:5` },
  { slug: '6', id: key, name: `${capitalizeFirstLetter(key)}:6` },
  { slug: '7', id: key, name: `${capitalizeFirstLetter(key)}:7` },
  { slug: '8', id: key, name: `${capitalizeFirstLetter(key)}:8` },
  { slug: '9', id: key, name: `${capitalizeFirstLetter(key)}:9` },
  { slug: '10+', id: key, name: `${capitalizeFirstLetter(key)}:10+` },
];

export const getStaticFilterOptions = (key: Key): [TOption, TOption[]] => {
  return [getOptions(key)[0], getOptions(key)];
};
