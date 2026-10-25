import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import MtgCard, { type MtgCardData } from './MtgCard';
import styles from './MtgCardStack.module.css';

export type MtgCardStackProps = {
  cards: MtgCardData[];
  index: number;
  onPrev?: () => void;
  onNext?: () => void;
};

type SlotName = 'active' | 'left' | 'right' | 'hidden';

const SLOT_CLASS: Record<SlotName, string> = {
  active: styles.slotActive,
  left: styles.slotLeft,
  right: styles.slotRight,
  hidden: styles.slotHidden,
};

/** Slot of a card, given its signed wrap-around distance from the active one. */
function slotFor(rel: number): SlotName {
  if (rel === 0) return 'active';
  if (rel === -1) return 'left';
  if (rel === 1) return 'right';
  return 'hidden';
}

/**
 * Deck presentation for a list of cards: the active card in front, its
 * previous/next neighbours fanned out directly behind it (mirrored slant,
 * slightly smaller). Each card keeps its own DOM node and moves between
 * slots, so flipping animates.
 */
export default function MtgCardStack({ cards, index, onPrev, onNext }: MtgCardStackProps) {
  const count = cards.length;
  const gesture = useRef<{ x: number; y: number } | null>(null);

  // Shortest wrap-around distance of card i from the active card:
  // 0 = active, -1 = previous (left), +1 = next (right).
  const relOf = (i: number) => {
    const d = (((i - index) % count) + count) % count;
    return d > count / 2 ? d - count : d;
  };

  // Touch swipe: horizontal drags flip the deck. Vertical drags are left
  // alone (touch-action: pan-y) so the fluff panel still scrolls.
  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch') return;
    gesture.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const threshold = Math.max(36, e.currentTarget.clientWidth * 0.08);
    if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy)) {
      gesture.current = null;
      if (dx > 0) onPrev?.();
      else onNext?.();
    }
  };

  const endGesture = () => {
    gesture.current = null;
  };

  return (
    <div
      className={styles.stack}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
    >
      {cards.map((card, i) => {
        const rel = relOf(i);
        const slot = slotFor(rel);
        return (
          <div
            key={`${card.title}-${i}`}
            className={`${styles.slot} ${SLOT_CLASS[slot]}`}
            data-slot={slot}
          >
            <div
              className={styles.holder}
              aria-hidden={slot !== 'active' ? true : undefined}
            >
              <MtgCard
                {...card}
                onPrev={slot === 'active' ? onPrev : undefined}
                onNext={slot === 'active' ? onNext : undefined}
              />
            </div>
            {slot !== 'active' && slot !== 'hidden' && (
              <button
                type="button"
                className={styles.catch}
                onClick={rel < 0 ? onPrev : onNext}
                aria-label={rel < 0 ? 'Show previous card' : 'Show next card'}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
