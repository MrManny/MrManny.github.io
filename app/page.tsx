import AmbientPointer from '@/components/AmbientPointer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Gear from '@/components/Gear';
import Hero from '@/components/Hero';

const projects = [
  {
    number: '01',
    title: 'Bluebox',
    tag: 'AI / Product',
    description: "Dynatrace's latest offering in the AI space.",
    featured: true,
  },
  {
    number: '02',
    title: 'Local MCP Server',
    tag: 'Open source / MCP',
    description:
      'LLM-powered workflows that interact directly with Dynatrace observability data.',
    href: 'https://github.com/dynatrace-oss/dynatrace-mcp/',
  },
  {
    number: '03',
    title: 'Site Reliability Guardian',
    tag: 'SRE / Automation',
    description:
      'Automated reliability validation that helps teams catch regressions before customers do.',
  },
  {
    number: '04',
    title: 'CI/CD Connectors',
    tag: 'Platform / DevOps',
    description:
      'Jenkins, GitLab, and Backstage integrations that embed observability into developer workflows.',
  },
  {
    number: '05',
    title: 'Event-Driven Automation',
    tag: 'Ansible / Remediation',
    description:
      'A Red Hat Event-Driven Ansible connector bridging observability signals with remediation.',
  },
  {
    number: '06',
    title: 'Incident Connectors',
    tag: 'ServiceNow / PagerDuty',
    description: 'Closing the loop between incident management and observability.',
  },
];

const interests = [
  ['Generative AI', 'LLMs, prompt engineering, and reliable agentic workflows.'],
  ['3D Printing + CAD', 'Designing and printing parts. Sometimes they even fit together.'],
  ['Cartography + GIS', 'Contributing to OpenStreetMap, often while walking the dog.'],
  ['Archery', 'A 28 lbs recurve bow and the occasional encounter with the target.'],
  ['Gaming', 'Board, video, role-playing, and tabletop games of every variety.'],
];

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <AmbientPointer />
      <Gear />

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="monogram" href="#top" aria-label="Back to top">MW<span>.</span></a>
        <div className="nav-links">
          <a href="#build">Work</a>
          <a href="#teach">Thinking</a>
          <a href="#tinker">Off-hours</a>
        </div>
        <a className="nav-contact" href="#connect">Connect <span>↗</span></a>
      </nav>

      <main>
        <div className="shell"><Hero /></div>

        <section className="work-section shell" id="build">
          <div className="section-heading">
            <div><span className="section-number">01</span><p className="eyebrow">Selected systems</p></div>
            <h2>Things I&apos;ve helped<br /><em>bring to life.</em></h2>
            <p>
              At Dynatrace, I drive product and roadmap execution for a portfolio of platform
              integrations and AI-driven tools.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => {
              const content = (
                <>
                  <div className="card-top"><span>{project.number}</span><span>{project.tag}</span></div>
                  <div className="card-mark" aria-hidden="true">{project.number}</div>
                  <div className="card-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </>
              );

              return project.href ? (
                <a className={`project-card ${project.featured ? 'featured' : ''}`} href={project.href} key={project.title}>
                  {content}
                </a>
              ) : (
                <article className={`project-card ${project.featured ? 'featured' : ''}`} key={project.title}>
                  {content}
                </article>
              );
            })}
          </div>

          <p className="work-note">
            I think about how AI changes team operations, how LLMs inform engineering decisions,
            and what AI-native DevOps looks like before it becomes obvious.
          </p>
        </section>

        <section className="thinking-section" id="teach">
          <div className="shell thinking-grid">
            <div className="section-heading compact">
              <div><span className="section-number">02</span><p className="eyebrow">What I share</p></div>
              <h2>Turning early signals<br />into <em>useful practice.</em></h2>
            </div>
            <div className="thinking-copy">
              <p className="display-quote">
                I was working with generative AI before it had a marketing budget.
              </p>
              <p>
                I use that head start to help colleagues make day-to-day operations more efficient
                and to design agentic systems that are dependable, repeatable, and worth using.
              </p>
              <p>
                I also bring a background in agile processes and forecasting, using Monte Carlo
                methods to turn delivery uncertainty into decisions teams can act on.
              </p>
              <div className="topic-cloud">
                {['Agentic systems', 'AI enablement', 'Monte Carlo', 'Product strategy', 'Forecasting'].map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="offhours-section shell" id="tinker">
          <div className="section-heading">
            <div><span className="section-number">03</span><p className="eyebrow">Outside the roadmap</p></div>
            <h2>Curiosity doesn&apos;t<br /><em>clock out.</em></h2>
            <p>
              Side quests, physical objects, maps, arrows, and worlds that keep me curious and building.
            </p>
          </div>

          <div className="interest-grid">
            {interests.map(([title, description], index) => (
              <article className="interest-card" key={title}>
                <span className="interest-index">0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
            <article className="interest-card extra-card">
              <span className="interest-index">+</span>
              <div><h3>Beyond the brief</h3><p>Extracurricular research projects and volunteer work supporting people in need.</p></div>
            </article>
          </div>
        </section>

        <section className="connect-section" id="connect">
          <div className="connect-orbit" aria-hidden="true" />
          <div className="shell connect-inner">
            <p className="eyebrow"><span /> The line is open</p>
            <h2>Let&apos;s build what&apos;s<br /><em>not obvious yet.</em></h2>
            <p className="connect-intro">
              I&apos;m always interested in conversations about AI product leadership, platform
              engineering, and the future of developer tooling.
            </p>
            <div className="social-grid">
              <a href="https://www.linkedin.com/in/manuel-w-a54850235/"><span>LinkedIn</span><small>Professional inquiries</small><b>↗</b></a>
              <a href="https://github.com/MrManny"><span>GitHub</span><small>Code and experiments</small><b>↗</b></a>
              <a href="https://www.openstreetmap.org/user/MrManny"><span>OpenStreetMap</span><small>Mapping efforts</small><b>↗</b></a>
              <a href="https://www.researchgate.net/profile/Manuel-Warum"><span>ResearchGate</span><small>Research contributions</small><b>↗</b></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <span>Manuel Warum / {new Date().getFullYear()}</span>
        <span>AI. Platforms. Products.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
