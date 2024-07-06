import { useState } from 'react';

import type { TCard, TMetadata } from '@/types';

import styles from './style.module.css';

type TTooltipContent = {
  tooltipTitle: string | undefined;
  tooltipDescription: string | undefined;
};

export const TooltipContent: React.FC<TTooltipContent> = ({ tooltipTitle, tooltipDescription }) => {
  if (!tooltipTitle || !tooltipDescription) {
    return null;
  }

  return (
    <div className={styles.tooltipRoot}>
      <div className={styles.content}>
        <h6 className={styles.tooltipTitle}>{tooltipTitle}</h6>
        <p className={styles.description}>{tooltipDescription}</p>
      </div>
    </div>
  );
};

type Props = {
  metadata: TMetadata;
  card: TCard;
};

export const LearnMore: React.FC<Props> = ({ metadata, card }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { keywords } = metadata;

  if (!card.keywordIds) return null;

  const getTooltipContentById = (keywordId: number) => {
    const keyword = keywords.find((entry) => entry.id === keywordId);

    return [keyword?.name, keyword?.text];
  };

  return (
    <div className={styles.root}>
      <p className={styles.title}>Learn More:</p>
      <div className={styles.flexContainer}>
        {card.keywordIds?.map((keyword) => {
          const [tooltipTitle, tooltipDescription] = getTooltipContentById(keyword);

          return (
            <button
              type="button"
              key={keyword}
              className={styles.keywordButton}
              onMouseEnter={() => setHoveredCard(keyword)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {tooltipTitle}

              {hoveredCard === keyword && (
                <TooltipContent
                  tooltipTitle={tooltipTitle}
                  tooltipDescription={tooltipDescription}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
