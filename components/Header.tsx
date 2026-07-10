const NAV_ITEMS = [
  { href: '/index.html', label: 'Start', key: 'start' },
  { href: '/leistungen.html', label: 'Leistungen', key: 'leistungen' },
  { href: '/referenz.html', label: 'Referenz', key: 'referenz' },
  { href: '/kontakt.html', label: 'Kontakt', key: 'kontakt' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'] | 'none';

export default function Header({ active }: { active: NavKey }) {
  const current = (key: string) => (key === active ? 'page' : undefined);

  return (
    <header className="site-header">
      <div className="announcement">
        Persönliche Antwort innerhalb von 24 Stunden · Erstgespräch kostenlos
      </div>
      <div className="container nav-row">
        <a href="/index.html" className="brand">
          SJCODE<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={item.href} aria-current={current(item.key)}>
              {item.label}
            </a>
          ))}
        </nav>
        <details id="mobilemenu">
          <summary aria-label="Menü" />
          <div className="mobile-panel">
            {NAV_ITEMS.map((item) => (
              <a key={item.key} href={item.href} aria-current={current(item.key)}>
                {item.label}
              </a>
            ))}
            <a href="/kontakt.html" className="mobile-cta">
              Projekt anfragen
            </a>
            <p>Persönliche Antwort in 24 h · Erstgespräch kostenlos</p>
          </div>
        </details>
        {active === 'kontakt' ? (
          <a
            className="header-cta btn-outline"
            href="https://calendly.com/sjcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termin buchen ↗
          </a>
        ) : (
          <a className="header-cta btn-primary" href="/kontakt.html">
            Projekt anfragen
          </a>
        )}
      </div>
    </header>
  );
}
