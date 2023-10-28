import type { TOption } from '@/types';
import { cn } from '@/utils/cn';
import { getSelectIcon } from '@/utils/getSelectIcon';

import ArrowIndicatorIcon from '../public/arrowIndicatorIcon.svg';

const customTextMapping: Record<string, string> = {
  manaCost: 'Mana',
  attack: 'Attack',
  health: 'Health',
  type: 'Card Type',
  minionType: 'Minion Type',
  rarity: 'Rarity',
  spellSchool: 'Spell school',
  keyword: 'Keywords',
};

const getOptionNameBySlug = (slug: string, options: TOption[]) => {
  const option = options.find((opt) => opt.slug === slug);

  if (option?.name.includes('Any')) {
    const customName = customTextMapping[option.id];

    return customName;
  }

  return option ? option.name : 'Option not found';
};

type Props = {
  id?: string;
  options: TOption[];
  selectedOption: TOption;
  handleOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  variant?: string;
  hasIcon?: boolean;
  isDesktopView?: boolean;
};

export const Select: React.FC<Props> = ({
  id,
  options,
  selectedOption,
  handleOptionChange,
  variant,
  hasIcon,
  isDesktopView,
}) => {
  const SVGIcon =
    hasIcon && variant === 'cardSet' ? (getSelectIcon(variant, selectedOption.slug) as any) : null;

  return (
    <>
      <div
        className={cn('flex', {
          'w-full': !isDesktopView,
          'min-w-[120px]': isDesktopView && variant === 'class',
          'items-center': variant === 'cardSet',
          'min-w-[20px]': variant === 'cardSet',
          'min-[1261px]:min-w-[160px]': variant === 'cardSet',
          'max-w-[155px]': variant !== 'cardSet' && !isDesktopView,
          'min-[414px]:max-w-[250px]': variant !== 'cardSet' && !isDesktopView,
          'text-ellipsis': variant !== 'cardSet' && !isDesktopView,
        })}
      >
        {hasIcon && variant && (
          <div
            className={cn(
              'absolute left-[-14px] top-[6px] h-[30px] w-[30px] bg-cover bg-center bg-no-repeat fill-gold',
              getSelectIcon(variant, variant === 'class' ? selectedOption.slug : '')
            )}
          >
            {SVGIcon && <SVGIcon />}
          </div>
        )}

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
          {getOptionNameBySlug(selectedOption.slug, options)}
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
        value={JSON.stringify(selectedOption)}
        onChange={handleOptionChange}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={JSON.stringify(option)}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
