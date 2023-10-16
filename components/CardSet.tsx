'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import { usePageContext } from '@/contexts/PageContext';
import type { TCardSet } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {};

export const CardSet: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext()!; // REVIEW
  const metadata = useMetadataContext();
  const cardSetParam = searchParams.get('set') || 'standard';
  const [selectedCardSetOption, setSelectedCardSetOption] = useState<TCardSet | string>(
    cardSetParam
  );

  if (!metadata || !selectedCardSetOption) return null;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target;
    const selectedOption = metadata.sets[selectedIndex];

    if (selectedIndex && selectedOption) {
      const currentSearchParams = new URLSearchParams(searchParams);
      currentSearchParams.set('set', selectedOption.slug);

      router.push(`?${currentSearchParams.toString()}`);
      setSelectedCardSetOption(selectedOption);

      setPage(1);
    }
  };

  return (
    <div className="relative mr-[30px]">
      <BaseLayer>
        <TopLayerWithHover hasIcon>
          <Select
            options={metadata.sets}
            selectedOption={selectedCardSetOption}
            handleOptionChange={handleOptionChange}
            variant="cardSet"
          />
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
