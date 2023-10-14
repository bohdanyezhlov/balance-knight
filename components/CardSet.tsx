import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import type { TCardSet } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  setPage: (page: number) => void;
};

export const CardSet: React.FC<Props> = ({ setPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const metadata = useMetadataContext();
  const cardSetParam = searchParams.get('cardSet') || 'standard';
  const [selectedCardSetOption, setSelectedCardSetOption] = useState<TCardSet | string>(
    cardSetParam
  ); // NOTE standard instead of null?

  useEffect(() => {
    if (metadata) {
      setSelectedCardSetOption(metadata.sets[0]);
    }
  }, [metadata]);

  useEffect(() => {
    setSelectedCardSetOption(cardSetParam);
    // console.log(cardSetParam); // FIXME
  }, [cardSetParam]);

  if (!metadata || !selectedCardSetOption) return null;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target;
    const selectedOption = metadata.sets[selectedIndex];

    if (selectedIndex && selectedOption) {
      const currentSearchParams = new URLSearchParams(searchParams);
      currentSearchParams.set('set', selectedOption.slug);

      router.replace(`?${currentSearchParams.toString()}`);
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
