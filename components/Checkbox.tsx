import Image from 'next/image';

import CheckImage from '../public/check.png';

type Props = {
  isGroupByClass: boolean;
  setIsGroupByClass: (v: boolean) => void;
  setPage: (page: number) => void;
};

export const Checkbox: React.FC<Props> = ({ isGroupByClass, setIsGroupByClass, setPage }) => {
  const handleChange = () => {
    setPage(1);
    setIsGroupByClass(!isGroupByClass);
  };

  return (
    <label
      htmlFor="groupByClass"
      className="mb-2.5 block cursor-pointer text-clip whitespace-nowrap font-serif text-[16px] text-white"
    >
      <input
        type="checkbox"
        name="groupByClass"
        id="groupByClass"
        className="sr-only"
        checked={isGroupByClass}
        onChange={handleChange}
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
          className={`${isGroupByClass ? 'opacity-100' : 'opacity-0'} absolute inset-0 h-[23px]`}
        />
      </div>
      Group By Class
    </label>
  );
};
