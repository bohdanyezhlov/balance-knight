import { FilterTags } from './FilterTags';

type Props = {};

export const EmptyCardGrid: React.FC<Props> = () => {
  return (
    <div className="relative z-[1] text-center">
      <div className="relative z-[1] mx-auto mb-[-60px] h-[288px] w-[296px] bg-[url('../public/emptyArt.png')] bg-center bg-no-repeat" />
      <div className="h-[34px] bg-[url('../public/divider.png')] bg-center bg-no-repeat" />

      <div className="px-[15px] py-10">
        <h5 className="font-serif text-[18px] text-mainBrown">No cards found</h5>
        <p className="mb-6 text-mainBrown">Try removing search item(s) for better results</p>

        <div className="flex flex-wrap justify-center">
          <FilterTags />
        </div>
      </div>

      <div className="h-[3px] bg-[url('../public/Line.png')]" />
    </div>
  );
};
