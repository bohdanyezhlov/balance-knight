import SwipeableDrawerMUI from '@mui/material/SwipeableDrawer';
import { Checkbox } from './Checkbox';
import ArrowIndicator from '../public/arrowIndicator.svg';
import { useState } from 'react';
import { BaseLayer } from './BaseLayer';
import { TopLayerWithHover } from './TopLayerWithHover';

type OptionValue = {
  slug: string;
  loc: string;
  param: string;
  name: string;
};

const options: OptionValue[] = [
  {
    slug: 'manaCost:asc',
    loc: 'card.sort.manaAsc',
    param: 'manaCost:asc,name:asc,classes:asc',
    name: 'Mana: low to high',
  },
  {
    slug: 'manaCost:desc',
    loc: 'card.sort.manaDesc',
    param: 'manaCost:desc,name:asc,classes:asc',
    name: 'Mana: high to low',
  },
  {
    slug: 'name:asc',
    loc: 'card.sort.nameAsc',
    param: 'name:asc,classes:asc',
    name: 'Card Name: A to Z',
  },
  {
    slug: 'name:desc',
    loc: 'card.sort.nameDesc',
    param: 'name:desc,classes:asc',
    name: 'Card Name: Z to A',
  },
  {
    slug: 'attack:asc',
    loc: 'card.sort.attackAsc',
    param: 'attack:asc,name:asc,classes:asc',
    name: 'Attack: low to high',
  },
  {
    slug: 'attack:desc',
    loc: 'card.sort.attackDesc',
    param: 'attack:desc,name:asc,classes:asc',
    name: 'Attack: high to low',
  },
  {
    slug: 'health:asc',
    loc: 'card.sort.healthAsc',
    param: 'health:asc,name:asc,classes:asc',
    name: 'Health: low to high',
  },
  {
    slug: 'health:desc',
    loc: 'card.sort.healthDesc',
    param: 'health:desc,name:asc,classes:asc',
    name: 'Health: high to low',
  },
];

const defaultOption: OptionValue = options[0];

type Props = {
  cardCount: number;
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const SwipeableDrawer: React.FC<Props> = ({ cardCount, isOpen, toggleDrawer }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(JSON.parse(e.target.value));
  };

  return (
    <SwipeableDrawerMUI
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      // hideBackdrop
    >
      <div className="h-full w-[300px] bg-transparent bg-[url(../public/bgFilterTabletMobile.jpeg)] bg-left-top bg-repeat-y">
        <div className="flex touch-pan-y select-none flex-wrap px-5 pb-[100px] pt-5">
          <div className="flex w-full flex-wrap border-b border-solid border-[#450f0f] py-2.5 text-white">
            <div className="mb-[15px] w-full">
              <button
                className="inline pl-[5px] text-[16px] font-bold hover:underline hover:underline-offset-1"
                onClick={toggleDrawer(false)}
              >
                <span className="relative top-1 mr-[5px] inline-block text-[25px] text-[#fcd144]">
                  ✕
                </span>
                Close
              </button>
            </div>
            <div className="pl-[15px]">{cardCount} cards found</div>
          </div>

          <div className="relative mr-[30px] w-full py-[20px] text-[#8f6e6e]">
            <div className="pl-[15px]">
              {/* NOTE push to url CgroupByClass%3Aasc, default groupByClass:asc ? */}
              <Checkbox />
            </div>

            <p className="mb-2.5 block pl-[15px]">Sort By:</p>

            <div>
              <BaseLayer tag="div">
                <TopLayerWithHover tag="div">
                  <div className="flex w-full max-w-[155px] text-ellipsis min-[414px]:max-w-[250px]">
                    <h6 className="ml-2.5 mr-[30px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-banner text-[16px] leading-none text-mainBrown">
                      {selectedOption.name}
                    </h6>
                    <div className="absolute -right-1 z-[2] mt-px h-[17px] w-[17px] rotate-90">
                      <ArrowIndicator />
                    </div>
                  </div>
                  <select
                    className="absolute -left-6 top-0 z-[2] h-full w-[calc(100%_+_48px)] appearance-none border-0 bg-transparent -indent-[1000em] focus:outline-none"
                    value={JSON.stringify(selectedOption)}
                    onChange={handleOptionChange}
                  >
                    {options.map((option) => (
                      <option key={option.slug} value={JSON.stringify(option)}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </TopLayerWithHover>
              </BaseLayer>
            </div>
          </div>
        </div>
      </div>
    </SwipeableDrawerMUI>
  );
};
