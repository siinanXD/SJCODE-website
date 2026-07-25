/**
 * Bewertungs-Sektion mit Google-Bewertungen.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HIER PFLEGST DU DEINE BEWERTUNGEN – kein Programmierwissen nötig.        │
 * │                                                                           │
 * │  1) GOOGLE_REVIEW_URL: Der Link, über den Besucher eine Bewertung         │
 * │     abgeben. So findest du ihn:                                           │
 * │       • Google Unternehmensprofil öffnen (business.google.com) ODER       │
 * │         bei Google nach deinem Firmennamen suchen.                        │
 * │       • Im Profil auf „Rezension schreiben“ / „Bewertung abgeben“ gehen.  │
 * │       • Alternativ im Profil-Dashboard: „Kunden“ → „Rezensionen“ →        │
 * │         „Mehr Rezensionen erhalten“ – dort gibt es einen fertigen Link.   │
 * │       • Diesen Link unten bei GOOGLE_REVIEW_URL einfügen.                  │
 * │                                                                           │
 * │  2) REVIEWS: Trage echte Bewertungen als Blöcke ein (Name, Sterne 1–5,    │
 * │     Text, optional Datum). Einfach einen Block kopieren und anpassen.     │
 * │                                                                           │
 * │  3) RATINGS_ONLY: reine Sternebewertungen OHNE Text (erscheinen nicht     │
 * │     als Karte, zählen aber in Anzahl und Durchschnitt mit).               │
 * │                                                                           │
 * │  WICHTIG: Nur echte Bewertungen eintragen. Das JSON-LD-Markup unten wird  │
 * │  automatisch aus diesen Daten erzeugt und muss dem Sichtbaren entsprechen.│
 * └─────────────────────────────────────────────────────────────────────────┘
 */

// Google-Bewertungslink des SJCODE-Unternehmensprofils.
const GOOGLE_REVIEW_URL = 'https://g.page/r/CZdmOonQJkltEBM/review';

type Review = {
  name: string;
  rating: number; // 1 bis 5
  text: string;
  date?: string; // optional, für die Anzeige, z. B. "Juli 2026"
  datePublished?: string; // optional, ISO für das JSON-LD, z. B. "2026-07"
};

// Echte Google-Bewertungen mit Text. Werden als Karten angezeigt.
const REVIEWS: Review[] = [
  {
    name: 'Alrik Elvers',
    rating: 5,
    text: 'Top organisiert, pünktlich umgesetzt und sehr strukturiert. Klare Empfehlung.',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
  {
    name: 'Philip Hö',
    rating: 5,
    text: 'Schnelle Rückmeldung, freundliche Beratung und eine professionelle Umsetzung – absolut empfehlenswert!',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
  {
    name: 'Dirk Hartmann',
    rating: 5,
    text: 'Es ist immer eine Freude mit Herrn Kahraman zu arbeiten. Gerne wieder.',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
  {
    name: 'Leyla Kahraman',
    rating: 5,
    text: 'Ich kenne den Gründer von SJCODE persönlich und bekomme mit, wie viel Zeit, Arbeit und Leidenschaft er in seine Projekte steckt. Besonders beeindruckend finde ich, wie verständlich und lösungsorientiert er Themen rund um Softwareentwicklung und KI angeht. Die Website wirkt modern, professionell und übersichtlich. Wer Unterstützung bei digitalen Projekten oder KI-Lösungen sucht, sollte sich SJCODE definitiv einmal anschauen.',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
  {
    name: 'Valon Rama',
    rating: 5,
    text: 'Bereits nach dem ersten Gespräch war ich von der Professionalität und strukturierten Herangehensweise überzeugt. Die Terminvereinbarung verlief unkompliziert, alle Fragen wurden verständlich beantwortet und die vorgeschlagenen Lösungen wirkten durchdacht und praxisnah. Ich freue mich auf die weitere Zusammenarbeit und kann mir sehr gut vorstellen, zukünftige Projekte gemeinsam umzusetzen.',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
  {
    name: 'Dennis Wasinski',
    rating: 5,
    text: '5/5 Sterne – Absolut empfehlenswert! Wir haben mit sjcode das erste Projekt unseres Start-ups im Bereich der Automatisierung für die Immobilienverwaltung realisiert und sind absolut begeistert. Vom ersten Gespräch an überzeugte er durch eine sehr professionelle Arbeitsweise und höchste Zuverlässigkeit. Neben der reinen Umsetzung hat uns vor allem die gute Expertise beeindruckt: Sinan hat nicht nur unsere Anforderungen perfekt verstanden, sondern auch eigene, innovative Ideen eingebracht, die das Endprodukt entscheidend verbessert haben. Für uns steht fest: Das war erst der Anfang. Wir haben hier einen starken Partner gefunden und werden auch in Zukunft definitiv weitere Projekte gemeinsam angehen. Vielen Dank für die großartige Zusammenarbeit!',
    date: 'Juli 2026',
    datePublished: '2026-07',
  },
];

// Reine Sternebewertungen ohne Text (z. B. Enos Ndzibah, 5 Sterne): erscheinen
// nicht als Karte, fließen aber in Anzahl und Durchschnitt ein.
const RATINGS_ONLY = {
  count: 1, // Anzahl der Bewertungen ohne Text
  sum: 5, // Summe ihrer Sterne (1 × 5)
};

const TOTAL_COUNT = REVIEWS.length + RATINGS_ONLY.count;
const TOTAL_SUM = REVIEWS.reduce((s, r) => s + r.rating, 0) + RATINGS_ONLY.sum;
const AVERAGE = TOTAL_COUNT > 0 ? TOTAL_SUM / TOTAL_COUNT : 0;

// JSON-LD: AggregateRating + einzelne Reviews, angehängt an die SJCODE-Entität
// (gleiche @id wie die ProfessionalService auf der Startseite -> wird zusammengeführt).
const REVIEWS_SCHEMA =
  TOTAL_COUNT > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://sjcode.de/#business',
        name: 'SJCODE',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(AVERAGE.toFixed(1)),
          reviewCount: TOTAL_COUNT,
          bestRating: 5,
          worstRating: 1,
        },
        review: REVIEWS.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: r.text,
          ...(r.datePublished ? { datePublished: r.datePublished } : {}),
        })),
      }
    : null;

function Stars({ rating }: { rating: number }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span className="stars" role="img" aria-label={`${full} von 5 Sternen`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star on' : 'star'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const count = TOTAL_COUNT;
  const average = AVERAGE;

  return (
    <section className="section reviews">
      {REVIEWS_SCHEMA && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWS_SCHEMA) }}
        />
      )}
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Bewertungen</p>
            <h2 className="section-title">Was Kundinnen und Kunden sagen</h2>
          </div>
          {count > 0 && (
            <div className="reviews-summary">
              <Stars rating={average} />
              <span>
                <strong>{average.toFixed(1)}</strong> · {count}{' '}
                {count === 1 ? 'Bewertung' : 'Bewertungen'} auf Google
              </span>
            </div>
          )}
        </div>

        {REVIEWS.length > 0 && (
          <div className="card-grid reveal">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="review-card">
                <Stars rating={r.rating} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="review-author">{r.name}</span>
                  {r.date && <span className="review-date">{r.date}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="reviews-cta reveal">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Auf Google bewerten ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
