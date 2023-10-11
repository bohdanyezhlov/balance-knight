const middleStyles = `ml-[34px] h-[54px] relative bg-center bg-repeat-x py-1.5 bg-baseLayer-middle`;
const leftStyles = `before:absolute before:-left-[30px] before:top-0 before:h-[54px] before:w-[34px] before:bg-baseLayer-left before:bg-left before:bg-no-repeat before:content-['']`;
const rightStyles = `after:absolute after:-right-[30px] after:top-0 after:h-[54px] after:w-[34px] after:bg-baseLayer-right after:bg-right after:bg-no-repeat after:content-['']`;

type Props = {
  as?: 'div';
  children: React.ReactNode;
};

export const BaseLayer: React.FC<Props> = ({ as: Component = 'div', children }) => {
  return (
    <Component className={`${middleStyles} ${leftStyles} ${rightStyles}`}>{children}</Component>
  );
};
