import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import type { TMetadata, TOption } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

const createSets = (slugs: string[], excludeSlugs: string[]): TOption[] =>
  slugs
    .filter((slug) => !excludeSlugs.includes(slug))
    .map((slug) => ({
      slug,
      id: slug,
      name: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));

const getCardSetOptions = (metadata: TMetadata): TOption[] => {
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

  const standardSetWithId = {
    ...standardSet,
    id: standardSet.slug,
  };
  const wildSetWithId = {
    ...wildSet,
    id: wildSet.slug,
  };

  return [
    standardSetWithId,
    wildSetWithId,
    classicSet,
    duelsSet,
    arenaSet,
    ...standardSets,
    ...wildSets,
  ];
};

const getSortOption = (arr: TOption[], key: string) => arr.find((c) => c.slug === key);

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
  const [selectedCardSetOption, setSelectedCardSetOption] = useState<TOption>(
    getSortOption(cardSetOptions, cardSetParam)!
  );

  useEffect(() => {
    // @ts-ignore FIXME
    setSelectedCardSetOption(getSortOption(cardSetOptions, cardSetParam));
  }, [cardSetParam]);

  if (!metadata || !selectedCardSetOption) return null;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedOption = JSON.parse(value) as TOption;

    if (value) {
      const currentSearchParams = new URLSearchParams(searchParams.toString());
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
            hasIcon
            variant="cardSet"
          />
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
