'use client';

import { useState } from 'react';
import MtgCard from '@/components/MtgCard';
import { mockCards } from '@/data/cards';
import styles from './page.module.css';

export default function Home() {
  const [index, setIndex] = useState(0);

  const step = (delta: number) =>
    setIndex((current) => (current + delta + mockCards.length) % mockCards.length);

  return (
    <main className={styles.stage}>
      <MtgCard
        {...mockCards[index]}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </main>
  );
}
