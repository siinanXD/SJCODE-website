import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import Reviews from '@/components/Reviews';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Über mich – Sinan Kahraman, Softwareentwickler & AI Engineer aus Euskirchen | SJCODE',
  description:
    'Sinan Kahraman: über zehn Jahre Elektroniker für Betriebstechnik, heute Softwareentwickler und AI Engineer. Websites, KI-Automatisierung und Tools für Betriebe ohne IT-Abteilung – aus Euskirchen, remote deutschlandweit.',
  alternates: { canonical: `${SITE.url}/ueber-mich.html` },
  openGraph: openGraph({
    title: 'Über mich – Sinan Kahraman, SJCODE',
    description:
      'Zehn Jahre Betriebstechnik, dann Softwareentwicklung und AI Engineering. Warum ich Software für Betriebe baue, die keine IT-Abteilung haben.',
    url: `${SITE.url}/ueber-mich.html`,
  }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Über mich', item: `${SITE.url}/ueber-mich.html` },
      ],
    },
    {
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        '@id': SITE.personId,
        name: SITE.owner,
        jobTitle: 'Softwareentwickler & AI Engineer',
        image: `${SITE.url}/images/sinan-kahraman.webp`,
        worksFor: { '@id': SITE.businessId },
        homeLocation: { '@type': 'Place', name: `${SITE.city}, Deutschland` },
        knowsAbout: [
          'Softwareentwicklung',
          'AI Engineering',
          'KI-Automatisierung',
          'Webentwicklung mit React und Next.js',
          'E-Mail-Automatisierung',
          'Betriebstechnik',
        ],
        sameAs: [SITE.github, SITE.linkedin],
      },
    },
  ],
};

const TIMELINE = [
  {
    when: '2012–2023',
    title: 'Elektroniker für Betriebstechnik',
    text: 'Instandhaltung, Automatisierung, Anlagen am Laufen halten. Praxis, Schichtbetrieb, Verantwortung – und der tägliche Blick darauf, wo Abläufe haken.',
  },
  {
    when: '2023–2024',
    title: 'Weiterbildung Softwareentwicklung',
    text: 'Python, JavaScript/TypeScript, React, Datenbanken, automatisierte Tests. Vollzeit, mit Praxisprojekten statt nur Theorie.',
  },
  {
    when: '2024–2025',
    title: 'AI Engineering',
    text: 'LLM-Anwendungen, RAG-Systeme, LangGraph, Evaluierung und Absicherung. Referenzprojekt Booking Email Check – heute produktiv im Einsatz.',
  },
  {
    when: 'seit 2025',
    title: 'SJCODE',
    text: 'Selbständig: Websites, Automatisierung und Tools für kleine und mittlere Betriebe. Remote deutschlandweit, persönlich in der Region Euskirchen/Köln/Bonn.',
  },
];

const PRINCIPLES = [
  {
    title: 'Ehrlich',
    text: 'Wenn sich etwas nicht lohnt, sage ich das – auch wenn ich damit keinen Auftrag bekomme. Lieber ein zufriedener Kunde ohne Projekt als ein Projekt ohne Nutzen.',
  },
  {
    title: 'Verständlich',
    text: 'Kein Fachchinesisch. Sie verstehen, was gebaut wird und warum – und können am Ende selbst entscheiden, wie es weitergeht.',
  },
  {
    title: 'Getestet',
    text: 'Automatisierte Tests, Dokumentation, saubere Übergabe. Sie behalten ein Werkzeug, keine Blackbox – und alle Zugänge.',
  },
  {
    title: 'Erreichbar',
    text: 'Persönliche Antwort innerhalb von 24 Stunden. Ein Ansprechpartner, keine Hotline, keine Warteschleife.',
  },
];

const SKILLS = [
  'Python',
  'TypeScript',
  'React / Next.js',
  'Flask',
  'LangGraph',
  'OpenAI & Open-Source-LLMs',
  'RAG / Vector Search',
  'MongoDB · PostgreSQL',
  'REST-APIs',
  'GitHub Actions (CI/CD)',
  'Automatisierte Tests',
  'Microsoft 365 · Google Workspace',
];

export default function UeberMichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header active="ueber-mich" />
      <main id="main" tabIndex={-1}>
        <section className="about-hero container">
          <div className="about-text">
            <nav className="breadcrumb rise rise-1" aria-label="Brotkrumen">
              <a href="/index.html">Start</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Über mich</span>
            </nav>
            <p className="eyebrow rise rise-1">Über mich</p>
            <h1 className="rise rise-2">Zehn Jahre Betriebstechnik. Dann kam die Software.</h1>
            <p className="lede rise rise-3">
              Ich bin {SITE.owner} aus {SITE.city}. Als Elektroniker für Betriebstechnik habe ich
              über zehn Jahre lang Anlagen am Laufen gehalten – und dabei gelernt, wie Abläufe in
              der Praxis wirklich aussehen. Heute baue ich Software und KI-Lösungen für genau
              diese Betriebe: verständlich, getestet und so, dass Sie sie behalten können.
            </p>
            <div className="actions rise rise-4">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Erstgespräch buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                LinkedIn ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </div>
          </div>
          <div className="about-photo rise rise-3">
            <img
              src="/images/sinan-kahraman.webp"
              alt={`Porträt von ${SITE.owner}`}
              width={420}
              height={420}
            />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Werdegang</p>
                <h2 className="section-title">Mein Weg</h2>
              </div>
            </div>
            <ol className="timeline reveal">
              {TIMELINE.map((t) => (
                <li key={t.when}>
                  <span className="when">{t.when}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section on-surface">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Arbeitsweise</p>
                <h2 className="section-title">Wie ich arbeite</h2>
              </div>
            </div>
            <div className="audience-grid reveal">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="audience-card">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Werkzeugkasten</p>
                <h2 className="section-title">Womit ich arbeite</h2>
                <p className="section-sub">
                  Bewährte, weit verbreitete Technik – damit auch andere Entwickler jederzeit
                  weitermachen könnten.
                </p>
              </div>
            </div>
            <div className="tag-row reveal">
              {SKILLS.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Reviews withSchema={false} />

        <CtaBand
          title="Lernen wir uns kennen."
          text="15 Minuten, unverbindlich – remote oder in der Region Euskirchen/Köln/Bonn."
          primary="Projekt anfragen"
        />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
