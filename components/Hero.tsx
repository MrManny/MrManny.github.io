import ProfilePhoto from './ProfilePhoto';
import ScrollCue from './ScrollCue';
import StatusCard from './StatusCard';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <h1>
          <span>Manuel</span>
          <em>Warum.</em>
        </h1>
        <div className="hero-actions">
          <a className="button button-primary" href="#build">Explore my work</a>
          <a className="button button-ghost" href="#connect">Start a conversation</a>
        </div>
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
