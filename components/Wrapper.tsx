type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto min-h-full w-full max-w-[2600px] overflow-x-hidden bg-[#f1d4ab] bg-[url(../public/parchment.jpeg)] bg-center">
      {children}
    </div>
  );
};
