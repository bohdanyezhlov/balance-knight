import { useEffect, useState } from 'react';

import { getCardById } from '@/shared/network/getCardById';
import type { TCard } from '@/types';

import styles from './style.module.scss';

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
    <div className={styles.root}>
      <p className={styles.title}>Related Cards:</p>

      <div className={styles.flexContainer}>
        {relatedCards.map(({ id, name, image }) => (
          <button
            type="button"
            key={id}
            className={styles.card}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {name}

            {hoveredCard === id && <img src={image} alt={name} className={styles.image} />}
          </button>
        ))}
      </div>
    </div>
  );
};
