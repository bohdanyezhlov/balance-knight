import { cn } from '@/utils/cn';

const middleStyles = `relative z-[1] -mx-[3px] flex h-[42px] cursor-pointer items-center bg-topLayer-middle bg-center transition-all duration-150 ease-[ease] hover:bg-topLayer-middle-hover`;
const leftStyles = `before:absolute before:-left-[24px] before:top-0 before:h-[42px] before:w-[24px] before:bg-topLayer-left before:bg-left before:bg-no-repeat before:transition-all before:duration-150 before:ease-[ease] before:content-[''] hover:before:bg-topLayer-left-hover`;
const rightStyles = `after:absolute after:-right-[24px] after:top-0 after:h-[42px] after:w-[24px] after:bg-topLayer-right after:bg-right after:bg-no-repeat after:transition-all after:duration-150 after:ease-[ease] after:content-[''] hover:after:bg-topLayer-right-hover`;

const searchMiddle = 'bg-topLayer-middle-search hover:bg-topLayer-middle-hover-search';
const searchLeft = 'before:bg-topLayer-left-search hover:before:bg-topLayer-left-hover-search';
const searchRight = 'after:bg-topLayer-right-search hover:after:bg-topLayer-right-hover-search';

const iconLeft = 'before:bg-topLayer-left-icon hover:before:bg-topLayer-left-icon-hover';

type Props = {
  as?: 'div' | 'button';
  imgSet?: string;
  onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  children: React.ReactNode;
  hasIcon?: boolean;
};

export const TopLayerWithHover: React.FC<Props> = ({
  as: Component = 'div',
  imgSet = 'default',
  onClick,
  children,
  hasIcon = false,
}) => {
  if (Component === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          `pl-5 focus-visible:outline-none ${middleStyles} ${leftStyles} ${rightStyles}`,
          imgSet === 'search' ? `${searchMiddle} ${searchLeft} ${searchRight}` : ''
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <Component
      className={cn(
        `${middleStyles} ${leftStyles} ${rightStyles}`,
        imgSet === 'search' ? `${searchMiddle} ${searchLeft} ${searchRight}` : '',
        hasIcon ? iconLeft : '',
        {
          'pl-5': hasIcon,
          'before:w-[50px]': hasIcon,
          'before:-left-10': hasIcon,
          'before:ml-[15px]': hasIcon,
        }
      )}
    >
      {children}
    </Component>
  );
};
