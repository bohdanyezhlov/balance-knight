import { useEffect, useState } from 'react';

import { getMetadata } from '@/api/getMetadata';
import type { CardSet } from '@/types';

/* eslint-disable react/no-array-index-key */
export const Navbar = () => {
  const [sets, setSets] = useState<CardSet[]>([]);

  const fetchMetadata = async () => {
    const { sets: setsData } = await getMetadata();
    setSets(setsData);
  };

  useEffect(() => {
    fetchMetadata();
  }, []);
  return (
    <div className="overflow-hidden bg-[url(https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/bg_filter_middle_tile-907853600f2b8dc11ae3acca94ff309f58b4959f380a6995e1b69b2d94f4bae5811b3ec588d56290599d59ddf6d00f0ce3fa9087c08ee8f7eabe843ed3646f9d.jpg)]">
      <nav className=" flex">
        <select className=" bg-transparent">
          {sets.map(({ name, id, slug }) => (
            <option key={id} value={slug}>
              {name}
            </option>
          ))}
        </select>

        {/* <select className=" bg-black"> // NOTE Desktop version
          <option value="">All Classes</option>
        </select> */}

        {/* <div> // NOTE Desktop version
          {Array(11)
            .fill(null)
            .map((_, i) => {
              return (
                <button type="button" key={i}>
                  {i}
                </button>
              );
            })}
        </div> */}

        <div>
          <input type="search" placeholder="Search" />
        </div>

        <button type="button">Filters</button>
      </nav>
    </div>
  );
};
