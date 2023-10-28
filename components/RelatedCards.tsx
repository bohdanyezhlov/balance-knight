import { useEffect, useState } from 'react';

import { getCardById } from '@/api/getCardById';
import type { TCard } from '@/types';

type Props = {
  card: TCard;
};

export const RelatedCards: React.FC<Props> = ({ card }) => {
  const [relatedCards, setRelatedCards] = useState<TCard[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const childIds = card ? card.childIds : null;

  useEffect(() => {
    const fetchRelatedCards = async () => {
      if (childIds) {
        try {
          const { cards: cardsData } = await getCardById(childIds);
          setRelatedCards(cardsData);
        } catch (error) {
          console.error('Error fetching related cards', error);
        }
      }
    };

    if (childIds) {
      fetchRelatedCards();
    } else {
      setRelatedCards([]);
    }
  }, [childIds]);

  if (!relatedCards.length) return null;

  return (
    <div className="mb-5">
      <p className="text-[16px]">Related Cards:</p>

      <div className="flex flex-wrap pb-2.5">
        {relatedCards.map(({ id, name, image }) => (
          <button
            type="button"
            key={id}
            className="relative mr-2.5 cursor-zoom-in text-[16px] text-white underline"
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {name}

            {hoveredCard === id && (
              <img
                src={image}
                alt={name}
                className="fixed inset-x-0 bottom-10 top-1/2 z-[200] w-[250px] max-w-[unset] min-[401px]:absolute min-[401px]:top-auto"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
