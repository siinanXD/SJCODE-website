/**
 * Preise & Pakete – eine Datenquelle für Startseite (Teaser), Preisseite und FAQ.
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ HIER PREISE PFLEGEN. Alle Angaben netto. „ab“-Preise sind Einstiegs-   │
 * │ preise; das konkrete Angebot entsteht im Erstgespräch.                 │
 * └───────────────────────────────────────────────────────────────────────┘
 */

export type Package = {
  id: string;
  name: string;
  price: string;
  priceHint: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  /** Vorauswahl im Kontaktformular */
  formTopic: string;
  cta: string;
};

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Website Starter',
    price: 'ab 1.900 €',
    priceHint: 'Festpreis · netto',
    tagline: 'Für Selbständige, Vereine und kleine Betriebe, die endlich gefunden werden wollen.',
    features: [
      'Onepager oder bis 5 Seiten',
      'Individuelles Design, mobil-optimiert',
      'SEO-Grundlagen & Google-Unternehmensprofil',
      'Kontaktformular, Impressum, Datenschutz',
      'Lighthouse-Werte über 90',
      'Einweisung zur Selbstpflege',
    ],
    formTopic: 'Website',
    cta: 'Starter anfragen',
  },
  {
    id: 'business',
    name: 'Website Business',
    price: 'ab 3.900 €',
    priceHint: 'Festpreis · netto',
    tagline: 'Für Betriebe, die über Google regelmäßig Anfragen bekommen wollen.',
    features: [
      'Bis 10 Seiten inkl. eigener Leistungsseiten',
      'Bewertungen, FAQ & strukturierte Daten für Google',
      'Blog- oder Ratgeber-Bereich',
      'Anfrage-Formular mit Vorqualifizierung',
      'Design-Entwurf in Figma zur Abstimmung',
      '3 Monate Betreuung inklusive',
    ],
    highlight: true,
    formTopic: 'Website',
    cta: 'Business anfragen',
  },
  {
    id: 'automation',
    name: 'KI-Automatisierung',
    price: 'ab 2.500 €',
    priceHint: 'Festpreis nach Prozess-Analyse · netto',
    tagline: 'Für wiederkehrende Aufgaben, die jeden Tag Zeit fressen.',
    features: [
      'Kostenlose Prozess-Analyse (30 Min.)',
      'Festpreis-Angebot nach Analyse',
      'E-Mail-, Beleg- oder Anfragen-Automation',
      'Assistenten auf Ihren eigenen Daten',
      'Human-in-the-Loop: nichts ohne Ihre Freigabe',
      'Tests, Dokumentation, Übergabe',
    ],
    formTopic: 'KI / Automatisierung',
    cta: 'Prozess-Analyse anfragen',
  },
];

export const CARE = {
  name: 'Betreuung & Weiterentwicklung',
  price: 'ab 89 € / Monat',
  text: 'Updates, Sicherheit, kleine Änderungen und ein fester Ansprechpartner – monatlich kündbar.',
  hourly: 'Einzelaufträge nach Aufwand: 95 € / Stunde',
};

export const PRICING_FAQS = [
  {
    q: 'Warum „ab“-Preise?',
    a: 'Weil jede Website und jede Automatisierung anders ist. Die „ab“-Preise sind echte Einstiegspreise für den beschriebenen Umfang. Nach dem kostenlosen Erstgespräch bekommen Sie ein Festpreis-Angebot – dann steht der Preis.',
  },
  {
    q: 'Was ist, wenn mein Budget kleiner ist?',
    a: 'Sagen Sie es einfach. Oft lässt sich der Umfang sinnvoll verkleinern oder in Etappen umsetzen. Und wenn es nicht passt, sage ich das ehrlich – ohne Verkaufsdruck.',
  },
  {
    q: 'Gibt es Ratenzahlung?',
    a: 'Ja. Üblich sind 50 % bei Auftrag und 50 % beim Livegang; bei größeren Projekten auch drei Raten. Wir regeln das im Angebot.',
  },
  {
    q: 'Welche laufenden Kosten entstehen?',
    a: 'Für Websites: Domain und Hosting, meist 0 bis 15 € im Monat, auf Ihren Namen. Für KI-Automatisierung: die Nutzung der KI-Modelle, je nach Aufkommen meist 10 bis 50 € im Monat. Betreuung durch mich ist optional.',
  },
  {
    q: 'Gilt die Umsatzsteuer?',
    a: 'Alle Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer.',
  },
];
