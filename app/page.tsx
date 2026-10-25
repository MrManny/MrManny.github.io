'use client';

import { useState } from 'react';
import ArtEchoBackdrop from '@/components/backgrounds/ArtEchoBackdrop';
import MotesBackdrop from '@/components/backgrounds/MotesBackdrop';
import MtgCardStack from '@/components/MtgCardStack';
import { mockCards } from '@/data/cards';
import styles from './page.module.css';

export default function Home() {
  const [index, setIndex] = useState(0);

  const step = (delta: number) =>
    setIndex((current) => (current + delta + mockCards.length) % mockCards.length);

  return (
    <main className={styles.stage}>
      <ArtEchoBackdrop cards={mockCards} index={index} />
      <MotesBackdrop />
      <MtgCardStack
        cards={mockCards}
        index={index}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </main>
  );
}
