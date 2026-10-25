import type { CSSProperties } from 'react';
// Drop-in next/image wrapper that serves build-time optimized WebP variants
// (srcset) in a static export — see next.config.mjs.
import Image from 'next-image-export-optimizer';
import styles from './MtgCard.module.css';

// The art window is ~91% of the card width. Match the viewport constraints
// and the stack's 900px card-height cap (~590px of art) so the browser does
// not download oversized variants on tall screens.
const ART_SIZES = 'min(86vw, 64vh, 590px)';

export type MtgCardData = {
  title: string;
  // Art is purely decorative, so no alt text is carried or rendered.
  image: { src: string };
  typeLine: string;
  // Description copy, either plain or with hyperlink segments woven in.
  // Link segments render as anchors that open in a new tab.
  description: string | DescriptionSegment[];
  // Optional: some cards (e.g. the contact card) carry rules text only.
  fluffText?: string;
  accent?: string;
  // Related pigments give the frame depth and tint its labels without
  // changing the shared parchment used for the main text panel.
  frameColors?: {
    highlight: string;
    shadow: string;
    panelTint: string;
    edge: string;
  };
};

export type DescriptionSegment = string | { text: string; href: string };

// Default frame accent, mirroring the --card-accent default in
// MtgCard.module.css. Used when a card carries no accent of its own.
const DEFAULT_ACCENT = '#4c6552';

/**
 * Perceived luminance of a #rgb / #rrggbb color, 0 (black) … 1 (white).
 * Used to flip the engraved frame ink to dark on light accents — bone-cream
 * chevrons and collector numbers would vanish on an off-white frame.
 */
function luminance(hex: string): number {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.replace(/./g, (c) => c + c) : raw;
  const channel = (start: number) => {
    const v = Number.parseInt(full.slice(start, start + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

export type MtgCardProps = MtgCardData & {
  // 1-based position in the deck and the deck size, shown as the collector
  // line ("3/7") at the bottom of the card.
  ordinal: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
};

/**
 * Directional chevron, deliberately drawn (not a font glyph) with a fine,
 * visible stroke. It carries no button box: the "engraved into the frame"
 * relief and the hover response live in the `.chevron` / `.flip` CSS.
 */
function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
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
  frameColors,
  ordinal,
  total,
  onPrev,
  onNext,
}: MtgCardProps) {
  const accentColor = accent ?? DEFAULT_ACCENT;
  // Frame engraving ink: bone cream with a dark lip on the dark accents,
  // mirrored to dark ink with a light lip on light (off-white) frames.
  const ink =
    luminance(accentColor) > 0.45
      ? { ink: '27, 22, 16', lip: '255, 255, 255', bright: '#000000' }
      : { ink: '242, 236, 219', lip: '0, 0, 0', bright: '#fffdf6' };
  const descriptionParts: DescriptionSegment[] =
    typeof description === 'string' ? [description] : description;

  return (
    <article
      className={styles.card}
      style={
        {
          '--card-accent': accentColor,
          '--card-highlight': frameColors?.highlight ?? accentColor,
          '--card-shadow': frameColors?.shadow ?? accentColor,
          '--card-panel-tint': frameColors?.panelTint ?? '#eee5d2',
          '--card-panel-edge': frameColors?.edge ?? '#282a25',
          '--card-ink-rgb': ink.ink,
          '--card-ink-lip-rgb': ink.lip,
          '--card-ink-bright': ink.bright,
        } as CSSProperties
      }
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
          <p className={styles.description}>
            {descriptionParts.map((part, i) =>
              typeof part === 'string' ? (
                part
              ) : (
                // Contact links: a new tab, and no opener leakage.
                <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
                  {part.text}
                </a>
              ),
            )}
          </p>
          {fluffText && <p className={styles.fluffText}>{fluffText}</p>}
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
