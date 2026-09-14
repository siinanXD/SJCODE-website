import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import KontaktForm from '@/components/KontaktForm';
import { REVIEW_STATS } from '@/components/reviewsData';

export const metadata: Metadata = {
  title: 'Kontakt – Projekt anfragen, Antwort in 24 Stunden | SJCODE',
  description:
    'Projekt anfragen bei SJCODE: vier kurze Schritte in unter zwei Minuten, persönliche Antwort innerhalb von 24 Stunden – oder direkt ein kostenloses Erstgespräch buchen.',
  alternates: { canonical: `${SITE.url}/kontakt.html` },
  openGraph: openGraph({
    title: 'Kontakt – SJCODE',
    description:
      'Projekt anfragen: vier kurze Schritte, persönliche Antwort innerhalb von 24 Stunden.',
    url: `${SITE.url}/kontakt.html`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${SITE.url}/kontakt.html` },
      ],
    },
    {
      '@type': 'ContactPage',
      url: `${SITE.url}/kontakt.html`,
      mainEntity: { '@id': SITE.businessId },
    },
  ],
};

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="kontakt" />
      <main id="main" tabIndex={-1}>
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
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
                style={{ fontSize: 15.5 }}
              >
                Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </div>
            <ul className="contact-facts">
              <li>
                <strong>E-Mail</strong>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <strong>Standort</strong>
                <span>
                  {SITE.street}, {SITE.zip} {SITE.city} · Remote deutschlandweit
                </span>
              </li>
              <li>
                <strong>Bewertungen</strong>
                <span>
                  {REVIEW_STATS.average.toFixed(1).replace('.', ',')} ★ · {REVIEW_STATS.count} auf
                  Google
                </span>
              </li>
            </ul>
          </div>
          <div className="rise rise-2">
            <KontaktForm />
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
