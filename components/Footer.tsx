import { SITE } from '@/lib/site';
import { SERVICES, serviceUrl } from '@/lib/services';

/**
 * Footer mit Leistungs-Links (interne Verlinkung für Google), sichtbaren
 * NAP-Angaben (Name, Adresse – deckungsgleich mit dem ProfessionalService-Schema),
 * Rechtlichem und dem Schriftfeld (Zeichnungskopf) im BMK-Stil.
 */
export default function Footer({
  active = 'none',
}: {
  active?: 'impressum' | 'datenschutz' | 'none';
}) {
  return (
    <footer className="hm hm-footer">
      <div className="hm-wrap">
        <div className="hm-footer-grid">
          <div>
            <a href="/index.html" className="hm-brand">
              SJCODE
            </a>
            <p>KI für Instandhaltung und Anlagen.</p>
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
                {s.id} {s.title}
              </a>
            ))}
          </nav>
          <nav aria-label="Unternehmen">
            <h2>Unternehmen</h2>
            <a href="/ueber-mich.html">Über mich</a>
            <a href="/referenz.html">Referenz</a>
            <a href="/kontakt.html">Kontakt</a>
            <a href="/automatisierungs-check.html">Automatisierungs-Check</a>
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

        <table className="hm-titleplate">
          <caption className="sr-only">Schriftfeld</caption>
          <tbody>
            <tr>
              <th scope="row">Dokument</th>
              <td>sjcode.de</td>
              <th scope="row">Ersteller</th>
              <td>{SITE.owner}</td>
              <th scope="row">Stand</th>
              <td>2026</td>
            </tr>
          </tbody>
        </table>

        <div className="hm-footer-bottom">
          <span>
            © 2026 {SITE.name} · {SITE.owner}
          </span>
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
