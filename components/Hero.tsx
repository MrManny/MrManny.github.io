import ProfilePhoto from './ProfilePhoto';
import ScrollCue from './ScrollCue';
import StatusCard from './StatusCard';

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
        <p className="signal-strip">
          <span>MCP servers</span> <i /> <span>Agentic systems</span> <i /> <span>SRE automation</span>{' '}
          <i /> <span>Monte Carlo forecasting</span>
        </p>
      </div>

      <div className="hero-visual">
        <div className="orbit orbit-outer" />
        <div className="orbit orbit-inner" />
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <ProfilePhoto />
        </div>
        <StatusCard />
      </div>

      <ScrollCue />
    </header>
  );
}
