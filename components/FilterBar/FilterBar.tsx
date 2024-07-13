'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { useCardsContext } from '@/contexts/CardsContext';
import { useMetadataContext } from '@/contexts/MetadataContext';
import { useScreenSize } from '@/hooks/useScreenSize';

import { AttributeFilter } from '../AttributeFilter/AttributeFilter';
import { CardSet } from '../CardSet/CardSet';
import { FilterDrawer } from '../FilterDrawer/FilterDrawer';
import { ManaCost } from '../ManaCost/ManaCost';
import { Search } from '../Search/Search';
import { SwipeableDrawer } from '../SwipeableDrawer/SwipeableDrawer';
import styles from './style.module.scss';

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

  if (!metadata) return null;

  return (
    <div className={styles.root}>
      <div className={styles.filterBar}>
        <CardSet metadata={metadata} />

        {screenSize.width && screenSize.width >= 960 && (
          <AttributeFilter variant="class" hasIcon isDesktopView styles={styles.filter} />
        )}

        {screenSize.width && screenSize.width >= 960 && screenSize.width < 1260 && (
          <AttributeFilter variant="manaCost" hasIcon isDesktopView styles={styles.filter} />
        )}

        {screenSize.width && screenSize.width >= 1260 && <ManaCost />}

        <Search />

        <FilterDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </div>

      {screenSize.width && screenSize.width <= 960 ? (
        <SwipeableDrawer
          isOpen={isOpen}
          cardCount={cardsContext?.cardCount}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        isOpen && (
          <div className={clsx(styles.filters, { [styles.isOpen]: isOpen })}>
            <div className={styles.container}>
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
