import { Tooltip } from '@mui/material';
import { useState } from 'react';

import type { TCard, TMetadata } from '@/types';

const textShadowStyle = {
  textShadow:
    'rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.95885px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.14147px 1.99499px 0px, rgb(0, 0, 0) -0.83229px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.70157px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.42159px -1.95506px 0px, rgb(0, 0, 0) 0.56732px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.55883px 0px',
};

type TTooltipContent = {
  tooltipTitle: string | undefined;
  tooltipDescription: string | undefined;
};

export const TooltipContent: React.FC<TTooltipContent> = ({ tooltipTitle, tooltipDescription }) => {
  if (!tooltipTitle || !tooltipDescription) {
    return null;
  }

  return (
    <div className="relative z-[10000] mb-[35px] w-[228px] bg-transparent bg-[url(../public/tooltipMiddle.png)] bg-center bg-repeat-y px-5 py-2.5 text-left before:absolute before:left-0 before:top-[-15px] before:z-[-1] before:h-[70px] before:w-[228px] before:bg-[url(../public/tooltipTop.png)] before:bg-center before:bg-no-repeat before:content-[''] after:absolute after:bottom-[-15px] after:left-0 after:z-[-1] after:mt-[-45px] after:h-[76px] after:w-[228px] after:bg-[url(../public/tooltipBottom.png)] after:bg-center after:bg-no-repeat after:content-['']">
      <h6
        className="mb-2.5 font-serif text-[16px] font-bold leading-[1.1] text-white"
        style={textShadowStyle}
      >
        {tooltipTitle}
      </h6>
      <p className="text-[16px] leading-normal text-white">{tooltipDescription}</p>
    </div>
  );
};

type Props = {
  metadata: TMetadata;
  card: TCard;
};

export const LearnMore: React.FC<Props> = ({ metadata, card }) => {
  const [showTooltips, setShowTooltips] = useState(new Map<number, boolean>());
  const { keywords } = metadata;

  if (!card.keywordIds) return null;

  const getTooltipContentById = (keywordId: number) => {
    const keyword = keywords.find((entry) => entry.id === keywordId);

    return [keyword?.name, keyword?.text];
  };

  const toggleTooltip = (keywordId: number) => {
    setShowTooltips((prevTooltips) => {
      const currentStatus = prevTooltips.get(keywordId) || false;
      const newTooltips = new Map(prevTooltips);

      if (currentStatus) {
        newTooltips.set(keywordId, false);
      } else {
        newTooltips.set(keywordId, true);
      }

      return newTooltips;
    });
  };

  return (
    <div className="mb-5">
      <p className="text-[16px]">Learn more:</p>
      <div className="flex flex-wrap">
        {card.keywordIds?.map((keyword) => {
          const [tooltipTitle, tooltipDescription] = getTooltipContentById(keyword);

          return (
            <Tooltip
              title={
                <TooltipContent
                  tooltipTitle={tooltipTitle}
                  tooltipDescription={tooltipDescription}
                />
              }
              slotProps={{ tooltip: { className: '!bg-transparent' } }}
              key={keyword}
              onOpen={() => toggleTooltip(keyword)}
              onClose={() => toggleTooltip(keyword)}
              open={showTooltips.get(keyword) || false}
              enterDelay={0}
              disableTouchListener
            >
              <button
                type="button"
                className="relative mr-2.5 cursor-zoom-in text-[16px] text-white underline"
                onClick={() => toggleTooltip(keyword)}
              >
                {tooltipTitle}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
