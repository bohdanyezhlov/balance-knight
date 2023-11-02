const textShadowStyle = {
  textShadow:
    'rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.95885px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.14147px 1.99499px 0px, rgb(0, 0, 0) -0.83229px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.70157px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.42159px -1.95506px 0px, rgb(0, 0, 0) 0.56732px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.55883px 0px',
};

type Props = {
  filters: {
    param: string;
    value: string;
  }[];
};

export const FilterCounter: React.FC<Props> = ({ filters }) => {
  return (
    <div
      style={textShadowStyle}
      className="absolute -inset-x-5 bottom-[-15px] z-[102] mx-auto h-[26px] w-[32px] bg-[url('../public/filterNumberBg.png')] text-center font-serif text-[16px] text-white min-[421px]:bottom-0 min-[421px]:left-auto min-[421px]:right-[-32px]"
    >
      {filters.length}
    </div>
  );
};
