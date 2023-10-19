import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import type { TOption } from '@/types';
import { getStaticFilterOptions } from '@/utils/getStaticFilterOptions';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  variant: 'attack' | 'health' | 'manaCost';
};

export const StaticFilter: React.FC<Props> = ({ variant }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const currentParam = searchParams.get(variant) || '';
  const [defaultOption, options] = getStaticFilterOptions(variant);
  const [selectedOption, setSelectedOption] = useState<TOption>(() => {
    const foundOption = options.find((option) => option.slug === currentParam);
    return foundOption || defaultOption;
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newSelectedOption = JSON.parse(value) as TOption;

    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set(variant, newSelectedOption.slug);

    router.push(`?${currentSearchParams.toString()}`);
    setSelectedOption(newSelectedOption);

    setPage(1);
  };

  return (
    <div className="relative mb-2.5 mr-[30px] w-full text-lightBrown">
      <BaseLayer>
        <TopLayerWithHover hasIcon>
          <Select
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
