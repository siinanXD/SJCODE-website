import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';

export const metadata: Metadata = {
  title: 'Leistungen – SJCODE · Softwareentwicklung & AI Engineering',
  description:
    'Webseiten-Entwicklung, AI-Projekte & Automatisierung, individuelle Softwarelösungen und E-Mail-Automatisierung – Leistungen von SJCODE für den Mittelstand.',
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

export default function LeistungenPage() {
  return (
    <>
      <Header active="leistungen" />

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

      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
