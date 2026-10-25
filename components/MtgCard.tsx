import type { CSSProperties } from 'react';
// Drop-in next/image wrapper that serves build-time optimized WebP variants
// (srcset) in a static export — see next.config.mjs.
import Image from 'next-image-export-optimizer';
import styles from './MtgCard.module.css';

// The art window is ~91% of the card width; the card itself is capped at
// ~95vw and at 0.714 × its height. min(86vw, 64vh) is that width in viewport
// units, so the browser can pick the right srcset entry per device.
const ART_SIZES = 'min(86vw, 64vh)';

export type MtgCardData = {
  title: string;
  // Art is purely decorative, so no alt text is carried or rendered.
  image: { src: string };
  typeLine: string;
  description: string;
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
  description,
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
          <Image
            className={styles.art}
            src={image.src}
            alt=""
            fill
            sizes={ART_SIZES}
            loading="eager"
          />
        </figure>

        <div className={styles.typeBar}>
          <p className={styles.typeLine}>{typeLine}</p>
        </div>

        <section className={styles.fluff}>
          <p className={styles.description}>{description}</p>
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
