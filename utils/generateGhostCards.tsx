import styles from './generateGhostCards.module.scss';

export const generateGhostCards = (count: number) =>
  Array.from({ length: count }, (_, i) => <div key={`ghost_${i}`} className={styles.root} />);
