/* eslint-disable react/no-danger */
import { Modal as ModalMUI } from '@mui/material';
import { type Dispatch, type SetStateAction } from 'react';

import type { TCard, TMetadata } from '@/types';

import { CardAttributes } from './CardAttributes';
import { CardImage } from './CardImage';
import { LearnMore } from './LearnMore';
import { RelatedCards } from './RelatedCards';

const ModalContent = ({
  card,
  metadata,
  handleClose,
  setIsOpen,
}: {
  card: TCard;
  metadata: TMetadata;
  handleClose: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* NOTE position fixed does not work if parent has transform */}
      <button
        type="button"
        onClick={handleClose}
        className="pointer-events-auto fixed right-[19px] top-[52px] z-[10000] block cursor-pointer text-[36px] font-bold text-gold min-[1280px]:right-[35px] min-[1280px]:top-[35px]"
      >
        ✕
      </button>

      <div className="absolute left-1/2 top-[45px] w-full max-w-[980px] -translate-x-1/2 p-[50px_30px_30px] md+:top-1/2 md+:flex md+:-translate-y-1/2 md+:justify-center">
        <div className="pointer-events-auto relative md+:mr-[25px] md+:w-[375px]">
          <div className="relative mx-auto flex h-full w-[80%] items-center justify-center md+:w-full">
            <CardImage imgSrc={card.image} alt={card.name} />
          </div>
        </div>

        <div className="mb-10 select-text overflow-y-visible pb-[30px] pt-[25px] text-white min-[420px]:w-[460px] min-[420px]:pt-[50px] md+:max-h-[518px]">
          <h3 className="mt-[0.15em] break-keep font-serif text-[22.781px] font-normal leading-[1] min-[375px]:text-[calc(22.781px_+_8.219_*_((100vw_-_375px)_/_1225))]">
            {card.name}
          </h3>

          <p
            dangerouslySetInnerHTML={{ __html: card.flavorText }}
            className="my-[5px] break-keep text-[18px] italic opacity-50"
          />

          <p
            dangerouslySetInnerHTML={{ __html: card.text }}
            className="my-[5px] break-keep text-[18px]"
          />

          <CardAttributes card={card} metadata={metadata} setIsOpen={setIsOpen} />

          <LearnMore card={card} metadata={metadata} />

          <RelatedCards card={card} />
        </div>
      </div>
    </>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  cards: TCard[];
  metadata: TMetadata;
};

export const Modal: React.FC<Props> = ({ isOpen, setIsOpen, id, cards, metadata }) => {
  const [card] = cards.filter((c) => c.id === id);

  const handleClose = () => setIsOpen(false);

  if (!card || !metadata) return null;

  return (
    <ModalMUI
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{ backdrop: { className: '!bg-[rgba(0,0,0,0.9)]' } }}
    >
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
        <ModalContent
          card={card}
          metadata={metadata}
          handleClose={handleClose}
          setIsOpen={setIsOpen}
        />
      </div>
    </ModalMUI>
  );
};
