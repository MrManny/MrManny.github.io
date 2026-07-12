const topics = [
  'Agentic systems',
  'AI enablement',
  'Monte Carlo',
  'Product strategy',
  'Forecasting',
];

export default function WhatIShare() {
  return (
    <section className="thinking-section" id="teach">
      <div className="shell thinking-grid">
        <div className="section-heading compact">
          <div>
            <span className="section-number">#02</span>
            <p className="eyebrow">What I share</p>
          </div>
          <h2>
            Turning early signals<br />
            into <em>useful practice.</em>
          </h2>
        </div>
        <div className="thinking-copy">
          <p className="display-quote">
            I was working with generative AI before it had a marketing budget.
          </p>
          <p>
            I use that head start to help colleagues make day-to-day operations more efficient and
            to design agentic systems that are dependable, repeatable, and worth using.
          </p>
          <p>
            I also bring a background in agile processes and forecasting, using Monte Carlo methods
            to turn delivery uncertainty into decisions teams can act on.
          </p>
          <div className="topic-cloud">
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
