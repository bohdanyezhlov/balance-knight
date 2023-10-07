import AllCards from '../public/AllCards.svg';
import DeathKnight from '../public/DeathKnight.svg';
import DemonHunter from '../public/DemonHunter.svg';
import Druid from '../public/Druid.svg';
import Hunter from '../public/Hunter.svg';
import Mage from '../public/Mage.svg';
import Neutral from '../public/Neutral.svg';
import Paladin from '../public/Paladin.svg';
import Priest from '../public/Priest.svg';
import Rogue from '../public/Rogue.svg';
import Shaman from '../public/Shaman.svg';
import Warlock from '../public/Warlock.svg';
import Warrior from '../public/Warrior.svg';
import { normalizeWords } from './normalizeWords';

type SvgMapping = {
  [className: string]: string;
};

const classToSvgMapping: SvgMapping = {
  'Death Knight': DeathKnight,
  'Demon Hunter': DemonHunter,
  Druid,
  Hunter,
  Mage,
  Paladin,
  Priest,
  Rogue,
  Shaman,
  Warlock,
  Warrior,
  Neutral,
  'All Cards': AllCards,
};

export const getSvgForTitle = (name: string) => {
  const className = normalizeWords(name);

  if (className in classToSvgMapping) {
    return classToSvgMapping[className];
  }

  return null;
};
