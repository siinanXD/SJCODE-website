import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { openGraph } from '@/lib/og';
import { SITE, pageUrl } from '@/lib/site';
import { ARTICLES, AUTHOR, formatDate, getArticle } from '@/lib/wissen';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import Inline from '@/components/Inline';
import ExtLink from '@/components/ExtLink';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/Breadcrumb';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = pageUrl(`/wissen/${a.slug}`);
  return {
    title: `${a.seoTitle} | SJCODE`,
    description: a.description,
    alternates: { canonical: url },
    authors: [{ name: AUTHOR.name }],
    openGraph: {
      ...openGraph({ title: a.title, description: a.description, url }),
      type: 'article',
      publishedTime: a.date,
      authors: [AUTHOR.name],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = pageUrl(`/wissen/${a.slug}`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([{ name: 'Wissen', href: '/wissen.html' }, { name: a.title }]),
      {
        '@type': 'Article',
        '@id': `${url}#artikel`,
        headline: a.title,
        description: a.description,
        url,
        mainEntityOfPage: url,
        inLanguage: 'de-DE',
        datePublished: a.date,
        dateModified: a.date,
        author: { '@type': 'Person', '@id': AUTHOR.id, name: AUTHOR.name, url: `${SITE.url}/ueber-mich.html` },
        publisher: { '@id': SITE.businessId },
        image: `${SITE.url}/og-image.png`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header active="none" />
      <main id="main" tabIndex={-1}>
        <section className="page-head container">
          <Breadcrumb items={[{ name: 'Wissen', href: '/wissen.html' }, { name: a.title }]} />
          <p className="eyebrow rise rise-1">
            {AUTHOR.name} · <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
          <h1 className="rise rise-2">{a.title}</h1>
        </section>
        <article className="section">
          <div className="container prose">
            {a.blocks.map((b, i) =>
              b.type === 'h2' ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.type === 'p' ? (
                <p key={i}>
                  <Inline text={b.text} />
                </p>
              ) : (
                <ul key={i} className="case-list">
                  {b.items.map((it) => (
                    <li key={it}>
                      <span>
                        <Inline text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              ),
            )}
            <h2>Quellen</h2>
            <ul className="case-list">
              {a.sources.map((s) => (
                <li key={s.href}>
                  <span>
                    <ExtLink href={s.href}>{s.label}</ExtLink>
                  </span>
                </li>
              ))}
            </ul>
            <h2>Weiterlesen</h2>
            <ul className="case-list">
              {a.related.map((r) => (
                <li key={r.href}>
                  <span>
                    <a href={r.href}>{r.label}</a>
                  </span>
                </li>
              ))}
              <li>
                <span>
                  <a href="/wissen.html">Alle Artikel im Wissensbereich</a>
                </span>
              </li>
            </ul>
          </div>
        </article>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
