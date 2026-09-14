import { SITE } from '@/lib/site';

export type Crumb = { name: string; href?: string };

/**
 * Brotkrumen-Navigation. Das letzte Element ist die aktuelle Seite (ohne Link).
 * `breadcrumbJsonLd()` liefert das passende BreadcrumbList-Schema aus derselben
 * Liste, damit Sichtbares und Schema nie auseinanderlaufen.
 */
export default function Breadcrumb({ items, animate = true }: { items: Crumb[]; animate?: boolean }) {
  return (
    <nav className={`breadcrumb${animate ? ' rise rise-1' : ''}`} aria-label="Brotkrumen">
      <a href="/index.html">Start</a>
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={c.name} style={{ display: 'contents' }}>
            <span aria-hidden="true">/</span>
            {last || !c.href ? (
              <span aria-current={last ? 'page' : undefined}>{c.name}</span>
            ) : (
              <a href={c.href}>{c.name}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  const all: Crumb[] = [{ name: 'Start', href: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE.url}${c.href}` } : {}),
    })),
  };
}
