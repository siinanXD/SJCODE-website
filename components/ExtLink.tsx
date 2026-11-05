import type { ReactNode } from 'react';

/** Externer Link in neuem Tab, mit Hinweis für Screenreader. */
export default function ExtLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (öffnet in neuem Tab)</span>
    </a>
  );
}
