import styles from './style.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
