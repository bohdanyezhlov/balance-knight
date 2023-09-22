export const capitalizeWords = (input: string): string => {
  const words = input.split(' ');

  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return '';
    }
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
};
