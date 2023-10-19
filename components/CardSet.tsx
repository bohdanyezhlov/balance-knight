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

const createSets = (slugs: string[], excludeSlugs: string[]): TCardSetOption[] =>
  slugs
    .filter((slug) => !excludeSlugs.includes(slug))
    .map((slug) => ({
      slug,
      name: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));

const getCardSetOptions = (metadata: TMetadata): TCardSetOption[] => {
  const { sets, setGroups, gameModes } = metadata;

  const standardSet = setGroups.find(({ slug }) => slug === 'standard');
  const wildSet = setGroups.find(({ slug }) => slug === 'wild');
  const classicSet = sets.filter(({ slug }) => slug === 'classic-cards')[0];
  const duelsSet = gameModes.find(({ slug }) => slug === 'duels');
  const arenaSet = gameModes.find(({ slug }) => slug === 'arena');
  const standardSetSlugs = setGroups.find(({ slug }) => slug === 'standard')?.cardSets;
  const wildSetSlugs = setGroups.find(({ slug }) => slug === 'wild')?.cardSets;

  if (!standardSet || !wildSet || !duelsSet || !arenaSet || !standardSetSlugs || !wildSetSlugs) {
    return [];
  }

  const standardSets = createSets(standardSetSlugs, []);
  const wildSets = createSets(wildSetSlugs, standardSetSlugs);

  return [standardSet, wildSet, classicSet, duelsSet, arenaSet, ...standardSets, ...wildSets];
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

  // FIXME !
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
