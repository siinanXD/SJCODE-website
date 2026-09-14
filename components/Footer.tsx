import { SITE } from '@/lib/site';
import { SERVICES, serviceUrl } from '@/lib/services';

/**
 * Footer mit Leistungs-Links (interne Verlinkung für Google), sichtbaren
 * NAP-Angaben (Name, Adresse – deckungsgleich mit dem ProfessionalService-Schema)
 * und Rechtlichem.
 */
export default function Footer({
  active = 'none',
}: {
  active?: 'impressum' | 'datenschutz' | 'none';
}) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/index.html" className="brand">
              SJCODE<span>.</span>
            </a>
            <p>Softwareentwicklung &amp; AI Engineering für kleine und mittlere Betriebe.</p>
            <address>
              {SITE.street}, {SITE.zip} {SITE.city}
              <br />
              Remote deutschlandweit
            </address>
          </div>
          <nav aria-label="Leistungen">
            <h2>Leistungen</h2>
            {SERVICES.map((s) => (
              <a key={s.slug} href={serviceUrl(s)}>
                {s.title}
              </a>
            ))}
            <a href="/automatisierungs-check.html">Automatisierungs-Check (kostenlos)</a>
          </nav>
          <nav aria-label="Unternehmen">
            <h2>Unternehmen</h2>
            <a href="/ueber-mich.html">Über mich</a>
            <a href="/preise.html">Preise</a>
            <a href="/referenz.html">Referenz</a>
            <a href="/kontakt.html">Kontakt</a>
          </nav>
          <nav aria-label="Kontakt und Profile">
            <h2>Kontakt</h2>
            <a href={SITE.phoneHref} data-umami-event="anruf">
              {SITE.phoneDisplay}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-umami-event="whatsapp">
              WhatsApp ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
              Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span className="copyright">© 2026 {SITE.name} · {SITE.owner}</span>
          <nav aria-label="Rechtliches">
            <a href="/impressum.html" aria-current={active === 'impressum' ? 'page' : undefined}>
              Impressum
            </a>
            <a href="/datenschutz.html" aria-current={active === 'datenschutz' ? 'page' : undefined}>
              Datenschutz
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
