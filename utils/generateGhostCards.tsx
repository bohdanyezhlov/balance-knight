export const generateGhostCards = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <div key={`ghost_${i}`} className="h-px w-[150px] min-[531px]:w-[240px]" />
  ));
