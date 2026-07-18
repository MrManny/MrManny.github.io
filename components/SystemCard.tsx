export type SystemCardProps = {
  number: string;
  title: string;
  tag: string;
  description: string;
  meta?: string;
  href?: string;
  featured?: boolean;
  old?: boolean;
};

export default function SystemCard({
  number,
  title,
  tag,
  description,
  meta,
  href,
  featured = false,
  old = false,
}: SystemCardProps) {
  const className = `project-card${featured ? ' featured' : ''}${old ? ' old' : ''}`;
  const external = href?.startsWith('http') ?? false;

  const content = (
    <>
      <div className="card-top">
        {old ? <span className="card-status">Archive</span> : null}
        {tag}
      </div>
      <div className="card-mark" aria-hidden="true">
        {number}
      </div>
      <div className="card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <div className="card-meta">{meta}</div> : null}
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
