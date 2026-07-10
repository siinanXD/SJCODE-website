import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Impressum – SJCODE',
  robots: { index: false },
  alternates: { canonical: 'https://sjcode.de/impressum.html' },
};

export default function ImpressumPage() {
  return (
    <>
      <Header active="none" />

      <main className="legal container">
        <h1>Impressum</h1>
        <div className="legal-body">
          <p>
            <strong>Angaben gemäß § 5 DDG</strong>
            <br />
            Sinan Kahraman
            <br />
            SJCODE – Softwareentwicklung &amp; AI Engineering
            <br />
            Mühlenstraße 44
            <br />
            53879 Euskirchen, Deutschland
          </p>
          <p>
            <strong>Kontakt</strong>
            <br />
            E-Mail: kontakt@sjcode.de
          </p>
          <p>
            <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong>
            <br />
            Sinan Kahraman, Anschrift wie oben
          </p>
        </div>
        <a href="/index.html" className="link-accent back-home" style={{ fontSize: 15 }}>
          ← Zurück zur Startseite
        </a>
      </main>

      <Footer active="impressum" />
      <CookieBanner />
    </>
  );
}
