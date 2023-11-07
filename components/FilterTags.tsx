import { useRouter, useSearchParams } from 'next/navigation';

import { useMetadataContext } from '@/contexts/MetadataContext';
import { useActiveFilters } from '@/hooks/useActiveFilters';
import { normalizeActiveFilter } from '@/utils/normalizeActiveFilter';

import { ClearAll } from './ClearAll';

type Props = {};

export const FilterTags: React.FC<Props> = () => {
  const metadata = useMetadataContext();
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
            className="group mb-2.5 mr-[5px] inline-flex rounded-[15px] bg-mainBrown px-2.5 py-[3px] text-[14px] text-white hover:bg-[#233a6e]"
            onClick={handleClearSingleParam(param)}
          >
            {normalizeActiveFilter(param, value, metadata)}
            <span className="ml-2.5 inline text-gold group-hover:text-white">✕</span>
          </button>
        );
      })}

      {activeFilters.length > 1 ? <ClearAll /> : null}
    </>
  );
};
