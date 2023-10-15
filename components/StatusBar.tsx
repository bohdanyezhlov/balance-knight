'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCardsContext } from '@/contexts/CardsContext';
import ClearAllFilters from '@/public/clearAllFilters.svg';

const preservedKeys = ['set', 'sort', 'locale'];

type Props = {};

export const StatusBar: React.FC<Props> = () => {
  const { cardCount } = useCardsContext()!; // REVIEW
  const searchParams = useSearchParams();
  const router = useRouter();
  const set = searchParams.get('set') || 'standard';
  const params = Array.from(searchParams).map(([param, value]) => ({ param, value }));

  const activeFilters = params.filter((p) => !preservedKeys.includes(p.param));

  const handleClearSingleParam = (param: string) => () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.delete(param);
    router.replace(`?${currentSearchParams.toString()}`);
  };

  const handleClearAllParams = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    const newSearchParams = Array.from(currentSearchParams).reduce((acc, [key, value]) => {
      if (preservedKeys.includes(key)) {
        acc.set(key, value);
      }

      return acc;
    }, new URLSearchParams());

    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="relative z-[2] py-10">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center px-5 xs:flex-nowrap">
        <div className="flex flex-auto flex-wrap justify-start">
          <div className="mr-2.5 font-bold text-mainBrown">
            {`${cardCount} cards found for ${set}`}
          </div>

          {activeFilters.map(({ param, value }) => {
            return (
              <div
                key={value}
                className="mb-2.5 mr-[5px] inline-flex rounded-[15px] bg-mainBrown px-2.5 py-[3px] text-[14px] text-white"
              >
                {value}
                <button
                  type="button"
                  className="ml-2.5 inline text-gold"
                  onClick={handleClearSingleParam(param)}
                >
                  ✕
                </button>
              </div>
            );
          })}

          {activeFilters.length > 1 ? (
            <button
              type="button"
              className="relative h-[25px] border-none bg-none px-10 py-[3px] text-[14px] text-[#233a6e]"
              onClick={handleClearAllParams}
            >
              <div>
                <ClearAllFilters />
              </div>
              <span>Clear all</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
