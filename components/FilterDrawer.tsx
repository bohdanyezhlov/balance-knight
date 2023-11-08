import { useSearchParams } from 'next/navigation';

import { useScreenSize } from '@/hooks/useScreenSize';

import SettingsIcon from '../public/settingsIcon.svg';
import { BaseLayer } from './BaseLayer';
import { FilterCounter } from './FilterCounter';
import { TopLayerWithHover } from './TopLayerWithHover';

const mobileKeys = [
  'class',
  'attack',
  'manaCost',
  'health',
  'type',
  'minionType',
  'spellSchool',
  'rarity',
  'keyword',
];

const desktopKeys = ['attack', 'health', 'type', 'minionType', 'spellSchool', 'rarity', 'keyword'];

type Props = {
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const FilterDrawer: React.FC<Props> = ({ isOpen, toggleDrawer }) => {
  const screenSize = useScreenSize();
  const searchParams = useSearchParams();
  const params = Array.from(searchParams).map(([param, value]) => ({ param, value }));
  const preservedKeys = (screenSize?.width ?? 0) >= 960 ? desktopKeys : mobileKeys;
  const activeFilters = params.filter((param) => preservedKeys.includes(param.param));

  return (
    <div className="relative mr-[30px] flex justify-end md+:flex-1">
      <BaseLayer>
        <TopLayerWithHover as="button" onClick={toggleDrawer(!isOpen)}>
          <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-darkBrown">
            <SettingsIcon />
          </div>

          <h6 className="mx-2.5 my-0 hidden font-serif text-[16px] font-bold text-mainBrown min-[1261px]:block">
            Filters
          </h6>

          {activeFilters.length > 0 && <FilterCounter filters={activeFilters} />}
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
