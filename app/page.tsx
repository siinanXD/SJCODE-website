import type { Metadata } from 'next';
import { Fragment } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Reviews from '@/components/Reviews';

export const metadata: Metadata = {
  title: 'SJCODE – Sinan · Softwareentwicklung & AI Engineering für den Mittelstand',
  description:
    'Ich bin Sinan. Nach 10+ Jahren als Elektroniker für Betriebstechnik baue ich heute Software und KI-Lösungen, die kleinen und mittleren Betrieben Zeit sparen.',
  alternates: { canonical: 'https://sjcode.de/' },
  openGraph: {
    title: 'SJCODE – Software & KI, die Ihnen Zeit spart',
    description:
      '10+ Jahre Industriepraxis, heute AI Engineering: Websites, Automatisierung und individuelle Tools für den Mittelstand.',
    url: 'https://sjcode.de/',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SJCODE',
  url: 'https://sjcode.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mühlenstraße 44',
    addressLocality: 'Euskirchen',
    postalCode: '53879',
    addressCountry: 'DE',
  },
  description:
    'Softwareentwicklung & AI Engineering für kleine und mittlere Betriebe: Websites, KI-Automatisierung, individuelle Tools und E-Mail-Automatisierung.',
  founder: {
    '@type': 'Person',
    name: 'Sinan Kahraman',
    sameAs: ['https://github.com/siinanxd', 'https://www.linkedin.com/in/kahraman-sinan/'],
    jobTitle: 'Softwareentwickler & AI Engineer',
  },
  areaServed: 'DE',
  knowsLanguage: 'de',
  priceRange: '$$',
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webseiten-Entwicklung' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Projekte & Automatisierung' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Individuelle Softwarelösungen' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Mail- & Postfach-Automatisierung' } },
  ],
};

const TEASERS = [
  {
    num: '01',
    href: '/leistungen.html#web',
    title: 'Webseiten-Entwicklung',
    text: 'Moderne, schnelle Websites mit React und Next.js – gefunden werden, überzeugen, pflegen können.',
  },
  {
    num: '02',
    href: '/leistungen.html#ai',
    title: 'AI-Projekte & Automatisierung',
    text: 'E-Mail-Verarbeitung mit LLMs, RAG-Systeme, Chatbots und Workflow-Automatisierung.',
  },
  {
    num: '03',
    href: '/leistungen.html#software',
    title: 'Individuelle Softwarelösungen',
    text: 'Kleine Tools, Skripte, interne Apps und API-Integrationen – genau für Ihre Abläufe.',
  },
  {
    num: '04',
    href: '/leistungen.html#email',
    title: 'E-Mail- & Postfach-Automatisierung',
    text: 'Intelligente Sortierung und Antwortentwürfe – Sie geben frei, nichts geht automatisch raus.',
  },
];

const WORKFLOW = [
  { num: '1', title: 'E-Mail geht ein', text: 'Die Anfrage landet wie gewohnt im Postfach.' },
  { num: '2', title: 'KI liest & ordnet ein', text: 'Anliegen, Daten und Dringlichkeit werden erkannt.' },
  { num: '3', title: 'Entwurf entsteht', text: 'Eine passende Antwort liegt automatisch bereit.' },
  { num: '4', title: 'Sie geben frei', text: 'Kein Versand ohne Ihr Okay – fertig in Sekunden.' },
];

const VALUES = [
  {
    title: 'Ich kenne den Betriebsalltag.',
    text: 'Über zehn Jahre Betriebstechnik heißt: Ich weiß, wie Abläufe in der Praxis aussehen – nicht nur auf Folien. Wir reden auf Augenhöhe, ohne IT-Fachchinesisch.',
  },
  {
    title: 'Ich vereinfache gern.',
    text: 'Zur KI kam ich, weil ich Dinge einfacher machen wollte. Wenn eine Aufgabe jeden Tag Zeit frisst, gehört sie automatisiert – so einfach ist mein Ansatz.',
  },
  {
    title: 'Ich arbeite nachvollziehbar.',
    text: 'Automatisierte Tests, saubere Übergabe, Dokumentation. Sie bekommen keine Blackbox, sondern ein Werkzeug, das Sie verstehen und behalten.',
  },
];

const STEPS = [
  {
    num: 'Schritt 1',
    title: 'Anfrage',
    text: 'Sie beschreiben Ihr Anliegen in drei Sätzen über das Formular – oder buchen direkt einen Termin.',
  },
  {
    num: 'Schritt 2',
    title: 'Kostenloses Erstgespräch',
    text: '15–30 Minuten: Wir klären Ziel, Umfang und Machbarkeit. Sie bekommen eine ehrliche Einschätzung – auch, wenn sich etwas nicht lohnt.',
  },
  {
    num: 'Schritt 3',
    title: 'Umsetzung',
    text: 'Iterative Entwicklung mit regelmäßigen Zwischenständen, Tests und sauberer Übergabe inklusive Dokumentation.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="start" />
      <main id="main" tabIndex={-1}>

      <section id="hero" className="hero container">
        <div className="portrait rise rise-1">
          <img
            src="/images/sinan-kahraman.webp"
            alt="Porträt von Sinan"
            width={150}
            height={150}
          />
        </div>
        <h1 className="rise rise-2">
          Hallo, ich bin Sinan.
          <br />
          Ich baue Software, die Ihnen Zeit spart.
        </h1>
        <p className="lede rise rise-3">
          Über zehn Jahre als Elektroniker für Betriebstechnik, heute Softwareentwicklung und AI
          Engineering.
        </p>
        <div className="actions rise rise-4">
          <a href="/kontakt.html" className="btn btn-primary">
            Projekt anfragen
          </a>
          <a
            href="https://calendly.com/sjcode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Kostenloses Erstgespräch ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </div>
        <p className="subline rise rise-5">
          10+ Jahre Industriepraxis · Weiterbildung AI Engineering &amp; Softwareentwicklung
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Womit ich Ihnen helfen kann</h2>
            <a href="/leistungen.html" className="link-accent">
              Alle Leistungen →
            </a>
          </div>
          <div className="card-grid reveal">
            {TEASERS.map((t) => (
              <a key={t.num} href={t.href} className="teaser-card">
                <div className="num">{t.num}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal" style={{ marginBottom: 44 }}>
            Warum mit mir?
          </h2>
          <div className="value-grid reveal">
            {VALUES.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ marginBottom: 14 }}>
              So sieht Automatisierung bei mir aus
            </h2>
            <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
              Beispiel E-Mail-Automatisierung: vier Schritte – und der letzte gehört immer Ihnen.
            </p>
          </div>
          <div className="workflow reveal">
            {WORKFLOW.map((w, i) => (
              <Fragment key={w.num}>
                {i > 0 && <div className="wf-connector" aria-hidden="true" />}
                <div className="wf-node">
                  <div className="wf-circle">{w.num}</div>
                  <div>
                    <strong>{w.title}</strong>
                    <small>{w.text}</small>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-surface">
        <div className="container reveal">
          <p className="eyebrow">Aus der Praxis</p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Booking Email Check
          </h2>
          <p style={{ margin: '0 0 36px', maxWidth: 620, fontSize: 16.5, lineHeight: 1.7, color: 'var(--muted)' }}>
            Eine Plattform, die Buchungs-E-Mails automatisch liest, einordnet und Antwortentwürfe
            vorbereitet – versendet wird erst, wenn ein Mensch freigibt. Läuft heute produktiv für
            Betriebe mit hohem Buchungsaufkommen.
          </p>
          <div className="stats">
            <div>
              <strong>276+</strong>
              <small>automatisierte Tests</small>
            </div>
            <div>
              <strong>60+</strong>
              <small>Releases in Produktion</small>
            </div>
            <div>
              <strong>0</strong>
              <small>Mails ohne menschliche Freigabe</small>
            </div>
          </div>
          <a href="/referenz.html" className="link-accent" style={{ fontSize: 16 }}>
            Zur Case Study →
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal" style={{ marginBottom: 44 }}>
            So arbeiten wir zusammen
          </h2>
          <div className="step-grid reveal">
            {STEPS.map((s) => (
              <div key={s.num} className="step">
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section className="section cta-band">
        <div className="container reveal">
          <h2>Erzählen Sie mir von Ihrem Projekt.</h2>
          <p>Kostenloses Erstgespräch, ehrliche Einschätzung, klares Angebot.</p>
          <div className="actions">
            <a href="/kontakt.html" className="btn btn-primary">
              Projekt anfragen
            </a>
            <a
              href="https://calendly.com/sjcode"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
