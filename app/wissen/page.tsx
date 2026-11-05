import type { Metadata } from 'next';
import { openGraph } from '@/lib/og';
import { SITE, pageUrl } from '@/lib/site';
import { ARTICLES_NEWEST_FIRST, articleUrl, formatDate, AUTHOR } from '@/lib/wissen';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

const PATH = '/wissen';
const DESCRIPTION =
  'Fachartikel zu KI in der Instandhaltung: Stromlaufpläne, technische Dokumentation und Tests von KI-Assistenten. Mit Quellen und Grenzen.';

export const metadata: Metadata = {
  title: 'Wissen: KI in der Instandhaltung, Fachartikel | SJCODE',
  description: DESCRIPTION,
  alternates: { canonical: pageUrl(PATH) },
  openGraph: openGraph({ title: 'Wissen: KI in der Instandhaltung', description: DESCRIPTION, url: pageUrl(PATH) }),
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([{ name: 'Wissen' }]),
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl(PATH)}#seite`,
      url: pageUrl(PATH),
      name: 'Wissen: KI in der Instandhaltung',
      description: DESCRIPTION,
      inLanguage: 'de-DE',
      publisher: { '@id': SITE.businessId },
      hasPart: ARTICLES_NEWEST_FIRST.map((a) => ({ '@type': 'Article', headline: a.title, url: `${SITE.url}${articleUrl(a)}` })),
    },
  ],
};

export default function WissenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Header active="none" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <Breadcrumb items={[{ name: 'Wissen' }]} />
          <p className="eyebrow rise rise-1">Fachartikel</p>
          <h1 className="rise rise-2">Wissen: KI in der Instandhaltung</h1>
          <p className="lede rise rise-3">
            Was KI bei Stromlaufplänen, technischer Dokumentation und im Betrieb leisten kann, wo sie scheitert und wie
            man das vor dem Einsatz prüft. Jeder Artikel nennt seine Quellen und seine Grenzen.
          </p>
        </section>
        <section className="section">
          <div className="container">
            <ul className="article-list">
              {ARTICLES_NEWEST_FIRST.map((a) => (
                <li key={a.slug} className="reveal">
                  <h2>
                    <a href={articleUrl(a)}>{a.title}</a>
                  </h2>
                  <p>{a.description}</p>
                  <p className="source">
                    {AUTHOR.name} · <time dateTime={a.date}>{formatDate(a.date)}</time>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
