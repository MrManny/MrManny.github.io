export type SystemCardProps = {
  number: string;
  title: string;
  tag: string;
  description: string;
  featured?: boolean;
};

export default function SystemCard({
  number,
  title,
  tag,
  description,
  featured = false,
}: SystemCardProps) {
  const className = `project-card ${featured ? 'featured' : ''}`;
  const content = (
    <>
      <div className="card-top">
        {tag}
      </div>
      <div className="card-mark" aria-hidden="true">
        {number}
      </div>
      <div className="card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );

  return <article className={className}>{content}</article>;
}
