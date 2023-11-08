import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePageContext } from '@/contexts/PageContext';
import { cn } from '@/utils/cn';

import { BaseLayer } from './BaseLayer';
import { TopLayerWithHover } from './TopLayerWithHover';

const NUM_OF_MANA_CRYSTALS = 11;
const manaCrystalNumbers = Array.from({ length: NUM_OF_MANA_CRYSTALS }, (_, i) =>
  i === NUM_OF_MANA_CRYSTALS - 1 ? '10 +' : i.toString()
);

const textShadowStyle = {
  textShadow:
    'rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.95885px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.14147px 1.99499px 0px, rgb(0, 0, 0) -0.83229px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.70157px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.42159px -1.95506px 0px, rgb(0, 0, 0) 0.56732px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.55883px 0px',
};

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
    <div className="relative mr-[30px]">
      <BaseLayer>
        <TopLayerWithHover imgSet="dark">
          <div className="-mx-2.5 flex items-center">
            {manaCrystalNumbers.map((number, i) => (
              <button
                type="button"
                key={i}
                className={cn(
                  "relative z-[101] flex h-[34px] w-[36px] items-center justify-center bg-[url(../public/iconMana.png)] bg-contain bg-center bg-no-repeat transition-opacity duration-150 ease-[ease] before:absolute before:-inset-2.5 before:bg-[url(../public/iconManaHoverSelected.png)] before:bg-center before:bg-no-repeat before:opacity-0 before:content-[''] hover:before:opacity-100",
                  {
                    'bg-[url(../public/iconManaPlus.png)]': i === manaCrystalNumbers.length - 1,
                    'before:bg-left': i === manaCrystalNumbers.length - 1,
                    'w-[60px]': i === manaCrystalNumbers.length - 1,
                    'before:opacity-100': activeManaCosts.includes(number),
                  }
                )}
                onClick={() => handleButtonClick(number)}
              >
                <h4
                  style={textShadowStyle}
                  className={cn(
                    'relative my-0 whitespace-nowrap font-serif text-[25px] font-bold text-white',
                    {
                      'w-full': i === manaCrystalNumbers.length - 1,
                      'text-left': i === manaCrystalNumbers.length - 1,
                      'ml-[5px]': i === manaCrystalNumbers.length - 1,
                    }
                  )}
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
