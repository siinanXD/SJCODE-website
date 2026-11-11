import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE, pageUrl } from '@/lib/site';
import Header, { DOKU_CHECK_HREF } from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import CtaBand from '@/components/CtaBand';
import ExtLink from '@/components/ExtLink';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

const PATH = '/ki-fuer-industrie-euskirchen';
const TITLE = 'KI für Industrie in Euskirchen und im Rheinland | SJCODE';
const DESCRIPTION =
  'KI für Industrie und Instandhaltung in Euskirchen, Köln, Bonn und Aachen: Termin im Betrieb, Wartungsunterlagen sichten, Erstgespräch. Mit Quellen.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: pageUrl(PATH) },
  openGraph: openGraph({ title: 'KI für Industrie in Euskirchen und im Rheinland', description: DESCRIPTION, url: pageUrl(PATH) }),
};

/** Orte, in denen die Seite arbeitet; dieselbe Liste für Schema, Fahrzeit-Tabelle und Karte. */
const AREA = ['Euskirchen', 'Köln', 'Bonn', 'Aachen'] as const;

const OSM = 'https://www.openstreetmap.org';
// Fahrzeiten: OSRM-Routing (OpenStreetMap-Daten), Zentrum Euskirchen → Stadtzentrum, ohne Verkehr; Stand 2026-11-05.
const START = '50.6613%2C6.7870';
const ROUTES = [
  { ort: 'Köln', zeit: '37 Minuten', km: '40 km', href: `${OSM}/directions?engine=fossgis_osrm_car&route=${START}%3B50.9413%2C6.9583` },
  { ort: 'Bonn', zeit: '37 Minuten', km: '33 km', href: `${OSM}/directions?engine=fossgis_osrm_car&route=${START}%3B50.7324%2C7.0969` },
  { ort: 'Aachen', zeit: '51 Minuten', km: '79 km', href: `${OSM}/directions?engine=fossgis_osrm_car&route=${START}%3B50.7753%2C6.0839` },
];
const KARTE = `${OSM}/?mlat=50.6613&mlon=6.7870#map=11/50.6613/6.7870`;
const SRC_KAMMER = 'https://www.kreis-euskirchen.de/themen/wirtschaft-tourismus/netzwerke-partner/kammern/';
const SRC_STANDORT = 'https://www.ihk.de/aachen/standortpolitik/standort-region-aachen/kurzprofil-der-region/ihk-standortmonitor-euskirchen-7174724';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([{ name: 'KI für Industrie in Euskirchen' }]),
    {
      '@type': 'WebPage',
      '@id': `${pageUrl(PATH)}#seite`,
      url: pageUrl(PATH),
      name: 'KI für Industrie in Euskirchen und im Rheinland',
      description: DESCRIPTION,
      inLanguage: 'de-DE',
      about: { '@id': SITE.businessId },
      mainEntity: { '@id': SITE.businessId },
    },
    {
      '@type': 'ProfessionalService',
      '@id': SITE.businessId,
      name: SITE.name,
      url: SITE.url,
      areaServed: AREA.map((name) => ({ '@type': 'City', name })),
    },
  ],
};

export default function RegionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Header active="none" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <Breadcrumb items={[{ name: 'KI für Industrie in Euskirchen' }]} />
          <p className="eyebrow rise rise-1">Euskirchen · Köln · Bonn · Aachen</p>
          <h1 className="rise rise-2">KI für Industrie in Euskirchen und im Rheinland</h1>
          <p className="lede rise rise-3">
            Ich sitze in Euskirchen und baue KI für Instandhaltung und Anlagen: technische Doku, Stromlaufpläne und
            Wartungswissen durchsuchbar, jede Antwort mit Quelle. Für Betriebe in der Region komme ich vorbei.
          </p>
        </section>

        <section className="section on-surface">
          <div className="container prose reveal">
            <h2>KI für Instandhaltung im Kreis Euskirchen: was ich vor Ort anbiete</h2>
            <p>
              Den ersten Termin mache ich bei Ihnen im Betrieb, wenn Sie das möchten, oder remote. Ich schaue mir
              an, welche Unterlagen die Instandhaltung im Alltag wirklich benutzt: Handbücher, Wartungsanleitungen,
              Stromlaufpläne, Störungsberichte. Dabei geht es nicht um eine Präsentation, sondern um die Frage, wo bei
              Ihnen am meisten Zeit mit Suchen verloren geht.
            </p>
            <p>
              Danach gibt es drei Schritte, jeweils mit festem Preis (zzgl. MwSt., wie auf der{' '}
              <a href="/#ablauf">Startseite</a>): den kostenlosen <a href={DOKU_CHECK_HREF}>Doku-Check</a> mit zehn
              echten Fragen an eines Ihrer Handbücher in 30 Minuten, den Potenzialcheck für 1.490 € (ein bis zwei Tage:
              Doku-Bestand, wichtigste Fragen, Machbarkeit, Angebot) und, wenn es sich lohnt, einen Pilot für 2.500 € über
              vier Wochen an einer Maschinenfamilie. Danach entscheiden Sie über Ausbau oder Stopp.
            </p>

            <h2>Wissen in der Anlage halten: was die IHK-Befragung für Euskirchen zeigt</h2>
            <p>
              Warum das gerade in der Region ein Thema ist, zeigt der IHK-Standortmonitor 2026 für Euskirchen.
              Rund 100 Unternehmerinnen und Unternehmer aus Industrie, Handel, Gastgewerbe und Dienstleistungsbranchen
              bewerteten den Wirtschaftsstandort mit der Gesamtnote 2,8. Verfügbarkeit und Qualifikation von Arbeitskräften bekamen je eine 3,6.
              Wo Fachkräfte knapp sind, hängt viel daran, dass Wissen über eine Anlage nicht nur im Kopf einzelner
              Kollegen steckt. Genau dort setzt eine durchsuchbare Doku an.
            </p>
            <p className="source">
              Quelle: <ExtLink href={SRC_STANDORT}>IHK Aachen, IHK-Standortmonitor Euskirchen</ExtLink>
            </p>

            <h2>Erstgespräch für KI in der Instandhaltung: so läuft es ab</h2>
            <ul className="case-list">
              <li>
                <span>
                  <strong>Kennenlernen, 15 Minuten, unverbindlich.</strong> Sie erzählen, welche Anlage Sie betreuen und
                  wo die Suche nach Antworten hakt. Ich sage Ihnen ehrlich, ob KI dort hilft.
                </span>
              </li>
              <li>
                <span>
                  <strong>Doku-Check.</strong> Sie suchen ein Handbuch aus, daran stelle ich zehn echte Fragen aus Ihrem
                  Alltag. Das dauert 30 Minuten und kostet nichts.
                </span>
              </li>
              <li>
                <span>
                  <strong>Ergebnis besprechen.</strong> Sie bekommen das Ergebnis als PDF, jede Antwort mit Dokument und
                  Seite. Dann entscheiden Sie, ob ein Potenzialcheck sinnvoll ist.
                </span>
              </li>
            </ul>
            <p>
              <a href="/kontakt.html?thema=Doku-Check">Erstgespräch anfragen</a> oder{' '}
              <ExtLink href={SITE.calendly}>direkt einen Termin buchen</ExtLink>.
            </p>

            <h2>Anfahrt von Euskirchen nach Köln, Bonn und Aachen</h2>
            <p>
              Mein Standort ist {SITE.street}, {SITE.zip} {SITE.city} (siehe <a href="/impressum.html">Impressum</a>,{' '}
              <ExtLink href={KARTE}>Karte bei OpenStreetMap</ExtLink>). Persönlich arbeite ich in der Region Euskirchen,
              Köln, Bonn und Aachen, deutschlandweit auch remote. Die Fahrzeiten vom Zentrum Euskirchen in die
              Stadtzentren, laut Routenplaner ohne Verkehr:
            </p>
            <div className="table-wrap">
              <table className="data-table">
                <caption>Fahrzeit mit dem Auto ab Euskirchen (OpenStreetMap-Routenplaner, Stand 5. November 2026)</caption>
                <thead>
                  <tr>
                    <th scope="col">Ziel</th>
                    <th scope="col">Fahrzeit</th>
                    <th scope="col">Strecke</th>
                    <th scope="col">Route</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTES.map((r) => (
                    <tr key={r.ort}>
                      <th scope="row">{r.ort}</th>
                      <td>{r.zeit}</td>
                      <td>{r.km}</td>
                      <td>
                        <ExtLink href={r.href}>Route ansehen</ExtLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Für Betriebe im Kreis Euskirchen ist die IHK Aachen zuständig, der Kreis gehört außerdem zur
              Handwerkskammer Aachen. Das ist keine Partnerschaft und keine Mitgliedschaft meinerseits, sondern nur die
              Zuordnung der Kammern.
            </p>
            <p className="source">
              Quelle: <ExtLink href={SRC_KAMMER}>Kreis Euskirchen, Kammern</ExtLink>
            </p>

            <h2>Welche Leistungen für Industrie im Rheinland passen</h2>
            <p>
              Die Inhalte der Leistungen sind überall gleich, nur der Weg zu Ihnen ist kurz:{' '}
              <a href="/leistungen/doku-assistent.html">Doku-Assistent</a> für Handbücher und Wartungsanleitungen,{' '}
              <a href="/leistungen/wartungs-assistent.html">Wartungs-Assistent</a> für Störungen,{' '}
              <a href="/leistungen/stromlaufplan-ki.html">Stromlaufplan-KI</a> für Pläne und STEP-7-Programme und{' '}
              <a href="/leistungen/qualitaetspruefung.html">Qualitätsprüfung</a>, um die Trefferquote vor dem Einsatz zu
              messen. Wie das in Zahlen aussieht, steht in der <a href="/referenz/stromlauf-ai.html">Fallstudie</a>.
            </p>
          </div>
        </section>

        <CtaBand
          title="Termin im Betrieb in der Region?"
          text="Schreiben Sie mir, welche Anlage Sie betreuen. Ich melde mich innerhalb von 24 Stunden persönlich."
          primary="Erstgespräch anfragen"
          topic="Doku-Check"
        />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
