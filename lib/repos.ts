/** Live-Demo von stromlauf-ai (Vercel, Demo-Daten, ohne Anmeldung). */
export const STROMLAUF_DEMO_URL = 'https://stromlauf-ai.vercel.app';

/** Öffentliche Referenz-Repos für industrielle KI – Startseite und Referenzseite. `archived`: Repo ist auf GitHub archiviert. */
export const INDUSTRY_REPOS = [
  {
    name: 'stromlauf-ai',
    href: 'https://github.com/siinanXD/stromlauf-ai',
    text: 'KI für Stromlaufpläne und STEP-7-Programme.',
    archived: false,
  },
  {
    name: 'document-intelligence-mvp',
    href: 'https://github.com/siinanXD/document-intelligence-mvp',
    text: 'Dokumente mit Quellenbeleg durchsuchen.',
    archived: true,
  },
  {
    name: 'maintenance-ai-assistant',
    href: 'https://github.com/siinanXD/maintenance-ai-assistant',
    text: 'Instandhaltung: Aufgaben, Schichtplan, Wissenssuche mit Quellen.',
    archived: true,
  },
  {
    name: 'agent-eval-harness',
    href: 'https://github.com/siinanXD/agent-eval-harness',
    text: 'Regressionstests für KI-Agenten (MIT-Lizenz).',
    archived: true,
  },
] as const;
