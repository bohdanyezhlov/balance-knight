import { ECardProperties, ECardPropertiesKeys } from '@/enums';
import type { TCard, TMetadata } from '@/types';

// REVIEW https://hearthstone.blizzard.com/en-us/cards/678-treant
const extractValue = (arr: any, ids: number[]) => {
  const matchingItems = arr.filter((item: any) => ids.includes(item.id));

  if (matchingItems.length > 0) {
    return matchingItems.map((item: any) => item.name).join(', ');
  }

  return '-';
};

export const getAttributeData = (attribute: ECardProperties, card: TCard, metadata: TMetadata) => {
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
      // REVIEW custom sets always '-'
      return [ECardPropertiesKeys.Set, extractValue(sets, [card.cardSetId])];
    }

    case ECardProperties.Class: {
      const classIds = card.multiClassIds ? [card.classId, ...card.multiClassIds] : [card.classId];

      return [ECardPropertiesKeys.Class, extractValue(classes, classIds)];
    }

    case ECardProperties.CostToCraft: {
      const rarity = rarities.find((r) => r.id === card.rarityId);

      if (rarity && rarity.craftingCost) {
        const [min, max] = rarity.craftingCost;
        return [ECardPropertiesKeys.CostToCraft, `${min} / ${max} (Golden)`];
      }

      return [ECardPropertiesKeys.CostToCraft, `- / (Golden)`];
    }

    case ECardProperties.DisenchantingYield: {
      const rarity = rarities.find((r) => r.id === card.rarityId);

      if (rarity && rarity.dustValue) {
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
