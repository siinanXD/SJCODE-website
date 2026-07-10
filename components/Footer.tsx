export default function Footer({ active = 'none' }: { active?: 'impressum' | 'datenschutz' | 'none' }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="copyright">© 2026 SJCODE · Sinan</span>
        <nav aria-label="Rechtliches und Profile">
          <a href="/impressum.html" aria-current={active === 'impressum' ? 'page' : undefined}>
            Impressum
          </a>
          <a href="/datenschutz.html" aria-current={active === 'datenschutz' ? 'page' : undefined}>
            Datenschutz
          </a>
          <a href="https://github.com/siinanxd" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kahraman-sinan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
