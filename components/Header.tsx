/**
 * Navigation für Startseite und Unterseiten – überall dieselbe Leiste.
 * Die Startseite liegt unter „/“, deshalb funktionieren die Anker
 * (`/#leistungen`) dort wie ein Sprung auf der Seite.
 */
const NAV_ITEMS = [
  { href: '/#leistungen', label: 'Leistungen', key: 'leistungen' },
  { href: '/#demo', label: 'Live-Demo', key: 'demo' },
  { href: '/#ablauf', label: 'Ablauf', key: 'ablauf' },
  { href: '/referenz.html', label: 'Referenz', key: 'referenz' },
  { href: '/ueber-mich.html', label: 'Über mich', key: 'ueber-mich' },
  { href: '/kontakt.html', label: 'Kontakt', key: 'kontakt' },
] as const;

export const DOKU_CHECK_HREF = '/kontakt.html?thema=Doku-Check';

export type NavKey = (typeof NAV_ITEMS)[number]['key'] | 'start' | 'none';

export default function Header({ active }: { active: NavKey }) {
  return (
    <header className="hm hm-nav">
      <div className="hm-wrap hm-nav-row">
        <a href="/index.html" className="hm-brand" aria-label="SJCODE – zur Startseite">
          SJCODE
        </a>
        <nav aria-label="Hauptnavigation" className="hm-nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={item.href} aria-current={item.key === active ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={DOKU_CHECK_HREF}
          className="hm-btn hm-btn-primary hm-nav-cta"
          data-umami-event="doku-check"
          data-umami-event-ort="nav"
        >
          Doku-Check buchen
        </a>
      </div>
    </header>
  );
}
