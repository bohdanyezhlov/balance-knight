import { CardGridLayout } from '@/components/CardGridLayout/CardGridLayout';
import { FilterBar } from '@/components/FilterBar';
import { StatusBar } from '@/components/StatusBar';

import styles from './page.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <FilterBar />

      <div className={styles.root}>
        <StatusBar />
        <CardGridLayout />
      </div>
    </>
  );
};

export default Home;
