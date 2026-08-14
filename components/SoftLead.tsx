/**
 * Soft-Lead-Streifen direkt unter dem Hero – kurze Entscheidungshilfe
 * ohne Formular-Zwang. Server Component, null JS.
 */
export default function SoftLead() {
  return (
    <section className="soft-lead" aria-label="Nächster Schritt">
      <div className="container soft-lead-inner">
        <div className="soft-lead-copy">
          <p className="soft-lead-title">In 15 Minuten Klarheit – kostenlos.</p>
          <p className="soft-lead-text">
            Persönliche Antwort innerhalb von 24 Stunden. Kein Newsletter, kein Bot.
          </p>
        </div>
        <div className="soft-lead-actions">
          <a href="/kontakt.html" className="btn btn-primary">
            Projekt anfragen
          </a>
          <a
            href="https://calendly.com/sjcode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
