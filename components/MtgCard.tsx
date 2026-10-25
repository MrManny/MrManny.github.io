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
  // 1-based position in the deck and the deck size, shown as the collector
  // line ("3/7") at the bottom of the card.
  ordinal: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
};

/**
 * Directional chevron, deliberately drawn (not a font glyph) at a heavy,
 * visible weight. It carries no button box: the "engraved into the frame"
 * relief and the hover response live in the `.chevron` / `.flip` CSS.
 */
function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === 'prev' ? (
        <path d="M15.5 4.5 L8 12 L15.5 19.5" />
      ) : (
        <path d="M8.5 4.5 L16 12 L8.5 19.5" />
      )}
    </svg>
  );
}

export default function MtgCard({
  title,
  image,
  typeLine,
  description,
  fluffText,
  accent,
  ordinal,
  total,
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
            data-flip="prev"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous card"
          >
            <Chevron dir="prev" />
          </button>

          {/* Collector line, echoing the bottom strip of a real Magic card
              (collector number over the artist rule). Decorative for
              assistive tech: the stack announces the position instead. */}
          <div className={styles.collector} aria-hidden="true">
            <span className={styles.counter}>
              {ordinal}/{total}
            </span>
            <span className={styles.leader} />
          </div>

          <button
            type="button"
            className={styles.flip}
            data-flip="next"
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next card"
          >
            <Chevron dir="next" />
          </button>
        </nav>
      </div>
    </article>
  );
}
