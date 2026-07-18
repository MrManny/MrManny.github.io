'use client';

import { useEffect, useState } from 'react';

const phrases = ['AI-native Workflows', 'AI Engineering', 'Agentic DevOps'];

export default function StatusCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="status-card">
      <span className="status-dot" />
      <div>
        <small>Currently building</small>
        <strong key={index} className="status-text">
          {phrases[index]}
        </strong>
      </div>
    </div>
  );
}
