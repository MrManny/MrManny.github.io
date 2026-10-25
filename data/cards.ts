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
    },
    typeLine: 'Legendary Creature — Artificer Wizard',
    description: 'Research and Software Engineer working to solve modern problems with modern solutions.',
    fluffText:
      '“Any sufficiently refined craft is indistinguishable from magic. Any sufficiently documented magic is merely good engineering.”',
    accent: '#2f4d8a',
  },
  {
    title: 'Natural 20',
    image: {
      src: '/img/irl.webp',
    },
    typeLine: 'Instant',
    description: 'Board/card/video game aficionado, aspiring archer, and builder with bravado.',
    fluffText:
      '“The bow cost less than his tabletop army. It has won far more games.”',
    accent: '#8a2f2f',
  },
  {
    title: 'Every Path Remembered',
    image: {
      src: '/img/gis.webp',
    },
    typeLine: 'Enchantment — Saga',
    description: 'Drone operator and open data contributor, in particular to OpenStreetMap since 2015.',
    fluffText:
      '“Some enchant the land to hold it. He enchants it to be found.”',
    accent: '#2f6b43',
  },
];
