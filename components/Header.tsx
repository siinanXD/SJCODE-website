import ThemeToggle from './ThemeToggle';
import { SITE } from '@/lib/site';

const NAV_ITEMS = [
  { href: '/leistungen.html', label: 'Leistungen', key: 'leistungen' },
  { href: '/preise.html', label: 'Preise', key: 'preise' },
  { href: '/referenz.html', label: 'Referenz', key: 'referenz' },
  { href: '/ueber-mich.html', label: 'Über mich', key: 'ueber-mich' },
  { href: '/kontakt.html', label: 'Kontakt', key: 'kontakt' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'] | 'start' | 'none';

export default function Header({ active }: { active: NavKey }) {
  const current = (key: string) => (key === active ? 'page' : undefined);

  return (
    <header className="site-header">
      <div className="announcement">
        Persönliche Antwort innerhalb von 24 Stunden · Erstgespräch kostenlos
      </div>
      <div className="container nav-row">
        <a href="/index.html" className="brand" aria-label="SJCODE – zur Startseite">
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
            <a href="/index.html" aria-current={current('start')}>
              Start
            </a>
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
        <ThemeToggle />
        {active === 'kontakt' ? (
          <a
            className="header-cta btn-outline"
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        ) : (
          <a className="header-cta btn-primary" href="/kontakt.html" data-umami-event="projekt-anfragen" data-umami-event-ort="header">
            Projekt anfragen
          </a>
        )}
      </div>
    </header>
  );
}
