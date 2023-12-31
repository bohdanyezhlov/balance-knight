import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import { ESortParamsOptions } from '@/enums';
import { cn } from '@/utils/cn';
import { extractParameterValue } from '@/utils/extractParameterValue';

import CheckIcon from '../public/checkIcon.png';

const updateSortParam = (sortParam: string, criteriaName: string, isAscending: boolean) => {
  const sortParamsObject: Record<string, string> = sortParam
    .split(',')
    .reduce((acc: Record<string, string>, criteria) => {
      const [key, value] = criteria.split(':');

      if (key && value) {
        acc[key] = value;
      }

      return acc;
    }, {});

  if (isAscending) {
    sortParamsObject[criteriaName] = 'asc';
  } else {
    delete sortParamsObject[criteriaName];
  }

  const updatedCriteria = Object.keys(sortParamsObject).map(
    (key) => `${key}:${sortParamsObject[key]}`
  );

  return updatedCriteria.join(',');
};

type Props = {
  labelStyle?: string;
};

export const Checkbox: React.FC<Props> = ({ labelStyle }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const sortParam =
    searchParams.get('sort') || 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'; // REVIEW
  const [isGroupByClass, setIsGroupByClass] = useState(
    extractParameterValue(sortParam, ESortParamsOptions.GroupByClass)
  );

  useEffect(() => {
    setIsGroupByClass(extractParameterValue(sortParam, ESortParamsOptions.GroupByClass));
  }, [sortParam]);

  const handleChange = () => {
    const updatedGroupByClass = !isGroupByClass;
    setIsGroupByClass(updatedGroupByClass);

    const updatedSortParams = updateSortParam(
      sortParam,
      ESortParamsOptions.GroupByClass,
      updatedGroupByClass
    );

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('sort', updatedSortParams);
    router.push(`?${currentSearchParams.toString()}`);

    setPage(1);
  };

  return (
    <label
      htmlFor="groupByClass"
      className={cn(
        'mb-2.5 block cursor-pointer text-clip whitespace-nowrap font-serif text-[16px] text-white',
        labelStyle
      )}
    >
      <input
        type="checkbox"
        name="groupByClass"
        id="groupByClass"
        className="sr-only"
        checked={isGroupByClass}
        onChange={handleChange}
      />
      <div
        aria-hidden="true"
        className="relative top-[7px] mr-2.5 inline-block h-[26px] w-[26px] rounded-[5px] border-2 border-solid border-[#ffffff33] bg-[#000000cc]"
      >
        <Image
          width={23}
          height={23}
          src={CheckIcon}
          alt="Checkbox"
          className={`${isGroupByClass ? 'opacity-100' : 'opacity-0'} absolute inset-0 h-[23px]`}
        />
      </div>
      Group By Class
    </label>
  );
};
