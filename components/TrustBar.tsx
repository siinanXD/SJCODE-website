import { PROOF } from '@/lib/site';
import { REVIEW_STATS } from './reviewsData';

/** Kennzahlen-Leiste unter dem Hero – echte, belegbare Zahlen. */
export default function TrustBar() {
  const items = [
    { big: `${REVIEW_STATS.averageLabel} ★`, small: `Google · ${REVIEW_STATS.count} Bewertungen` },
    { big: `${PROOF.yearsIndustry} Jahre`, small: 'Industriepraxis' },
    { big: PROOF.responseTime, small: 'persönliche Antwort' },
    { big: PROOF.testsInReference, small: 'automatisierte Tests im Referenzprojekt' },
    { big: '0 €', small: 'Erstgespräch & Einschätzung' },
  ];
  return (
    <section className="trust-bar" aria-label="Kennzahlen">
      <div className="container">
        <ul>
          {items.map((i) => (
            <li key={i.small}>
              <strong>{i.big}</strong>
              <span>{i.small}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
