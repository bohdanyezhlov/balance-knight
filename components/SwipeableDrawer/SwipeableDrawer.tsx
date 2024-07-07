import SwipeableDrawerMUI from '@mui/material/SwipeableDrawer';

import { useActiveFilters } from '@/hooks/useActiveFilters';
import { useScreenSize } from '@/hooks/useScreenSize';

import { AttributeFilter } from '../AttributeFilter/AttributeFilter';
import { Checkbox } from '../Checkbox/Checkbox';
import { ClearAll } from '../ClearAll/ClearAll';
import { SortBy } from '../SortBy/SortBy';
import styles from './style.module.scss';

type Props = {
  cardCount?: number;
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const SwipeableDrawer: React.FC<Props> = ({ cardCount, isOpen, toggleDrawer }) => {
  const screenSize = useScreenSize();
  const activeFilters = useActiveFilters();

  return (
    <SwipeableDrawerMUI
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.buttonWrapper}>
              <button type="button" className={styles.closeButton} onClick={toggleDrawer(false)}>
                <span className={styles.closeIcon}>✕</span>
                Close
              </button>
            </div>
            <div className={styles.cardCount}>{cardCount} cards found</div>
            {screenSize.width && screenSize.width < 960 && activeFilters.length > 1 && (
              <ClearAll isMobile />
            )}
          </div>

          <div className={styles.controls}>
            <div className={styles.checkboxWrapper}>
              <Checkbox />
            </div>

            <label htmlFor="CardSortControl" className={styles.label}>
              Sort By:
            </label>
            <SortBy id="CardSortControl" />
          </div>

          <AttributeFilter variant="class" hasIcon labelId="ClassControl">
            <label htmlFor="ClassControl" className={styles.label}>
              Filters:
            </label>
          </AttributeFilter>

          <AttributeFilter variant="manaCost" hasIcon />

          <AttributeFilter variant="attack" hasIcon />

          <AttributeFilter variant="health" hasIcon />

          <AttributeFilter variant="type" excludedIds={[10, 40]} />

          <AttributeFilter
            variant="minionType"
            excludedIds={[1, 2, 3, 4, 6, 7, 8, 9, 10, 88, 93, 94, 95]}
          />

          <AttributeFilter variant="spellSchool" />

          <AttributeFilter variant="rarity" />

          <AttributeFilter variant="keyword" excludedIds={[109, 196, 198, 234, 235, 252, 261]} />
        </div>
      </div>
    </SwipeableDrawerMUI>
  );
};
