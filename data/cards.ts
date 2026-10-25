import type { MtgCardData } from '@/components/MtgCard';

// Card copy and art are placeholders — adapt freely before publishing.
// Art masters live in assets/img/ (PNG, kept out of the export);
// scripts/prepare-art.mjs transcodes them to the /img/*.webp files referenced
// here, and the build generates the responsive WebP variants (see
// next.config.mjs).
export const mockCards: MtgCardData[] = [
  {
    title: 'AI Software Engineer',
    image: {
      src: '/img/aidlc.webp',
      alt: 'An artificer in a dark suit tuning a small robot with a glowing tool, surrounded by monitors full of code',
    },
    typeLine: 'Creature — Artificer',
    fluffText:
      '“Any sufficiently refined craft is indistinguishable from magic. Any sufficiently documented magic is merely good engineering.”',
    accent: '#2f4d8a',
  },
  {
    title: 'Big Game Hunter',
    image: {
      src: '/img/irl.webp',
      alt: 'An archer in studded leather drawing an ornate black-and-gold bow in a misty ruin',
    },
    typeLine: 'Sorcery',
    fluffText:
      '“The mightiest beasts fall to the steadiest hands — and the best weekends are the ones nobody hears about.”',
    accent: '#8a2f2f',
  },
  {
    title: 'Surveilled Lands',
    image: {
      src: '/img/gis.webp',
      alt: 'A cartographer kneeling in a ruined hall, inking a map by shafts of sunlight',
    },
    typeLine: 'Enchantment',
    fluffText:
      '“Every path she walks enters the commons: free as the land it crosses, remembered long after her footsteps fade.”',
    accent: '#2f6b43',
  },
];
