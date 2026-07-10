import type { Metadata } from 'next';
import { Fragment } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';

export const metadata: Metadata = {
  title: 'Referenz: Booking Email Check – SJCODE',
  description:
    'Case Study: Booking Email Check – Plattform zur automatischen Verarbeitung von Buchungs-E-Mails. Klassifikation, Datenextraktion und Antwortentwürfe mit menschlicher Freigabe.',
  alternates: { canonical: 'https://sjcode.de/referenz.html' },
  openGraph: {
    title: 'Referenz: Booking Email Check – SJCODE',
    description:
      'Plattform zur automatischen Verarbeitung von Buchungs-E-Mails – mit menschlicher Freigabe, läuft produktiv.',
    url: 'https://sjcode.de/referenz.html',
  },
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

const PIPELINE = ['Eingang', 'Klassifikation', 'Datenextraktion', 'Entwurf', 'Ihre Freigabe'];

export default function ReferenzPage() {
  return (
    <>
      <Header active="referenz" />
      <main>

      <section className="page-head container" style={{ paddingBottom: 50 }}>
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
          <div className="window">
            <div className="window-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="title">booking-email-check · Posteingang</span>
            </div>
            <div className="window-body">
              <div className="mail-row active">
                <div className="meta">
                  <div className="subject">Anfrage Juli · 04.–11.07., 2 Personen</div>
                  <div className="from">gast.mueller@web.de</div>
                </div>
                <span className="badge accent">Buchung · 98%</span>
              </div>
              <div className="mail-row">
                <div className="meta">
                  <div className="subject">Frage zur Anreise &amp; Schlüsselübergabe</div>
                  <div className="from">info@ferienhof-nord.de</div>
                </div>
                <span className="badge">Anfrage · 94%</span>
              </div>
              <div className="mail-row">
                <div className="meta">
                  <div className="subject">Stornierung Aufenthalt KW 32</div>
                  <div className="from">j.krause@gmx.net</div>
                </div>
                <span className="badge">Storno · 97%</span>
              </div>
            </div>
            <div className="window-foot">
              <span className="pulse-dot" />
              <span className="status">Antwortentwurf erstellt – wartet auf Ihre Freigabe</span>
              <span style={{ display: 'inline-flex', gap: 8 }}>
                <span className="chip-btn solid">Freigeben</span>
                <span className="chip-btn ghost">Bearbeiten</span>
              </span>
            </div>
          </div>
          <div className="pipeline">
            {PIPELINE.map((stage, i) => (
              <Fragment key={stage}>
                {i > 0 && <span className="pipeline-line" aria-hidden="true" />}
                <span className={`stage${i === PIPELINE.length - 1 ? ' accent' : ''}`}>{stage}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container reveal">
          <h2>Ähnliches Problem in Ihrem Betrieb?</h2>
          <p>Ob Buchungs-Mails oder ein anderer Prozess – erzählen Sie mir davon.</p>
          <div className="actions">
            <a href="/kontakt.html" className="btn btn-primary">
              Projekt anfragen
            </a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
