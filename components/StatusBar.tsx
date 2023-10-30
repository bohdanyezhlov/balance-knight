'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCardsContext } from '@/contexts/CardsContext';
import { useMetadataContext } from '@/contexts/MetadataContext';
import { useScreenSize } from '@/hooks/useScreenSize';
import ClearAllFilters from '@/public/clearAllFilters.svg';
import type { TMetadata } from '@/types';

import { Checkbox } from './Checkbox';
import { SortBy } from './SortBy';

const normalizeActiveFilter = (param: string, value: string, metadata: TMetadata) => {
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

const preservedKeys = [
  'class',
  'attack',
  'manaCost',
  'health',
  'type',
  'minionType',
  'spellSchool',
  'rarity',
  'keyword',
  'textFilter',
];

type Props = {};

export const StatusBar: React.FC<Props> = () => {
  const cardsContext = useCardsContext();
  const metadata = useMetadataContext();
  const screenSize = useScreenSize();
  const searchParams = useSearchParams();
  const router = useRouter();
  const set = searchParams.get('set') || 'standard';
  const params = Array.from(searchParams).map(([param, value]) => ({ param, value }));

  const activeFilters = params.filter((param) => preservedKeys.includes(param.param));

  const handleClearSingleParam = (param: string) => () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.delete(param);
    router.push(`?${currentSearchParams.toString()}`);
  };

  const handleClearAllParams = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    const newSearchParams = Array.from(currentSearchParams).reduce((acc, [key]) => {
      if (preservedKeys.includes(key)) {
        acc.delete(key);
      }

      return acc;
    }, new URLSearchParams());

    router.push(`?${newSearchParams.toString()}`);
  };

  if (!metadata) return null;

  return (
    <div className="relative z-[2] pt-10">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center px-5 xs:flex-nowrap">
        <div className="flex flex-1 flex-wrap justify-start">
          <div className="mr-2.5 font-bold text-mainBrown">{`${cardsContext?.cardCount} cards found for ${normalizeActiveFilter(
            'set',
            set,
            metadata
          )}`}</div>

          {activeFilters.map(({ param, value }) => {
            return (
              <div
                key={value}
                className="mb-2.5 mr-[5px] inline-flex rounded-[15px] bg-mainBrown px-2.5 py-[3px] text-[14px] text-white"
              >
                {normalizeActiveFilter(param, value, metadata)}
                <button
                  type="button"
                  className="ml-2.5 inline text-gold"
                  onClick={handleClearSingleParam(param)}
                >
                  ✕
                </button>
              </div>
            );
          })}

          {activeFilters.length > 1 ? (
            <button
              type="button"
              className="relative inline-flex h-[25px] border-none bg-none px-2.5 py-[3px] text-[14px] text-[#233a6e] before:absolute before:inset-0 before:z-[-1] before:rounded-[15px] before:border before:border-mainBrown before:bg-[#fff0da] before:opacity-50 before:content-[''] "
              onClick={handleClearAllParams}
            >
              <div className="h-[18px] w-[18px] fill-[#233a6e]">
                <ClearAllFilters />
              </div>

              <span>Clear All</span>
            </button>
          ) : null}
        </div>

        {screenSize.width && screenSize.width > 960 && (
          <div className="mr-10 flex min-w-[200px] items-center">
            <div className="mr-2.5 text-mainBrown">Sort by:</div>

            <div className="mx-[25px]">
              <SortBy baseLayer={false} />
            </div>
          </div>
        )}

        {screenSize.width && screenSize.width > 960 && (
          <div className="mr-[30px]">
            <Checkbox labelStyle="text-mainBrown" />
          </div>
        )}
      </div>
    </div>
  );
};
