const interests = [
  ['Generative AI', 'LLMs, prompt engineering, and reliable agentic workflows.'],
  ['3D Printing + CAD', 'Designing and printing parts. Sometimes they even fit together.'],
  ['Cartography + GIS', 'Contributing to OpenStreetMap, often while walking the dog.'],
  ['Archery', 'A 28 lbs recurve bow and the occasional encounter with the target.'],
  ['Gaming', 'Board, video, role-playing, and tabletop games of every variety.'],
];

export default function OutsideTheRoadmap() {
  return (
    <section className="offhours-section shell" id="tinker">
      <div className="section-heading">
        <div>
          <span className="section-number">#03</span>
          <p className="eyebrow">Outside the roadmap</p>
        </div>
        <h2>
          Curiosity doesn&apos;t<br />
          <em>clock out.</em>
        </h2>
        <p>Side quests, physical objects, maps, arrows, and worlds that keep me curious and building.</p>
      </div>

      <div className="interest-grid">
        {interests.map(([title, description], index) => (
          <article className="interest-card" key={title}>
            <span className="interest-index">0{index + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
        <article className="interest-card extra-card">
          <span className="interest-index">+</span>
          <div>
            <h3>Beyond the brief</h3>
            <p>
              Extracurricular research projects and volunteer work supporting people in need.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
