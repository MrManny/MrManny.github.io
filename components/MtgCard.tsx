import type { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './MtgCard.module.css';

export type MtgCardData = {
  title: string;
  image: { src: string; alt: string };
  typeLine: string;
  fluffText: string;
  accent?: string;
};

export type MtgCardProps = MtgCardData & {
  onPrev?: () => void;
  onNext?: () => void;
};

export default function MtgCard({
  title,
  image,
  typeLine,
  fluffText,
  accent,
  onPrev,
  onNext,
}: MtgCardProps) {
  return (
    <article
      className={styles.card}
      style={accent ? ({ '--card-accent': accent } as CSSProperties) : undefined}
    >
      <div className={styles.frame}>
        <header className={styles.titleBar}>
          <h1 className={styles.title}>{title}</h1>
        </header>

        <figure className={styles.artWindow}>
          <Image className={styles.art} src={image.src} alt={image.alt} fill sizes="100vw" loading="eager" />
        </figure>

        <div className={styles.typeBar}>
          <p className={styles.typeLine}>{typeLine}</p>
        </div>

        <section className={styles.fluff}>
          <p className={styles.fluffText}>{fluffText}</p>
        </section>

        <nav className={styles.bar} aria-label="Card flip">
          <button
            type="button"
            className={styles.flip}
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous card"
          >
            ‹
          </button>
          <span className={styles.barSpacer} aria-hidden="true" />
          <button
            type="button"
            className={styles.flip}
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next card"
          >
            ›
          </button>
        </nav>
      </div>
    </article>
  );
}
