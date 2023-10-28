import SettingsIcon from '../public/settingsIcon.svg';
import { BaseLayer } from './BaseLayer';
import { TopLayerWithHover } from './TopLayerWithHover';

type Props = {
  isOpen: boolean;
  toggleDrawer: (v: boolean) => React.ReactEventHandler<{}>;
};

export const FilterDrawer: React.FC<Props> = ({ isOpen, toggleDrawer }) => {
  return (
    <div className="relative mr-[30px] flex justify-end md+:flex-1">
      <BaseLayer>
        <TopLayerWithHover as="button" onClick={toggleDrawer(!isOpen)}>
          <div className="absolute left-[-5px] top-1.5 z-[101] h-[30px] w-[30px] fill-darkBrown">
            <SettingsIcon />
          </div>

          <h6 className="mx-2.5 hidden font-serif text-[16px] font-bold text-mainBrown min-[1261px]:block">
            Filters
          </h6>
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
