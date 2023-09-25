import type { Metadata } from '@/types';
import { FilterDrawer } from './FilterDrawer';

type Props = {
  metadata: Metadata;
  cardCount: number;
};

export const Navbar: React.FC<Props> = ({ metadata, cardCount }) => {
  return (
    <div className="overflow-hidden bg-[url(https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/bg_filter_middle_tile-907853600f2b8dc11ae3acca94ff309f58b4959f380a6995e1b69b2d94f4bae5811b3ec588d56290599d59ddf6d00f0ce3fa9087c08ee8f7eabe843ed3646f9d.jpg)]">
      <nav className=" flex">
        <FilterDrawer cardCount={cardCount} />
      </nav>
    </div>
  );
};
