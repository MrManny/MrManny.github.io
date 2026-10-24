import ProfilePhoto from './ProfilePhoto';

const facts = [
  {
    label: 'work',
    text: 'IT industry by trade. I build AI-assisted software engineering — the whole AIDLC, from first prompt to shipped code.',
  },
  {
    label: 'radar',
    text: 'I follow technological developments closely. Someone has to.',
  },
  {
    label: 'opendata',
    text: 'I give back to open data, mostly OpenStreetMap.',
  },
];

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <h1>
          <span>Manuel</span>
          <em>Warum.</em>
        </h1>
        <p className="tagline">AI. Platforms. Shenanigans.</p>
        <ul className="fact-list">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span className="fact-label">
                <em>#</em>
                {fact.label}
              </span>
              <p>{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-visual">
        <div className="orbit orbit-outer" />
        <div className="orbit orbit-inner" />
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <ProfilePhoto />
        </div>
      </div>
    </header>
  );
}
