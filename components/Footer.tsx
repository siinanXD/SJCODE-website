export default function Footer({ active = 'none' }: { active?: 'impressum' | 'datenschutz' | 'none' }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Sichtbare NAP-Angaben (Name, Adresse) – Local-SEO-Signal und
            deckungsgleich mit dem ProfessionalService-Schema auf der Startseite. */}
        <div className="footer-nap">
          <span className="copyright">© 2026 SJCODE · Sinan</span>
          <address>
            Mühlenstraße 44, 53879 Euskirchen · Remote deutschlandweit
          </address>
        </div>
        <nav aria-label="Rechtliches und Profile">
          <a href="/impressum.html" aria-current={active === 'impressum' ? 'page' : undefined}>
            Impressum
          </a>
          <a href="/datenschutz.html" aria-current={active === 'datenschutz' ? 'page' : undefined}>
            Datenschutz
          </a>
          <a href="https://github.com/siinanxd" target="_blank" rel="noopener noreferrer">
            GitHub<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/kahraman-sinan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
