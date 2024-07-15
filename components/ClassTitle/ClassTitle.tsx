import clsx from 'clsx';

import { getSvgTitle } from '@/utils/getSvgTitle';

import styles from './style.module.scss';

type Props = {
  name: string;
};

export const ClassTitle: React.FC<Props> = ({ name }) => {
  const Title = getSvgTitle(name) as any; // FIXME

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        <li className={clsx(styles.item, styles.leftStart, styles.start)} />
        <li className={clsx(styles.item, styles.leftMiddle, styles.middle)} />
        <li className={clsx(styles.item, styles.leftEnd, styles.end)} />

        <li className={styles.itemTitle}>
          <div className={styles.titleContent}>
            <Title className={styles.title} />
            <h5 className={styles.subtitle}>{name}</h5>
          </div>
        </li>

        <li className={clsx(styles.item, styles.rightStart, styles.start)} />
        <li className={clsx(styles.item, styles.rightMiddle, styles.middle)} />
        <li className={clsx(styles.item, styles.rightEnd, styles.end)} />
      </ul>
    </div>
  );
};
