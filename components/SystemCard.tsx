export type SystemCardProps = {
  title: string;
  description: string;
  href?: string;
  featured?: boolean;
  old?: boolean;
};

export default function SystemCard({
  title,
  description,
  href,
  featured = false,
  old = false,
}: SystemCardProps) {
  const className = `project-card${featured ? ' featured' : ''}${old ? ' old' : ''}`;
  const external = href?.startsWith('http') ?? false;

  const content = (
    <>
      <div className="card-top">
        {old ? <span className="card-status">previous</span> : null}
      </div>
      <div className="card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {href ? (
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <article className={className}>{content}</article>;
  }

  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
      {external ? <span className="visually-hidden">(opens in new tab)</span> : null}
    </a>
  );
}
