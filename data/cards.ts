import type { MtgCardData } from '@/components/MtgCard';

// Mock card content — placeholder copy and art, adapt freely.
export const mockCards: MtgCardData[] = [
  {
    title: 'Thornscape Battlemage',
    image: {
      src: '/img/profile.webp',
      alt: 'Placeholder art for Thornscape Battlemage',
    },
    typeLine: 'Creature — Elf Wizard',
    fluffText:
      '“The forest remembers every axe, and settles every debt in its own time.”',
    accent: '#2f6b43',
  },
  {
    title: 'Chronicler of the Static',
    image: {
      src: '/img/profile.webp',
      alt: 'Placeholder art for Chronicler of the Static',
    },
    typeLine: 'Legendary Creature — Human Artificer',
    fluffText:
      '“Every system tells a story if you know where to listen. The logs remember what the engineers forget, the metrics betray what the dashboards hide, and somewhere between the alerts a pattern is waiting to be found. I have spent a lifetime collecting these stories — from mainframes older than the guilds, from networks that span oceans, from machines that dream in ones and zeroes. Write your code as if you must explain it at three in the morning, because one day you will. And when the outage finally ends, and the graphs return to their quiet hum, remember that the calm is not the absence of problems — it is the presence of someone else’s careful work.\n\nThere is no such thing as a small change. Every commit is a stone dropped into still water, and the ripples travel further than the mason imagines. I have watched empires of software fall to a single misplaced semicolon, and I have watched humble patches quietly hold a decade of storms at bay. Measure twice, ship once, and never trust a green dashboard you have not personally offended.\n\nWhen you find a road that should not exist — a shortcut through the architecture, a door no one remembers building — mark it on your map, but walk it again in winter before you teach it to the apprentices. Code outlives the coder. That is either a comfort or a warning, depending on the morning.”',
    accent: '#2f4d8a',
  },
  {
    title: 'Cartographer of Hidden Roads',
    image: {
      src: '/img/profile.webp',
      alt: 'Placeholder art for Cartographer of Hidden Roads',
    },
    typeLine: 'Creature — Human Scout',
    fluffText:
      '“Give me a blank map and a bad idea, and I will show you a road that should not exist.”',
    accent: '#8a5a2f',
  },
];
