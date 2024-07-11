import clsx from 'clsx';

import styles from './style.module.scss';

type Props = {
  as?: 'div' | 'button';
  imgSet?: 'dark' | 'light';
  onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  children: React.ReactNode;
  hasIcon?: boolean;
};

export const TopLayerWithHover: React.FC<Props> = ({
  as: Component = 'div',
  imgSet,
  onClick,
  children,
  hasIcon = false,
}) => {
  if (Component === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(styles.dropdown, styles.button, {
          [styles.search]: imgSet === 'dark',
        })}
      >
        {children}
      </button>
    );
  }

  return (
    <Component
      className={clsx(styles.dropdown, {
        [styles.search]: imgSet === 'dark',
        [styles.iconLeft]: hasIcon,
      })}
    >
      {children}
    </Component>
  );
};
