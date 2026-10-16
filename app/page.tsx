import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE, PROOF } from '@/lib/site';
import { SERVICES, serviceUrl } from '@/lib/services';
import { INDUSTRY_REPOS } from '@/lib/repos';
import Header, { DOKU_CHECK_HREF } from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ScrollScene from '@/components/home/ScrollScene';
import ScrollCircuit from '@/components/home/ScrollCircuit';
import { CabinetClosed, CabinetOpen, Schematic } from '@/components/home/Schematics';

export const metadata: Metadata = {
  title: 'SJCODE – KI für Instandhaltung und Anlagen: Doku durchsuchen, Antworten mit Quelle',
  description:
    'KI für Maschinenbauer, Anlagenbetreiber und Instandhaltung: technische Doku, SPS-Exporte und Wartungswissen durchsuchen und beantworten – mit Quellenbeleg. Vom Elektroniker für Betriebstechnik zum AI Engineer. Auch Websites und Automatisierung für kleine Betriebe.',
  alternates: { canonical: `${SITE.url}/` },
  openGraph: openGraph({
    title: 'SJCODE – KI für Instandhaltung und Anlagen',
    description:
      'Technische Doku, SPS-Exporte und Wartungswissen durchsuchen und beantworten – mit Quellenbeleg. Für Maschinenbauer, Anlagenbetreiber und Instandhaltung.',
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
        'KI für industrielle Anlagen und Instandhaltung: technische Doku, SPS-Exporte und Wartungswissen durchsuchbar machen, Antworten mit Quellenbeleg. Außerdem Websites, KI-Automatisierung und E-Mail-Automatisierung für kleine Betriebe.',
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

const CTA_HREF = DOKU_CHECK_HREF;
const CTA_LABEL = 'Doku-Check buchen · 30 Min kostenlos';

const FACTS = [
  { value: '60–75 %', text: 'der Service- und Wartungsanfragen folgen wiederkehrenden Mustern.' },
  { value: '6–12 Monate', text: 'dauert es, bis neue Mitarbeiter die Anlage wirklich kennen.' },
  { value: 'Engpass Doku', text: 'Nicht die KI, sondern verstreute und alte Unterlagen bremsen.' },
];

const repo = (name: string) => INDUSTRY_REPOS.find((r) => r.name === name)!;

const CIRCUITS = [
  { id: '-K1', title: 'Doku-Assistent', repo: repo('document-intelligence-mvp'), active: false, text: 'Handbücher, Wartungsanleitungen und Störungsberichte fragen statt suchen. Antwort mit Dokument und Seite.' },
  { id: '-K2', title: 'Wartungs-Assistent', repo: repo('maintenance-ai-assistant'), active: false, text: 'Störung eingeben, bekannte Ursachen und Schritte aus Ihrer Historie bekommen.' },
  { id: '-K3', title: 'Stromlaufplan-KI', repo: repo('stromlauf-ai'), active: true, text: 'Fragen an Stromlaufpläne und STEP-7-Programme: Welche Sicherung, welcher Pfad, welches Blatt?' },
  { id: '-K4', title: 'Qualitätsprüfung', repo: repo('agent-eval-harness'), active: false, text: 'Testfragen mit Soll-Antwort messen, wie gut die KI wirklich ist – vor dem Einsatz.' },
];

const STEPS = [
  { id: '-S1', title: 'Live-Demo', price: 'kostenlos', text: 'Selbst ausprobieren, sofort.' },
  { id: '-S2', title: 'Doku-Check', price: 'kostenlos · 30 Min', text: '10 echte Fragen an eines Ihrer Handbücher. Ergebnis als PDF.' },
  { id: '-S3', title: 'Potenzialcheck', price: '1.490 € Festpreis', text: '1–2 Tage: Doku-Bestand, Top-Fragen, Machbarkeit, Angebot.' },
  { id: '-S4', title: 'Pilot', price: '9.900 € Festpreis', text: '8 Wochen, eine Maschinenfamilie, Testset mit Trefferquote. Danach Ausbau oder Stopp.' },
];

const PLATE = [
  ['Typ', 'AI Engineer · Betriebstechnik'],
  ['Hersteller', 'SJCODE · Sinan Kahraman'],
  ['Praxis', `${PROOF.yearsIndustry} Jahre Betriebstechnik`],
  ['Ausbildung', 'Elektroniker f. Betriebstechnik'],
  ['Weiterbildung', 'AI Engineering, 1.600 h (2026)'],
  ['Schutzart', 'Daten bleiben in der EU'],
  ['Nachweis', 'Code öffentlich auf GitHub'],
];

export default function HomePage() {
  const k3 = repo('stromlauf-ai');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="hm">
        <Header active="start" />

        <main id="main" tabIndex={-1}>
          <section id="hero" className="hm-section hm-hero">
            <div className="hm-wrap hm-split">
              <div>
                <p className="hm-kicker">-A1 · KI FÜR INSTANDHALTUNG &amp; ANLAGEN · KÖLN / BONN / AACHEN</p>
                <h1 className="hm-h1">
                  Die Antwort steht schon in Ihrer Doku.
                  <br />
                  <span className="hm-accent">Ich mache sie findbar – mit Quelle.</span>
                </h1>
                <p className="hm-lede">
                  Handbücher, Stromlaufpläne, SPS-Programme und Störungsberichte – durchsuchbar für Ihre
                  Instandhaltung. Jede Antwort zeigt Dokument und Seite. Gebaut von einem Elektroniker für
                  Betriebstechnik, der heute AI Engineer ist.
                </p>
                <div className="hm-actions">
                  <a href={CTA_HREF} className="hm-btn hm-btn-primary" data-umami-event="doku-check" data-umami-event-ort="hero">{CTA_LABEL}</a>
                  <a href="#demo" className="hm-btn hm-btn-outline">Live-Demo ansehen ↓</a>
                </div>
                <p className="hm-trust">
                  {PROOF.yearsIndustry} Jahre Betriebstechnik · Daten bleiben in der EU · Code öffentlich auf GitHub
                </p>
              </div>
              <div className="hm-visual"><CabinetClosed /></div>
            </div>
          </section>

          <ScrollScene />
          <ScrollCircuit href={CTA_HREF} label={CTA_LABEL} />

          <section id="problem" className="hm-section">
            <div className="hm-wrap hm-split">
              <div className="hm-visual"><CabinetOpen /></div>
              <div>
                <p className="hm-kicker">-A2 · DAS PROBLEM</p>
                <h2 className="hm-h2">Das Wissen steckt im Schrank. Und im Kopf von drei Leuten.</h2>
                <p className="hm-lede">
                  Wenn die Anlage steht, sucht jemand im Ordner, im Netzlaufwerk oder ruft den Kollegen an, der es
                  weiß. Das kostet Stillstand und Nerven.
                </p>
                <ul className="hm-facts">
                  {FACTS.map((f) => (
                    <li key={f.value}>
                      <strong>{f.value}</strong>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="hm-small">
                  <a href="https://www.ki-syndikat.de/usecases/maschinenbau/20-kundensupport-wartungsanfragen/" target="_blank" rel="noopener noreferrer">
                    Quelle: KI-Syndikat, Use Case Kundensupport &amp; Wartungsanfragen im Maschinenbau
                    <span className="sr-only"> (öffnet in neuem Tab)</span>
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section id="leistungen" className="hm-section">
            <div className="hm-wrap">
              <p className="hm-kicker">-A3 · LEISTUNGEN</p>
              <h2 className="hm-h2">Vier Stromkreise. Einer davon passt zu Ihrem Problem.</h2>
              <div className="hm-sheet">
                <Schematic />
                <div className="hm-circuits">
                  {CIRCUITS.map((c) => (
                    <article key={c.id} className={`hm-circuit${c.active ? ' is-active' : ''}`}>
                      <span className="hm-mono">{c.id}</span>
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      <a href={serviceUrl(SERVICES.find((s) => s.id === c.id)!)} className="hm-mono">
                        Mehr zu {c.title} →
                      </a>
                      <a href={c.repo.href} target="_blank" rel="noopener noreferrer" className="hm-mono">
                        Repo: {c.repo.name} ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                      </a>
                    </article>
                  ))}
                </div>
                <p className="hm-titleblock hm-mono">sjcode.de · Blatt 3 / 7 · =A3 Leistungen</p>
              </div>
            </div>
          </section>

          <section id="demo" className="hm-section hm-dark">
            <div className="hm-wrap hm-split">
              <div>
                <p className="hm-kicker">-A4 · LIVE-DEMO · PRÜFSTAND</p>
                <h2 className="hm-h2">Nicht glauben. Ausprobieren.</h2>
                <p className="hm-lede">
                  stromlauf-ai beantwortet Fragen zu einem Stromlaufplan und zeigt die Stelle im Plan. Mit
                  Demo-Daten, ohne Anmeldung.
                </p>
                <div className="hm-actions">
                  <a href={k3.href} target="_blank" rel="noopener noreferrer" className="hm-btn hm-btn-primary">
                    Projekt auf GitHub ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                  </a>
                </div>
              </div>
              <div className="hm-chat" role="group" aria-label="Beispiel-Dialog">
                <p className="hm-mono hm-chat-tag">Beispiel</p>
                <p className="hm-bubble hm-bubble-q">Welche Sicherung versorgt den Hydraulikmotor -M3?</p>
                <div className="hm-bubble hm-bubble-a">
                  <p>-M3 wird über den Motorschutzschalter -Q3 versorgt, vorgeschaltet ist -F12 (16 A, Kurve C).</p>
                  <p className="hm-mono">Pfad: L1 → -F12 → -Q3 → -K3 → -M3</p>
                  <p className="hm-source hm-mono">Stromlaufplan_Presse3.pdf · Blatt 14 · Pfad 3</p>
                </div>
              </div>
            </div>
          </section>

          <section id="ablauf" className="hm-section">
            <div className="hm-wrap">
              <p className="hm-kicker">-A5 · SO STARTEN WIR</p>
              <h2 className="hm-h2">Klein anfangen. Erst messen, dann bauen.</h2>
              <p className="hm-lede">Festpreise, kein Risiko, Sie entscheiden nach jeder Stufe neu.</p>
              <ol className="hm-steps">
                {STEPS.map((s) => (
                  <li key={s.id}>
                    <span className="hm-mono">{s.id}</span>
                    <h3>{s.title}</h3>
                    <p className="hm-price">{s.price}</p>
                    <p>{s.text}</p>
                  </li>
                ))}
                <li>
                  <span className="hm-lamp" aria-hidden="true" />
                  <span className="hm-mono">-H5</span>
                </li>
              </ol>
              <div className="hm-actions">
                <a href={CTA_HREF} className="hm-btn hm-btn-primary" data-umami-event="doku-check" data-umami-event-ort="ablauf">{CTA_LABEL}</a>
              </div>
              <p className="hm-small">Preise zzgl. MwSt.</p>
            </div>
          </section>

          <section id="ueber-mich" className="hm-section">
            <div className="hm-wrap hm-split">
              <div>
                <p className="hm-kicker">-A6 · WER DAS BAUT</p>
                <h2 className="hm-h2">Erst Schaltschrank, dann Code.</h2>
                <p className="hm-lede">
                  Ich bin Sinan Kahraman, Elektroniker für Betriebstechnik. {PROOF.yearsIndustry} Jahre
                  Instandhaltung, Störungssuche und SPS – danach 1.600 Stunden AI Engineering. Ich weiß, wie es
                  ist, mit einem Plan vor einer stehenden Anlage zu stehen. Genau dafür baue ich die Werkzeuge.
                </p>
                <p className="hm-small">Euskirchen · Köln / Bonn / Aachen · remote</p>
              </div>
              <table className="hm-plate">
                <caption className="sr-only">Typenschild</caption>
                <tbody>
                  {PLATE.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="kontakt" className="hm-section hm-dark">
            <div className="hm-wrap hm-center">
              <p className="hm-kicker">-A7 · KONTAKT</p>
              <h2 className="hm-h2">Stromkreis schließen.</h2>
              <p className="hm-lede">
                30 Minuten, ein Handbuch von Ihnen, zehn echte Fragen. Danach wissen Sie, ob sich KI für Ihre
                Instandhaltung lohnt.
              </p>
              <div className="hm-actions hm-actions-center">
                <a href={CTA_HREF} className="hm-btn hm-btn-primary hm-btn-lg" data-umami-event="doku-check" data-umami-event-ort="abschluss">{CTA_LABEL}</a>
              </div>
              <p className="hm-small">
                oder direkt: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}
