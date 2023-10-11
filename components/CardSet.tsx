import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import type { TCardSet } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

export const CardSet = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const metadata = useMetadataContext();
  const [selectedCardSetOption, setSelectedCardSetOption] = useState<TCardSet | null>(null);

  useEffect(() => {
    if (metadata) {
      setSelectedCardSetOption(metadata.sets[0]);
    }
  }, [metadata]);

  if (!metadata || !selectedCardSetOption) return null;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target;
    const selectedOption = metadata.sets[selectedIndex];

    if (selectedIndex && selectedOption) {
      const currentSearchParams = new URLSearchParams(searchParams);
      currentSearchParams.set('set', selectedOption.slug);

      router.replace(`?${currentSearchParams.toString()}`);
      setSelectedCardSetOption(selectedOption);
    }
  };

  return (
    <div className="relative mr-[30px]">
      <BaseLayer as="div">
        <TopLayerWithHover as="div" hasIcon>
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
