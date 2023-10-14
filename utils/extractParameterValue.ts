export const extractParameterValue = (paramString: string, paramName: string) => {
  const params = paramString.split(',');

  for (const param of params) {
    const [key, value] = param.split(':');
    if (key === paramName) {
      return value === 'asc'; // NOTE Default positive sort value
    }
  }

  return false;
};
