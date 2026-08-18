import SystemCard, { type SystemCardProps } from './SystemCard';

const systems = [
  {
    title: 'Bluebox',
    description: "Dynatrace's latest offering in the AI space.",
    href: 'https://www.bluebox.ai/',
    featured: true,
  },
  {
    title: 'Local MCP Server',
    description:
      'LLM-powered workflows that interact directly with Dynatrace observability data.',
    href: 'https://github.com/MrManny',
    old: true,
  },
  {
    title: 'Site Reliability Guardian',
    description:
      'Automated reliability validation that helps teams catch regressions before customers do.',
    old: true,
  },
  {
    title: 'Connectors',
    description:
      'Jenkins, GitLab, Event-Driven Ansible, ServiceNow, and Backstage integrations that embed observability into developer workflows.',
    old: true,
  },
] satisfies SystemCardProps[];

export default function SelectedSystems() {
  return (
    <section className="work-section shell" id="build">
      <div className="section-heading">
        <h2>
          <em>#</em>work
        </h2>
      </div>

      <div className="project-grid">
        {systems.map((system) => (
          <SystemCard key={system.title} {...system} />
        ))}
      </div>
    </section>
  );
}
