import type { TCard, TMetadata } from '@/types';
import { generateGhostCards } from '@/utils/generateGhostCards';
import { getClassNameByClassId } from '@/utils/getClassNameByClassId';
import { splitCardsByClassId } from '@/utils/splitCardsByClassId';

import { Card } from './Card';
import { ClassTitle } from './ClassTitle';

type Props = {
  cards: TCard[];
  metadata: TMetadata;
  setPage: (page: number) => void;
  page: number;
};

export const CardList: React.FC<Props> = ({ cards, metadata, setPage, page }) => {
  const { classes } = metadata;
  const cardsByClassId = splitCardsByClassId(cards);
  const NUM_GHOST_CARDS = 5;
  let globalCardIndex = -1; // NOTE count global card index for each class array, to be able to detect the last one (it needs for infinity scroll)

  return (
    <div className="mx-auto max-w-[1600px] overflow-x-hidden px-2.5 pt-10">
      {cardsByClassId.map(({ classId, groupOfCards }) => {
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
                    slug={slug}
                    imgSrc={image}
                    alt={name}
                    isLast={globalCardIndex === cards.length - 1}
                    newLimit={() => setPage(page + 1)}
                  />
                );
              })}

              {generateGhostCards(NUM_GHOST_CARDS)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
