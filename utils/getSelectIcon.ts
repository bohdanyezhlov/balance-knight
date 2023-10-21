import Arena from '@/public/iconCardSetArena.svg';
import AshesOfOutland from '@/public/iconCardSetAshesOfOutland.svg';
import BlackrockMountain from '@/public/iconCardSetBlackrockMountain.svg';
import CavernsOfTime from '@/public/iconCardSetCavernsOfTime.svg';
import Classic from '@/public/iconCardSetClassic.svg';
import Core from '@/public/iconCardSetCore.svg';
import DemonHunterInitiate from '@/public/iconCardSetDemonHunterInitiate.svg';
import DescentOfDragons from '@/public/iconCardSetDescentOfDragons.svg';
import Duels from '@/public/iconCardSetDuels.svg';
import FestivalOfLegends from '@/public/iconCardSetFestivalOfLegends.svg';
import ForgedInTheBarrens from '@/public/iconCardSetForgedInTheBarrens.svg';
import FracturedInAlteracValley from '@/public/iconCardSetFracturedInAlteracValley.svg';
import GalakrondsAwakening from '@/public/iconCardSetGalakrondsAwakening.svg';
import GoblinsVsGnomes from '@/public/iconCardSetGoblinsVsGnomes.svg';
import JourneyToUngoro from '@/public/iconCardSetJourneyToUngoro.svg';
import KnightsOfTheFrozenThrone from '@/public/iconCardSetKnightsOfTheFrozenThrone.svg';
import KoboldsAndCatacombs from '@/public/iconCardSetKoboldsAndCatacombs.svg';
import LeagueOfExplorers from '@/public/iconCardSetLeagueOfExplorers.svg';
import Legacy from '@/public/iconCardSetLegacy.svg';
import MadnessAtTheDarkmoonFaire from '@/public/iconCardSetMadnessAtTheDarkmoonFaire.svg';
import MarchOfTheLichKing from '@/public/iconCardSetMarchOfTheLichKing.svg';
import MeanStreetsOfGadgetzan from '@/public/iconCardSetMeanStreetsOfGadgetzan.svg';
import MurderAtCastleNathria from '@/public/iconCardSetMurderAtCastleNathria.svg';
import Naxxramas from '@/public/iconCardSetNaxxramas.svg';
import OneNightInKarazhan from '@/public/iconCardSetOneNightInKarazhan.svg';
import PathOfArthas from '@/public/iconCardSetPathOfArthas.svg';
import RastakhansRumble from '@/public/iconCardSetRastakhansRumble.svg';
import RiseOfShadows from '@/public/iconCardSetRiseOfShadows.svg';
import SaviorsOfUldum from '@/public/iconCardSetSaviorsOfUldum.svg';
import ScholomanceAcademy from '@/public/iconCardSetScholomanceAcademy.svg';
import ShodownInTheBaldands from '@/public/iconCardSetShodowInTheBadlands.svg';
import Standard from '@/public/iconCardSetStandard.svg';
import TheBoomsdayProject from '@/public/iconCardSetTheBoomsdayProject.svg';
import TheGrandTournament from '@/public/iconCardSetTheGrandTournament.svg';
import TheWitchwood from '@/public/iconCardSetTheWitchwood.svg';
import Titans from '@/public/iconCardSetTitans.svg';
import UnitedInStormwind from '@/public/iconCardSetUnitedInStormwind.svg';
import VoyageToTheSunkenCity from '@/public/iconCardSetVoyageToTheSunkenCity.svg';
import WhispersOfTheOldGods from '@/public/iconCardSetWhispersOfTheOldGods.svg';
import Wild from '@/public/iconCardSetWild.svg';

type SvgMapping = {
  [className: string]: string;
};

const variantToSvgMapping: SvgMapping = {
  standard: Standard,
  wild: Wild,
  'classic-cards': Classic,
  duels: Duels,
  arena: Arena,
  'showdown-in-the-badlands': ShodownInTheBaldands,
  'path-of-arthas': PathOfArthas,
  titans: Titans,
  'festival-of-legends': FestivalOfLegends,
  'march-of-the-lich-king': MarchOfTheLichKing,
  'murder-at-castle-nathria': MurderAtCastleNathria,
  'voyage-to-the-sunken-city': VoyageToTheSunkenCity,
  core: Core,
  'caverns-of-time': CavernsOfTime,
  legacy: Legacy,
  'fractured-in-alterac-valley': FracturedInAlteracValley,
  'united-in-stormwind': UnitedInStormwind,
  'forged-in-the-barrens': ForgedInTheBarrens,
  'madness-at-the-darkmoon-faire': MadnessAtTheDarkmoonFaire,
  'scholomance-academy': ScholomanceAcademy,
  'demonhunter-initiate': DemonHunterInitiate,
  'ashes-of-outland': AshesOfOutland,
  'galakronds-awakening': GalakrondsAwakening,
  'descent-of-dragons': DescentOfDragons,
  'saviors-of-uldum': SaviorsOfUldum,
  'rise-of-shadows': RiseOfShadows,
  'rastakhans-rumble': RastakhansRumble,
  'the-boomsday-project': TheBoomsdayProject,
  'the-witchwood': TheWitchwood,
  'kobolds-and-catacombs': KoboldsAndCatacombs,
  'knights-of-the-frozen-throne': KnightsOfTheFrozenThrone,
  'journey-to-ungoro': JourneyToUngoro,
  'mean-streets-of-gadgetzan': MeanStreetsOfGadgetzan,
  'one-night-in-karazhan': OneNightInKarazhan,
  'whispers-of-the-old-gods': WhispersOfTheOldGods,
  'league-of-explorers': LeagueOfExplorers,
  'the-grand-tournament': TheGrandTournament,
  'blackrock-mountain': BlackrockMountain,
  'goblins-vs-gnomes': GoblinsVsGnomes,
  naxxramas: Naxxramas,
};

const variantToUrlMapping: SvgMapping = {
  // static filter icons
  manaCost: 'bg-[url("../public/iconMana.png")]',
  attack: 'bg-[url("../public/iconAttack.png")]',
  health: 'bg-[url("../public/iconHealth.png")]',
  class: 'bg-[url("../public/iconClassAll.png")]',
  // class icons
  demonhunter: 'bg-[url("../public/iconClassDemonHunter.png")]',
  deathknight: 'bg-[url("../public/iconClassDeathKnight.png")]',
  druid: 'bg-[url("../public/iconClassDruid.png")]',
  hunter: 'bg-[url("../public/iconClassHunter.png")]',
  mage: 'bg-[url("../public/iconClassMage.png")]',
  paladin: 'bg-[url("../public/iconClassPaladin.png")]',
  priest: 'bg-[url("../public/iconClassPriest.png")]',
  rogue: 'bg-[url("../public/iconClassRogue.png")]',
  shaman: 'bg-[url("../public/iconClassShaman.png")]',
  warlock: 'bg-[url("../public/iconClassWarlock.png")]',
  warrior: 'bg-[url("../public/iconClassWarrior.png")]',
  neutral: 'bg-[url("../public/iconClassNeutral.png")]',
};

export const getSelectIcon = (variant: string, slug?: string) => {
  if (variant === 'cardSet' && slug) {
    return variantToSvgMapping[slug];
  }

  if (slug && variantToUrlMapping[slug]) {
    return variantToUrlMapping[slug];
  }

  if (variant) {
    return variantToUrlMapping[variant];
  }

  return null;
};
