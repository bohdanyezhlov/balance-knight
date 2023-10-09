/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import { Modal as ModalMUI } from '@mui/material';
import Link from 'next/link';

import { CardAttributes } from '@/enums';
import type { TCard, TMetadata } from '@/types';
import { getPropertyForAttribute } from '@/utils/getPropertyForAttribute';

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  id: number;
  cards: TCard[];
  metadata: TMetadata;
};

export const Modal: React.FC<Props> = ({ isOpen, setIsOpen, id, cards, metadata }) => {
  const [card] = cards.filter((c) => c.id === id);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { rarities } = metadata;

  if (!card) return null; // REVIEW

  const handleClose = () => setIsOpen(false);

  const cardAttributesArray = Object.values(CardAttributes).map((attribute) => ({
    attribute,
    [getPropertyForAttribute(attribute)]: card[getPropertyForAttribute(attribute)],
  }));

  return (
    <ModalMUI
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{ backdrop: { className: '!bg-[rgba(0,0,0,0.9)]' } }}
    >
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
        <div className="absolute left-1/2 top-[45px] w-full max-w-[980px] -translate-x-1/2 p-[50px_30px_30px] md+:top-1/2 md+:flex md+:-translate-y-1/2 md+:justify-center">
          <div className="pointer-events-auto relative md+:mr-[25px] md+:w-[375px]">
            <div className="relative mx-auto flex w-[80%] items-center justify-center md+:w-full">
              <img src={card.image} alt={card.name} />
            </div>
          </div>

          <div className="mb-10 select-text overflow-y-visible pb-[30px] pt-[25px] text-white min-[420px]:w-[460px] min-[420px]:pt-[50px] md+:max-h-[518px]">
            <h3 className="mt-[0.15em] break-keep font-serif text-[22px] leading-[1] min-[375px]:text-[calc(22.781px_+_8.219_*_((100vw_-_375px)_/_1225))]">
              {card.name}
            </h3>
            <p className="my-[5px] break-keep text-[18px] italic opacity-50">{card.flavorText}</p>
            <p
              dangerouslySetInnerHTML={{ __html: card.text }}
              className="my-[5px] break-keep text-[18px]"
            />
            <ul className="mt-5 leading-[1.75]">
              {cardAttributesArray.map((cardAttribute) => {
                const [[, key], [attribute, value]] = Object.entries(cardAttribute);

                return (
                  <li key={key} className="ml-5 list-disc font-bold text-lightGold">
                    {key}:{' '}
                    <span className="font-normal text-white">
                      {attribute === 'artistName' ? (
                        <Link
                          href="#"
                          className="text-gold hover:underline hover:underline-offset-1"
                        >
                          {value}
                        </Link>
                      ) : (
                        value
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="pointer-events-auto fixed right-[19px] top-[52px] z-[10000] block cursor-pointer text-[36px] font-bold text-gold min-[1280px]:right-[35px] min-[1280px]:top-[35px]"
        >
          ✕
        </button>
      </div>
    </ModalMUI>
  );
};
