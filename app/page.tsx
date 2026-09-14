import type { Metadata } from 'next';
import { Fragment } from 'react';
import { openGraph } from '@/lib/og';
import { SITE, PROOF } from '@/lib/site';
import { SERVICES, serviceUrl } from '@/lib/services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import TrustBar from '@/components/TrustBar';
import InboxMock from '@/components/InboxMock';
import PricingCards from '@/components/PricingCards';
import Reviews from '@/components/Reviews';
import FaqList from '@/components/FaqList';
import CtaBand from '@/components/CtaBand';
import EmailDemoSection from '@/components/EmailDemoSection';
import { REVIEW_STATS } from '@/components/reviewsData';

export const metadata: Metadata = {
  title: 'SJCODE – Softwareentwicklung & KI-Automatisierung für Handwerk, Dienstleister & KMU',
  description:
    'Websites zum Festpreis, KI-Automatisierung und individuelle Software für Betriebe ohne IT-Abteilung. 10+ Jahre Industriepraxis, 5,0 Sterne auf Google, kostenloses Erstgespräch. Euskirchen, Köln, deutschlandweit.',
  alternates: { canonical: `${SITE.url}/` },
  openGraph: openGraph({
    title: 'SJCODE – Software & KI, die Ihnen Zeit spart',
    description:
      'Websites, KI-Automatisierung und individuelle Tools für Handwerk, Dienstleister und kleine Unternehmen. Kostenloses Erstgespräch, klares Angebot.',
    url: `${SITE.url}/`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': SITE.businessId,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/og-image.png`,
      logo: `${SITE.url}/favicon.svg`,
      email: SITE.email,
      telephone: SITE.phoneIntl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.street,
        addressLocality: SITE.city,
        postalCode: SITE.zip,
        addressCountry: 'DE',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 50.66, longitude: 6.79 },
      description:
        'Softwareentwicklung & AI Engineering für kleine und mittlere Betriebe: Websites zum Festpreis, KI-Automatisierung, individuelle Tools und E-Mail-Automatisierung.',
      founder: { '@id': SITE.personId },
      areaServed: ['Euskirchen', 'Köln', 'Bonn', 'Rheinland', 'DE'],
      knowsLanguage: 'de',
      priceRange: '€€',
      sameAs: [SITE.github, SITE.linkedin, SITE.googleProfileUrl],
      makesOffer: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: `${SITE.url}${serviceUrl(s)}` },
      })),
    },
    {
      '@type': 'Person',
      '@id': SITE.personId,
      name: SITE.owner,
      image: `${SITE.url}/images/sinan-kahraman.webp`,
      jobTitle: 'Softwareentwickler & AI Engineer',
      worksFor: { '@id': SITE.businessId },
      sameAs: [SITE.github, SITE.linkedin],
      url: `${SITE.url}/ueber-mich.html`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': SITE.businessId },
      inLanguage: 'de-DE',
    },
  ],
};

const AUDIENCES = [
  {
    icon: '🔧',
    title: 'Handwerk',
    text: 'Angebote, Aufmaße und Anfragen – ohne Feierabend-Papierkram.',
  },
  {
    icon: '🗓',
    title: 'Dienstleister & Praxen',
    text: 'Terminbestätigungen, Erinnerungen, weniger Ausfälle.',
  },
  {
    icon: '💼',
    title: 'Selbständige',
    text: 'Belege automatisch erkannt, benannt, ans Steuerbüro.',
  },
  {
    icon: '🏢',
    title: 'Kleine Unternehmen',
    text: 'Interner Assistent auf Ihren Unterlagen, Tools für Ihr Team.',
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
    title: 'Auf Augenhöhe, ohne Fachchinesisch',
    text: 'Über zehn Jahre Betriebstechnik heißt: Ich weiß, wie Abläufe in der Praxis aussehen – nicht nur auf Folien. Wir reden über Ihr Problem, nicht über Frameworks.',
  },
  {
    title: 'Ich vereinfache gern',
    text: 'Wenn eine Aufgabe jeden Tag Zeit frisst, gehört sie automatisiert. Und wenn sich etwas nicht lohnt, sage ich das auch – vor dem Angebot.',
  },
  {
    title: 'Nachvollziehbar statt Blackbox',
    text: 'Automatisierte Tests, Dokumentation, saubere Übergabe. Sie bekommen ein Werkzeug, das Sie verstehen und behalten – mit allen Zugängen.',
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
    text: '15–30 Minuten: Wir klären Ziel, Umfang und Machbarkeit. Ehrliche Einschätzung – auch, wenn sich etwas nicht lohnt.',
  },
  {
    num: 'Schritt 3',
    title: 'Angebot & Umsetzung',
    text: 'Klares Festpreis- oder Aufwandsangebot, dann iterative Entwicklung mit Zwischenständen, Tests und Übergabe.',
  },
];

const HOME_FAQS = [
  {
    q: 'Was kostet die Zusammenarbeit?',
    a: 'Websites starten bei einem Festpreis ab 1.900 € netto, KI-Automatisierungen ab 2.500 € – nach einer kostenlosen Prozess-Analyse. Sie bekommen vorab ein klares Angebot; vorher fließt kein Geld.',
  },
  {
    q: 'Wie lange dauert ein Projekt?',
    a: 'Kleine Websites sind oft in zwei bis vier Wochen online, Automatisierungen je nach Komplexität in zwei bis acht Wochen. Sie bekommen von Anfang an einen realistischen Zeitplan und regelmäßige Zwischenstände.',
  },
  {
    q: 'Ich weiß noch nicht genau, was ich brauche – ist das ein Problem?',
    a: 'Überhaupt nicht. Genau dafür ist das Erstgespräch da. Beschreiben Sie einfach Ihr Problem in ein paar Sätzen – ich sage Ihnen ehrlich, ob und wie sich das lösen lässt.',
  },
  {
    q: 'Arbeiten Sie auch remote und deutschlandweit?',
    a: 'Ja. Die Zusammenarbeit läuft komplett remote per Video, Telefon und E-Mail – unabhängig davon, wo Sie sitzen. Persönliche Treffen in der Region Euskirchen/Köln/Bonn sind nach Absprache möglich.',
  },
  {
    q: 'Was passiert mit meinen Daten?',
    a: 'Ich arbeite DSGVO-konform. Bei KI-Lösungen werden E-Mail-Inhalte streng als Daten behandelt – nie als Anweisung an das Modell – und nichts geht ohne Ihre Freigabe raus. Details in der Datenschutzerklärung.',
  },
  {
    q: 'Wem gehört das Ergebnis?',
    a: 'Ihnen. Quellcode, Domain, Hosting und alle Zugänge laufen auf Ihren Namen. Sie bleiben unabhängig – auch von mir.',
  },
];

export default function HomePage() {
  const rating = REVIEW_STATS.average.toFixed(1).replace('.', ',');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="start" />
      <main id="main" tabIndex={-1}>
        <section id="hero" className="hero-split container">
          <div className="hero-text">
            <p className="hero-kicker rise rise-1">
              <span className="pill">Softwareentwicklung &amp; KI-Automatisierung</span>
              <span>für Handwerk, Dienstleister &amp; KMU</span>
            </p>
            <h1 className="rise rise-2">
              Weniger Handarbeit im Betrieb.{' '}
              <br />
              Software, die Ihnen jeden Tag Zeit spart.
            </h1>
            <p className="lede rise rise-3">
              Ich bin Sinan – über zehn Jahre Betriebstechnik, heute Softwareentwickler und AI
              Engineer. Ich baue Websites, Automatisierungen und Tools für Betriebe, die keine
              IT-Abteilung haben. Verständlich, getestet, ohne Blackbox.
            </p>
            <div className="actions rise rise-4">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-umami-event="erstgespraech"
                data-umami-event-ort="hero"
              >
                Kostenloses Erstgespräch ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
              <a href="/leistungen.html" className="btn btn-outline">
                Leistungen ansehen →
              </a>
            </div>
            <p className="hero-contact rise rise-4">
              Oder direkt:{' '}
              <a href={SITE.phoneHref} data-umami-event="anruf" data-umami-event-ort="hero">
                {SITE.phoneDisplay}
              </a>{' '}
              ·{' '}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="whatsapp"
                data-umami-event-ort="hero"
              >
                WhatsApp schreiben ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </p>
            <p className="subline rise rise-5">
              <span className="stars-inline" aria-hidden="true">
                ★★★★★
              </span>{' '}
              {rating} auf Google · {REVIEW_STATS.count} Bewertungen · Antwort in {PROOF.responseTime}
            </p>
          </div>
          <div className="hero-visual rise rise-3">
            <InboxMock withPipeline={false} />
          </div>
        </section>

        <TrustBar />

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Für wen</p>
                <h2 className="section-title">Gebaut für Betriebe ohne eigene IT-Abteilung.</h2>
                <p className="section-sub">
                  Ich arbeite mit Handwerksbetrieben, Dienstleistern, Praxen, Selbständigen und
                  kleinen Unternehmen – überall dort, wo Anfragen, Angebote und Belege jeden Tag
                  Zeit kosten.
                </p>
              </div>
            </div>
            <div className="audience-grid reveal">
              {AUDIENCES.map((a) => (
                <div key={a.title} className="audience-card">
                  <span className="icon" aria-hidden="true">
                    {a.icon}
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Leistungen</p>
                <h2 className="section-title">Womit ich Ihnen helfen kann</h2>
              </div>
              <a href="/leistungen.html" className="link-accent">
                Alle Leistungen →
              </a>
            </div>
            <div className="card-grid reveal">
              {SERVICES.map((s) => (
                <a key={s.slug} href={serviceUrl(s)} className="teaser-card">
                  <div className="num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.teaser}</p>
                  <span className="teaser-more">Mehr erfahren →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="why-grid reveal">
              <div className="why-intro">
                <p className="eyebrow">Warum mit mir?</p>
                <h2 className="section-title">Ich kenne den Betriebsalltag – nicht nur die Folien.</h2>
                <div className="why-person">
                  <img
                    src="/images/sinan-kahraman.webp"
                    alt="Porträt von Sinan Kahraman"
                    width={72}
                    height={72}
                    loading="lazy"
                  />
                  <span>
                    <strong>{SITE.owner}</strong>
                    <br />
                    Softwareentwickler &amp; AI Engineer, {SITE.city}
                  </span>
                </div>
                <a href="/ueber-mich.html" className="link-accent">
                  Mehr über mich →
                </a>
              </div>
              <div className="value-list">
                {VALUES.map((v) => (
                  <div key={v.title} className="value-item">
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="reveal">
              <h2 className="section-title" style={{ marginBottom: 14 }}>
                So sieht Automatisierung bei mir aus
              </h2>
              <p className="section-sub">
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

        <EmailDemoSection />

        <section className="section">
          <div className="container reveal">
            <div className="case-split">
              <div>
                <p className="eyebrow">Aus der Praxis · läuft produktiv</p>
                <h2 className="section-title" style={{ marginBottom: 18 }}>
                  Booking Email Check
                </h2>
                <p className="section-sub" style={{ marginBottom: 36 }}>
                  Eine Plattform, die Buchungs-E-Mails automatisch liest, einordnet und
                  Antwortentwürfe vorbereitet – versendet wird erst, wenn ein Mensch freigibt. Läuft
                  heute produktiv für Betriebe mit hohem Buchungsaufkommen.
                </p>
                <div className="stats">
                  <div>
                    <strong>{PROOF.testsInReference}</strong>
                    <small>automatisierte Tests</small>
                  </div>
                  <div>
                    <strong>{PROOF.releasesInReference}</strong>
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
              <div className="case-tech">
                <p className="tech-label">Eingesetzte Technik</p>
                <div className="tag-row">
                  {['Flask', 'LangGraph', 'OpenAI', 'MongoDB Atlas', 'React', 'Langfuse', 'GitHub Actions'].map(
                    (t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <ul className="dash-list" style={{ marginTop: 22 }}>
                  <li>Multi-Tenant-Architektur</li>
                  <li>Klassifikation &amp; Datenextraktion per LLM</li>
                  <li>Prompt-Injection-Härtung</li>
                  <li>Jede Entscheidung nachvollziehbar (Langfuse)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Ablauf</p>
                <h2 className="section-title">So arbeiten wir zusammen</h2>
                <p className="section-sub">Drei Schritte, keine Überraschungen. Vor dem Angebot fließt kein Geld.</p>
              </div>
            </div>
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

        <section className="section">
          <div className="container reveal">
            <a href="/automatisierungs-check.html" className="check-teaser" data-umami-event="check-teaser">
              <div>
                <p className="eyebrow">Kostenloser Automatisierungs-Check</p>
                <h2>Wie viel Zeit steckt in Ihrer Handarbeit?</h2>
                <p>
                  Sechs Fragen, eine Minute – Sie sehen sofort, wie viele Stunden im Monat sich
                  automatisieren lassen und womit Sie anfangen sollten. Ohne Anmeldung.
                </p>
              </div>
              <span className="btn btn-primary">Check starten →</span>
            </a>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Preise</p>
                <h2 className="section-title">Transparent statt Überraschung</h2>
                <p className="section-sub">
                  Websites zum Festpreis, Automatisierung nach klar kalkuliertem Aufwand. Alle
                  Angaben netto.
                </p>
              </div>
              <a href="/preise.html" className="link-accent">
                Alle Preise →
              </a>
            </div>
            <PricingCards compact />
          </div>
        </section>

        <Reviews />

        <FaqList faqs={HOME_FAQS} />

        <CtaBand />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
