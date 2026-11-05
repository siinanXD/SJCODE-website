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
  {
    slug: 'ki-fuer-handbuecher-instandhaltung',
    title: 'KI für Handbücher in der Instandhaltung: was RAG leistet und wo es scheitert',
    seoTitle: 'RAG für Handbücher: was es leistet, wo es scheitert',
    description:
      'Was RAG bei Handbüchern in der Instandhaltung leistet, wo es scheitert (Versionen, Scans, Tabellen) und was vor dem Einsatz geprüft werden sollte.',
    date: '2026-11-05',
    blocks: [
      {
        type: 'p',
        text: 'Wenn die Anlage steht, sucht die Instandhaltung im Ordner, im Netzlaufwerk oder beim Kollegen, der es weiß. Ein KI-Assistent, der Handbücher durchsucht und beantwortet, soll diese Suche verkürzen. Technisch steckt dahinter meist Retrieval-Augmented Generation, kurz RAG: Ein Sprachmodell antwortet nicht aus dem Gedächtnis, sondern bekommt vorher passende Textstellen aus einem durchsuchbaren Bestand. Das Konzept stammt aus der Forschung ([Lewis et al., 2020](https://arxiv.org/abs/2005.11401)): Ein Modell wird mit einem Index aus Textpassagen gekoppelt, den ein Retriever beim Erzeugen der Antwort befragt. Dieser Artikel beschreibt, was das bei Handbüchern leistet, wo es scheitert und was man vor dem Einsatz prüft.',
      },
      { type: 'h2', text: 'Was RAG bei Handbüchern in der Instandhaltung leistet' },
      {
        type: 'ul',
        items: [
          '**Antworten mit Beleg.** In `document-intelligence-mvp` liefert jede Antwort die Quellen mit, die sie tatsächlich benutzt hat, und jede Quelle lässt sich auf Passage, Seite und Abschnitt auflösen. Quellen, die das Modell nennt, aber nie bekommen hat, werden verworfen.',
          '**Ehrliches „steht nicht drin“.** Fehlt die Information in den Dokumenten, ist „die Dokumente sagen es nicht“ dort eine gültige Antwort und kein Fehler. Die Alternative wäre eine selbstsichere Vermutung.',
          '**Widersprüche sichtbar machen.** Widersprechen sich zwei Passagen, kennzeichnet das System die Antwort als widersprüchlich und liefert beide Stellen, statt sie zu einer glatten Antwort zu verschmelzen.',
          '**Wörtliche Suche für Kennungen.** Die Bedeutungssuche findet Passagen, die dasselbe meinen. Die wörtliche Suche findet Passagen, die den Text tatsächlich enthalten, etwa eine Rechnungsnummer oder einen Klauselverweis. Bei Handbüchern entspricht das einer Teilenummer oder einem Fehlercode, die man exakt treffen muss.',
          '**Zerlegen nach Struktur.** Im `maintenance-ai-assistant` wird nach Überschriften, Abschnitten, Tabellen, Abläufen, Wartungsanleitungen und Einträgen eines Fehlerkatalogs zerlegt, die Gliederung bleibt als Metadaten erhalten.',
          '**Rechte bleiben erhalten.** Dort bleibt die SQL-Datenbank die Instanz für Berechtigungen, Sichtbarkeit und Dokumentstatus. Ein Treffer aus dem Vektorindex allein entscheidet nicht, wer ein Dokument sehen darf.',
        ],
      },
      {
        type: 'p',
        text: 'Ohne Treffer entsteht keine Antwort ohne Quelle: Bei leerem Suchergebnis liefert der `maintenance-ai-assistant` eine lokale Antwort „Keine belastbare Quelle gefunden“ statt einer Vermutung des Modells.',
      },
      { type: 'h2', text: 'Wo RAG bei technischen Handbüchern scheitert' },
      {
        type: 'ul',
        items: [
          '**Mehrere Handbuchstände.** Liegen zwei Fassungen desselben Handbuchs im Bestand, erkennt `document-intelligence-mvp` sie als mögliche Versionen und markiert Widersprüche. Welche Fassung für die Anlage gilt, kann das System nicht wissen. Das muss der Betrieb festlegen, bevor die KI darauf antwortet.',
          '**Schlechte Scans.** In `document-intelligence-mvp` ist die Texterkennung standardmäßig aus und gescannte Dokumente sind für das MVP ausdrücklich nicht vorgesehen. Auch mit Texterkennung sinkt die Genauigkeit: Im Projekt `stromlauf-ai` werden auf dem Beispiel-Scan 81 % der Klemmen gefunden, gegenüber 99 bis 100 % bei Geräten und SPS-Adressen.',
          '**Tabellen und Spaltenlayouts.** Was im Dokument zusammengehört, steht im Text oft verstreut. Für `stromlauf-ai` musste die Ingestion Beschriftungen je Spalte ordnen, damit zusammengehörige Angaben zusammenbleiben. Als Lehre nennt das Projekt: Leseregeln pro Beispieldokument skalieren nicht, bei fremden Formaten greift unterhalb einer Konfidenzschwelle ein seitenweiser Rückfall auf ein Modell.',
          '**Zu viel Kontext.** Mehr Textstellen an das Modell zu geben, hilft nicht automatisch. Die Studie „Lost in the Middle“ ([Liu et al., 2023](https://arxiv.org/abs/2307.03172)) zeigt, dass Modelle Informationen am Anfang und Ende einer langen Eingabe oft besser nutzen als in der Mitte.',
          '**Erfundene Belege.** Nicht jedes Modell zitiert sauber. Im Modellvergleich von `stromlauf-ai` (20 Fragen je Modell) waren bei gpt-5.4-mini 72 % der Zitate gültig, bei einem lokalen 4-Milliarden-Parameter-Modell nur 35 %. Das Projekt hält fest, dass die Kurzantwort ohne Zitatprüfung nicht reicht.',
          '**Anweisungen im Dokument.** Ein Handbuch ist Text, und Text kann Anweisungen enthalten. Darum gilt Dokumenttext im Prompt als Daten, nicht als Anweisung, und es gibt Testfragen mit eingebetteten Anweisungen.',
          '**Modellwechsel.** Wer das Embedding-Modell oder den Vektorspeicher wechselt, muss den gesamten Wissensbestand neu indexieren.',
        ],
      },
      { type: 'h2', text: 'Was man vor dem Einsatz von KI auf Handbüchern prüft' },
      {
        type: 'ul',
        items: [
          '**Bestand und Stand klären.** Welche Handbücher gehören zur Anlage, welche Fassung ist gültig, welche Dateien sind Scans?',
          '**Testset aus dem Alltag.** Echte Fragen der Instandhaltung mit der Antwort, die das Team als richtig ansieht, und dazu Fallen: Fragen, deren Antwort in keinem Dokument steht. Erwartet wird „nicht vorhanden“, bestraft wird eine erfundene Zahl. So geht auch `stromlauf-ai` bei seinen Testfragen vor.',
          '**Belege stichprobenweise im Original prüfen.** Jede Antwort muss Dokument und Seite nennen.',
          '**Trefferquote messen, nicht schätzen.** Fakten, Quellen und Zitate lassen sich regelbasiert gegen eine Fragenliste prüfen. Das geht ohne KI als Richter und liefert bei gleichem Stand gleiche Zahlen.',
          '**Nach jeder Änderung wiederholen.** Ein neues Modell, ein neuer Prompt oder ein neuer Handbuchstand kann die Qualität unbemerkt verschlechtern. Ein Regressionstest macht das sichtbar.',
          '**Datenweg klären.** Auch wenn die eigenen Dienste in der EU laufen, bleibt ein externer Modellanbieter ein Auftragsverarbeiter, wie es `document-intelligence-mvp` in seiner README festhält. Das gehört in die Entscheidung.',
        ],
      },
      {
        type: 'p',
        text: 'Wer nicht selbst ein Testset aufbauen möchte: Im [Doku-Check](/kontakt.html?thema=Doku-Check) stelle ich zehn echte Fragen an eines Ihrer Handbücher. Wie der [Doku-Assistent](/leistungen/doku-assistent.html) arbeitet, steht auf der Leistungsseite, und wie sich die Trefferquote vor dem Einsatz messen lässt, auf der Seite zur [Qualitätsprüfung](/leistungen/qualitaetspruefung.html).',
      },
    ],
    sources: [
      { label: 'document-intelligence-mvp, README (Repository archiviert)', href: 'https://github.com/siinanXD/document-intelligence-mvp/blob/main/README.md' },
      { label: 'maintenance-ai-assistant, AI_RAG_ARCHITECTURE.md (Repository archiviert)', href: 'https://github.com/siinanXD/maintenance-ai-assistant/blob/master/docs/AI_RAG_ARCHITECTURE.md' },
      { label: 'stromlauf-ai, README', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/README.md' },
      { label: 'stromlauf-ai, Modellvergleich vom 2026-10-02', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/eval/results/vergleich_2026-10-02.md' },
      { label: 'stromlauf-ai, eval/README.md', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/eval/README.md' },
      { label: 'Lewis et al. (2020): Retrieval-Augmented Generation', href: 'https://arxiv.org/abs/2005.11401' },
      { label: 'Liu et al. (2023): Lost in the Middle', href: 'https://arxiv.org/abs/2307.03172' },
    ],
    related: [
      { label: 'Leistung: Doku-Assistent', href: '/leistungen/doku-assistent.html' },
      { label: 'Leistung: Qualitätsprüfung', href: '/leistungen/qualitaetspruefung.html' },
      { label: 'Artikel: Stromlaufpläne mit KI auswerten', href: '/wissen/stromlaufplaene-mit-ki-auswerten.html' },
    ],
  },
  {
    slug: 'ki-assistenten-testen-testset-trefferquote',
    title: 'KI-Assistenten vor dem Einsatz testen: Testset und Trefferquote',
    seoTitle: 'KI-Assistent testen: Testset und Trefferquote',
    description:
      'KI-Assistenten vor dem Einsatz testen: warum Stichproben nicht reichen, wie ein Testset entsteht, was die Trefferquote sagt, Regressionstests.',
    date: '2026-11-05',
    blocks: [
      {
        type: 'p',
        text: 'Ein KI-Assistent antwortet immer selbstsicher. Ob die Antwort stimmt, zeigt sich oft erst, wenn etwas schiefgeht. Dieser Artikel beschreibt das Vorgehen, mit dem sich ein Assistent vor dem Einsatz prüfen lässt: ein Testset aus echten Fragen, eine Trefferquote, die man lesen kann, und Regressionstests nach jeder Änderung. Er stützt sich auf zwei öffentliche Projekte, `agent-eval-harness` (archiviert) und `stromlauf-ai`. Beschrieben wird das Vorgehen, nicht das Repository als aktives Produkt.',
      },
      { type: 'h2', text: 'Warum Stichproben beim Testen von KI-Assistenten nicht reichen' },
      {
        type: 'p',
        text: 'Agentensysteme ändern sich ständig. Eine Änderung am Prompt, ein neues Modell oder ein Wechsel des Anbieters kann einen Ablauf verschlechtern, ohne dass etwas abstürzt oder ein Test rot wird. Der Assistent wird still schlechter, und man erfährt es Wochen später von einem Nutzer. So beschreibt es das Projekt `agent-eval-harness`. Prompt ausprobieren und die Ausgabe ansehen hält außerdem keinen zweiten Bearbeiter aus und läuft nicht bei jeder Änderung.',
      },
      {
        type: 'p',
        text: 'Wie groß die Unterschiede sein können, zeigt der Modellvergleich von `stromlauf-ai`: Bei gleichen Dokumenten, gleichem Agenten und gleichem Prompt erreicht das beste Modell 0,988 bei den Fakten und besteht 18 von 20 Fragen voll, ein kleines lokales Modell 0,524 und 5 von 20. Ein Gefühl, das an einem Modell entstanden ist, sagt über ein anderes nichts.',
      },
      { type: 'h2', text: 'Ein Testset für KI-Assistenten bauen' },
      {
        type: 'ul',
        items: [
          '**Echte Fragen.** Die Fragen kommen aus dem Alltag des Teams, jeweils mit der Antwort, die das Team als richtig ansieht. Erfundene Fragen testen, was sich der Ersteller ausgedacht hat.',
          '**Erwartete Quellen mitführen.** Gute Fälle nennen nicht nur die richtige Antwort, sondern auch das Dokument, aus dem sie stammen muss. Im `agent-eval-harness` trägt ein Fall dafür eine Liste erwarteter Dokumente, dazu Prüfungen wie „enthält“, „Muster passt“ oder „Pfad im JSON vorhanden“.',
          '**Fallen einbauen.** Das Testset von `stromlauf-ai` enthält fünf Fragen, deren Antwort in keinem Dokument steht. Erwartet wird „nicht vorhanden“, bestraft wird eine erfundene Zahl. Fünf weitere Fragen enthalten Anweisungen im Dokumenttext.',
          '**Ein Fall prüft etwas.** Der `agent-eval-harness` lädt eine Suite nicht, wenn sie doppelte Kennungen oder Fälle ohne Prüfung enthält. Ein stillschweigend übersprungener Fall würde einen Wert melden und weniger messen, als er behauptet.',
          '**Ehrlich zählen.** Bei `stromlauf-ai` sind 54 von 71 Fragen verbindlich, weil nur deren Dokumente im Repository liegen. Die übrigen 17 laufen nur lokal und zählen nicht als bestanden, solange sie nicht gelaufen sind.',
        ],
      },
      { type: 'h2', text: 'Trefferquote lesen und ihre Grenzen' },
      {
        type: 'p',
        text: 'Eine einzige Zahl verbirgt, was schiefgeht. Darum trennt `stromlauf-ai` Fakten, Quellen und gültige Zitate. Das Modell gpt-5.4-mini erreicht 0,820 bei den Fakten, aber nur 0,721 bei den gültigen Zitaten: Die Antworten sind überwiegend richtig, die Belege oft nicht. Aus der Gesamtquote wäre das nicht zu sehen. Der `agent-eval-harness` trennt aus demselben Grund Erzeugung und Suche: Ein System kann jedes richtige Dokument finden und trotzdem schlecht antworten.',
      },
      {
        type: 'p',
        text: 'Für die Grenzen gilt:',
      },
      {
        type: 'ul',
        items: [
          'Es ist eine Stichprobe. Der Vergleich in `stromlauf-ai` nutzt 20 Fragen je Modell, die Zahlen stammen aus selbst erzeugten Beispieldokumenten, nicht aus Kundenunterlagen.',
          'Der Durchschnitt versteckt Ausreißer. Drei Fragen zum Signalweg verfehlten im selben Lauf alle Modelle. Laut Vergleich lag das an den Daten, nicht am Modell. Die Zahl allein hätte das nicht verraten.',
          'Regelbasierte Prüfung hat Grenzen. Der `agent-eval-harness` prüft nur eindeutig prüfbare Dinge. Freie Qualität („überzeugt der Text?“) liegt bewusst außerhalb. Dafür braucht es einen eigenen Prüfer, getrennt vom Gate.',
          'Die Toleranz ist eine Annahme. Der voreingestellte Wert von 0,02 ist für die eigene Suite eine Schätzung und sollte gegen die eigene Streuung geprüft werden.',
        ],
      },
      {
        type: 'p',
        text: 'Der Vorteil regelbasierter Prüfung: Bei gleicher Ausgabe kommt derselbe Wert heraus. Bewegt sich die Zahl, hat sich der Assistent bewegt, nicht der Prüfer. Ein KI-Richter kostet bei jeder Änderung Geld und ersetzt eine Tatsache durch eine Meinung, die mit dem Richter driftet.',
      },
      { type: 'h2', text: 'Regressionstests: nach jeder Änderung prüfen' },
      {
        type: 'p',
        text: 'Ein Testset nützt erst, wenn es bei jeder Änderung läuft. Der `agent-eval-harness` vergleicht einen neuen Lauf mit dem letzten guten und beendet den Prozess mit Fehlercode 1, wenn die Qualität sinkt. Das Gate ist bewusst unsymmetrisch: Es schlägt an, wenn ein Wert über die Toleranz hinaus fällt, wenn mehr Fälle abstürzen, wenn ein früher gemessener Wert nicht mehr gemessen wird oder wenn Fälle aus der Suite verschwunden sind. Verbesserungen laufen immer durch. Ein abgestürzter Fall zählt als Fehler und nicht als übersprungen, damit der Lauf nicht schrumpft, um grün zu bleiben.',
      },
      {
        type: 'p',
        text: 'Bei `stromlauf-ai` laufen die Prüfungen für das Einlesen und die Suche bei jeder Änderung und kosten keine Modell-Tokens. Den Lauf mit dem Agenten, der pro Frage Tokens kostet, startet das Projekt wöchentlich mit einem Kostendeckel. Ein Lauf über die 54 verbindlichen Fragen kostete laut Projekt etwa 1,75 US-Dollar.',
      },
      {
        type: 'p',
        text: 'Wie ein solches Testset für Ihren Assistenten aussehen kann, zeigt die [Qualitätsprüfung](/leistungen/qualitaetspruefung.html), die auch im Pilot enthalten ist. Wie die Zahlen eines echten Laufs aussehen, steht in der [Fallstudie](/referenz/stromlauf-ai.html).',
      },
    ],
    sources: [
      { label: 'agent-eval-harness, README (Repository archiviert)', href: 'https://github.com/siinanXD/agent-eval-harness/blob/main/README.md' },
      { label: 'stromlauf-ai, eval/README.md', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/eval/README.md' },
      { label: 'stromlauf-ai, Modellvergleich vom 2026-10-02', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/eval/results/vergleich_2026-10-02.md' },
      { label: 'stromlauf-ai, README: Eval-Zahlen', href: 'https://github.com/siinanXD/stromlauf-ai/blob/master/README.md' },
    ],
    related: [
      { label: 'Leistung: Qualitätsprüfung', href: '/leistungen/qualitaetspruefung.html' },
      { label: 'Artikel: KI für Handbücher in der Instandhaltung', href: '/wissen/ki-fuer-handbuecher-instandhaltung.html' },
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
