import ArrowIndicator from '../public/arrowIndicator.svg';

type Props = {
  id?: string;
  children?: React.ReactNode;
  options: any; // FIXME
  selectedOption: any; // FIXME
  handleOptionChange: any; // FIXME
};

/* TODO
  add icons (set, class, attack, health)
  Any Rarity => Rarity (h6 default value)
  fix ts
*/
export const Select: React.FC<Props> = ({ id, options, selectedOption, handleOptionChange }) => {
  return (
    <>
      <div className="flex w-full max-w-[155px] text-ellipsis min-[414px]:max-w-[250px]">
        <h6 className="ml-2.5 mr-[30px] flex-1 truncate font-serif text-[16px] leading-none text-mainBrown">
          {selectedOption.name}
        </h6>
        <div className="absolute -right-1 z-[2] mt-px h-[17px] w-[17px] rotate-90">
          <ArrowIndicator />
        </div>
      </div>
      <select
        {...(id ? { id } : {})}
        className="absolute -left-6 top-0 z-[2] h-full w-[calc(100%_+_48px)] appearance-none border-0 bg-transparent indent-[-1000em] focus:outline-none"
        value={JSON.stringify(selectedOption)}
        onChange={handleOptionChange}
      >
        {/* FIXME */}
        {options.map((option: any) => (
          <option key={option.name} value={JSON.stringify(option)}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};
