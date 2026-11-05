import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE, pageUrl } from '@/lib/site';
import { INDUSTRY_REPOS, STROMLAUF_DEMO_URL, STROMLAUF_DEMO_ONLINE } from '@/lib/repos';
import { EVAL_ROWS, SOURCES } from '@/lib/stromlauf';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import CtaBand from '@/components/CtaBand';
import ExtLink from '@/components/ExtLink';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

const PATH = '/referenz/stromlauf-ai';
const TITLE = 'Fallstudie: KI für Stromlaufpläne mit Beleg | SJCODE';
const DESCRIPTION =
  'Fallstudie stromlauf-ai: KI beantwortet Fragen zu Stromlaufplänen und STEP-7-Programmen, jede Antwort mit Quelle. Mit Messwerten und Grenzen.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: pageUrl(PATH) },
  openGraph: openGraph({ title: 'Fallstudie: KI für Stromlaufpläne mit Beleg', description: DESCRIPTION, url: pageUrl(PATH) }),
};

const repo = INDUSTRY_REPOS.find((r) => r.name === 'stromlauf-ai')!;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([{ name: 'Referenz', href: '/referenz.html' }, { name: 'stromlauf-ai' }]),
    {
      '@type': 'CreativeWork',
      '@id': `${pageUrl(PATH)}#fallstudie`,
      url: pageUrl(PATH),
      name: 'Fallstudie: KI für Stromlaufpläne mit Beleg',
      description: DESCRIPTION,
      inLanguage: 'de-DE',
      author: { '@id': SITE.personId },
      publisher: { '@id': SITE.businessId },
      isBasedOn: repo.href,
    },
  ],
};

const FUNCTIONS = [
  {
    title: 'Ein Index über alle Dokumente.',
    text: ' Beim Hochladen entsteht ein Kennzeichen-Index über Stromlaufplan, Stückliste, Klemmenplan, SPS-Programm (STEP 7 AWL) und Handbuch, dazu ein Signalgraph.',
  },
  {
    title: 'Erst lesen, dann fragen.',
    text: ' Was sich deterministisch aus den Dokumenten lesen lässt (Signalweg, Befundkarte, Lückenliste, Maschinenmodell), kommt ohne Modellaufruf.',
  },
  {
    title: 'Antworten mit Beleg.',
    text: ' Das Sprachmodell antwortet nur über Werkzeuge und muss jede Aussage mit Datei und Ort belegen; ein Zitat-Resolver prüft die Belege gegen die Fundstellen.',
  },
  {
    title: 'Dokumenttext ist Daten.',
    text: ' Text aus Dokumenten gilt im Prompt als Daten, nicht als Anweisung (Schutz vor Prompt Injection).',
  },
];

const TECH = ['Python', 'FastAPI', 'LangGraph', 'Docling', 'RapidOCR', 'Postgres mit pgvector', 'Next.js', 'Docker Compose'];

const LIMITS = [
  'Die Zahlen stammen aus selbst erzeugten Beispielplänen, nicht aus Kundendokumenten.',
  'Es sind 20 Fragen je Modell. Die Tabelle zeigt vier der neun gemessenen Modelle; claude-opus-5-5 lief nicht (Guthaben erschöpft).',
  'Drei Signalweg-Fragen verfehlten im Lauf alle Modelle: Der deterministische Hauptweg endete an der Meldeleuchte statt am Motor. Das liegt laut Vergleich an den Daten, nicht am Modell.',
  'Lokale Modelle erfinden Belege: qwen35-4b erreicht nur 0,350 gültige Zitate.',
  'Beim Voll-Scan mit lokaler OCR sinkt die Trefferquote bei Klemmen auf 0,81.',
];

export default function StromlaufFallstudiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Header active="referenz" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <Breadcrumb items={[{ name: 'Referenz', href: '/referenz.html' }, { name: 'stromlauf-ai' }]} />
          <p className="eyebrow rise rise-1">Fallstudie · Code öffentlich auf GitHub</p>
          <h1 className="rise rise-2">KI für Stromlaufpläne: Störungssuche mit Beleg</h1>
          <p className="lede rise rise-3">
            Wenn eine Maschine steht, sucht die Instandhaltung dasselbe Bauteil in Plan, Stückliste, Klemmenplan,
            SPS-Programm und Handbuch. stromlauf-ai beantwortet solche Fragen und belegt jede Aussage mit Datei und
            Fundstelle.
          </p>
        </section>

        <section className="section on-surface">
          <div className="container prose reveal">
            <h2 className="section-title">Ausgangsproblem: Störungssuche in Plänen und Dokus</h2>
            <p>
              Steht eine Maschine, sucht die Instandhaltung in einem Stromlaufplan, einer Stückliste, einem
              Klemmenplan, einem SPS-Programm und einem Handbuch nach demselben Bauteil, unter vier Schreibweisen (
              <code>-K1</code>, <code>-X3:1</code>, <code>E0.0</code>, <code>/3.8</code>). Ein Chatbot, der nur Text
              sucht, rät dabei leicht: Er erfindet Spalten, Klemmen und Seiten.
            </p>
            <p className="source">
              Quelle: <ExtLink href={SOURCES.readme.href}>{SOURCES.readme.label}</ExtLink>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <h2 className="section-title">Was die Demo kann: Fragen an Stromlaufpläne mit Quellenangabe</h2>
            <ul className="case-list">
              {FUNCTIONS.map((f) => (
                <li key={f.title}>
                  <span>
                    <strong>{f.title}</strong>
                    {f.text}
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
            <div className="hm-actions" style={{ marginTop: 28 }}>
              {STROMLAUF_DEMO_ONLINE && (
                <ExtLink href={STROMLAUF_DEMO_URL} className="btn btn-primary">
                  Live-Demo öffnen
                </ExtLink>
              )}
              <ExtLink href={repo.href} className={STROMLAUF_DEMO_ONLINE ? 'btn btn-outline' : 'btn btn-primary'}>
                stromlauf-ai auf GitHub
              </ExtLink>
            </div>
            {!STROMLAUF_DEMO_ONLINE && <p className="source">Die Live-Demo folgt, sobald das Hosting steht. Der Code ist öffentlich.</p>}
          </div>
        </section>

        <section className="section on-surface">
          <div className="container prose reveal">
            <h2 className="section-title">Demo-Daten: die Beispielmaschine FB-01</h2>
            <p>
              Die Demo arbeitet mit der Beispielmaschine FB-01, einem Förderband. Ihre Dokumente sind frei erfunden,
              ohne Herstellerbezug. Es sind <strong>Demo-Daten</strong>, keine Kundendokumente.
            </p>
            <p className="source">
              Quelle: <ExtLink href={SOURCES.daten.href}>{SOURCES.daten.label}</ExtLink>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container prose reveal">
            <h2 className="section-title">Messwerte: Trefferquote auf 20 Testfragen</h2>
            <p>
              Agentenlauf mit 20 Fragen je Modell, gleiche Dokumente, gleicher Agent und derselbe Prompt, Lauf vom
              2. Oktober 2026. Die Bewertung kommt ohne KI als Richter aus: Fakten, Quellen und Zitate werden
              regelbasiert gegen die Fragenliste geprüft.
            </p>
            <div className="table-wrap">
              <table className="data-table">
                <caption>Modellvergleich auf der Beispielmaschine FB-01 (Anteile von 0 bis 1)</caption>
                <thead>
                  <tr>
                    <th scope="col">Modell</th>
                    <th scope="col">Fakten</th>
                    <th scope="col">Quellen</th>
                    <th scope="col">Zitate gültig</th>
                    <th scope="col">voll bestanden (von 20)</th>
                    <th scope="col">USD je Antwort</th>
                    <th scope="col">Sekunden je Antwort</th>
                  </tr>
                </thead>
                <tbody>
                  {EVAL_ROWS.map((r) => (
                    <tr key={r.model}>
                      <th scope="row">{r.model}</th>
                      <td>{r.facts}</td>
                      <td>{r.sources}</td>
                      <td>{r.citations}</td>
                      <td>{r.full}</td>
                      <td>{r.usd}</td>
                      <td>{r.seconds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Die Ingestion liest auf dem Beispielplan FB-01 (Text-PDF, 7 Seiten) Betriebsmittel, Klemmen und
              SPS-Adressen mit je 1,00 Recall und Precision, Querverweise mit 0,95. Auf dem Voll-Scan mit lokaler OCR
              sind es 0,99 für Betriebsmittel, 0,81 für Klemmen und 1,00 für SPS-Adressen.
            </p>
            <p className="source">
              Quellen: <ExtLink href={SOURCES.readme.href}>{SOURCES.readme.label}</ExtLink>,{' '}
              <ExtLink href={SOURCES.vergleich.href}>{SOURCES.vergleich.label}</ExtLink> und{' '}
              <ExtLink href={SOURCES.evalReadme.href}>{SOURCES.evalReadme.label}</ExtLink>
            </p>
          </div>
        </section>

        <section className="section on-surface">
          <div className="container reveal">
            <h2 className="section-title">Grenzen dieser Messung</h2>
            <ul className="case-list">
              {LIMITS.map((l) => (
                <li key={l}>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Fragen an Ihre eigene Doku?"
          text="Im kostenlosen Doku-Check stelle ich zehn echte Fragen an eines Ihrer Handbücher. Ergebnis als PDF."
          primary="Doku-Check buchen"
          topic="Doku-Check"
        />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
