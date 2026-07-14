import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden – SJCODE',
};

export default function NotFound() {
  return (
    <>
      <Header active="none" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container notfound">
          <p className="eyebrow rise rise-1">Fehler 404</p>
          <h1 className="rise rise-2">Diese Seite gibt es nicht (mehr).</h1>
          <p className="lede rise rise-3" style={{ maxWidth: 560 }}>
            Vielleicht ein alter Link oder ein kleiner Tippfehler. Kein Problem – gehen Sie zurück
            zur Startseite oder erzählen Sie mir direkt von Ihrem Projekt.
          </p>
          <div className="actions rise rise-4">
            <a href="/index.html" className="btn btn-primary">
              Zur Startseite
            </a>
            <a href="/kontakt.html" className="btn btn-outline">
              Projekt anfragen
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
