import { CardGridLayout } from '@/components/CardGridLayout';
import { FilterBar } from '@/components/FilterBar';
import { StatusBar } from '@/components/StatusBar';

const Home: React.FC = () => {
  return (
    <>
      <FilterBar />

      <div className="mt-[104px]">
        <StatusBar />
        <CardGridLayout />
      </div>
    </>
  );
};

export default Home;
