'use client';

/**
 * Sticky Lead-CTA nur mobil – zwei gleichgewichtige Aktionen, kein Spam oben.
 */
export default function StickyLeadCta() {
  return (
    <div className="sticky-lead" role="region" aria-label="Schnellkontakt">
      <a href="/kontakt.html" className="btn btn-primary">
        Projekt anfragen
      </a>
      <a
        href="https://calendly.com/sjcode"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
      >
        Termin ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    </div>
  );
}
