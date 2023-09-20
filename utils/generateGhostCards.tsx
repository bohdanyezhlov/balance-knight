export const generateGhostCards = (count: number) => {
  const ghostCards = [];

  for (let i = 0; i < count; i += 1) {
    ghostCards.push(<div key={`ghost_${i}`} className="h-[1px] w-[250px]" />);
  }

  return ghostCards;
};
