/**
 * Belegte Angaben der Fallstudie stromlauf-ai. Jede Zahl steht so im öffentlichen Repo
 * `siinanXD/stromlauf-ai` (Stand: Lauf vom 2026-10-02); `SOURCES` nennt die Datei dazu.
 * Ändern sich die Eval-Zahlen im Repo, hier nachziehen und das Datum anpassen.
 */
const REPO = 'https://github.com/siinanXD/stromlauf-ai/blob/master';

export const SOURCES = {
  readme: { label: 'README, Abschnitt „Fallstudie“', href: `${REPO}/README.md` },
  vergleich: { label: 'eval/results/vergleich_2026-10-02.md', href: `${REPO}/eval/results/vergleich_2026-10-02.md` },
  evalReadme: { label: 'eval/README.md', href: `${REPO}/eval/README.md` },
  daten: { label: 'docs/DATEN.md', href: `${REPO}/docs/DATEN.md` },
} as const;

/** Agentenlauf, 20 Fragen je Modell (README, Tabelle „Eval-Zahlen“). */
export const EVAL_ROWS = [
  { model: 'claude-sonnet-5-5', facts: '0,988', sources: '0,95', citations: '0,991', full: 18, usd: '0,046', seconds: '12,2' },
  { model: 'openai:gpt-6.1-sol', facts: '0,872', sources: '0,90', citations: '0,947', full: 10, usd: '0,012', seconds: '12,6' },
  { model: 'openai:gpt-5.4-mini@none', facts: '0,820', sources: '0,95', citations: '0,721', full: 11, usd: '0,004', seconds: '5,5' },
  { model: 'ollama:qwen35-4b-32k (lokal)', facts: '0,524', sources: '0,60', citations: '0,350', full: 5, usd: '0', seconds: '6,4' },
] as const;
