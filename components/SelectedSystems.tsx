import SystemCard, { type SystemCardProps } from './SystemCard';

const systems = [
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
] satisfies SystemCardProps[];

export default function SelectedSystems() {
  return (
    <section className="work-section shell" id="build">
      <div className="section-heading">
        <div>
          <span className="section-number">#01</span>
          <p className="eyebrow">Selected systems</p>
        </div>
        <h2>
          Things I&apos;ve helped<br />
          <em>bring to life.</em>
        </h2>
        <p>
          At Dynatrace, I drive product and roadmap execution for a portfolio of platform
          integrations and AI-driven tools.
        </p>
      </div>

      <div className="project-grid">
        {systems.map((system) => (
          <SystemCard key={system.title} {...system} />
        ))}
      </div>

      <p className="work-note">
        I think about how AI changes team operations, how LLMs inform engineering decisions, and
        what AI-native DevOps looks like before it becomes obvious.
      </p>
    </section>
  );
}
