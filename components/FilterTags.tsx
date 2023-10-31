import { useRouter, useSearchParams } from 'next/navigation';

import { useMetadataContext } from '@/contexts/MetadataContext';
import ClearAllFilters from '@/public/clearAllFilters.svg';
import { normalizeActiveFilter } from '@/utils/normalizeActiveFilter';

const preservedKeys = [
  'class',
  'attack',
  'manaCost',
  'health',
  'type',
  'minionType',
  'spellSchool',
  'rarity',
  'keyword',
  'textFilter',
];

type Props = {};

export const FilterTags: React.FC<Props> = () => {
  const metadata = useMetadataContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = Array.from(searchParams).map(([param, value]) => ({ param, value }));

  const activeFilters = params.filter((param) => preservedKeys.includes(param.param));

  const handleClearSingleParam = (param: string) => () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.delete(param);
    router.push(`?${currentSearchParams.toString()}`);
  };

  const handleClearAllParams = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    const newSearchParams = Array.from(currentSearchParams).reduce((acc, [key]) => {
      if (preservedKeys.includes(key)) {
        acc.delete(key);
      }

      return acc;
    }, new URLSearchParams());

    router.push(`?${newSearchParams.toString()}`);
  };

  if (!metadata) return null;

  return (
    <>
      {activeFilters.map(({ param, value }) => {
        return (
          <button
            type="button"
            key={value}
            className="group mb-2.5 mr-[5px] inline-flex rounded-[15px] bg-mainBrown px-2.5 py-[3px] text-[14px] text-white hover:bg-[#233a6e]"
            onClick={handleClearSingleParam(param)}
          >
            {normalizeActiveFilter(param, value, metadata)}
            <span className="ml-2.5 inline text-gold group-hover:text-white">✕</span>
          </button>
        );
      })}

      {activeFilters.length > 1 ? (
        <button
          type="button"
          className="group relative inline-flex h-[25px] border-none bg-none px-2.5 py-[3px] text-[14px] text-[#233a6e] before:absolute before:inset-0 before:z-[-1] before:rounded-[15px] before:border before:border-mainBrown before:bg-[#fff0da] before:opacity-50 before:content-[''] hover:text-white hover:before:border-[#233a6e] hover:before:bg-[#233a6e] hover:before:opacity-100 "
          onClick={handleClearAllParams}
        >
          <div className="h-[18px] w-[18px] fill-[#233a6e] group-hover:fill-white">
            <ClearAllFilters />
          </div>

          <span>Clear All</span>
        </button>
      ) : null}
    </>
  );
};
