export const updateSortParam = (sortParam: string, criteriaName: string, isAscending: boolean) => {
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
