import { usePageContext } from '@/contexts/PageContext';
import type { TCard } from '@/types';
import { generateGhostCards } from '@/utils/generateGhostCards';

import { Card } from './Card';
import { ClassTitle } from './ClassTitle';

const NUM_GHOST_CARDS = 5;

type Props = {
  cards: TCard[];
  showModal: (id: number) => void;
  cardsLength: number;
};

export const RenderAllCards: React.FC<Props> = ({ cards, showModal, cardsLength }) => {
  const { page, setPage } = usePageContext()!;
  let globalCardIndex = -1; // NOTE count global card index for each class array, to be able to detect the last one (it needs for infinity scroll)

  return (
    <div className="mb-[50px]">
      <ClassTitle name="All Cards" />

      <div className="flex flex-wrap justify-evenly">
        {cards.map(({ image, id, slug, name }) => {
          globalCardIndex += 1;

          return (
            <Card
              key={id}
              id={id}
              slug={slug}
              imgSrc={image}
              alt={name}
              isLast={globalCardIndex === cardsLength}
              newLimit={() => setPage(page + 1)}
              showModal={showModal}
            />
          );
        })}

        {generateGhostCards(NUM_GHOST_CARDS)}
      </div>
    </div>
  );
};
