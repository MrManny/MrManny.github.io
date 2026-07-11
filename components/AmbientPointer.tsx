'use client';

import { useEffect } from 'react';

export default function AmbientPointer() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    function update(event: PointerEvent) {
      if (media.matches) return;
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    }

    window.addEventListener('pointermove', update, { passive: true });
    return () => window.removeEventListener('pointermove', update);
  }, []);

  return <div className="pointer-light" aria-hidden="true" />;
}
