import type { TMetadata } from '@/types';

import { FilterDrawer } from './FilterDrawer';
import { Search } from './Search';

type Props = {
  metadata: TMetadata;
  cardCount: number;
  isGroupByClass: boolean;
  setIsGroupByClass: (v: boolean) => void;
  setPage: (page: number) => void;
};

export const Navbar: React.FC<Props> = ({
  metadata,
  cardCount,
  isGroupByClass,
  setIsGroupByClass,
  setPage,
}) => {
  return (
    <div className="relative overflow-hidden bg-[url(../public/bgFilterMiddleTile.jpeg)] pt-[11px] before:absolute before:top-0 before:h-[60px] before:w-full before:bg-[url(../public/bgFilterTopTile.png)] before:bg-top before:bg-repeat-x before:content-[''] after:absolute after:bottom-[-15px] after:h-[60px] after:w-full after:bg-[url(../public/bgFilterBottomTile.png)] after:bg-top after:bg-repeat-x after:content-['']">
      <nav className="relative z-[2] mx-auto flex h-[93px] w-[calc(90%_+_15px)] max-w-[1600px] items-center justify-center py-2.5 md+:w-full md+:p-[0_5rem_0_2.5rem]">
        <Search />

        <FilterDrawer
          cardCount={cardCount}
          metadata={metadata}
          isGroupByClass={isGroupByClass}
          setIsGroupByClass={setIsGroupByClass}
          setPage={setPage}
        />
      </nav>
    </div>
  );
};
