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
 * └─────────────────────────────────────────────────────────────────────────┘
 */

// TODO: Hier deinen echten Google-Bewertungslink einsetzen (siehe Anleitung oben).
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=DEINE_PLACE_ID';

type Review = {
  name: string;
  rating: number; // 1 bis 5
  text: string;
  date?: string; // optional, z. B. "Juni 2026"
};

// Trage hier deine echten Bewertungen ein. Die Beispiele bitte ersetzen/löschen.
const REVIEWS: Review[] = [
  {
    name: 'Beispiel Kunde',
    rating: 5,
    text: 'Ersetze diesen Text durch eine echte Bewertung. Bis dahin dient dieser Block nur als Vorlage – Name, Sterne und Text kannst du frei anpassen.',
    date: 'Beispiel',
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span className="stars" aria-label={`${full} von 5 Sternen`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star on' : 'star'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const count = REVIEWS.length;
  const average =
    count > 0 ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <section className="section reviews">
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

        {count > 0 && (
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
            Auf Google bewerten ↗
          </a>
        </div>
      </div>
    </section>
  );
}
