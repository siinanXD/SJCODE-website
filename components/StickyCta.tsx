import { SITE } from '@/lib/site';

/**
 * Feste Aktionsleiste am unteren Rand – nur auf Mobilgeräten sichtbar (CSS).
 * Auf der Kontaktseite ausblenden, dort ist das Formular selbst der CTA.
 */
export default function StickyCta() {
  return (
    <div className="sticky-cta" aria-label="Schnellkontakt">
      <a href="/kontakt.html" className="btn btn-primary">
        Projekt anfragen
      </a>
      <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
        Termin<span className="sr-only"> buchen (öffnet in neuem Tab)</span>
      </a>
    </div>
  );
}
