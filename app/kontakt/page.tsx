import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import KontaktForm from '@/components/KontaktForm';

export const metadata: Metadata = {
  title: 'Kontakt – SJCODE · Projekt anfragen',
  description:
    'Projekt anfragen bei SJCODE: vier kurze Schritte in unter zwei Minuten, persönliche Antwort innerhalb von 24 Stunden – oder direkt ein kostenloses Erstgespräch buchen.',
  alternates: { canonical: 'https://sjcode.de/kontakt.html' },
  openGraph: {
    title: 'Kontakt – SJCODE',
    description:
      'Projekt anfragen: vier kurze Schritte, persönliche Antwort innerhalb von 24 Stunden.',
    url: 'https://sjcode.de/kontakt.html',
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header active="kontakt" />

      <section className="kontakt-grid container">
        <div className="rise rise-1">
          <h1>Erzählen Sie mir von Ihrem Projekt.</h1>
          <p className="lede">
            Vier kurze Schritte, das meiste per Antippen – dauert keine zwei Minuten. Keine
            Pflichttelefonate, kein Newsletter. Sie erhalten innerhalb von 24 Stunden eine
            persönliche Antwort – von mir, nicht von einem Bot.
          </p>
          <div className="aside-card">
            <h2>Lieber direkt sprechen?</h2>
            <p>Buchen Sie ein kostenloses Erstgespräch – 15 Minuten, unverbindlich.</p>
            <a
              href="https://calendly.com/sjcode"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
              style={{ fontSize: 15.5 }}
            >
              Termin buchen ↗
            </a>
          </div>
        </div>
        <div className="rise rise-2">
          <KontaktForm />
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </>
  );
}
