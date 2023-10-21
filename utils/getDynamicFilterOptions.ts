import type { TDynamicVariant } from '@/components/AttributeFilter';
import type { TMetadata, TOption } from '@/types';

const getData = (variant: TDynamicVariant, metadata: TMetadata) => {
  switch (variant) {
    case 'class':
      return metadata.classes;
    case 'type':
      return metadata.types;
    case 'minionType':
      return metadata.minionTypes;
    case 'spellSchool':
      return metadata.spellSchools;
    case 'rarity':
      return metadata.rarities;
    case 'keyword':
      return metadata.keywords;
    default:
      throw new Error(`Invalid variant: ${variant} for metadata ${metadata}`);
  }
};

const getDefaultOptionName = (variant: string) => {
  switch (variant) {
    case 'class':
      return 'All Classes';
    case 'type':
      return 'Any Type';
    case 'minionType':
      return 'Any Type';
    case 'spellSchool':
      return 'Any School';
    case 'rarity':
      return 'Any Rarity';
    case 'keyword':
      return 'Any Keyword';
    default:
      throw new Error(`Invalid variant: ${variant}`);
  }
};

export const getDynamicFilterOptions = (
  variant: TDynamicVariant,
  metadata: TMetadata,
  excludedIds?: (string | number)[]
): [TOption, TOption[]] => {
  const data = getData(variant, metadata);

  if (variant === 'minionType' || variant === 'keyword') {
    data.sort((a, b) => a.name.localeCompare(b.name)); // REVIEW
  }

  const options = [
    {
      slug: '',
      id: variant,
      name: getDefaultOptionName(variant),
    },
    ...data,
  ];

  if (excludedIds) {
    const filteredOptions = options.filter((item) => !excludedIds.includes(item.id));
    return [filteredOptions[0], filteredOptions];
  }

  return [options[0], options];
};
