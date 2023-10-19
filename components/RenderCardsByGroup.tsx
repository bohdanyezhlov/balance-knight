import { usePageContext } from '@/contexts/PageContext';
import type { TCardsByClassId, TClass } from '@/types';
import { generateGhostCards } from '@/utils/generateGhostCards';
import { getClassNameByClassId } from '@/utils/getClassNameByClassId';

import { Card } from './Card';
import { ClassTitle } from './ClassTitle';

const NUM_GHOST_CARDS = 5;

type Props = {
  cards: TCardsByClassId[];
  classes: TClass[];
  showModal: (id: number) => void;
  cardsLength: number;
};

export const RenderCardsByGroup: React.FC<Props> = ({ cards, classes, showModal, cardsLength }) => {
  const { page, setPage } = usePageContext();
  let globalCardIndex = -1; // NOTE count global card index for each class array, to be able to detect the last one (it needs for infinity scroll)

  return cards.map(({ classId, groupOfCards }) => {
    const classname = getClassNameByClassId(classId, classes);

    return (
      <div key={classId} className="mb-[50px]">
        {classname && <ClassTitle name={classname} />}

        <div className="flex flex-wrap justify-evenly">
          {groupOfCards.map(({ image, id, slug, name }) => {
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
  });
};
