import type { MtgCardData } from '@/components/MtgCard';

// Card copy and art are placeholders — adapt freely before publishing.
// Art masters live in assets/img/ (PNG, kept out of the export);
// scripts/prepare-art.mjs transcodes them to the /img/*.webp files referenced
// here (plus the small /echo/ stand-ins the blurred backdrop uses), and
// the build generates the responsive WebP variants (see next.config.mjs).
export const mockCards: MtgCardData[] = [
  {
    title: 'AI Software Engineer',
    image: {
      src: '/img/aidlc.webp',
      alt: 'Painterly fantasy illustration: a goggled artificer repairing a robot head with a glowing tool, surrounded by monitors full of code',
    },
    typeLine: 'Legendary Creature — Artificer Wizard',
    description:
      'Research and software engineer working on AI-assisted software engineering — solving modern problems with modern solutions.',
    fluffText:
      '“Any sufficiently refined craft is indistinguishable from magic. Any sufficiently documented magic is merely good engineering.”',
    accent: '#315568',
    frameColors: {
      highlight: '#547584',
      shadow: '#1b3441',
      panelTint: '#dee4df',
      edge: '#25393e',
    },
  },
  {
    title: 'Natural 20',
    image: {
      src: '/img/irl.webp',
      alt: 'Painterly fantasy illustration: a cloaked archer drawing a black-and-red bow while standing on a giant game controller above lava',
    },
    typeLine: 'Instant',
    description: 'Board/card/video game aficionado, aspiring archer, and builder with bravado.',
    fluffText:
      '“The bow cost less than his tabletop army. It has won far more games.”',
    accent: '#885344',
    frameColors: {
      highlight: '#a77b63',
      shadow: '#4e302b',
      panelTint: '#e9ddcc',
      edge: '#46332b',
    },
  },
  {
    title: 'Every Path Remembered',
    image: {
      src: '/img/gis.webp',
      alt: 'Painterly fantasy illustration: a hatted explorer drawing on a colourful map beside an alpine lake, a drone flying overhead',
    },
    typeLine: 'Enchantment — Saga',
    description: 'Drone operator and open data contributor, in particular to OpenStreetMap since 2015.',
    fluffText:
      '“Some enchant the land to hold it. He enchants it to be found.”',
    accent: '#4c6552',
    frameColors: {
      highlight: '#798773',
      shadow: '#2c4035',
      panelTint: '#dfe4d4',
      edge: '#303e31',
    },
  },
  {
    title: 'Speak, Friend, and Enter',
    image: {
      src: '/img/contact.webp',
      alt: 'Painterly fantasy illustration: a moustached gentleman in an ornate coat phoning from a brass candlestick telephone in a gas-lit hall',
    },
    typeLine: 'Sorcery',
    // The description is the card: modal rules text whose platform names are
    // hyperlinks (rendered with target=_blank by MtgCard).
    description: [
      'Open to AI engineering roles. Choose one —\n• Follow his work on ',
      { text: 'GitHub', href: 'https://github.com/MrManny' },
      ';\n• Connect with him on ',
      { text: 'LinkedIn', href: 'https://www.linkedin.com/in/manuel-w-a54850235' },
      '.',
    ],
    fluffText:
      '“Every great adventuring party began with a single message. Most even got a reply.”',
    // Aged ivory, emulating the White of Magic. Light enough that the
    // frame ink flips to dark automatically (see MtgCard.tsx).
    accent: '#c9bc9b',
    frameColors: {
      highlight: '#e3d8bc',
      shadow: '#998a6b',
      panelTint: '#efe6d2',
      edge: '#65583f',
    },
  },
];
