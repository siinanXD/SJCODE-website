import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import { SERVICES, getService, serviceUrl } from '@/lib/services';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Leistungen – Websites, KI-Automatisierung, Software & E-Mail-Automation | SJCODE',
  description:
    'Webseiten-Entwicklung zum Festpreis, KI-Automatisierung, individuelle Softwarelösungen und E-Mail-Automatisierung – mit konkreten Beispielen für Handwerk, Dienstleister, Selbständige und kleine Unternehmen.',
  alternates: { canonical: `${SITE.url}/leistungen.html` },
  openGraph: openGraph({
    title: 'Leistungen – SJCODE',
    description:
      'Webseiten-Entwicklung, KI-Automatisierung, individuelle Softwarelösungen und E-Mail-Automatisierung für den Mittelstand.',
    url: `${SITE.url}/leistungen.html`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([{ name: 'Leistungen', href: '/leistungen.html' }]),
    {
      '@type': 'ItemList',
      name: 'Leistungen von SJCODE',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: `${SITE.url}${serviceUrl(s)}`,
      })),
    },
  ],
};

/** Link zur Detailseite anhand des Slugs – bricht beim Build, wenn der Slug nicht existiert. */
const svc = (slug: string) => {
  const s = getService(slug);
  if (!s) throw new Error(`Unbekannte Leistung: ${slug}`);
  return serviceUrl(s);
};

/** Frühere Anker (#web, #ai, …) aus alten Links und Zitaten weiter bedienen. */
const LEGACY_IDS: Record<string, string> = {
  webseiten: 'web',
  'ki-automatisierung': 'ai',
  'individuelle-software': 'software',
  'email-automatisierung': 'email',
};

const EXAMPLES = [
  {
    who: 'Handwerk & Dienstleister',
    title: 'Das volle Postfach',
    before: '45 Minuten täglich Mails sortieren – wichtige Anfragen gehen zwischen Werbung und Rechnungen unter.',
    after: 'Anfragen, Aufträge und Belege sind automatisch vorsortiert, für Standardfragen liegt ein Antwortentwurf bereit. Sie geben nur noch frei.',
    href: svc('email-automatisierung'),
  },
  {
    who: 'Handwerk',
    title: 'Angebote am Feierabend',
    before: 'Nach der Baustelle Aufmaße abtippen und Angebote in Word zusammenbauen – der Kunde wartet tagelang.',
    after: 'Eckdaten eingeben, fertiges Angebot als PDF im eigenen Design – noch am selben Tag beim Kunden.',
    href: svc('individuelle-software'),
  },
  {
    who: 'Dienstleister & Praxen',
    title: 'Geplatzte Termine',
    before: 'Kunden vergessen Termine, das Team telefoniert hinterher – jede Lücke kostet bares Geld.',
    after: 'Bestätigung und Erinnerung gehen automatisch raus. Spürbar weniger Ausfälle, kein Hinterhertelefonieren.',
    href: svc('ki-automatisierung'),
  },
  {
    who: 'Selbständige',
    title: 'Belege fürs Steuerbüro',
    before: 'Am Monatsende Rechnungen aus Mails, Downloads und Handyfotos zusammensuchen.',
    after: 'Belege werden automatisch erkannt, einheitlich benannt und gebündelt ans Steuerbüro übergeben.',
    href: svc('ki-automatisierung'),
  },
  {
    who: 'Kleine & mittlere Unternehmen',
    title: 'Wissen steckt in Köpfen',
    before: 'Neue Mitarbeiter fragen dreimal täglich nach Preislisten, Abläufen und alten Angeboten.',
    after: 'Ein interner Assistent beantwortet Fragen direkt aus Ihren eigenen Unterlagen – sofort, rund um die Uhr.',
    href: svc('ki-automatisierung'),
  },
  {
    who: 'Privatpersonen & Vereine',
    title: 'Der eigene Auftritt',
    before: 'Eine Baukasten-Seite, die keiner findet – oder noch gar kein Auftritt im Netz.',
    after: 'Eine schnelle, moderne Website für Ihr Projekt, Ihren Verein oder Ihre Bewerbung – zum fairen Festpreis.',
    href: svc('webseiten'),
  },
];

export default function LeistungenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="leistungen" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <Breadcrumb items={[{ name: 'Leistungen' }]} />
          <h1 className="rise rise-2">Womit ich Ihnen helfen kann</h1>
          <p className="lede rise rise-3">
            Von der schnellen Website bis zur KI-gestützten Automatisierung – immer mit dem Ziel,
            dass am Ende weniger Handarbeit übrig bleibt. Getestet, dokumentiert und so gebaut, dass
            Sie es behalten und verstehen.
          </p>
        </section>

        <section className="service-grid container">
          {SERVICES.map((s) => (
            <article key={s.slug} id={s.slug} className="service-card reveal">
              {LEGACY_IDS[s.slug] && <span id={LEGACY_IDS[s.slug]} aria-hidden="true" />}
              <div className="num">{s.num}</div>
              <h2>
                <a href={serviceUrl(s)}>{s.title}</a>
              </h2>
              <p>{s.teaser}</p>
              <ul className="dash-list">
                {s.includes.slice(0, 3).map((p) => (
                  <li key={p.title}>{p.title}</li>
                ))}
              </ul>
              <div className="service-card-foot">
                <span className="price-from">{s.priceFrom}</span>
                <a href={serviceUrl(s)} className="link-accent">
                  Details &amp; Preise →
                </a>
              </div>
            </article>
          ))}
        </section>

        <section id="beispiele" className="section">
          <div className="container">
            <div className="reveal" style={{ marginBottom: 44 }}>
              <h2 className="section-title" style={{ marginBottom: 14 }}>
                Beispiele aus dem Alltag
              </h2>
              <p className="section-sub">
                Für Handwerksbetriebe, Dienstleister, Selbständige, kleine und mittlere Unternehmen
                – und auch Privatpersonen. So sieht das konkret aus:
              </p>
            </div>
            <div className="example-grid reveal">
              {EXAMPLES.map((e) => (
                <a key={e.title} href={e.href} className="example-card">
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
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Unsicher, was zu Ihrem Fall passt?"
          text="Im kostenlosen Erstgespräch klären wir das in 15 Minuten – ehrlich, auch wenn sich etwas nicht lohnt."
        />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
