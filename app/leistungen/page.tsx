import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Leistungen – SJCODE · Softwareentwicklung & AI Engineering',
  description:
    'Webseiten-Entwicklung, AI-Projekte & Automatisierung, individuelle Softwarelösungen und E-Mail-Automatisierung – mit konkreten Beispielen für Handwerk, Dienstleister, Selbständige und kleine Unternehmen.',
  alternates: { canonical: 'https://sjcode.de/leistungen.html' },
  openGraph: {
    title: 'Leistungen – SJCODE',
    description:
      'Webseiten-Entwicklung, AI-Projekte & Automatisierung, individuelle Softwarelösungen und E-Mail-Automatisierung für den Mittelstand.',
    url: 'https://sjcode.de/leistungen.html',
  },
};

const SERVICES = [
  {
    id: 'web',
    num: '01',
    title: 'Webseiten-Entwicklung',
    text: 'Moderne, schnelle Websites, die Kunden überzeugen und in Suchmaschinen gefunden werden – ohne Baukasten-Kompromisse.',
    points: [
      'React / Next.js – performant und pflegeleicht',
      'SEO-Grundlagen, Meta-Tags, semantisches HTML',
      'Voll responsiv, mobile-first, Lighthouse > 90',
    ],
  },
  {
    id: 'ai',
    num: '02',
    title: 'AI-Projekte & Automatisierung',
    text: 'KI-Lösungen, die wiederkehrende Arbeit übernehmen – produktionsreif statt Experiment.',
    points: [
      'E-Mail-Verarbeitung mit LLMs',
      'RAG-Systeme und Chatbots auf Ihren Daten',
      'Workflow-Automatisierung entlang Ihrer Prozesse',
    ],
  },
  {
    id: 'software',
    num: '03',
    title: 'Individuelle Softwarelösungen',
    text: 'Wo Standardsoftware nicht passt: kleine, präzise Werkzeuge, die genau Ihre Lücke schließen.',
    points: [
      'Kleine Tools und Skripte für den Alltag',
      'Interne Apps für Ihr Team',
      'API-Integrationen zwischen Ihren Systemen',
    ],
  },
  {
    id: 'email',
    num: '04',
    title: 'E-Mail- & Postfach-Automatisierung',
    text: 'Ihr Postfach arbeitet vor – Sie behalten die Kontrolle. Kein Versand ohne Ihre Freigabe.',
    points: [
      'Intelligente Sortierung eingehender Mails',
      'Automatische Antwortentwürfe mit Human-in-the-Loop',
      'Multi-Account: Microsoft 365, Gmail, IMAP',
    ],
  },
];

const EXAMPLES = [
  {
    who: 'Handwerk & Dienstleister',
    title: 'Das volle Postfach',
    before: '45 Minuten täglich Mails sortieren – wichtige Anfragen gehen zwischen Werbung und Rechnungen unter.',
    after: 'Anfragen, Aufträge und Belege sind automatisch vorsortiert, für Standardfragen liegt ein Antwortentwurf bereit. Sie geben nur noch frei.',
  },
  {
    who: 'Handwerk',
    title: 'Angebote am Feierabend',
    before: 'Nach der Baustelle Aufmaße abtippen und Angebote in Word zusammenbauen – der Kunde wartet tagelang.',
    after: 'Eckdaten eingeben, fertiges Angebot als PDF im eigenen Design – noch am selben Tag beim Kunden.',
  },
  {
    who: 'Dienstleister & Praxen',
    title: 'Geplatzte Termine',
    before: 'Kunden vergessen Termine, das Team telefoniert hinterher – jede Lücke kostet bares Geld.',
    after: 'Bestätigung und Erinnerung gehen automatisch raus. Spürbar weniger Ausfälle, kein Hinterhertelefonieren.',
  },
  {
    who: 'Selbständige',
    title: 'Belege fürs Steuerbüro',
    before: 'Am Monatsende Rechnungen aus Mails, Downloads und Handyfotos zusammensuchen.',
    after: 'Belege werden automatisch erkannt, einheitlich benannt und gebündelt ans Steuerbüro übergeben.',
  },
  {
    who: 'Kleine & mittlere Unternehmen',
    title: 'Wissen steckt in Köpfen',
    before: 'Neue Mitarbeiter fragen dreimal täglich nach Preislisten, Abläufen und alten Angeboten.',
    after: 'Ein interner Assistent beantwortet Fragen direkt aus Ihren eigenen Unterlagen – sofort, rund um die Uhr.',
  },
  {
    who: 'Privatpersonen & Vereine',
    title: 'Der eigene Auftritt',
    before: 'Eine Baukasten-Seite, die keiner findet – oder noch gar kein Auftritt im Netz.',
    after: 'Eine schnelle, moderne Website für Ihr Projekt, Ihren Verein oder Ihre Bewerbung – zum fairen Festpreis.',
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Header active="leistungen" />
      <main id="main" tabIndex={-1}>

      <section className="page-head container">
        <h1 className="rise rise-2">Womit ich Ihnen helfen kann</h1>
        <p className="lede rise rise-3">
          Von der schnellen Website bis zur KI-gestützten Automatisierung – immer mit dem Ziel,
          dass am Ende weniger Handarbeit übrig bleibt. Getestet, dokumentiert und so gebaut, dass
          Sie es behalten und verstehen.
        </p>
      </section>

      <section className="service-grid container">
        {SERVICES.map((s) => (
          <div key={s.id} id={s.id} className="service-card reveal">
            <div className="num">{s.num}</div>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <ul className="dash-list">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="beispiele" className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 44 }}>
            <h2 className="section-title" style={{ marginBottom: 14 }}>
              Beispiele aus dem Alltag
            </h2>
            <p style={{ margin: 0, maxWidth: 620, fontSize: 16.5, lineHeight: 1.7, color: 'var(--muted)' }}>
              Für Handwerksbetriebe, Dienstleister, Selbständige, kleine und mittlere Unternehmen
              – und auch Privatpersonen. So sieht das konkret aus:
            </p>
          </div>
          <div className="example-grid reveal">
            {EXAMPLES.map((e) => (
              <div key={e.title} className="example-card">
                <span className="who">{e.who}</span>
                <h3>{e.title}</h3>
                <div className="before-after">
                  <p>
                    <strong>Vorher:</strong> {e.before}
                  </p>
                  <p className="after">
                    <strong>Nachher:</strong> {e.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container reveal">
          <h2>Unsicher, was zu Ihrem Fall passt?</h2>
          <p>Im kostenlosen Erstgespräch klären wir das in 15 Minuten – ehrlich, auch wenn sich etwas nicht lohnt.</p>
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
              Termin buchen ↗
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
