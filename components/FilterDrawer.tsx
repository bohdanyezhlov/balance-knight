import { useState } from 'react';

import Settings from '../public/settings.svg';
import { SwipeableDrawer } from './SwipeableDrawer';
import { BaseLayer } from './BaseLayer';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  cardCount: number;
};

export const FilterDrawer: React.FC<Props> = ({ cardCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      <div className="relative mr-[30px] flex justify-end 961:flex-1">
        <BaseLayer tag="div">
          <TopLayerWithHover tag="button" onClick={toggleDrawer(true)}>
            <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-mainBrown">
              <Settings />
            </div>
            <h6 className="mx-2.5 hidden font-banner font-bold text-mainBrown min-[1261px]:block">
              Filters
            </h6>
          </TopLayerWithHover>
        </BaseLayer>
      </div>

      <SwipeableDrawer isOpen={isOpen} cardCount={cardCount} toggleDrawer={toggleDrawer} />
    </>
  );
};
