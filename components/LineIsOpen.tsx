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
        <div className="section-heading">
          <h2>
            <em>#</em>summoning
          </h2>
        </div>
        <div className="social-grid">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.name} target="_blank" rel="noopener noreferrer">
              <span>{link.name}</span>
              <small>{link.description}</small>
              <b aria-hidden="true">↗</b>
              <span className="visually-hidden">(opens in new tab)</span>
            </a>
          ))}
        </div>
        <div className="language-line">
          <span>German — native</span>
          <span>English — fluent</span>
          <span>Klagenfurt, Austria</span>
        </div>
      </div>
    </section>
  );
}
