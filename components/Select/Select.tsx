import clsx from 'clsx';

import type { TOption } from '@/types';
import { getSelectIcon } from '@/utils/getSelectIcon';

import ArrowIndicatorIcon from '../public/arrowIndicatorIcon.svg';
import styles from './style.module.scss';

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
        className={clsx(styles.root, {
          [styles.mobile]: !isDesktopView,
          [styles.desktopClass]: isDesktopView && variant === 'class',

          [styles.cardSet]: variant === 'cardSet',
          [styles.cardSet]: variant === 'cardSet',
          [styles.cardSet]: variant === 'cardSet',

          [styles.notCardSet]: variant !== 'cardSet' && !isDesktopView,
          [styles.notCardSet]: variant !== 'cardSet' && !isDesktopView,
          [styles.notCardSet]: variant !== 'cardSet' && !isDesktopView,
        })}
      >
        {hasIcon && variant && (
          <div
            className={clsx(
              styles.icon,
              styles[getSelectIcon(variant, variant === 'class' ? selectedOption.slug : '') || '']
            )}
          >
            {SVGIcon && <SVGIcon />}
          </div>
        )}

        <h6
          className={clsx(styles.title, {
            [styles.truncate]: variant !== 'cardSet',
            [styles.cardSet]: variant === 'cardSet',
          })}
        >
          {getOptionNameBySlug(selectedOption.slug, options)}
        </h6>

        <div
          className={clsx(styles.arrowIndicatorIcon, {
            [styles.cardSet]: variant === 'cardSet',
          })}
        >
          <ArrowIndicatorIcon />
        </div>
      </div>

      <select
        {...(id ? { id } : {})}
        className={styles.select}
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
