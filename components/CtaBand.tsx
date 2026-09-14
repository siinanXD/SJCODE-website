import { SITE } from '@/lib/site';

/**
 * Abschließender Handlungsaufruf – auf jeder Seite gleich aufgebaut,
 * Texte pro Seite anpassbar. `topic` wählt das Thema im Kontaktformular vor.
 */
export default function CtaBand({
  title = 'Erzählen Sie mir von Ihrem Projekt.',
  text = 'Kostenloses Erstgespräch, ehrliche Einschätzung, klares Angebot – innerhalb von 24 Stunden eine persönliche Antwort.',
  primary = 'Projekt anfragen',
  topic,
}: {
  title?: string;
  text?: string;
  primary?: string;
  topic?: string;
}) {
  const href = topic ? `/kontakt.html?thema=${encodeURIComponent(topic)}` : '/kontakt.html';
  return (
    <section className="section cta-section">
      <div className="container reveal">
        <div className="cta-card">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="actions">
            <a href={href} className="btn btn-primary" data-umami-event="projekt-anfragen" data-umami-event-ort="cta-band">
              {primary}
            </a>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              data-umami-event="erstgespraech"
              data-umami-event-ort="cta-band"
            >
              Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
