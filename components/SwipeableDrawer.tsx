/* eslint-disable jsx-a11y/label-has-associated-control */
import SwipeableDrawerMUI from '@mui/material/SwipeableDrawer';
import { useState } from 'react';

import { useMetadataContext } from '@/contexts/MetadataContext';
import type { TClass, TRarity, TType } from '@/types';
import { getDynamicOptions } from '@/utils/getDynamicOptions';
import { getStaticOptions } from '@/utils/getStaticOptions';

import { BaseLayer } from './BaseLayer';
import { Checkbox } from './Checkbox';
import { Select } from './Select';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  cardCount: number;
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const SwipeableDrawer: React.FC<Props> = ({ cardCount, isOpen, toggleDrawer }) => {
  const metadata = useMetadataContext();
  const { classes, types, rarities } = metadata || {};
  const [defaultClassOption, classOptions] = getDynamicOptions({
    name: 'All Classes',
    data: classes || [],
  });
  const [defaultCardTypeOption, cardTypeOptions] = getDynamicOptions({
    name: 'All Type',
    data: types || [],
    excludedIds: [10, 40],
  });
  const [defaultRarityOption, rarityOptions] = getDynamicOptions({
    name: 'All Rarity',
    data: rarities || [],
  });
  const [defaultSortOption, sortOptions] = getStaticOptions('sort');
  const [defaultManaOption, manaOptions] = getStaticOptions('mana');

  const [selectedSortOption, setSelectedSortOption] = useState(defaultSortOption);
  const [selectedClassOption, setSelectedClassOption] = useState<TClass>(defaultClassOption);
  const [selectedManaOption, setSelectedManaOption] = useState(defaultManaOption);
  const [selectedRarityOption, setSelectedRarityOption] = useState<TRarity>(defaultRarityOption);
  const [selectedCardTypeOption, setSelectedCardTypeOption] =
    useState<TType>(defaultCardTypeOption);

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setSelectedOption(JSON.parse(e.target.value));
  };

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

            <div>
              <BaseLayer>
                <TopLayerWithHover>
                  <Select
                    id="CardSortControl"
                    options={sortOptions}
                    selectedOption={selectedSortOption}
                    handleOptionChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleOptionChange(e, setSelectedSortOption)
                    }
                  />
                </TopLayerWithHover>
              </BaseLayer>
            </div>
          </div>

          <div className="relative mb-2.5 mr-[30px] w-full text-lightBrown">
            <label htmlFor="ClassControl" className="mb-2.5 block pl-[15px]">
              Filters:
            </label>

            <BaseLayer>
              <TopLayerWithHover hasIcon>
                <Select
                  id="ClassControl"
                  options={classOptions}
                  selectedOption={selectedClassOption}
                  handleOptionChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleOptionChange(e, setSelectedClassOption)
                  }
                />
              </TopLayerWithHover>
            </BaseLayer>
          </div>

          <div className="relative mb-2.5 mr-[30px] w-full text-lightBrown">
            <BaseLayer>
              <TopLayerWithHover hasIcon>
                <Select
                  options={manaOptions}
                  selectedOption={selectedManaOption}
                  handleOptionChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleOptionChange(e, setSelectedManaOption)
                  }
                />
              </TopLayerWithHover>
            </BaseLayer>
          </div>

          <div className="relative mb-2.5 mr-[30px] w-full text-lightBrown">
            <BaseLayer>
              <TopLayerWithHover>
                <Select
                  options={cardTypeOptions}
                  selectedOption={selectedCardTypeOption}
                  handleOptionChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleOptionChange(e, setSelectedCardTypeOption)
                  }
                />
              </TopLayerWithHover>
            </BaseLayer>
          </div>

          <div className="relative mb-2.5 mr-[30px] w-full text-lightBrown">
            <BaseLayer>
              <TopLayerWithHover>
                <Select
                  options={rarityOptions}
                  selectedOption={selectedRarityOption}
                  handleOptionChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleOptionChange(e, setSelectedRarityOption)
                  }
                />
              </TopLayerWithHover>
            </BaseLayer>
          </div>
          {/*  */}
        </div>
      </div>
    </SwipeableDrawerMUI>
  );
};
