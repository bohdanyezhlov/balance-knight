import styles from './style.module.scss';

type Props = {
  filters: {
    param: string;
    value: string;
  }[];
};

export const FilterCounter: React.FC<Props> = ({ filters }) => {
  return <div className={styles.root}>{filters.length}</div>;
};
