import { Tooltip as TooltipMUI } from '@mui/material';

import type { TCard, TMetadata } from '@/types';

import { Tooltip } from './Tooltip';

type Props = {
  metadata: TMetadata;
  card: TCard;
};

export const LearnMore: React.FC<Props> = ({ metadata, card }) => {
  const { keywords } = metadata;

  const getTooltipContentById = (keywordId: number) => {
    const keyword = keywords.find((entry) => entry.id === keywordId);

    return [keyword?.name, keyword?.text];
  };

  return (
    <div className="mb-5">
      <p className="text-[16px]">Learn more:</p>
      <div className="flex flex-wrap">
        {card.keywordIds?.map((keyword) => {
          const [tooltipTitle, tooltipDescription] = getTooltipContentById(keyword);

          return (
            <TooltipMUI
              title={
                <Tooltip tooltipTitle={tooltipTitle} tooltipDescription={tooltipDescription} />
              }
              slotProps={{ tooltip: { className: '!bg-transparent' } }}
              key={keyword}
            >
              <div className="relative mr-2.5 cursor-pointer font-bold text-white underline">
                {tooltipTitle}
              </div>
            </TooltipMUI>
          );
        })}
      </div>
    </div>
  );
};
