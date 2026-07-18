import type { ReactNode } from 'react';

type Interest = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconProps = {
  className: 'interest-icon',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const interests: Interest[] = [
  {
    title: 'Generative AI',
    description:
      'LLMs, harness engineering, and reliable agentic workflows. Also with a strong interest in diffusion-based open-weight models.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.9 5.4L19.5 10l-5.6 1.6L12 17l-1.9-5.4L4.5 10l5.6-1.6L12 3z" />
        <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
      </svg>
    ),
  },
  {
    title: '3D Printing + CAD',
    description:
      'Designing and printing parts. Sometimes they even fit together (but only sometimes).',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </svg>
    ),
  },
  {
    title: 'Cartography + GIS',
    description:
      'Contributing to OpenStreetMap, often while walking the dog or flying my DJI drone.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.2" />
      </svg>
    ),
  },
  {
    title: 'Archery',
    description:
      'A 28 lbs recurve bow, and I occasionally even hit the target. What a time to be alive!',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.8" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Gaming',
    description:
      'Board, video, card, role-playing, and tabletop games of every variety.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="3.5" />
        <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function OutsideTheRoadmap() {
  return (
    <section className="offhours-section shell" id="tinker">
      <div className="section-heading">
        <div>
          <span className="section-number">#03</span>
          <p className="eyebrow">Outside the roadmap</p>
        </div>
        <h2>
          Curiosity doesn&apos;t<br />
          <em>clock out.</em>
        </h2>
        <p>Side quests, physical objects, maps, arrows, and worlds that keep me curious and building.</p>
      </div>

      <div className="interest-grid">
        {interests.map(({ title, description, icon }, index) => (
          <article className="interest-card" key={title}>
            <div className="interest-side">
              {icon}
              <span className="interest-index">0{index + 1}</span>
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
        <article className="interest-card extra-card">
          <div className="interest-side">
            <svg {...iconProps}>
              <path d="M9 18h6M10 21h4" />
              <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2l.1.7h4.8l.1-.7c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" />
            </svg>
            <span className="interest-index">++</span>
          </div>
          <div>
            <h3>Beyond the brief</h3>
            <p>
              Extracurricular research projects and volunteer work supporting people in need.
              I also often have more ideas than energy, so I am more than happy to offload my many ideas.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
