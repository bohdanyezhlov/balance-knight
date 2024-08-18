import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ClearSearchIcon from '@/public/clearSearchIcon.svg';
import SearchIcon from '@/public/searchIcon.svg';
import { useStore } from '@/shared/store/store';

import { BaseLayer } from '../BaseLayer/BaseLayer';
import { TopLayerWithHover } from '../TopLayerWithHover/TopLayerWithHover';
import styles from './style.module.scss';

type Props = {};

export const Search: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setPage = useStore((state) => state.setPage);
  const textFilterParam = searchParams.get('textFilter') || '';
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    setTextFilter(textFilterParam);
  }, [textFilterParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('textFilter', textFilter);
    router.push(`?${currentSearchParams.toString()}`);

    setPage(1);
  };

  const handleClearSearch = () => {
    setTextFilter('');

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.delete('textFilter');
    router.push(`?${currentSearchParams.toString()}`);

    setPage(1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <BaseLayer>
          <TopLayerWithHover imgSet="dark">
            {!textFilter && (
              <label htmlFor="textFilter" className={styles.label}>
                <SearchIcon />
              </label>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="search"
                name="textFilter"
                id="textFilter"
                onChange={handleInputChange}
                value={textFilter}
                placeholder="Search"
                className={styles.input}
              />
            </form>
          </TopLayerWithHover>

          {textFilter && (
            <button
              type="button"
              aria-label="Clear Search"
              className={styles.clearButton}
              onClick={handleClearSearch}
            >
              <ClearSearchIcon />
            </button>
          )}
        </BaseLayer>
      </div>
    </div>
  );
};
