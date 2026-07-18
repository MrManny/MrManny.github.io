'use client';

import { useEffect, useState } from 'react';

const sectionIds = ['build', 'teach', 'tinker', 'connect'];

export default function TopNavigation() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = sectionIds.filter((id) => visible.get(id));
        setActive(current.length > 0 ? current[current.length - 1] : '');
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="monogram" href="#top" aria-label="Back to top">
        MW<span>.</span>
      </a>
      <div className="nav-links">
        <a href="#build" aria-current={active === 'build' ? 'true' : undefined}>Work</a>
        <a href="#teach" aria-current={active === 'teach' ? 'true' : undefined}>Thinking</a>
        <a href="#tinker" aria-current={active === 'tinker' ? 'true' : undefined}>Off-hours</a>
      </div>
      <a className="nav-contact" href="#connect" aria-current={active === 'connect' ? 'true' : undefined}>
        Connect <span>↗</span>
      </a>
    </nav>
  );
}
