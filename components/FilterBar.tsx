'use client';

import { useState } from 'react';

import { useCardsContext } from '@/contexts/CardsContext';
import { useMetadataContext } from '@/contexts/MetadataContext';
import { useScreenSize } from '@/hooks/useScreenSize';
import { cn } from '@/utils/cn';

import { AttributeFilter } from './AttributeFilter';
import { CardSet } from './CardSet';
import { FilterDrawer } from './FilterDrawer';
import { ManaCost } from './ManaCost';
import { Search } from './Search';
import { SwipeableDrawer } from './SwipeableDrawer';

type Props = {};

export const FilterBar: React.FC<Props> = () => {
  const metadata = useMetadataContext();
  const screenSize = useScreenSize();
  const cardsContext = useCardsContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  if (!metadata || !cardsContext?.cardCount) return null;

  const { cardCount } = cardsContext;

  return (
    <div className="fixed top-0 z-[9] w-full bg-[url(../public/bgFilterMiddleTile.jpeg)] pt-[11px] before:absolute before:top-0 before:h-[60px] before:w-full before:bg-[url(../public/bgFilterTopTile.png)] before:bg-top before:bg-repeat-x before:content-[''] after:absolute after:bottom-[-15px] after:h-[60px] after:w-full after:bg-[url(../public/bgFilterBottomTile.png)] after:bg-top after:bg-repeat-x after:content-['']">
      <div className="relative z-[2] mx-auto flex h-[93px] w-[calc(90%_+_15px)] max-w-[1600px] items-center justify-center py-2.5 md+:w-full md+:p-[0_20px_0_10px]">
        <CardSet metadata={metadata} />

        {screenSize.width && screenSize.width >= 960 && (
          <AttributeFilter variant="class" hasIcon isDesktopView styles="mb-0" />
        )}

        {screenSize.width && screenSize.width >= 960 && screenSize.width < 1260 && (
          <AttributeFilter variant="manaCost" hasIcon isDesktopView styles="mb-0" />
        )}

        {screenSize.width && screenSize.width > 1260 && <ManaCost />}

        <Search />

        <FilterDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </div>

      {screenSize.width && screenSize.width <= 960 ? (
        <SwipeableDrawer isOpen={isOpen} cardCount={cardCount} toggleDrawer={toggleDrawer} />
      ) : (
        isOpen && (
          <div
            className={cn('relative h-0 min-h-0 transition-all delay-0 duration-200 ease-out', {
              'h-auto min-h-[80px] border-t border-t-[#701b1a] pb-2.5 pl-2.5 pr-5 pt-[12px] before:absolute before:top-[-2px] before:h-px before:w-full before:bg-[#461310] before:content-[""]':
                isOpen,
            })}
          >
            <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center transition-opacity delay-300 duration-100 ease-[ease]">
              <AttributeFilter variant="attack" hasIcon isDesktopView />

              <AttributeFilter variant="health" hasIcon isDesktopView />

              <AttributeFilter variant="type" excludedIds={[10, 40]} isDesktopView />

              <AttributeFilter
                variant="minionType"
                excludedIds={[1, 2, 3, 4, 6, 7, 8, 9, 10, 88, 93, 94, 95]}
                isDesktopView
              />

              <AttributeFilter variant="spellSchool" isDesktopView />

              <AttributeFilter variant="rarity" isDesktopView />

              <AttributeFilter
                variant="keyword"
                excludedIds={[109, 196, 198, 234, 235, 252, 261]}
                isDesktopView
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};
