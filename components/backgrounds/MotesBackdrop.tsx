import type { CSSProperties } from 'react';
import styles from './MotesBackdrop.module.css';

// Deterministic PRNG: the mote field must be identical in the prerendered
// HTML and on the client (no hydration mismatch), so no Math.random.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MOTES = (() => {
  const rand = mulberry32(20261025);
  return Array.from({ length: 40 }, () => ({
    left: rand() * 100,
    top: rand() * 100, // static placement (reduced motion)
    size: 3 + rand() * 12,
    duration: 26 + rand() * 34,
    delay: -rand() * 60,
    drift: (rand() - 0.5) * 30,
    opacity: 0.1 + rand() * 0.3,
  }));
})();

/**
 * Background layer: faint mana motes drifting slowly upward past the deck.
 * Pure CSS animation over a deterministic particle field; motion is disabled
 * under prefers-reduced-motion (motes stay as a static starfield).
 */
export default function MotesBackdrop() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className={styles.mote}
          style={
            {
              '--left': `${m.left}%`,
              '--top': `${m.top}%`,
              '--size': `${m.size}px`,
              '--duration': `${m.duration}s`,
              '--delay': `${m.delay}s`,
              '--drift': `${m.drift}vw`,
              '--opacity': m.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
