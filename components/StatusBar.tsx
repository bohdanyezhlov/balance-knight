'use client';

import { useSearchParams } from 'next/navigation';

import { useCardsContext } from '@/contexts/CardsContext';
import { useMetadataContext } from '@/contexts/MetadataContext';
import { useScreenSize } from '@/hooks/useScreenSize';
import { normalizeActiveFilter } from '@/utils/normalizeActiveFilter';

import { Checkbox } from './Checkbox';
import { FilterTags } from './FilterTags';
import { SortBy } from './SortBy';

type Props = {};

export const StatusBar: React.FC<Props> = () => {
  const screenSize = useScreenSize();
  const cardsContext = useCardsContext();
  const metadata = useMetadataContext();
  const searchParams = useSearchParams();
  const set = searchParams.get('set') || 'standard';

  if (!metadata) return null;

  return (
    <div className="relative z-[2] pt-10">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center px-5 xs:flex-nowrap">
        <div className="flex flex-1 flex-wrap justify-start">
          <div className="mr-2.5 font-bold text-mainBrown">
            {`${cardsContext?.cardCount} cards found for ${normalizeActiveFilter(
              'set',
              set,
              metadata
            )}`}
          </div>

          <FilterTags />
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
