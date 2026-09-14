import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Danke-Seite nach dem Absenden des Formulars. Eigene URL, damit sich die
 * Anfrage als Conversion messen lässt (Umami-Ziel „/danke.html“, Google Ads).
 * Nicht indexieren – sie hat ohne vorherige Anfrage keinen Sinn.
 */
export const metadata: Metadata = {
  title: 'Danke für Ihre Anfrage – SJCODE',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/danke.html` },
};

export default function DankePage() {
  return (
    <>
      <Header active="none" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container notfound">
          <div className="success-card" role="status" style={{ maxWidth: 640, textAlign: 'left' }}>
            <div className="check" aria-hidden="true" style={{ margin: '0 0 20px' }}>
              ✓
            </div>
            <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
              Danke, Ihre Anfrage ist angekommen.
            </h1>
            <p>
              Ich melde mich innerhalb von 24 Stunden persönlich bei Ihnen – per E-Mail oder, wenn
              Sie eine Nummer angegeben haben, telefonisch. Es geht schneller? Dann rufen Sie
              einfach an oder schreiben per WhatsApp.
            </p>
            <div className="actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href={SITE.phoneHref} className="btn btn-outline">
                {SITE.phoneDisplay}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                WhatsApp ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
              <a href="/index.html" className="btn btn-primary">
                Zur Startseite
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
