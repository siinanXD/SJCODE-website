'use client';

/**
 * Sticky Lead-CTA für Mobile/Tablet – immer erreichbar, Cookie-Banner
 * und reduzierte Motion bleiben unangetastet.
 */
export default function StickyLeadCta() {
  return (
    <div className="sticky-lead" role="region" aria-label="Schnellkontakt">
      <a href="/kontakt.html" className="btn btn-primary sticky-lead-primary">
        Projekt anfragen
      </a>
      <a
        href="https://calendly.com/sjcode"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline sticky-lead-secondary"
      >
        Termin ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    </div>
  );
}
