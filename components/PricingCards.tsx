import { PACKAGES } from '@/lib/pricing';

/** Paket-Karten – auf Startseite (kompakt) und Preisseite (voll). */
export default function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pricing-grid reveal">
      {PACKAGES.map((p) => (
        <article key={p.id} className={`price-card${p.highlight ? ' highlight' : ''}`}>
          {p.highlight && <span className="price-badge">Meist gewählt</span>}
          <h3>{p.name}</h3>
          <p className="price">{p.price}</p>
          <p className="price-hint">{p.priceHint}</p>
          <p className="tagline">{p.tagline}</p>
          {!compact && (
            <ul className="check-list">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <a
            href={`/kontakt.html?thema=${encodeURIComponent(p.formTopic)}&paket=${p.id}`}
            className={`btn ${p.highlight ? 'btn-primary' : 'btn-outline'}`}
          >
            {p.cta}
          </a>
        </article>
      ))}
    </div>
  );
}
