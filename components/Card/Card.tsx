import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { CardImage } from '../CardImage';
import styles from './style.module.scss';

type Props = {
  slug: string;
  id: number;
  imgSrc: string;
  alt: string;
  isLast: boolean;
  newLimit: () => void;
  showModal: (id: number) => void;
};

export const Card: React.FC<Props> = ({ slug, id, imgSrc, alt, isLast, newLimit, showModal }) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast]);

  const handleClick = (idCard: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    showModal(idCard);
  };

  return (
    <Link href={slug} ref={cardRef} onClick={handleClick(id)}>
      <div className={styles.card}>
        <div className={styles.container}>
          <CardImage imgSrc={imgSrc} alt={alt} />
        </div>
      </div>
    </Link>
  );
};
