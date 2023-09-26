import { useState } from 'react';

import Settings from '../public/settings.svg';
import { SwipeableDrawer } from './SwipeableDrawer';

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
      <div className="961:flex-1 relative mr-[30px] flex justify-end">
        <div className="relative ml-[34px] h-[54px] bg-[url(../public/bgMiddleTile.png)] bg-center bg-repeat-x py-1.5 before:absolute before:-left-[30px] before:top-0 before:h-[54px] before:w-[34px] before:bg-[url(../public/bgLeftTile.png)] before:bg-left before:bg-no-repeat before:content-[''] after:absolute after:-right-[30px] after:top-0 after:h-[54px] after:w-[34px] after:bg-[url(../public/bgRightTile.png)] after:bg-right after:bg-no-repeat after:content-['']">
          <button
            type="button"
            onClick={toggleDrawer(true)}
            className="relative z-[1] -mx-[3px] flex h-[42px] cursor-pointer items-center bg-[url(../public/dropdownMiddleStretch.png)] bg-center pl-5 transition-all duration-150 ease-[ease] before:absolute before:-left-[23px] before:top-0 before:h-[42px] before:w-[24px] before:bg-[url(../public/dropdownLeft.png)] before:bg-left before:bg-no-repeat before:transition-all before:duration-150 before:ease-[ease] before:content-[''] after:absolute after:-right-[23px] after:top-0 after:z-[1] after:h-[42px] after:w-[24px] after:bg-[url(../public/dropdownRight.png)] after:bg-right after:bg-no-repeat after:transition-all after:duration-150 after:ease-[ease] after:content-[''] hover:bg-[url(../public/dropdownMiddleStretchHoverSelected.png)] hover:before:bg-[url(../public/dropdownLeftHoverSelected.png)] hover:after:bg-[url(../public/dropdownRightHoverSelected.png)] focus-visible:outline-none"
          >
            <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-mainBrown">
              <Settings />
            </div>
            <h6 className="mx-2.5 hidden font-banner font-bold text-mainBrown min-[1261px]:block">
              Filters
            </h6>
          </button>
        </div>
      </div>

      <SwipeableDrawer isOpen={isOpen} cardCount={cardCount} toggleDrawer={toggleDrawer} />
    </>
  );
};
