type Props = {
  tag: keyof JSX.IntrinsicElements;
  onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  children: React.ReactNode;
};

export const TopLayerWithHover: React.FC<Props> = ({ tag, onClick, children }) => {
  const Component = tag;
  const middleStyles = `relative z-[1] -mx-[3px] flex h-[42px] cursor-pointer items-center bg-topLayer-middle bg-center transition-all duration-150 ease-[ease] hover:bg-topLayer-middle-hover`;
  const leftStyles = `before:absolute before:-left-[24px] before:top-0 before:h-[42px] before:w-[24px] before:bg-topLayer-left before:bg-left before:bg-no-repeat before:transition-all before:duration-150 before:ease-[ease] before:content-[''] hover:before:bg-topLayer-left-hover`;
  const rightStyles = `after:absolute after:-right-[24px] after:top-0 after:h-[42px] after:w-[24px] after:bg-topLayer-right after:bg-right after:bg-no-repeat after:transition-all after:duration-150 after:ease-[ease] after:content-[''] hover:after:bg-topLayer-right-hover`;

  if (tag === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`pl-5 focus-visible:outline-none ${middleStyles} ${leftStyles} ${rightStyles}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Component className={`${middleStyles} ${leftStyles} ${rightStyles}`}>{children}</Component>
  );
};
