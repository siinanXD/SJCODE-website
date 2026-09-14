import { SITE } from '@/lib/site';

/**
 * Feste Aktionsleiste am unteren Rand – nur auf Mobilgeräten sichtbar (CSS).
 * Anrufen und WhatsApp sind für Handwerk und kleine Betriebe die kürzesten Wege.
 * Auf der Kontaktseite ausblenden, dort ist das Formular selbst der CTA.
 */
export default function StickyCta() {
  return (
    <div className="sticky-cta" aria-label="Schnellkontakt">
      <a
        href={SITE.phoneHref}
        className="btn btn-outline"
        aria-label={`Anrufen: ${SITE.phoneDisplay}`}
        data-umami-event="anruf"
        data-umami-event-ort="sticky"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Anrufen
      </a>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        data-umami-event="whatsapp"
        data-umami-event-ort="sticky"
      >
        WhatsApp<span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
      <a
        href="/kontakt.html"
        className="btn btn-primary"
        data-umami-event="projekt-anfragen"
        data-umami-event-ort="sticky"
      >
        Anfragen
      </a>
    </div>
  );
}
