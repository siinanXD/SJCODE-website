import { Fragment } from 'react';
import ExtLink from '@/components/ExtLink';

/** Einfacher Inline-Text: `[Text](Link)`, `code` und **fett**; sonst nichts. Interne Links bleiben im Tab, externe öffnen neu. */
export default function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return /^https?:/.test(link[2]) ? (
            <ExtLink key={i} href={link[2]}>
              {link[1]}
            </ExtLink>
          ) : (
            <a key={i} href={link[2]}>
              {link[1]}
            </a>
          );
        }
        const bold = p.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const code = p.match(/^`([^`]+)`$/);
        if (code) return <code key={i}>{code[1]}</code>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
