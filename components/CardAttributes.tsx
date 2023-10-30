import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import { ECardProperties, ECardPropertiesKeys } from '@/enums';
import type { TCard, TMetadata } from '@/types';

// FIXME https://hearthstone.blizzard.com/en-us/cards/678-treant
const extractValue = (arr: any[], ids: number[]) => {
  const matchingItems = arr.filter((item) => ids.includes(item.id));

  if (matchingItems.length > 0) {
    return matchingItems.map((item) => item.name).join(', ');
  }

  return '-';
};

const getAttributeData = (attribute: ECardProperties, card: TCard, metadata: TMetadata) => {
  const { types, minionTypes, spellSchools, rarities, sets, classes } = metadata;

  switch (attribute) {
    case ECardProperties.Type: {
      return [ECardPropertiesKeys.Type, extractValue(types, [card.cardTypeId])];
    }

    case ECardProperties.MinionType: {
      const minionTypeIds = card.multiTypeIds
        ? [card.minionTypeId, ...card.multiTypeIds]
        : [card.minionTypeId];

      return [ECardPropertiesKeys.MinionTypeId, extractValue(minionTypes, minionTypeIds)];
    }

    case ECardProperties.SpellSchool: {
      return [ECardPropertiesKeys.SpellSchool, extractValue(spellSchools, [card.spellSchoolId])];
    }

    case ECardProperties.Rarity: {
      return [ECardPropertiesKeys.Rarity, extractValue(rarities, [card.rarityId])];
    }

    case ECardProperties.Set: {
      return [ECardPropertiesKeys.Set, extractValue(sets, [card.cardSetId])];
    }

    case ECardProperties.Class: {
      const classIds = card.multiClassIds ? [card.classId, ...card.multiClassIds] : [card.classId];

      return [ECardPropertiesKeys.Class, extractValue(classes, classIds)];
    }

    case ECardProperties.CostToCraft: {
      const rarity = rarities.find((r) => r.id === card.rarityId);

      // FIXME
      // @ts-ignore
      if (rarity?.craftingCost && !rarity.craftingCost.includes(null)) {
        const [min, max] = rarity.craftingCost;

        return [ECardPropertiesKeys.CostToCraft, `${min} / ${max} (Golden)`];
      }

      return [ECardPropertiesKeys.CostToCraft, `- / (Golden)`];
    }

    case ECardProperties.DisenchantingYield: {
      const rarity = rarities.find((r) => r.id === card.rarityId);

      // FIXME
      // @ts-ignore
      if (rarity?.dustValue && !rarity.dustValue.includes(null)) {
        const [min, max] = rarity.dustValue;

        return [ECardPropertiesKeys.DisenchantingYield, `${min} / ${max} (Golden)`];
      }

      return [ECardPropertiesKeys.DisenchantingYield, `- / (Golden)`];
    }

    case ECardProperties.Artist: {
      return [ECardPropertiesKeys.Artist, card.artistName];
    }

    case ECardProperties.Collectible: {
      return card.collectible === 0 ? [null, null] : [ECardPropertiesKeys.Collectible, null];
    }

    default: {
      throw new Error(`Unexpected attribute - ${attribute}`);
    }
  }
};

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
