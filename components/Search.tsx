import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import ClearSearchIcon from '@/public/clearSearchIcon.svg';
import SearchIcon from '@/public/searchIcon.svg';

import { BaseLayer } from './BaseLayer';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {};

export const Search: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
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
    <div className="relative mr-[30px] flex-1 md+:flex-initial">
      <div className="mx-auto max-w-[300px]">
        <BaseLayer>
          <TopLayerWithHover imgSet="dark">
            {!textFilter && (
              <label
                htmlFor="textFilter"
                className="absolute right-[-9px] top-[9px] z-[1] h-[24px] w-[24px] cursor-pointer bg-contain fill-[gold]"
              >
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
                className="w-[calc(100%_-_20px)] appearance-none border-none bg-transparent font-serif text-white placeholder:text-[#967464] focus:outline-none"
              />
            </form>
          </TopLayerWithHover>

          {textFilter && (
            <button
              type="button"
              aria-label="Clear Search"
              className="absolute right-[-14px] top-1/2 z-[101] w-[25px] -translate-y-1/2 cursor-pointer fill-[gold]"
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
