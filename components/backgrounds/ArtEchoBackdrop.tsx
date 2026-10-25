import type { MtgCardData } from '../MtgCard';
import styles from './ArtEchoBackdrop.module.css';

type ArtEchoBackdropProps = {
  cards: MtgCardData[];
  index: number;
};

/**
 * Background layer: an oversized, heavily blurred copy of the active card's
 * art bleeding to every screen edge, crossfading as the deck flips. A faint
 * grain sits on top so the backdrop reads as a surface, not a void.
 */
export default function ArtEchoBackdrop({ cards, index }: ArtEchoBackdropProps) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {cards.map((card, i) => (
        <img
          key={card.image.src}
          src={card.image.src}
          alt=""
          className={`${styles.echo} ${i === index ? styles.echoActive : ''}`}
        />
      ))}
      <div className={styles.grain} />
    </div>
  );
}
