import { useState } from 'react';

import type { TMetadata } from '@/types';

import Settings from '../public/settings.svg';
import { BaseLayer } from './BaseLayer';
import { SwipeableDrawer } from './SwipeableDrawer';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  cardCount: number;
  metadata: TMetadata;
  isGroupByClass: boolean;
  setIsGroupByClass: (v: boolean) => void;
};

export const FilterDrawer: React.FC<Props> = ({
  cardCount,
  metadata,
  isGroupByClass,
  setIsGroupByClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      <div className="relative mr-[30px] flex justify-end md+:flex-1">
        <BaseLayer as="div">
          <TopLayerWithHover as="button" onClick={toggleDrawer(true)}>
            <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-mainBrown">
              <Settings />
            </div>
            <h6 className="mx-2.5 hidden font-serif font-bold text-mainBrown min-[1261px]:block">
              Filters
            </h6>
          </TopLayerWithHover>
        </BaseLayer>
      </div>

      <SwipeableDrawer
        isOpen={isOpen}
        cardCount={cardCount}
        toggleDrawer={toggleDrawer}
        metadata={metadata}
        isGroupByClass={isGroupByClass}
        setIsGroupByClass={setIsGroupByClass}
      />
    </>
  );
};
