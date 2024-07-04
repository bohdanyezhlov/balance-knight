import { FilterTags } from '../FilterTags';
import styles from './style.module.scss';

type Props = {};

export const EmptyCardGrid: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.emptyArt} />
      <div className={styles.divider} />

      <div className={styles.content}>
        <h5 className={styles.title}>No cards found</h5>
        <p className={styles.text}>Try removing search item(s) for better results</p>

        <div className={styles.tagsContainer}>
          <FilterTags />
        </div>
      </div>

      <div className={styles.line} />
    </div>
  );
};
