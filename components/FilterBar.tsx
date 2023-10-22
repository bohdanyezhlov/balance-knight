'use client';

import { useMetadataContext } from '@/contexts/MetadataContext';
import { useScreenSize } from '@/hooks/useScreenSize';

import { AttributeFilter } from './AttributeFilter';
import { CardSet } from './CardSet';
import { FilterDrawer } from './FilterDrawer';
import { ManaCost } from './ManaCost';
import { Search } from './Search';

type Props = {};

export const FilterBar: React.FC<Props> = () => {
  const metadata = useMetadataContext();
  const screenSize = useScreenSize();

  if (!metadata) return null;

  return (
    <div className="fixed top-0 z-[9] w-full bg-[url(../public/bgFilterMiddleTile.jpeg)] pt-[11px] before:absolute before:top-0 before:h-[60px] before:w-full before:bg-[url(../public/bgFilterTopTile.png)] before:bg-top before:bg-repeat-x before:content-[''] after:absolute after:bottom-[-15px] after:h-[60px] after:w-full after:bg-[url(../public/bgFilterBottomTile.png)] after:bg-top after:bg-repeat-x after:content-['']">
      <div className="relative z-[2] mx-auto flex h-[93px] w-[calc(90%_+_15px)] max-w-[1600px] items-center justify-center py-2.5 md+:w-full md+:p-[0_20px_0_10px]">
        <CardSet metadata={metadata} />

        {screenSize.width >= 960 && <AttributeFilter variant="class" hasIcon isDesktopView />}

        {screenSize.width >= 960 && screenSize.width < 1260 && (
          <AttributeFilter variant="manaCost" hasIcon isDesktopView />
        )}

        {screenSize.width > 1260 && <ManaCost />}

        <Search />

        <FilterDrawer />
      </div>
    </div>
  );
};
