import { useSearchParams } from 'next/navigation';

import { PRESERVED_KEYS } from '@/constants';

export const useActiveFilters = () => {
  const searchParams = useSearchParams();
  const params = Array.from(searchParams).map(([param, value]) => ({ param, value }));
  const activeFilters = params.filter((param) => PRESERVED_KEYS.includes(param.param));

  return activeFilters;
};
