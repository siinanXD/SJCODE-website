import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import { CARE, PRICING_FAQS } from '@/lib/pricing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import PricingCards from '@/components/PricingCards';
import FaqList from '@/components/FaqList';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Preise – Website ab 1.900 €, KI-Automatisierung ab 2.500 € | SJCODE',
  description:
    'Transparente Preise: Website Starter ab 1.900 €, Website Business ab 3.900 €, KI-Automatisierung ab 2.500 € nach kostenloser Prozess-Analyse. Betreuung ab 89 €/Monat. Alle Preise netto, Festpreis-Angebot vorab.',
  alternates: { canonical: `${SITE.url}/preise.html` },
  openGraph: openGraph({
    title: 'Preise – SJCODE',
    description:
      'Websites zum Festpreis, KI-Automatisierung nach Prozess-Analyse, Betreuung monatlich kündbar.',
    url: `${SITE.url}/preise.html`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
    { '@type': 'ListItem', position: 2, name: 'Preise', item: `${SITE.url}/preise.html` },
  ],
};

const INCLUDED = [
  'Kostenloses Erstgespräch und ehrliche Einschätzung',
  'Festpreis-Angebot vor Projektstart',
  'Regelmäßige Zwischenstände zum Ausprobieren',
  'Automatisierte Tests und Dokumentation',
  'Quellcode, Domain und Zugänge auf Ihren Namen',
  'Persönliche Antwort innerhalb von 24 Stunden',
];

export default function PreisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="preise" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <nav className="breadcrumb rise rise-1" aria-label="Brotkrumen">
            <a href="/index.html">Start</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Preise</span>
          </nav>
          <p className="eyebrow rise rise-1">Preise</p>
          <h1 className="rise rise-2">Transparent statt Überraschung.</h1>
          <p className="lede rise rise-3">
            Websites zum Festpreis, Automatisierung nach klar kalkuliertem Aufwand. Im kostenlosen
            Erstgespräch bekommen Sie eine ehrliche Einschätzung – vorher fließt kein Geld. Alle
            Preise netto.
          </p>
        </section>

        <section className="container" style={{ paddingBottom: 90 }}>
          <PricingCards />
        </section>

        <section className="section on-surface">
          <div className="container">
            <div className="care-box reveal">
              <div>
                <h2>{CARE.name}</h2>
                <p>{CARE.text}</p>
                <p className="care-hourly">{CARE.hourly}</p>
              </div>
              <div className="care-price">
                <strong>{CARE.price}</strong>
                <a href="/kontakt.html?thema=Betreuung" className="btn btn-outline">
                  Betreuung anfragen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Immer inklusive</p>
                <h2 className="section-title">Was in jedem Projekt drin ist</h2>
              </div>
            </div>
            <ul className="check-list columns reveal">
              {INCLUDED.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </section>

        <FaqList faqs={PRICING_FAQS} title="Fragen zu Preisen" />

        <CtaBand
          title="Welches Paket passt zu Ihnen?"
          text="Im kostenlosen Erstgespräch finden wir es heraus – ehrlich, auch wenn ein kleineres Paket reicht."
        />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
