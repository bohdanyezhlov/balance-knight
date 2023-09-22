import { getSvgForTitle } from '@/utils/getSvgForTitle';

type Props = {
  name: string;
};

export const ClassTitle: React.FC<Props> = ({ name }) => {
  const Title = getSvgForTitle(name) as any; // FIXME remove any

  return (
    <div className="-mb-5">
      <ul className="flex justify-center">
        <li className="h-[1.125rem] w-5 min-w-[22px] grow-0 bg-[url('../public/titleLeftStart.png')] bg-top pb-[30px] opacity-40"></li>
        <li className="grow-2 h-[1.125rem] min-w-[70px] bg-[url('../public/titleLeftMiddle.png')] bg-[length:100%_66.2%] bg-top bg-no-repeat opacity-40"></li>
        <li className="h-[1.125rem] w-5 min-w-[20px] grow-0 bg-[url('../public/titleLeftEnd.png')] bg-top bg-no-repeat pb-[30px] opacity-40"></li>

        <li className="min-[768px]:p-x-[30px] min-w-fit">
          <div className="relative -top-[30px] mx-10 h-[75px] w-[300px]">
            <Title className="fill-mainBrown opacity-40" />
            <h5 className="absolute left-1/2 top-1/2 w-[135px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-banner text-xl text-mainBrown">
              {name}
            </h5>
          </div>
        </li>

        <li className="h-[1.125rem] w-5 min-w-[20px] grow-0 bg-[url('../public/titleRightStart.png')] bg-top bg-no-repeat pb-[30px] opacity-40"></li>
        <li className="grow-2 h-[1.125rem] min-w-[70px] bg-[url('../public/titleRightMiddle.png')] bg-[length:100%_66.2%] bg-top bg-no-repeat opacity-40"></li>
        <li className="h-[1.125rem] w-5 min-w-[22px] grow-0 bg-[url('../public/titleRightEnd.png')] bg-top pb-[30px] opacity-40"></li>
      </ul>
    </div>
  );
};
