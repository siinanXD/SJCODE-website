import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import { SERVICES, getService, serviceUrl } from '@/lib/services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StickyCta from '@/components/StickyCta';
import FaqList from '@/components/FaqList';
import CtaBand from '@/components/CtaBand';
import Reviews from '@/components/Reviews';
import EmailDemoSection from '@/components/EmailDemoSection';

/**
 * Eine Detailseite pro Leistung – eigene URL, eigener Titel, eigenes Schema.
 * So kann Google jede Leistung einzeln für die passenden Suchbegriffe ausspielen.
 * Inhalte kommen aus `lib/services.ts`.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `${SITE.url}${serviceUrl(s)}`;
  return {
    title: `${s.seoTitle} | SJCODE`,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: openGraph({ title: `${s.title} – SJCODE`, description: s.metaDescription, url }),
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const url = `${SITE.url}${serviceUrl(s)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${SITE.url}/leistungen.html` },
          { '@type': 'ListItem', position: 3, name: s.title, item: url },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.title,
        serviceType: s.serviceType,
        description: s.metaDescription,
        url,
        provider: { '@id': SITE.businessId },
        areaServed: ['Euskirchen', 'Köln', 'Bonn', 'DE'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: s.priceFrom.replace(/[^\d]/g, ''),
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: s.priceFrom.replace(/[^\d]/g, ''),
            valueAddedTaxIncluded: false,
          },
          availability: 'https://schema.org/InStock',
          url: `${SITE.url}/kontakt.html`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${s.title} – Leistungsumfang`,
          itemListElement: s.includes.map((i) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: i.title, description: i.text },
          })),
        },
      },
    ],
  };

  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const contactHref = `/kontakt.html?thema=${encodeURIComponent(s.formTopic)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header active="leistungen" />
      <main id="main" tabIndex={-1}>
        <section className="service-hero container">
          <nav className="breadcrumb rise rise-1" aria-label="Brotkrumen">
            <a href="/index.html">Start</a>
            <span aria-hidden="true">/</span>
            <a href="/leistungen.html">Leistungen</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{s.title}</span>
          </nav>
          <div className="service-hero-grid">
            <div>
              <p className="eyebrow rise rise-1">
                Leistung {s.num} · {s.title}
              </p>
              <h1 className="rise rise-2">{s.headline}</h1>
              <p className="lede rise rise-3">{s.lede}</p>
              <div className="actions rise rise-4">
                <a href={contactHref} className="btn btn-primary">
                  {s.cta}
                </a>
                <a href="/referenz.html" className="btn btn-outline">
                  Referenz ansehen
                </a>
              </div>
            </div>
            <aside className="facts-card rise rise-3" aria-label="Auf einen Blick">
              <h2>Auf einen Blick</h2>
              <dl>
                {s.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Kommt Ihnen das bekannt vor?</p>
                <h2 className="section-title">Aufgaben, die täglich Zeit fressen</h2>
              </div>
            </div>
            <div className="example-grid reveal">
              {s.problems.map((p) => (
                <div key={p.title} className="example-card">
                  <h3>{p.title}</h3>
                  <div className="before-after">
                    <p>
                      <strong>Vorher:</strong> {p.before}
                    </p>
                    <p className="after">
                      <strong>Nachher:</strong> {p.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section on-surface">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Was Sie bekommen</p>
                <h2 className="section-title">Leistungsumfang</h2>
              </div>
            </div>
            <div className="include-grid reveal">
              {s.includes.map((i) => (
                <div key={i.title} className="include-card">
                  <span className="check" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <h3>{i.title}</h3>
                    <p>{i.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Ablauf</p>
                <h2 className="section-title">So läuft ein Projekt ab</h2>
              </div>
            </div>
            <div className="step-grid reveal">
              {s.process.map((p, i) => (
                <div key={p.title} className="step">
                  <div className="num">Schritt {i + 1}</div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div className="price-box reveal">
              <div>
                <p className="eyebrow" style={{ marginBottom: 6 }}>
                  Preis
                </p>
                <strong className="price">{s.priceFrom}</strong>
                <span className="price-hint">netto</span>
              </div>
              <p>{s.priceNote}</p>
              <a href="/preise.html" className="link-accent">
                Alle Preise &amp; Pakete →
              </a>
            </div>
          </div>
        </section>

        {(s.slug === 'ki-automatisierung' || s.slug === 'email-automatisierung') && (
          <EmailDemoSection
            title="Probieren Sie es aus: Die KI liest Ihre Mail."
            text="Genau so arbeitet die Automatisierung, die Sie hier bekommen. Beispiel laden oder eigenen Text einfügen – die KI ordnet ein, zieht Daten heraus und schreibt einen Entwurf."
          />
        )}

        <FaqList faqs={s.faqs} title={`Häufige Fragen zu ${s.title}`} />

        <Reviews withSchema={false} />

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Weitere Leistungen</p>
                <h2 className="section-title">Das könnte auch passen</h2>
              </div>
            </div>
            <div className="card-grid reveal">
              {others.map((o) => (
                <a key={o.slug} href={serviceUrl(o)} className="teaser-card">
                  <div className="num">{o.num}</div>
                  <h3>{o.title}</h3>
                  <p>{o.teaser}</p>
                  <span className="teaser-more">Mehr erfahren →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Welcher Ablauf kostet Sie am meisten Zeit?"
          text="Kostenloses Erstgespräch, ehrliche Einschätzung, klares Angebot – innerhalb von 24 Stunden eine persönliche Antwort."
          primary={s.cta}
          topic={s.formTopic}
        />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  );
}
