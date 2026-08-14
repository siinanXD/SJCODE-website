/**
 * Skills & Stack – sichtbar für Kundinnen und Kunden, ehrlich zum tatsächlichen
 * Lieferumfang (siehe Referenz Booking Email Check und Leistungen).
 * Rein serverseitig, Animationen nur per CSS.
 */

const GROUPS = [
  {
    kicker: 'Handwerk',
    title: 'Industriepraxis',
    text: 'Über zehn Jahre Elektroniker für Betriebstechnik. Ich kenne Schichtbetrieb, volle Postfächer und den Druck, wenn es draußen weiterlaufen muss.',
    tags: ['Prozessverständnis', 'Augenhöhe', 'Kein Fachchinesisch'],
    icon: 'craft',
  },
  {
    kicker: 'Software',
    title: 'Web & Cloud',
    text: 'Schnelle Websites und interne Tools – React, Next.js, TypeScript. Pflegeleicht, gefunden werden, ohne Baukasten-Kompromisse.',
    tags: ['React', 'Next.js', 'TypeScript', 'Flask', 'APIs'],
    icon: 'cloud',
  },
  {
    kicker: 'KI',
    title: 'AI Engineering',
    text: 'Produktionsreife Automatisierung: LLMs, RAG, Observability. Nichts geht raus, bevor Sie es freigeben.',
    tags: ['OpenAI', 'LangGraph', 'RAG', 'Langfuse', 'MongoDB Atlas'],
    icon: 'ai',
  },
  {
    kicker: 'Lieferung',
    title: 'Sauber übergeben',
    text: 'Tests, CI/CD, Dokumentation. Sie bekommen kein Experiment, sondern ein Werkzeug, das Sie behalten und verstehen.',
    tags: ['GitHub Actions', '276+ Tests', 'SEO', 'DSGVO'],
    icon: 'ship',
  },
] as const;

function SkillIcon({ name }: { name: (typeof GROUPS)[number]['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  } as const;

  if (name === 'craft') {
    return (
      <svg {...common}>
        <path
          d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === 'cloud') {
    return (
      <svg {...common}>
        <path
          d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-.6A7 7 0 1 0 4 14.9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16h.5a3.5 3.5 0 0 0 0-7H16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === 'ai') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 5V3M12 21v-2M5 12H3M21 12h-2M7.05 7.05 5.64 5.64M18.36 18.36l-1.41-1.41M7.05 16.95l-1.41 1.41M18.36 5.64l-1.41 1.41"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M12 3v12M8 11l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 19h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="section-title">Was ich mitbringe</h2>
          </div>
          <p className="section-lead">
            Industriepraxis plus modernes Engineering – damit Software im Betrieb
            ankommt, nicht nur in der Demo.
          </p>
        </div>

        <div className="skill-grid reveal">
          {GROUPS.map((g) => (
            <article key={g.title} className="skill-card">
              <div className="skill-icon" aria-hidden="true">
                <SkillIcon name={g.icon} />
              </div>
              <p className="skill-kicker">{g.kicker}</p>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              <ul className="skill-tags">
                {g.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
