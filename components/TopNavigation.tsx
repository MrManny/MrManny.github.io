export default function TopNavigation() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="monogram" href="#top" aria-label="Back to top">
        MW<span>.</span>
      </a>
      <div className="nav-links">
        <a href="#build">Work</a>
        <a href="#teach">Thinking</a>
        <a href="#tinker">Off-hours</a>
      </div>
      <a className="nav-contact" href="#connect">
        Connect <span>↗</span>
      </a>
    </nav>
  );
}
