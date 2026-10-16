/**
 * Leistungen – eine Datenquelle für Startseite, die vier Detailseiten,
 * Footer, Sitemap und das JSON-LD. Die Nummern (-K1 bis -K4) sind die
 * Betriebsmittelkennzeichen der Startseite.
 *
 * Neue Leistung? Einen Block ergänzen – Seite, Navigation und Schema
 * entstehen automatisch.
 */

import { INDUSTRY_REPOS } from './repos';

export type Faq = { q: string; a: string };

export type Service = {
  /** URL-Segment: /leistungen/<slug>.html */
  slug: string;
  /** BMK-Kennzeichen, z. B. „-K1“ */
  id: string;
  /** Kurzname für Navigation, Karten, Footer */
  title: string;
  /** Schema.org serviceType */
  serviceType: string;
  /** Vollständiger SEO-Titel der Detailseite */
  seoTitle: string;
  metaDescription: string;
  /** Kurztext für Karten */
  teaser: string;
  /** Überschrift auf der Detailseite */
  headline: string;
  lede: string;
  problem: { text: string; points: string[] };
  solution: { text: string; points: string[] };
  /** Name des Referenz-Repos aus lib/repos.ts */
  repo: (typeof INDUSTRY_REPOS)[number]['name'];
  /** Repo ist zugleich die Demo (Demo-Daten, ohne Anmeldung) */
  repoIsDemo: boolean;
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: 'doku-assistent',
    id: '-K1',
    title: 'Doku-Assistent',
    serviceType: 'KI-Dokumentensuche',
    seoTitle: 'Doku-Assistent: Handbücher und Wartungsanleitungen fragen statt suchen',
    metaDescription:
      'KI für technische Dokumentation: Handbücher, Wartungsanleitungen und Störungsberichte durchsuchen und beantworten – jede Antwort mit Dokument und Seite. Für Maschinenbauer und Instandhaltung.',
    teaser:
      'Handbücher, Wartungsanleitungen und Störungsberichte fragen statt suchen. Antwort mit Dokument und Seite.',
    headline: 'Handbücher fragen statt durchblättern.',
    lede:
      'Der Doku-Assistent beantwortet Fragen aus Ihren Handbüchern, Wartungsanleitungen und Störungsberichten. Jede Antwort zeigt Dokument und Seite, damit Ihre Instandhaltung sie in Sekunden prüfen kann.',
    problem: {
      text: 'Wenn die Anlage steht, sucht jemand im Ordner, im Netzlaufwerk oder ruft den Kollegen an, der es weiß. Das kostet Stillstand und Nerven.',
      points: [
        'Handbücher liegen als PDF verstreut auf Laufwerken und in Mails.',
        'Das Wissen steckt im Kopf von zwei oder drei Kollegen.',
        'Neue Mitarbeiter brauchen 6–12 Monate, bis sie die Anlage wirklich kennen.',
      ],
    },
    solution: {
      text: 'Ich mache Ihre vorhandene Doku durchsuchbar und beantwortbar. Sie stellen die Frage in normaler Sprache und bekommen die Antwort mit Quellenbeleg.',
      points: [
        'Antwort mit Dokument und Seite, nie ohne Beleg.',
        'Läuft auf Ihren eigenen Unterlagen, Daten bleiben in der EU.',
        'Einstieg über den kostenlosen Doku-Check: 10 echte Fragen an eines Ihrer Handbücher.',
      ],
    },
    repo: 'document-intelligence-mvp',
    repoIsDemo: false,
    faqs: [
      {
        q: 'Woher kommen die Antworten?',
        a: 'Ausschließlich aus Ihren Dokumenten. Jede Antwort nennt Dokument und Seite, damit Sie sie prüfen können.',
      },
      {
        q: 'Was passiert, wenn die Doku keine Antwort enthält?',
        a: 'Dann soll der Assistent das sagen, statt etwas zu erfinden. Genau das messen wir im Doku-Check mit echten Fragen.',
      },
      {
        q: 'Wie starte ich?',
        a: 'Mit dem Doku-Check: 30 Minuten, kostenlos, ein Handbuch von Ihnen, zehn echte Fragen. Das Ergebnis bekommen Sie als PDF.',
      },
    ],
  },
  {
    slug: 'wartungs-assistent',
    id: '-K2',
    title: 'Wartungs-Assistent',
    serviceType: 'KI für Instandhaltung',
    seoTitle: 'Wartungs-Assistent: Störung eingeben, bekannte Ursachen und Schritte bekommen',
    metaDescription:
      'KI für die Instandhaltung: Störung eingeben und bekannte Ursachen und Schritte aus Ihrer Historie bekommen – mit Quellen. Für Anlagenbetreiber und Instandhaltungsteams.',
    teaser: 'Störung eingeben, bekannte Ursachen und Schritte aus Ihrer Historie bekommen.',
    headline: 'Die Störung kennt jemand schon. Die Historie weiß es.',
    lede:
      'Der Wartungs-Assistent sucht zu einer Störung die bekannten Ursachen und Schritte in Ihrer eigenen Historie. Antworten kommen mit Quelle, damit Ihr Team weiß, worauf sie beruhen.',
    problem: {
      text: 'Dieselbe Störung tritt zum dritten Mal auf, aber die Lösung vom letzten Mal steht nur in einem Bericht, den niemand findet.',
      points: [
        'Störungsberichte liegen ungeordnet und sind schwer zu durchsuchen.',
        '60–75 % der Service- und Wartungsanfragen folgen wiederkehrenden Mustern.',
        'Erfahrung verlässt das Haus, wenn Kollegen die Schicht oder den Betrieb wechseln.',
      ],
    },
    solution: {
      text: 'Sie geben die Störung ein und bekommen bekannte Ursachen und Schritte aus Ihrer Historie. Jeder Hinweis nennt, aus welcher Quelle er stammt.',
      points: [
        'Wissenssuche mit Quellen statt Bauchgefühl.',
        'Öffentliches Referenzprojekt mit Aufgaben, Schichtplan und Wissenssuche.',
        'Sie entscheiden nach jeder Stufe neu, ob es weitergeht.',
      ],
    },
    repo: 'maintenance-ai-assistant',
    repoIsDemo: false,
    faqs: [
      {
        q: 'Ersetzt der Assistent meine Instandhalter?',
        a: 'Nein. Er findet bekanntes Wissen schneller. Die Entscheidung und die Arbeit an der Anlage bleiben bei Ihrem Team.',
      },
      {
        q: 'Welche Daten brauche ich dafür?',
        a: 'Störungsberichte, Wartungsanleitungen und Handbücher, die Sie schon haben. Im Doku-Check klären wir, was davon brauchbar ist.',
      },
      {
        q: 'Kann ich den Code ansehen?',
        a: 'Ja. Das Referenzprojekt ist öffentlich auf GitHub.',
      },
    ],
  },
  {
    slug: 'stromlaufplan-ki',
    id: '-K3',
    title: 'Stromlaufplan-KI',
    serviceType: 'KI für Stromlaufpläne und SPS-Programme',
    seoTitle: 'Stromlaufplan-KI: Fragen an Stromlaufpläne und STEP-7-Programme',
    metaDescription:
      'KI für Stromlaufpläne und STEP-7-Programme: Welche Sicherung, welcher Pfad, welches Blatt? Antwort mit Blatt und Pfad. Mit Live-Demo auf Demo-Daten.',
    teaser:
      'Fragen an Stromlaufpläne und STEP-7-Programme: Welche Sicherung, welcher Pfad, welches Blatt?',
    headline: 'Welche Sicherung versorgt den Motor? Fragen Sie den Plan.',
    lede:
      'Die Stromlaufplan-KI beantwortet Fragen zu Stromlaufplänen und STEP-7-Programmen und zeigt die Stelle im Plan: Sicherung, Pfad und Blatt.',
    problem: {
      text: 'Vor der stehenden Anlage blättert jemand durch einen langen Stromlaufplan, um einen Pfad zu finden.',
      points: [
        'Pläne und SPS-Exporte sind umfangreich und schwer zu durchsuchen.',
        'Die Zuordnung von Sicherung, Schütz und Motor steht auf mehreren Blättern.',
        'Wer den Plan kennt, ist gerade nicht da.',
      ],
    },
    solution: {
      text: 'Sie fragen in normaler Sprache, die KI antwortet mit Pfad und Fundstelle. Das können Sie selbst ausprobieren, mit Demo-Daten und ohne Anmeldung.',
      points: [
        'Antwort mit Pfad und Blatt, zum Beispiel: L1 → -F12 → -Q3 → -K3 → -M3.',
        'Projekt öffentlich auf GitHub, mit Demo-Daten.',
        'Gebaut von einem Elektroniker für Betriebstechnik.',
      ],
    },
    repo: 'stromlauf-ai',
    repoIsDemo: true,
    faqs: [
      {
        q: 'Kann ich die Demo mit eigenen Plänen testen?',
        a: 'Die öffentliche Demo nutzt Demo-Daten. Mit Ihren eigenen Plänen testen wir im Doku-Check oder im Potenzialcheck.',
      },
      {
        q: 'Welche Formate werden unterstützt?',
        a: 'Stromlaufpläne und STEP-7-Programme. Welche Exporte in Ihrem Fall brauchbar sind, klären wir im Gespräch.',
      },
      {
        q: 'Ist die Antwort überprüfbar?',
        a: 'Ja. Jede Antwort zeigt die Stelle im Plan, damit Ihr Elektriker sie gegenprüfen kann.',
      },
    ],
  },
  {
    slug: 'qualitaetspruefung',
    id: '-K4',
    title: 'Qualitätsprüfung',
    serviceType: 'Qualitätsprüfung für KI-Systeme',
    seoTitle: 'Qualitätsprüfung für KI: Testfragen mit Soll-Antwort, Trefferquote vor dem Einsatz',
    metaDescription:
      'Wie gut ist die KI wirklich? Testfragen mit Soll-Antwort messen die Trefferquote, bevor die KI im Betrieb eingesetzt wird. Regressionstests für KI-Agenten, Open Source.',
    teaser: 'Testfragen mit Soll-Antwort messen, wie gut die KI wirklich ist – vor dem Einsatz.',
    headline: 'Erst messen, dann einsetzen.',
    lede:
      'Die Qualitätsprüfung misst mit Testfragen und Soll-Antworten, wie gut ein KI-Assistent wirklich antwortet. So entscheiden Sie nach Zahlen, nicht nach Gefühl.',
    problem: {
      text: 'Eine KI antwortet immer selbstsicher. Ob die Antwort stimmt, merkt man oft erst, wenn etwas schiefgeht.',
      points: [
        'Ohne Testset weiß niemand, wie oft die KI richtig liegt.',
        'Nach jeder Änderung kann sich die Qualität verschlechtern, ohne dass es auffällt.',
        'Nicht die KI, sondern die Datenlage ist oft der Engpass.',
      ],
    },
    solution: {
      text: 'Wir sammeln echte Fragen mit Soll-Antwort und lassen den Assistenten dagegen antreten. Das Ergebnis ist eine Trefferquote, die Sie vor jeder Entscheidung sehen.',
      points: [
        'Testset mit Trefferquote, auch im Pilot enthalten.',
        'Regressionstests für KI-Agenten, öffentlich auf GitHub (MIT-Lizenz).',
        'Wiederholbar nach jeder Änderung.',
      ],
    },
    repo: 'agent-eval-harness',
    repoIsDemo: false,
    faqs: [
      {
        q: 'Brauche ich das auch, wenn ich einen fremden Assistenten einsetze?',
        a: 'Ja. Mit dem Testset sehen Sie, wo ein Assistent verlässlich ist, egal von wem er stammt.',
      },
      {
        q: 'Woher kommen die Testfragen?',
        a: 'Aus Ihrem Alltag: echte Fragen, die Ihr Team stellt, mit der Antwort, die Sie als richtig ansehen.',
      },
      {
        q: 'Ist der Code frei verfügbar?',
        a: 'Ja, der Evaluations-Harness steht unter MIT-Lizenz auf GitHub.',
      },
    ],
  },
];

export const serviceUrl = (s: Service) => `/leistungen/${s.slug}.html`;

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const serviceRepo = (s: Service) => INDUSTRY_REPOS.find((r) => r.name === s.repo)!;
