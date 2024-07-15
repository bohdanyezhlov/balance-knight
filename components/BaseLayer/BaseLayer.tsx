import styles from './style.module.scss';

type Props = {
  as?: 'div';
  children: React.ReactNode;
};

export const BaseLayer: React.FC<Props> = ({ as: Component = 'div', children }) => {
  return <Component className={styles.root}>{children}</Component>;
};
