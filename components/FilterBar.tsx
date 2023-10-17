'use client';

import { useMetadataContext } from '@/contexts/MetadataContext';

import { CardSet } from './CardSet';
import { FilterDrawer } from './FilterDrawer';
import { Search } from './Search';

type Props = {};

export const FilterBar: React.FC<Props> = () => {
  const metadata = useMetadataContext();

  if (!metadata) return null;

  return (
    <div className="fixed top-0 z-[9] w-full bg-[url(../public/bgFilterMiddleTile.jpeg)] pt-[11px] before:absolute before:top-0 before:h-[60px] before:w-full before:bg-[url(../public/bgFilterTopTile.png)] before:bg-top before:bg-repeat-x before:content-[''] after:absolute after:bottom-[-15px] after:h-[60px] after:w-full after:bg-[url(../public/bgFilterBottomTile.png)] after:bg-top after:bg-repeat-x after:content-['']">
      <div className="relative z-[2] mx-auto flex h-[93px] w-[calc(90%_+_15px)] max-w-[1600px] items-center justify-center py-2.5 md+:w-full md+:p-[0_5rem_0_2.5rem]">
        <CardSet metadata={metadata} />

        <Search />

        <FilterDrawer />
      </div>
    </div>
  );
};
