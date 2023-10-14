import { cn } from '@/utils/cn';

import ArrowIndicatorIcon from '../public/arrowIndicatorIcon.svg';

type Props = {
  id?: string;
  children?: React.ReactNode;
  options: any; // FIXME
  selectedOption: any; // FIXME
  handleOptionChange: any; // FIXME
  variant?: 'cardSet';
};

/* TODO
  add icons (set, class, attack, health)
  Any Rarity => Rarity (h6 default value)
  fix ts
*/
export const Select: React.FC<Props> = ({
  id,
  options,
  selectedOption,
  handleOptionChange,
  variant,
}) => {
  return (
    <>
      <div
        className={cn('flex w-full', {
          'items-center': variant === 'cardSet',
          'min-w-[20px]': variant === 'cardSet',
          'min-[1261px]:min-w-[160px]': variant === 'cardSet',
          'max-w-[155px]': variant !== 'cardSet',
          'min-[414px]:max-w-[250px]': variant !== 'cardSet',
          'text-ellipsis': variant !== 'cardSet',
        })}
      >
        <h6
          className={cn(
            'ml-2.5 mr-[30px] flex-1 font-serif text-[16px] leading-none text-mainBrown',
            {
              truncate: variant !== 'cardSet',
              hidden: variant === 'cardSet',
              'min-[1261px]:block': variant === 'cardSet',
              'mr-[15px]': variant === 'cardSet',
            }
          )}
        >
          {selectedOption.name || selectedOption}
        </h6>
        <div
          className={cn('absolute -right-1 z-[2] mt-px h-[17px] w-[17px] rotate-90', {
            'top-[12px]': variant === 'cardSet',
            'right-[-6px]': variant === 'cardSet',
          })}
        >
          <ArrowIndicatorIcon />
        </div>
      </div>
      <select
        {...(id ? { id } : {})}
        className="absolute -left-6 top-0 z-[2] h-full w-[calc(100%_+_48px)] appearance-none border-0 bg-transparent indent-[-1000em] focus:outline-none"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {/* FIXME */}
        {options.map((option: any) => {
          return (
            <option key={option.name} value={option}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
