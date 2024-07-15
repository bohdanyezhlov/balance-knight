import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import { PRESERVED_KEYS } from '@/constants';
import ClearAllFilters from '@/public/clearAllFilters.svg';

import styles from './style.module.scss';

type Props = {
  isMobile?: boolean;
};

export const ClearAll: React.FC<Props> = ({ isMobile }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearAllParams = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    const newSearchParams = Array.from(currentSearchParams).reduce((acc, [key]) => {
      if (PRESERVED_KEYS.includes(key)) {
        acc.delete(key);
      }

      return acc;
    }, new URLSearchParams());

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <button
      type="button"
      className={clsx(styles.root, { [styles.isMobile]: isMobile })}
      onClick={handleClearAllParams}
    >
      <div className={clsx(styles.icon, { [styles.isMobile]: isMobile })}>
        <ClearAllFilters />
      </div>

      <span className={styles.title}>Clear All</span>
    </button>
  );
};
