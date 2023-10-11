import { useState } from 'react';

import SettingsIcon from '../public/settingsIcon.svg';
import { BaseLayer } from './BaseLayer';
import { SwipeableDrawer } from './SwipeableDrawer';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  cardCount: number;
  isGroupByClass: boolean;
  setIsGroupByClass: (v: boolean) => void;
  setPage: (page: number) => void;
};

export const FilterDrawer: React.FC<Props> = ({
  cardCount,
  isGroupByClass,
  setIsGroupByClass,
  setPage,
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
        <BaseLayer>
          <TopLayerWithHover as="button" onClick={toggleDrawer(true)}>
            <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-darkBrown">
              <SettingsIcon />
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
        isGroupByClass={isGroupByClass}
        setIsGroupByClass={setIsGroupByClass}
        setPage={setPage}
      />
    </>
  );
};
