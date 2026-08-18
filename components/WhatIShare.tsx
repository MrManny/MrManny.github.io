const topics = [
  'Agentic systems',
  'AI enablement',
  'Monte Carlo',
  'Forecasting',
];

export default function WhatIShare() {
  return (
    <section className="thinking-section" id="teach">
      <div className="shell thinking-grid">
        <div className="section-heading compact">
          <h2>
            <em>#</em>practices
          </h2>
        </div>
        <div className="thinking-copy">
          <p>
            I was working with generative AI before it was cool.
          </p>
          <p>
            I use that head start to help colleagues make day-to-day operations more efficient and
            to design agentic systems that are dependable, repeatable, and worth using.
          </p>
          <p>
            I also bring a background in agile processes and forecasting, using Monte Carlo methods
            to turn delivery uncertainty into decisions teams can act on.
          </p>
          <p>
            I also worked in quantum cryptography once. That was fun.
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
