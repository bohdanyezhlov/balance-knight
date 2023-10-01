import Image from 'next/image';
import { useState } from 'react';

import CheckImage from '../public/check.png';

export const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor="groupByClass"
      className="mb-2.5 block cursor-pointer text-clip whitespace-nowrap font-banner text-[16px] text-white"
    >
      <input
        type="checkbox"
        name="groupByClass"
        id="groupByClass"
        className="sr-only"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <div
        aria-hidden="true"
        className="relative top-[7px] mr-2.5 inline-block h-[26px] w-[26px] rounded-[5px] border-2 border-solid border-[#ffffff33] bg-[#000000cc]"
      >
        <Image
          width={23}
          height={23}
          src={CheckImage}
          alt="Checkbox"
          className={`${isChecked ? 'opacity-100' : 'opacity-0'} absolute inset-0 h-[23px]`}
        />
      </div>
      Group By Class
    </label>
  );
};
