import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import type { TMetadata } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type TCardSetOption = {
  slug: string;
  name: string;
};

const getCardSetOptions = (metadata: TMetadata): TCardSetOption[] => {
  const { sets, setGroups, gameModes } = metadata;

  const standardCards = setGroups.find((item) => item.slug === 'standard');
  const wildCards = setGroups.find((item) => item.slug === 'wild');
  const classicCards = sets.filter((card) => card.slug === 'classic-cards')[0];
  const duelsCards = gameModes.find((item) => item.slug === 'duels');
  const arenaCards = gameModes.find((item) => item.slug === 'arena');

  if (!standardCards || !wildCards || !duelsCards || !arenaCards) return [];

  return [standardCards, wildCards, classicCards, duelsCards, arenaCards];
};

const getSortOption = (arr: TCardSetOption[], key: string) => arr.find((c) => c.slug === key);

type Props = {
  metadata: TMetadata;
};

export const CardSet: React.FC<Props> = ({ metadata }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const cardSetOptions = getCardSetOptions(metadata);
  const cardSetParam = searchParams.get('set') || 'standard';

  const [selectedCardSetOption, setSelectedCardSetOption] = useState<TCardSetOption>(
    getSortOption(cardSetOptions, cardSetParam)!
  );

  if (!metadata || !selectedCardSetOption) return null;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedOption = JSON.parse(value) as TCardSetOption;

    if (value) {
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
            options={cardSetOptions}
            selectedOption={selectedCardSetOption}
            handleOptionChange={handleOptionChange}
            variant="cardSet"
          />
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
