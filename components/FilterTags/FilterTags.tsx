import { useRouter, useSearchParams } from 'next/navigation';

import { useActiveFilters } from '@/shared/hooks/useActiveFilters';
import { useStore } from '@/shared/store/store';
import { normalizeActiveFilter } from '@/utils/normalizeActiveFilter';

import { ClearAll } from '../ClearAll/ClearAll';
import styles from './style.module.scss';

type Props = {};

export const FilterTags: React.FC<Props> = () => {
  const metadata = useStore((state) => state.metadata);
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilters = useActiveFilters();

  const handleClearSingleParam = (param: string) => () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.delete(param);
    router.push(`?${currentSearchParams.toString()}`);
  };

  if (!metadata) return null;

  return (
    <>
      {activeFilters.map(({ param, value }) => {
        return (
          <button
            type="button"
            key={param}
            className={styles.root}
            onClick={handleClearSingleParam(param)}
          >
            {normalizeActiveFilter(param, value, metadata)}
            <span className={styles.clear}>✕</span>
          </button>
        );
      })}

      {activeFilters.length > 1 ? <ClearAll /> : null}
    </>
  );
};
