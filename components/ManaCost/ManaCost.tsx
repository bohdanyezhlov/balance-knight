import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';

import { BaseLayer } from '../BaseLayer/BaseLayer';
import { TopLayerWithHover } from '../TopLayerWithHover/TopLayerWithHover';
import styles from './style.module.scss';

const NUM_OF_MANA_CRYSTALS = 11;
const manaCrystalNumbers = Array.from({ length: NUM_OF_MANA_CRYSTALS }, (_, i) =>
  i === NUM_OF_MANA_CRYSTALS - 1 ? '10 +' : i.toString()
);

type Props = {};

export const ManaCost: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPage } = usePageContext();
  const manaCostParam = searchParams.get('manaCost') || '';
  const [activeManaCosts, setActiveManaCosts] = useState<string[]>([]);

  useEffect(() => {
    if (manaCostParam === '') {
      setActiveManaCosts([]);
    } else {
      const currActiveManaCosts = manaCostParam.split(',');
      setActiveManaCosts(currActiveManaCosts);
    }
  }, [manaCostParam]);

  useEffect(() => {
    const newManaCostParam = activeManaCosts.join(',');
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    if (newManaCostParam === '') {
      currentSearchParams.delete('manaCost');
    } else {
      currentSearchParams.set('manaCost', newManaCostParam);
    }

    router.push(`?${currentSearchParams.toString()}`);
    setPage(1);
  }, [activeManaCosts, searchParams, router, setPage]);

  const handleButtonClick = (id: string) => {
    setActiveManaCosts((prevActiveManaCosts) => {
      if (prevActiveManaCosts.includes(id)) {
        return prevActiveManaCosts.filter((cost) => cost !== id);
      }

      return [...prevActiveManaCosts, id];
    });
  };

  return (
    <div className={styles.root}>
      <BaseLayer>
        <TopLayerWithHover imgSet="dark">
          <div className={styles.manaCrystalsContainer}>
            {manaCrystalNumbers.map((number, i) => (
              <button
                type="button"
                key={i}
                className={clsx(styles.manaCrystal, {
                  [styles.last]: i === manaCrystalNumbers.length - 1,
                  [styles.active]: activeManaCosts.includes(number),
                })}
                onClick={() => handleButtonClick(number)}
              >
                <h4
                  className={clsx(styles.value, {
                    [styles.last]: i === manaCrystalNumbers.length - 1,
                  })}
                >
                  {number}
                </h4>
              </button>
            ))}
          </div>
        </TopLayerWithHover>
      </BaseLayer>
    </div>
  );
};
