import { useRouter, useSearchParams } from 'next/navigation';

import { PRESERVED_KEYS } from '@/constants';
import ClearAllFilters from '@/public/clearAllFilters.svg';
import { cn } from '@/utils/cn';

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
      className={cn(
        "group relative inline-flex h-[25px] border-none bg-none px-2.5 py-[3px] text-[14px] text-[#233a6e] before:absolute before:inset-0 before:rounded-[15px] before:border before:border-mainBrown before:bg-[#fff0da] before:opacity-50 before:content-[''] hover:text-white hover:before:border-[#233a6e] hover:before:bg-[#233a6e] hover:before:opacity-100",
        {
          'text-gold': isMobile,
        }
      )}
      onClick={handleClearAllParams}
    >
      <div
        className={cn('relative h-[18px] w-[18px] fill-[#233a6e] group-hover:fill-white', {
          'fill-gold': isMobile,
        })}
      >
        <ClearAllFilters />
      </div>

      <span className="relative">Clear All</span>
    </button>
  );
};
