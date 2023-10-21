import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import type { TOption } from '@/types';

import { BaseLayer } from './BaseLayer';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

const sortOptions = [
  {
    id: 'manaCost:asc',
    slug: 'manaCost:asc',
    param: 'manaCost:asc,name:asc,classes:asc',
    name: 'Mana: low to high',
  },
  {
    id: 'manaCost:desc',
    slug: 'manaCost:desc',
    param: 'manaCost:desc,name:asc,classes:asc',
    name: 'Mana: high to low',
  },
  {
    id: 'name:asc',
    slug: 'name:asc',
    param: 'name:asc,classes:asc',
    name: 'Card Name: A to Z',
  },
  {
    id: 'name:desc',
    slug: 'name:desc',
    param: 'name:desc,classes:asc',
    name: 'Card Name: Z to A',
  },
  {
    id: 'attack:asc',
    slug: 'attack:asc',
    param: 'attack:asc,name:asc,classes:asc',
    name: 'Attack: low to high',
  },
  {
    id: 'attack:desc',
    slug: 'attack:desc',
    param: 'attack:desc,name:asc,classes:asc',
    name: 'Attack: high to low',
  },
  {
    id: 'health:asc',
    slug: 'health:asc',
    param: 'health:asc,name:asc,classes:asc',
    name: 'Health: low to high',
  },
  {
    id: 'health:desc',
    slug: 'health:desc',
    param: 'health:desc,name:asc,classes:asc',
    name: 'Health: high to low',
  },
];
const defaultOption = sortOptions[0];

type Props = {};

export const SortBy: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const isGroupByClass = (
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'
  )?.includes('groupByClass');
  const sortParam = searchParams.get('sort')?.replace(/,groupByClass:asc/g, '') || '';
  const [selectedOption, setSelectedOption] = useState<TOption>(defaultOption);

  useEffect(() => {
    const foundOption = sortOptions.find((option) => option.slug === sortParam);

    if (foundOption || sortParam === 'manaCost:asc,name:asc,classes:asc,groupByClass:asc') {
      setSelectedOption(foundOption || defaultOption);
    }
  }, [sortParam]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newSelectedOption = JSON.parse(value) as TOption;

    if (newSelectedOption.param) {
      if (isGroupByClass) {
        newSelectedOption.param = `${newSelectedOption.param},groupByClass:asc`;
      }

      const currentSearchParams = new URLSearchParams(searchParams.toString());
      currentSearchParams.set('sort', newSelectedOption.param);

      router.push(`?${currentSearchParams.toString()}`);
      setSelectedOption(newSelectedOption);

      setPage(1);
    }
  };

  return (
    <>
      <label htmlFor="CardSortControl" className="mb-2.5 block pl-[15px]">
        Sort By:
      </label>

      <div>
        <BaseLayer>
          <TopLayerWithHover>
            <Select
              id="CardSortControl"
              options={sortOptions}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            />
          </TopLayerWithHover>
        </BaseLayer>
      </div>
    </>
  );
};
