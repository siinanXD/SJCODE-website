/**
 * Wissensartikel (`/wissen`). Nur Daten: neue Artikel als Eintrag in `ARTICLES` ergänzen,
 * Route, Übersicht, Sitemap und JSON-LD folgen daraus (statischer Export, `generateStaticParams`).
 *
 * Regeln: nur belegte Aussagen (öffentliche Repos, verlinkte Quellen), keine erfundenen Zahlen oder Fälle,
 * Grenzen nennen. Entwürfe im Namen des Autors; Autor liest gegen und ergänzt eigene Erfahrung.
 * Links im Text: `[Text](/pfad)` oder `[Text](https://…)`, `` `code` `` für Kennzeichen.
 */

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type Link = { label: string; href: string };

export type Article = {
  slug: string;
  /** Überschrift (h1) */
  title: string;
  /** Seitentitel ohne „| SJCODE“ (gesamter Titel höchstens 60 Zeichen) */
  seoTitle: string;
  /** Beschreibung, höchstens 155 Zeichen */
  description: string;
  /** Veröffentlichungsdatum (ISO, Tag des Merges) */
  date: string;
  blocks: Block[];
  sources: Link[];
  related: Link[];
};

export const AUTHOR = { name: 'Sinan Kahraman', id: 'https://sjcode.de/#sinan' } as const;

const REPO = 'https://github.com/siinanXD/stromlauf-ai/blob/master';

export const ARTICLES: Article[] = [
  {
    slug: 'stromlaufplaene-mit-ki-auswerten',
    title: 'Stromlaufpläne mit KI auswerten: was geht, was nicht',
    seoTitle: 'Stromlaufpläne mit KI: was geht, was nicht',
    description:
      'Was KI bei Stromlaufplänen leisten kann, welche Dateien sie liest und wo sie scheitert: Signalweg, Belege, Scans, Exportformate und Grenzen.',
    date: '2026-11-05',
    blocks: [
      {
        type: 'p',
        text: 'Steht eine Anlage, sucht die Instandhaltung dasselbe Bauteil in mehreren Dokumenten: im Stromlaufplan, in der Stückliste, im Klemmenplan, im SPS-Programm und im Handbuch. Dort heißt es je nach Dokument `-K1`, `-X3:1`, `E0.0` oder `/3.8`. Dieser Artikel beschreibt, was eine KI beim Auswerten solcher Unterlagen leisten kann und wo sie an Grenzen stößt. Grundlage ist das öffentliche Projekt [stromlauf-ai](https://github.com/siinanXD/stromlauf-ai), dessen Zahlen und Aussagen unten belegt sind.',
      },
      { type: 'h2', text: 'Warum eine reine Textsuche bei Stromlaufplänen versagt' },
      {
        type: 'p',
        text: 'Ein Chatbot, der nur Text durchsucht, rät bei Stromlaufplänen leicht. Er sieht eine Klemme in einem Dokument und eine ähnliche Bezeichnung in einem anderen, kennt aber den Zusammenhang nicht. Die Folge sind erfundene Spalten, Klemmen und Seiten. Für die Störungssuche ist das gefährlich, weil eine falsche, aber überzeugend klingende Antwort Zeit kostet.',
      },
      { type: 'h2', text: 'Was die KI beim Auswerten von Stromlaufplänen leisten kann' },
      {
        type: 'p',
        text: 'Das Projekt trennt Lesen und Antworten. Alles, was sich aus den Dokumenten eindeutig lesen lässt, kommt ohne Modellaufruf:',
      },
      {
        type: 'ul',
        items: [
          'Beim Hochladen entsteht ein Kennzeichen-Index über alle Dokumente einer Maschine, dazu ein Signalgraph aus Klemmenplan, Stückliste, Symboltabelle und SPS-Programm.',
          'Der Signalweg zeigt die Kette vom Taster bis zum Motor, zum Beispiel `-S1 → -S1:13 → -X3:1 → E0.0 → FB 10 NW 1 → Freigabe → NW 2 → A4.0 → -X3:9 → -K1:A1 → -K1 → -K1:2 → -X4:U → -M1`. Das ist ein Beispiel aus der Demo-Maschine.',
          'Befundkarte, Lückenliste und Maschinenmodell werden ebenfalls aus den Dokumenten berechnet, nicht vom Sprachmodell geraten.',
        ],
      },
      {
        type: 'p',
        text: 'Erst danach antwortet das Sprachmodell, und nur über diese Werkzeuge. Es muss jede Aussage mit Datei und Fundstelle belegen, und ein Zitat-Resolver prüft die Belege gegen die tatsächlichen Fundstellen. Text aus Dokumenten gilt dabei als Daten, nicht als Anweisung. So lässt sich eine Antwort in der Instandhaltung gegenprüfen, statt ihr zu glauben. Wie das in Zahlen aussieht, steht in der [Fallstudie zu stromlauf-ai](/referenz/stromlauf-ai.html).',
      },
      { type: 'h2', text: 'Welche Dateien sich auswerten lassen' },
      {
        type: 'p',
        text: 'Der PDF-Export des CAE-Werkzeugs ist der Vertrag: Gelesen wird, was das Werkzeug als PDF ausgibt, dazu Stücklisten und Klemmenpläne als Tabelle und SPS-Quellen als Text.',
      },
      {
        type: 'ul',
        items: [
          'Stromlaufplan, Klemmenplan, Stückliste und Handbuch als PDF, Excel, CSV, Word, PowerPoint, Markdown, HTML, Text oder Bild.',
          'SPS-Programme als STEP-7-AWL-Quelle (`.awl`) und TIA-Portal-Quelle (`.scl`), Symboltabellen als `.sdf`.',
          'Gescannte PDFs und Bilder liest eine lokale Texterkennung, ohne API-Kosten. Sie legt eine unsichtbare Textebene ins PDF, damit Suche, Blattverweise wie `/3.4` und die Zitatprüfung auch auf dem Scan funktionieren.',
        ],
      },
      { type: 'h2', text: 'Grenzen: was beim Auswerten von Stromlaufplänen nicht geht' },
      {
        type: 'p',
        text: 'Die folgenden Grenzen nennt das Projekt selbst. Sie gelten für die öffentliche Demo und müssen auf eigenen Plänen geprüft werden:',
      },
      {
        type: 'ul',
        items: [
          'DXF und DWG werden nicht gelesen. Dafür den PDF-Export des Plans hochladen.',
          'Native EPLAN-Projekte (`.elk`) und TIA-Portal-Projekte (`.ap*`) werden nicht gelesen. Dafür PDF-Export, Stückliste als Excel oder CSV und die SPS-Bausteine als Quelle exportieren.',
          'Handschrift, etwa Nachträge von Hand im Plan, wird nicht erkannt.',
          'Fotos von Plänen mit starker Perspektive bleiben schwierig: Die Texterkennung dreht hochkant gescannte Blätter und gleicht Schräglage aus, entzerrt aber keine schräg fotografierte Seite.',
          'Scans sind weniger genau als Text-PDFs. Auf dem Beispiel-Scan werden 81 % der Klemmen gefunden, Geräte und SPS-Adressen zu 99 bis 100 %. Die Klemmenbeschriftung neben dem Symbol liest die Texterkennung oft ohne Minus („X1:2“ statt „-X1:2“).',
        ],
      },
      {
        type: 'p',
        text: 'Hinzu kommt die Datenlage der Messungen: Die Zahlen des Projekts stammen aus selbst erzeugten Beispielplänen, nicht aus Kundendokumenten. Im Modellvergleich vom 2. Oktober 2026 verfehlten außerdem alle Modelle drei Fragen zum Signalweg, weil der Hauptweg an der Meldeleuchte statt am Motor endete. Das liegt laut Vergleich an den Daten, nicht am Modell. Kleine lokale Modelle erfanden Belege: Das getestete Modell qwen3.5 4b erreichte nur 35 % gültige Zitate.',
      },
      { type: 'h2', text: 'So prüfen Sie, ob die KI auf Ihren Stromlaufplänen funktioniert' },
      {
        type: 'p',
        text: 'Ob das Lesen auf einem eigenen Plan klappt, zeigt ein Vergleich mit einer Gold-Vorlage. Das Projekt erzeugt sie aus einem Firmendokument und misst die Lesekette gegen sie. Wichtig: Die Vorlage enthält zunächst, was die Lesekette heute findet, und misst sich deshalb mit 1,0. Aussagekräftig wird sie erst, wenn jede Seite von Hand gegen das Dokument geprüft ist: fehlende Kennzeichen ergänzen, falsch gelesene löschen.',
      },
      {
        type: 'p',
        text: 'Wer das nicht selbst aufbauen will, kann es im [Doku-Check](/kontakt.html?thema=Doku-Check) mit einem eigenen Plan testen. Was die [Stromlaufplan-KI](/leistungen/stromlaufplan-ki.html) im Einzelnen liefert, steht auf der Leistungsseite.',
      },
    ],
    sources: [
      { label: 'stromlauf-ai, README: Fallstudie, Signalweg, Unterstützte Dateien, Grenzen, Fremd- und Firmendaten', href: `${REPO}/README.md` },
      { label: 'stromlauf-ai, eval/README.md: Lesegenauigkeit und Gates', href: `${REPO}/eval/README.md` },
      { label: 'stromlauf-ai, Modellvergleich vom 2026-10-02', href: `${REPO}/eval/results/vergleich_2026-10-02.md` },
      { label: 'stromlauf-ai, docs/DATEN.md: Herkunft der Demo-Daten', href: `${REPO}/docs/DATEN.md` },
    ],
    related: [
      { label: 'Fallstudie: KI für Stromlaufpläne mit Beleg', href: '/referenz/stromlauf-ai.html' },
      { label: 'Leistung: Stromlaufplan-KI', href: '/leistungen/stromlaufplan-ki.html' },
    ],
  },
];

export const articleUrl = (a: Pick<Article, 'slug'>) => `/wissen/${a.slug}.html`;
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
/** Neueste zuerst */
export const ARTICLES_NEWEST_FIRST = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

/** „5. November 2026“, unabhängig von der Zeitzone des Build-Rechners. */
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
