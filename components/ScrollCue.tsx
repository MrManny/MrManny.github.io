'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative scroll cue that fades in with the hero entrance,
 * then fades out progressively — fully invisible once the viewer
 * has scrolled half-way to the next section.
 */
export default function ScrollCue() {
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cue = cueRef.current;
    const next = document.getElementById('build');
    if (!cue || !next) return;

    let entered = 0;

    function update() {
      if (!cue || !next) return;
      const halfway = next.offsetTop / 2;
      const exit = 1 - Math.min(window.scrollY / halfway, 1);
      cue.style.opacity = String(entered * exit);
    }

    const enterTimer = window.setTimeout(() => {
      entered = 1;
      update();
    }, 520);

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.clearTimeout(enterTimer);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-cue" aria-hidden="true" ref={cueRef} style={{ opacity: 0 }}>
      <span>Scroll</span>
      <i />
    </div>
  );
}
