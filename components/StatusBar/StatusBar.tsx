'use client';

import { useSearchParams } from 'next/navigation';

import { useCardsContext } from '@/contexts/CardsContext';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { useStore } from '@/shared/store/store';
import { normalizeActiveFilter } from '@/utils/normalizeActiveFilter';

import { Checkbox } from '../Checkbox/Checkbox';
import { FilterTags } from '../FilterTags/FilterTags';
import { SortBy } from '../SortBy/SortBy';
import styles from './style.module.scss';

type Props = {};

export const StatusBar: React.FC<Props> = () => {
  const screenSize = useScreenSize();
  const cardsContext = useCardsContext();
  const metadata = useStore((state) => state.metadata);
  const searchParams = useSearchParams();
  const set = searchParams.get('set') || 'standard';

  if (!metadata) return null;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.cardCount}>
            {`${cardsContext?.cardCount} cards found for ${normalizeActiveFilter(
              'set',
              set,
              metadata
            )}`}
          </div>

          <FilterTags />
        </div>

        {screenSize.width && screenSize.width > 960 && (
          <div className={styles.wrapper}>
            <div className={styles.sortTitle}>Sort by:</div>

            <div className={styles.sortWrapper}>
              <SortBy baseLayer={false} />
            </div>
          </div>
        )}

        {screenSize.width && screenSize.width > 960 && (
          <div className={styles.checkboxWrapper}>
            <Checkbox labelStyle={styles.checkbox} />
          </div>
        )}
      </div>
    </div>
  );
};
