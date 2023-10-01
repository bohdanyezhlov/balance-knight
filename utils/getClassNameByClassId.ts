import type { TClass } from '@/types';

export const getClassNameByClassId = (classId: number, classes: TClass[]) => {
  const classInfo = classes.find((c) => c.id === classId);

  return classInfo ? classInfo.name : null;
};
