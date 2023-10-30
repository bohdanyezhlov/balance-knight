import { getSvgTitle } from '@/utils/getSvgTitle';

type Props = {
  name: string;
};

export const ClassTitle: React.FC<Props> = ({ name }) => {
  const Title = getSvgTitle(name) as any; // FIXME

  return (
    <div className="-mb-5">
      <ul className="flex justify-center">
        <li className="h-[1.125rem] w-5 min-w-[22px] grow-0 bg-[url('../public/titleLeftStart.png')] bg-top pb-[30px] opacity-40" />
        <li className="h-[1.125rem] min-w-[70px] grow-2 bg-[url('../public/titleLeftMiddle.png')] bg-[length:100%_66.2%] bg-top bg-no-repeat opacity-40" />
        <li className="h-[1.125rem] w-5 min-w-[20px] grow-0 bg-[url('../public/titleLeftEnd.png')] bg-top bg-no-repeat pb-[30px] opacity-40" />

        <li className="min-w-fit md:px-[30px]">
          <div className="relative top-[-30px] mx-10 h-[75px] w-[300px]">
            <Title className="fill-mainBrown opacity-40" />
            <h5 className="absolute left-1/2 top-1/2 w-[135px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-serif text-xl text-mainBrown">
              {name}
            </h5>
          </div>
        </li>

        <li className="h-[1.125rem] w-5 min-w-[20px] grow-0 bg-[url('../public/titleRightStart.png')] bg-top bg-no-repeat pb-[30px] opacity-40" />
        <li className="h-[1.125rem] min-w-[70px] grow-2 bg-[url('../public/titleRightMiddle.png')] bg-[length:100%_66.2%] bg-top bg-no-repeat opacity-40" />
        <li className="h-[1.125rem] w-5 min-w-[22px] grow-0 bg-[url('../public/titleRightEnd.png')] bg-top pb-[30px] opacity-40" />
      </ul>
    </div>
  );
};
