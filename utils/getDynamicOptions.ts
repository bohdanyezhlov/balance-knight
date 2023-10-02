type Props = {
  id?: string;
  slug?: string;
  name: string;
  data: any[];
  excludedIds?: number[];
};

export const getDynamicOptions = ({ id = '*', slug = '', name, data, excludedIds }: Props) => {
  const options = [
    {
      slug,
      id,
      name,
    },
    ...data,
  ];

  if (excludedIds) {
    const arr = options.filter((item) => !excludedIds.includes(item.id));
    return [arr[0], arr];
  }
  return [options[0], options];
};
