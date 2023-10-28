import SwipeableDrawerMUI from '@mui/material/SwipeableDrawer';

import { AttributeFilter } from './AttributeFilter';
import { Checkbox } from './Checkbox';
import { SortBy } from './SortBy';

type Props = {
  cardCount: number;
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const SwipeableDrawer: React.FC<Props> = ({ cardCount, isOpen, toggleDrawer }) => {
  return (
    <SwipeableDrawerMUI
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className="h-full w-[300px] overflow-y-scroll bg-transparent bg-[url(../public/bgFilterTabletMobile.jpeg)] bg-left-top bg-repeat-y">
        <div className="flex touch-pan-y select-none flex-wrap px-5 pb-[100px] pt-5">
          <div className="flex w-full flex-wrap border-b border-solid border-[#450f0f] py-2.5 text-white">
            <div className="mb-[15px] w-full">
              <button
                type="button"
                className="inline pl-[5px] text-[16px] font-bold hover:underline hover:underline-offset-1"
                onClick={toggleDrawer(false)}
              >
                <span className="relative top-1 mr-[5px] inline-block text-[25px] text-gold">
                  ✕
                </span>
                Close
              </button>
            </div>
            <div className="pl-[15px]">{cardCount} cards found</div>
          </div>

          <div className="relative mr-[30px] w-full py-[20px] text-lightBrown">
            <div className="pl-[15px]">
              <Checkbox />
            </div>

            <label htmlFor="CardSortControl" className="mb-2.5 block pl-[15px]">
              Sort By:
            </label>
            <SortBy id="CardSortControl" />
          </div>

          <AttributeFilter variant="class" hasIcon labelId="ClassControl">
            <label htmlFor="ClassControl" className="mb-2.5 block pl-[15px]">
              Filters:
            </label>
          </AttributeFilter>

          <AttributeFilter variant="manaCost" hasIcon />

          <AttributeFilter variant="attack" hasIcon />

          <AttributeFilter variant="health" hasIcon />

          <AttributeFilter variant="type" excludedIds={[10, 40]} />

          <AttributeFilter
            variant="minionType"
            excludedIds={[1, 2, 3, 4, 6, 7, 8, 9, 10, 88, 93, 94, 95]}
          />

          <AttributeFilter variant="spellSchool" />

          <AttributeFilter variant="rarity" />

          <AttributeFilter variant="keyword" excludedIds={[109, 196, 198, 234, 235, 252, 261]} />
        </div>
      </div>
    </SwipeableDrawerMUI>
  );
};
