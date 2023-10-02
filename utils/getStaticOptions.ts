const sortOptions = [
  {
    slug: 'manaCost:asc',
    loc: 'card.sort.manaAsc',
    param: 'manaCost:asc,name:asc,classes:asc',
    name: 'Mana: low to high',
  },
  {
    slug: 'manaCost:desc',
    loc: 'card.sort.manaDesc',
    param: 'manaCost:desc,name:asc,classes:asc',
    name: 'Mana: high to low',
  },
  {
    slug: 'name:asc',
    loc: 'card.sort.nameAsc',
    param: 'name:asc,classes:asc',
    name: 'Card Name: A to Z',
  },
  {
    slug: 'name:desc',
    loc: 'card.sort.nameDesc',
    param: 'name:desc,classes:asc',
    name: 'Card Name: Z to A',
  },
  {
    slug: 'attack:asc',
    loc: 'card.sort.attackAsc',
    param: 'attack:asc,name:asc,classes:asc',
    name: 'Attack: low to high',
  },
  {
    slug: 'attack:desc',
    loc: 'card.sort.attackDesc',
    param: 'attack:desc,name:asc,classes:asc',
    name: 'Attack: high to low',
  },
  {
    slug: 'health:asc',
    loc: 'card.sort.healthAsc',
    param: 'health:asc,name:asc,classes:asc',
    name: 'Health: low to high',
  },
  {
    slug: 'health:desc',
    loc: 'card.sort.healthDesc',
    param: 'health:desc,name:asc,classes:asc',
    name: 'Health: high to low',
  },
];

const manaOptions = [
  { value: '', name: 'Any Cost' },
  { value: '0', name: 'Mana:0' },
  { value: '1', name: 'Mana:1' },
  { value: '2', name: 'Mana:2' },
  { value: '3', name: 'Mana:3' },
  { value: '4', name: 'Mana:4' },
  { value: '5', name: 'Mana:5' },
  { value: '6', name: 'Mana:6' },
  { value: '7', name: 'Mana:7' },
  { value: '8', name: 'Mana:8' },
  { value: '9', name: 'Mana:9' },
  { value: '10+', name: 'Mana:10+' },
];

export const getStaticOptions = (name: string) => {
  if (name === 'mana') {
    return [manaOptions[0], manaOptions];
  }
  if (name === 'sort') {
    return [sortOptions[0], sortOptions];
  }

  throw new Error(`Invalid name parameter: ${name}`);
};
