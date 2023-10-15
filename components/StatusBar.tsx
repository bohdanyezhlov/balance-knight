'use client';

import { useSearchParams } from 'next/navigation';

import { useCards } from '@/hooks/useCards';
import ClearAllFilters from '@/public/clearAllFilters.svg';

type Props = {};

export const StatusBar: React.FC<Props> = () => {
  const { cardCount } = useCards();
  const searchParams = useSearchParams();
  // const textFilter = searchParams.get('textFilter') || '';
  const set = searchParams.get('set') || 'standard';
  const queries = Array.from(searchParams).map(([key, value]) => ({ key, value }));

  const activeFilters = [...queries];

  const handleClearSingleParam = (v: string) => () => console.log(v);

  return (
    <div className="relative z-[2] py-10">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center px-5 xs:flex-nowrap">
        <div className="flex flex-auto flex-wrap justify-start">
          <div className="mr-2.5 font-bold text-mainBrown">
            {`${cardCount} cards found for ${set}`}
          </div>

          {activeFilters.map(({ key, value }) => {
            if (key === 'set' || key === 'sort') return null;

            return (
              <div
                key={value}
                className="mb-2.5 mr-[5px] inline-flex rounded-[15px] bg-mainBrown px-2.5 py-[3px] text-[14px] text-white"
              >
                {value}
                <button
                  type="button"
                  className="ml-2.5 inline text-gold"
                  onClick={handleClearSingleParam(key)}
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
              // onClick={}
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
