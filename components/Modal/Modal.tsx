/* eslint-disable react/no-danger */
import { Modal as ModalMUI } from '@mui/material';
import { type Dispatch, type SetStateAction } from 'react';

import type { TCard, TMetadata } from '@/types';

import { CardAttributes } from '../CardAttributes/CardAttributes';
import { CardImage } from '../CardImage/CardImage';
import { LearnMore } from '../LearnMore/LearnMore';
import { RelatedCards } from '../RelatedCards/RelatedCards';
import styles from './style.module.css';

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
      <button type="button" onClick={handleClose} className={styles.closeButton}>
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.startBlock}>
          <div className={styles.imageContainer}>
            <CardImage imgSrc={card.image} alt={card.name} />
          </div>
        </div>

        <div className={styles.details}>
          <h3 className={styles.name}>{card.name}</h3>

          <p dangerouslySetInnerHTML={{ __html: card.flavorText }} className={styles.flavorText} />

          <p dangerouslySetInnerHTML={{ __html: card.text }} className={styles.text} />

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
      slotProps={{ backdrop: { className: styles.customClassName } }}
    >
      <div className={styles.root}>
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
