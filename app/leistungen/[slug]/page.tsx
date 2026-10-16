import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { openGraph } from '@/lib/og';
import { SITE } from '@/lib/site';
import { SERVICES, getService, serviceRepo, serviceUrl } from '@/lib/services';
import Header, { DOKU_CHECK_HREF } from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

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
  const repo = serviceRepo(s);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([{ name: s.title, href: serviceUrl(s) }]),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.title,
        serviceType: s.serviceType,
        description: s.metaDescription,
        url,
        provider: { '@id': SITE.businessId },
        areaServed: ['Euskirchen', 'Köln', 'Bonn', 'DE'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const others = SERVICES.filter((o) => o.slug !== s.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hm">
        <Header active="leistungen" />
        <main id="main" tabIndex={-1}>
          <section className="hm-section hm-hero">
            <div className="hm-wrap">
              <Breadcrumb items={[{ name: s.title }]} animate={false} />
              <p className="hm-kicker">
                {s.id} · {s.title.toUpperCase()}
              </p>
              <h1 className="hm-h1">{s.headline}</h1>
              <p className="hm-lede">{s.lede}</p>
              <div className="hm-actions">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hm-btn hm-btn-primary"
                  data-umami-event="termin-buchen"
                  data-umami-event-ort={s.slug}
                >
                  Termin buchen · 30 Min kostenlos ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
                <a href={DOKU_CHECK_HREF} className="hm-btn hm-btn-outline">
                  Doku-Check anfragen
                </a>
              </div>
            </div>
          </section>

          <section className="hm-section">
            <div className="hm-wrap hm-split hm-split-top">
              <div>
                <p className="hm-kicker">{s.id} · DAS PROBLEM</p>
                <h2 className="hm-h2">Das Problem</h2>
                <p className="hm-lede">{s.problem.text}</p>
                <ul className="hm-list">
                  {s.problem.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="hm-kicker">{s.id} · DIE LÖSUNG</p>
                <h2 className="hm-h2">Die Lösung</h2>
                <p className="hm-lede">{s.solution.text}</p>
                <ul className="hm-list">
                  {s.solution.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="hm-section hm-dark">
            <div className="hm-wrap hm-split">
              <div>
                <p className="hm-kicker">{s.id} · {s.repoIsDemo ? 'LIVE-DEMO' : 'REFERENZ'}</p>
                <h2 className="hm-h2">{s.repoIsDemo ? 'Nicht glauben. Ausprobieren.' : 'Der Code ist öffentlich.'}</h2>
                <p className="hm-lede">
                  {repo.text}
                  {s.repoIsDemo ? ' Mit Demo-Daten, ohne Anmeldung.' : ''}
                </p>
                <div className="hm-actions">
                  <a href={repo.href} target="_blank" rel="noopener noreferrer" className="hm-btn hm-btn-primary">
                    {repo.name} auf GitHub ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                  </a>
                </div>
              </div>
              {s.slug === 'stromlaufplan-ki' && (
                <div className="hm-chat" role="group" aria-label="Beispiel-Dialog">
                  <p className="hm-mono hm-chat-tag">Beispiel</p>
                  <p className="hm-bubble hm-bubble-q">Welche Sicherung versorgt den Hydraulikmotor -M3?</p>
                  <div className="hm-bubble hm-bubble-a">
                    <p>-M3 wird über den Motorschutzschalter -Q3 versorgt, vorgeschaltet ist -F12 (16 A, Kurve C).</p>
                    <p className="hm-mono">Pfad: L1 → -F12 → -Q3 → -K3 → -M3</p>
                    <p className="hm-source hm-mono">Stromlaufplan_Presse3.pdf · Blatt 14 · Pfad 3</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="hm-section">
            <div className="hm-wrap hm-narrow">
              <p className="hm-kicker">{s.id} · FRAGEN</p>
              <h2 className="hm-h2">Häufige Fragen zu {s.title}</h2>
              <div className="hm-faq">
                {s.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="hm-section">
            <div className="hm-wrap">
              <p className="hm-kicker">WEITERE STROMKREISE</p>
              <div className="hm-circuits">
                {others.map((o) => (
                  <article key={o.slug} className="hm-circuit">
                    <span className="hm-mono">{o.id}</span>
                    <h3>{o.title}</h3>
                    <p>{o.teaser}</p>
                    <a href={serviceUrl(o)} className="hm-mono">
                      Mehr erfahren →
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="hm-section hm-dark">
            <div className="hm-wrap hm-center">
              <p className="hm-kicker">KONTAKT</p>
              <h2 className="hm-h2">Stromkreis schließen.</h2>
              <p className="hm-lede">
                30 Minuten, ein Handbuch von Ihnen, zehn echte Fragen. Danach wissen Sie, ob sich KI für Ihre
                Instandhaltung lohnt.
              </p>
              <div className="hm-actions hm-actions-center">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hm-btn hm-btn-primary hm-btn-lg"
                  data-umami-event="termin-buchen"
                  data-umami-event-ort={`${s.slug}-abschluss`}
                >
                  Termin buchen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}
