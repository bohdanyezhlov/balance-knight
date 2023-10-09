import { CardAttributes } from '@/enums';

export const getPropertyForAttribute = (attribute: CardAttributes) => {
  switch (attribute) {
    case CardAttributes.Type:
      return 'cardTypeId';
    case CardAttributes.Set:
      return 'cardSetId';
    case CardAttributes.Class:
      return 'classId';
    case CardAttributes.Rarity:
    case CardAttributes.CostToCraft:
    case CardAttributes.DisenchantingYield:
      return 'rarityId';
    case CardAttributes.Artist:
      return 'artistName';
    case CardAttributes.Collectible:
      return 'collectible';
    default:
      throw new Error(`Unexpected card attribute - ${attribute}`);
  }
};
