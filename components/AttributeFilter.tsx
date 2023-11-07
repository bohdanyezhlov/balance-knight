import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import { usePageContext } from '@/contexts/PageContext';
import type { TOption } from '@/types';
import { cn } from '@/utils/cn';
import { getDynamicFilterOptions } from '@/utils/getDynamicFilterOptions';
import { getStaticFilterOptions } from '@/utils/getStaticFilterOptions';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type TVariant =
  | 'class'
  | 'attack'
  | 'health'
  | 'manaCost'
  | 'type'
  | 'minionType'
  | 'spellSchool'
  | 'rarity'
  | 'keyword';
type TStaticVariant = 'attack' | 'health' | 'manaCost';
export type TDynamicVariant = Exclude<TVariant, TStaticVariant>; // REVIEW export

const staticOptions = ['attack', 'health', 'manaCost'];

type Props = {
  variant: TVariant;
  hasIcon?: boolean;
  labelId?: string;
  children?: React.ReactNode;
  excludedIds?: number[];
  isDesktopView?: boolean;
  styles?: string;
};

export const AttributeFilter: React.FC<Props> = ({
  variant,
  hasIcon,
  labelId,
  children,
  excludedIds,
  isDesktopView,
  styles,
}) => {
  const metadata = useMetadataContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const currentParam = searchParams.get(variant) || '';

  const [defaultOption, options] = staticOptions.includes(variant)
    ? getStaticFilterOptions(variant as TStaticVariant)
    : getDynamicFilterOptions(variant as TDynamicVariant, metadata!, excludedIds); // FIXME !

  const [selectedOption, setSelectedOption] = useState<TOption>(defaultOption);

  useEffect(() => {
    const foundOption = options.find((option) => option.slug === currentParam);

    if (currentParam === '' || foundOption) {
      setSelectedOption(foundOption || defaultOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParam]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newSelectedOption = JSON.parse(value) as TOption;
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    if (newSelectedOption.slug === '') {
      currentSearchParams.delete(variant);
    } else {
      currentSearchParams.set(variant, newSelectedOption.slug);
    }

    router.push(`?${currentSearchParams.toString()}`);
    setSelectedOption(newSelectedOption);

    setPage(1);
  };

  return (
    <div
      className={cn(
        'relative mb-2.5 mr-[30px] w-full text-lightBrown',
        {
          'w-auto': isDesktopView,
        },
        styles
      )}
    >
      {children}

      <BaseLayer>
        <TopLayerWithHover hasIcon={hasIcon}>
          <Select
            id={labelId}
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            hasIcon={hasIcon}
            variant={variant}
            isDesktopView={isDesktopView}
          />
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
