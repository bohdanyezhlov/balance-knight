type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className=" mx-auto min-h-full w-full max-w-[2600px] overflow-x-hidden">{children}</div>
  );
};
