import DeathKnight from '../public/DeathKnight.svg';
import DemonHunter from '../public/DemonHunter.svg';
import Druid from '../public/Druid.svg';
import Hunter from '../public/Hunter.svg';
import Mage from '../public/Mage.svg';
import Paladin from '../public/Paladin.svg';
import Priest from '../public/Priest.svg';
import Rogue from '../public/Rogue.svg';
import Shaman from '../public/Shaman.svg';
import Warlock from '../public/Warlock.svg';
import Warrior from '../public/Warrior.svg';
import Neutral from '../public/Neutral.svg';
import { capitalizeWords } from './capitalizeWords';

type SvgMapping = {
  [className: string]: string;
};

const classToSvgMapping: SvgMapping = {
  'Death Knight': DeathKnight,
  'Demon Hunter': DemonHunter,
  Druid: Druid,
  Hunter: Hunter,
  Mage: Mage,
  Paladin: Paladin,
  Priest: Priest,
  Rogue: Rogue,
  Shaman: Shaman,
  Warlock: Warlock,
  Warrior: Warrior,
  Neutral: Neutral,
};

export const getSvgForTitle = (name: string) => {
  const className = capitalizeWords(name);

  if (className in classToSvgMapping) {
    return classToSvgMapping[className];
  } else {
    return null;
  }
};
