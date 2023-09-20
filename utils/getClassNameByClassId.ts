import { Class } from '@/types';

export const getClassNameByClassId = (classId: number, classes: Class[]) => {
  const classInfo = classes.find((c) => c.id === classId);

  return classInfo ? classInfo.name : null;
};
