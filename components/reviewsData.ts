/**
 * Google-Bewertungen – EINE Datenquelle für Bewertungs-Sektion, Trust-Leiste
 * und das AggregateRating-Schema.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HIER PFLEGST DU DEINE BEWERTUNGEN – kein Programmierwissen nötig.        │
 * │                                                                           │
 * │  1) REVIEWS: echte Bewertungen mit Text als Blöcke eintragen              │
 * │     (Name, Sterne 1–5, Text, optional Datum). Block kopieren, anpassen.   │
 * │  2) RATINGS_ONLY: reine Sternebewertungen OHNE Text – erscheinen nicht    │
 * │     als Karte, zählen aber in Anzahl und Durchschnitt mit.                │
 * │                                                                           │
 * │  WICHTIG: Nur echte Bewertungen eintragen. Das JSON-LD wird automatisch   │
 * │  daraus erzeugt und muss dem Sichtbaren entsprechen.                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export type Review = {
  name: string;
  rating: number; // 1 bis 5
  text: string;
  date?: string; // Anzeige, z. B. "Juli 2026"
  datePublished?: string; // ISO fürs JSON-LD, z. B. "2026-07"
};

export const REVIEWS: Review[] = [
  {
    name: 'Dennis Wasinski',
    rating: 5,
    text: '5/5 Sterne – Absolut empfehlenswert! Wir haben mit sjcode das erste Projekt unseres Start-ups im Bereich der Automatisierung für die Immobilienverwaltung realisiert und sind absolut begeistert. Vom ersten Gespräch an überzeugte er durch eine sehr professionelle Arbeitsweise und höchste Zuverlässigkeit. Neben der reinen Umsetzung hat uns vor allem die gute Expertise beeindruckt: Sinan hat nicht nur unsere Anforderungen perfekt verstanden, sondern auch eigene, innovative Ideen eingebracht, die das Endprodukt entscheidend verbessert haben. Für uns steht fest: Das war erst der Anfang. Wir haben hier einen starken Partner gefunden und werden auch in Zukunft definitiv weitere Projekte gemeinsam angehen. Vielen Dank für die großartige Zusammenarbeit!',
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
];

// Reine Sternebewertungen ohne Text (z. B. Enos Ndzibah, 5 Sterne).
export const RATINGS_ONLY = {
  count: 1, // Anzahl der Bewertungen ohne Text
  sum: 5, // Summe ihrer Sterne (1 × 5)
};

const count = REVIEWS.length + RATINGS_ONLY.count;
const sum = REVIEWS.reduce((s, r) => s + r.rating, 0) + RATINGS_ONLY.sum;

const average = count > 0 ? sum / count : 0;

export const REVIEW_STATS = {
  count,
  average,
  /** Anzeige im deutschen Format, z. B. „5,0“ */
  averageLabel: average.toFixed(1).replace('.', ','),
};
