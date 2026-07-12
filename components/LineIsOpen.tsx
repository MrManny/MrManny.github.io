const socialLinks = [
  {
    name: 'LinkedIn',
    description: 'Professional inquiries',
    href: 'https://www.linkedin.com/in/manuel-w-a54850235/',
  },
  {
    name: 'GitHub',
    description: 'Code and experiments',
    href: 'https://github.com/MrManny',
  },
  {
    name: 'OpenStreetMap',
    description: 'Mapping efforts',
    href: 'https://www.openstreetmap.org/user/MrManny',
  },
  {
    name: 'ResearchGate',
    description: 'Research contributions',
    href: 'https://www.researchgate.net/profile/Manuel-Warum',
  },
];

export default function LineIsOpen() {
  return (
    <section className="connect-section" id="connect">
      <div className="connect-orbit" aria-hidden="true" />
      <div className="shell connect-inner">
        <p className="eyebrow">
          <span /> The line is open
        </p>
        <h2>
          Let&apos;s build what&apos;s<br />
          <em>not obvious yet.</em>
        </h2>
        <p className="connect-intro">
          I&apos;m always interested in conversations about AI product leadership, platform
          engineering, and the future of developer tooling.
        </p>
        <div className="social-grid">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.name}>
              <span>{link.name}</span>
              <small>{link.description}</small>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
