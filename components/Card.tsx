import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

type Props = {
  slug: string;
  imgSrc: string;
  alt: string;
  isLast: boolean;
  newLimit: () => void;
};

export const Card: React.FC<Props> = ({ slug, imgSrc, alt, isLast, newLimit }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      {/* Link href={slug} */}
      <div ref={cardRef}>
        <div className="mb-5 flex h-[220px] w-[150px] items-center min-[531px]:h-[350px] min-[531px]:w-[240px]">
          <div className="relative h-full w-full">
            <Image
              fill
              sizes="100%, 100%" // FIXME add real sizes
              src={imgSrc}
              alt={alt}
              className="drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] transition-opacity duration-300 ease-[ease] hover:drop-shadow-[0_0_3px_rgb(255,255,255)]"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};
