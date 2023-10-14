export const updateSortParam = (sortParam: string, criteriaName: string, isAscending: boolean) => {
  const updatedCriteria = sortParam.split(',').map((criteria) => {
    if (criteria.startsWith(`${criteriaName}:`)) {
      const newDirection = isAscending ? 'asc' : 'desc';
      return `${criteriaName}:${newDirection}`;
    }

    return criteria;
  });

  return updatedCriteria.join(',');
};
