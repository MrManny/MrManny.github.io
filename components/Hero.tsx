import ProfilePhoto from './ProfilePhoto';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span /> AI-assisted Software Engineering / Klagenfurt, AT</p>
        <h1>
          <span>Manuel</span>
          <em>Warum.</em>
        </h1>
        <p className="hero-lede">
          I turn complex systems into products people can actually use, at the intersection of
          <strong> AI, DevOps, and platform engineering.</strong>
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#build">Explore my work</a>
          <a className="button button-ghost" href="#connect">Start a conversation</a>
        </div>
        <div className="signal-strip" aria-label="Areas of expertise">
          <span>Product</span><i />
          <span>Engineering</span><i />
          <span>AI systems</span><i />
          <span>Observability</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Portrait of Manuel Warum">
        <div className="orbit orbit-outer" />
        <div className="orbit orbit-inner" />
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <ProfilePhoto />
        </div>
        <div className="status-card">
          <span className="status-dot" />
          <div><small>Currently building</small><strong>AI-native workflows</strong></div>
        </div>
      </div>
    </header>
  );
}
