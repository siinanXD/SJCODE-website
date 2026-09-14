import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE, PROOF } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import InboxMock from '@/components/InboxMock';
import Reviews from '@/components/Reviews';
import CtaBand from '@/components/CtaBand';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Referenz: Booking Email Check – KI-E-Mail-Automatisierung in Produktion | SJCODE',
  description:
    'Case Study: Booking Email Check – Plattform zur automatischen Verarbeitung von Buchungs-E-Mails. Klassifikation, Datenextraktion und Antwortentwürfe mit menschlicher Freigabe. 276+ Tests, 60+ Releases.',
  alternates: { canonical: `${SITE.url}/referenz.html` },
  openGraph: openGraph({
    title: 'Referenz: Booking Email Check – SJCODE',
    description:
      'Plattform zur automatischen Verarbeitung von Buchungs-E-Mails – mit menschlicher Freigabe, läuft produktiv.',
    url: `${SITE.url}/referenz.html`,
  }),
};

const HIGHLIGHTS = [
  {
    title: 'Multi-Tenant-Architektur',
    text: ' – eine Plattform, viele Mandanten, sauber getrennt. Skaliert vom Einzelbetrieb bis zum Verbund.',
  },
  {
    title: 'Klassifikation & Datenextraktion per LLM',
    text: ' – GPT-4o-mini, orchestriert über LangGraph, mit strukturierter Extraktion der Buchungsdaten.',
  },
  {
    title: 'Prompt-Injection-Härtung',
    text: ' – E-Mail-Inhalte werden strikt als Daten behandelt, nie als Anweisung an das Modell.',
  },
  {
    title: 'Nachvollziehbarkeit',
    text: ' – jede KI-Entscheidung einsehbar (Langfuse), kontinuierliche Auslieferung über GitHub Actions.',
  },
];

const TECH = [
  'Flask',
  'LangGraph',
  'OpenAI',
  'MongoDB Atlas · Vector Search',
  'React',
  'Langfuse',
  'GitHub Actions',
];

const RESULTS = [
  { title: 'Ausgangslage', text: 'Ferienwohnungen und Dienstleister mit dutzenden Buchungs-Mails am Tag: sortieren, Daten abtippen, dieselben Antworten schreiben – jeden Tag, oft am Abend.' },
  { title: 'Lösung', text: 'Eine Plattform liest eingehende Mails, klassifiziert sie (Buchung, Anfrage, Storno, Beleg), extrahiert Daten strukturiert und legt einen Antwortentwurf vor. Freigabe durch einen Menschen – ohne Ausnahme.' },
  { title: 'Ergebnis', text: 'Postfach vorsortiert, Standardantworten in Sekunden, keine abgetippten Buchungsdaten mehr. Läuft seit Monaten produktiv, abgesichert durch über 276 automatisierte Tests.' },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([{ name: 'Referenz', href: '/referenz.html' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'Booking Email Check',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Plattform zur automatischen Verarbeitung von Buchungs-E-Mails: Klassifikation, Datenextraktion und Antwortentwürfe mit menschlicher Freigabe.',
      author: { '@id': SITE.businessId },
    },
  ],
};

export default function ReferenzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="referenz" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container" style={{ paddingBottom: 50 }}>
          <Breadcrumb items={[{ name: 'Referenz' }]} />
          <p className="eyebrow rise rise-1">Referenzprojekt · läuft produktiv</p>
          <h1 className="rise rise-2">Booking Email Check</h1>
          <p className="lede rise rise-3" style={{ maxWidth: 660 }}>
            Betriebe mit vielen Buchungs-E-Mails – Ferienwohnungen, Dienstleister – verlieren jeden
            Tag Zeit mit dem Sortieren und Beantworten. Diese Plattform liest eingehende Mails,
            ordnet sie ein, zieht die Buchungsdaten heraus und legt einen Antwortentwurf vor.
            Versendet wird erst, wenn ein Mensch freigibt – ohne Ausnahme.
          </p>
        </section>

        <section className="case-grid container">
          <div className="reveal">
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
            <ul className="case-list">
              {HIGHLIGHTS.map((h) => (
                <li key={h.title}>
                  <span>
                    <strong>{h.title}</strong>
                    {h.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="tech-label">Eingesetzte Technik</p>
            <div className="tag-row">
              {TECH.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal">
            <InboxMock />
          </div>
        </section>

        <section className="section on-surface">
          <div className="container">
            <div className="step-grid reveal">
              {RESULTS.map((r) => (
                <div key={r.title} className="step">
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Reviews withSchema={false} />

        <CtaBand
          title="Ähnliches Problem in Ihrem Betrieb?"
          text="Ob Buchungs-Mails oder ein anderer Prozess – erzählen Sie mir davon. Kostenlose Prozess-Analyse, ehrliche Einschätzung."
          primary="Prozess-Analyse anfragen"
          topic="E-Mail-Automatisierung"
        />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
