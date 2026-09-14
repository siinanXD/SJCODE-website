import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import AutomationCheck from '@/components/AutomationCheck';
import FaqList from '@/components/FaqList';
import { REVIEW_STATS } from '@/components/reviewsData';

export const metadata: Metadata = {
  title: 'Automatisierungs-Check – Wie viel Zeit steckt in Ihrer Handarbeit? | SJCODE',
  description:
    'Kostenloser Automatisierungs-Check: sechs Fragen, eine Minute. Sie erfahren, wie viele Stunden im Monat sich in Ihrem Betrieb automatisieren lassen und was sich zuerst lohnt. Ohne Anmeldung.',
  alternates: { canonical: `${SITE.url}/automatisierungs-check.html` },
  openGraph: openGraph({
    title: 'Automatisierungs-Check – 6 Fragen, 1 Minute',
    description:
      'Wie viele Stunden im Monat lassen sich in Ihrem Betrieb automatisieren? Kostenlos, ohne Anmeldung.',
    url: `${SITE.url}/automatisierungs-check.html`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Automatisierungs-Check', item: `${SITE.url}/automatisierungs-check.html` },
      ],
    },
    {
      '@type': 'WebApplication',
      name: 'Automatisierungs-Check',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      provider: { '@id': SITE.businessId },
      description:
        'Sechs Fragen zur Handarbeit im Betrieb, Ergebnis: geschätzte automatisierbare Stunden pro Monat und passende Empfehlung.',
    },
  ],
};

const FAQS = [
  {
    q: 'Wie genau ist die Schätzung?',
    a: 'Sie ist bewusst konservativ: 60 % der Handarbeit gelten als automatisierbar, gerechnet mit 21 Arbeitstagen. Die echte Zahl ermitteln wir in der kostenlosen Prozess-Analyse anhand Ihrer tatsächlichen Abläufe.',
  },
  {
    q: 'Muss ich meine E-Mail-Adresse angeben?',
    a: 'Nein. Das Ergebnis sehen Sie sofort. Die Adresse ist nur nötig, wenn Sie das Ergebnis zugeschickt haben möchten – und Sie bekommen dann keinen Newsletter.',
  },
  {
    q: 'Was passiert nach dem Check?',
    a: 'Nichts automatisch. Wenn das Potenzial da ist, empfehle ich Ihnen die kostenlose Prozess-Analyse: 30 Minuten, in denen wir den Ablauf konkret anschauen. Danach bekommen Sie ein Festpreis-Angebot – oder die ehrliche Auskunft, dass es sich nicht lohnt.',
  },
];

export default function AutomatisierungsCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="leistungen" />
      <main id="main" tabIndex={-1}>
        <section className="kontakt-grid container">
          <div className="rise rise-1">
            <nav className="breadcrumb" aria-label="Brotkrumen">
              <a href="/index.html">Start</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Automatisierungs-Check</span>
            </nav>
            <p className="eyebrow">Kostenlos · ohne Anmeldung</p>
            <h1>Wie viel Zeit steckt in Ihrer Handarbeit?</h1>
            <p className="lede">
              Sechs Fragen, eine Minute. Sie erfahren, wie viele Stunden im Monat sich in Ihrem
              Betrieb automatisieren lassen, was das in Euro bedeutet und womit Sie am besten
              anfangen. Ehrlich auch dann, wenn sich Automatisierung für Sie noch nicht lohnt.
            </p>
            <ul className="check-list">
              <li>Ergebnis sofort, keine E-Mail nötig</li>
              <li>Konservative Schätzung aus echten Projekten</li>
              <li>Danach optional: kostenlose Prozess-Analyse, 30 Minuten</li>
            </ul>
            <p className="subline" style={{ marginTop: 24, fontSize: 14, color: 'var(--faint)' }}>
              <span className="stars-inline" aria-hidden="true">
                ★★★★★
              </span>{' '}
              {REVIEW_STATS.average.toFixed(1).replace('.', ',')} auf Google · {REVIEW_STATS.count}{' '}
              Bewertungen
            </p>
          </div>
          <div className="rise rise-2">
            <AutomationCheck />
          </div>
        </section>

        <FaqList faqs={FAQS} title="Fragen zum Check" />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
