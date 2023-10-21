import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import { ECardProperties } from '@/enums';
import type { TCard, TMetadata } from '@/types';
import { getAttributeData } from '@/utils/getAttributeData';

type Props = {
  card: TCard;
  metadata: TMetadata;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const CardAttributes: React.FC<Props> = ({ card, metadata, setIsOpen }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const attributeKeys = [
    ...Object.values(ECardProperties).filter((key) => card[key as keyof TCard]),
    ECardProperties.CostToCraft,
    ECardProperties.DisenchantingYield,
  ];
  const sortedKeys = attributeKeys.toSorted((a, b) => {
    const indexA = Object.values(ECardProperties).indexOf(a);
    const indexB = Object.values(ECardProperties).indexOf(b);
    return indexA - indexB;
  });

  const handleArtistClick = (artistName: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('textFilter', artistName);
    router.push(`?${currentSearchParams.toString()}`);

    setIsOpen(false);
    setPage(1);
  };

  return (
    <ul className="mb-6 mt-5 leading-[1.75]">
      {sortedKeys.map((attribute, i) => {
        const [attributeKey, attributeValue] = getAttributeData(attribute, card, metadata);

        // NOTE https://hearthstone.blizzard.com/en-us/cards/68310-moonfire?set=classic-cards
        // some cards have Cost to Craft: - / (Golden), some do not render
        // if (attributeKey === null) {
        //   return null;
        // }

        return (
          <li key={i} className="ml-5 list-disc font-bold text-lightGold">
            {/* eslint-disable-next-line no-nested-ternary */}
            {attributeValue === null ? (
              attributeKey
            ) : (
              <>
                {attributeKey}:{' '}
                <span className="font-normal text-white">
                  {attributeKey === 'Artist' ? (
                    <Link
                      href="/"
                      className="text-gold hover:underline hover:underline-offset-1"
                      onClick={handleArtistClick(attributeValue as string)}
                    >
                      {attributeValue}
                    </Link>
                  ) : (
                    attributeValue
                  )}
                </span>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
