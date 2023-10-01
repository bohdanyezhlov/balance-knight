type Props = {
  id?: string;
  slug?: string;
  name: string;
  data: any[];
  excludedIds?: number[];
};

export const addDefaultOption = ({ id = '*', slug = '', name, data, excludedIds }: Props) => {
  const options = [
    {
      slug,
      id,
      name,
    },
    ...data,
  ];

  if (excludedIds) {
    return options.filter((item) => !excludedIds.includes(item.id));
  }
  return options;
};
