/**
 * Leistungen – eine Datenquelle für Startseite, Leistungsübersicht,
 * die vier Detailseiten, Footer, Sitemap und das JSON-LD.
 *
 * Neue Leistung? Einen Block ergänzen – Seite, Navigation und Schema
 * entstehen automatisch.
 */

export type Faq = { q: string; a: string };

export type Service = {
  /** URL-Segment: /leistungen/<slug>.html */
  slug: string;
  num: string;
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
  /** Primärer Call-to-Action auf der Detailseite */
  cta: string;
  /** Thema, das im Kontaktformular vorausgewählt wird */
  formTopic: string;
  facts: { label: string; value: string }[];
  problems: { title: string; before: string; after: string }[];
  includes: { title: string; text: string }[];
  process: { title: string; text: string }[];
  priceFrom: string;
  priceNote: string;
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: 'webseiten',
    num: '01',
    title: 'Webseiten-Entwicklung',
    serviceType: 'Webentwicklung',
    seoTitle: 'Webseiten-Entwicklung für Handwerk & KMU – Festpreis, schnell, gefunden werden',
    metaDescription:
      'Professionelle Website zum Festpreis ab 1.900 €: schnell, mobil-optimiert, für Google gebaut. Für Handwerksbetriebe, Dienstleister und Selbständige in Euskirchen, Köln und deutschlandweit.',
    teaser:
      'Moderne, schnelle Websites mit React und Next.js – gefunden werden, überzeugen, selbst pflegen.',
    headline: 'Eine Website, die Anfragen bringt – nicht nur gut aussieht.',
    lede:
      'Schnell, mobil-optimiert und für Google gebaut: Ich entwickle Websites zum Festpreis, die Ihre Leistungen klar zeigen und Besucher zu Anfragen machen. Ohne Baukasten-Kompromisse, mit sauberer Übergabe.',
    cta: 'Website anfragen',
    formTopic: 'Website',
    facts: [
      { label: 'Preis', value: 'Festpreis ab 1.900 € (netto)' },
      { label: 'Dauer', value: '2–4 Wochen bis zum Livegang' },
      { label: 'Technik', value: 'React / Next.js, statisch gehostet, Lighthouse > 90' },
      { label: 'Inklusive', value: 'SEO-Grundlagen, Impressum & Datenschutz, Einweisung' },
    ],
    problems: [
      {
        title: 'Keiner findet Sie',
        before: 'Eine Baukasten-Seite von 2016 – oder gar kein Auftritt. Kunden landen beim Wettbewerb.',
        after: 'Eigene Leistungsseiten, strukturierte Daten und schnelle Ladezeiten: Google zeigt Sie für Ihre Leistungen in Ihrer Region.',
      },
      {
        title: 'Besucher springen ab',
        before: 'Langsam auf dem Handy, unklar, was Sie anbieten, Kontakt versteckt im Impressum.',
        after: 'Klare Botschaft in drei Sekunden, Bewertungen sichtbar, Anfrage in zwei Minuten – auch unterwegs.',
      },
      {
        title: 'Jede Änderung kostet',
        before: 'Für einen neuen Preis oder ein Foto muss die Agentur ran – Wochen später, gegen Rechnung.',
        after: 'Texte und Bilder pflegen Sie selbst, die Technik läuft wartungsarm. Sie bekommen alle Zugänge.',
      },
    ],
    includes: [
      { title: 'Konzept & Struktur', text: 'Welche Seiten brauchen Sie wirklich? Wir planen Aufbau und Inhalte anhand Ihrer Kunden.' },
      { title: 'Design & Umsetzung', text: 'Individuelles Design in Figma, umgesetzt mit React/Next.js – kein Template, keine Baukasten-Grenzen.' },
      { title: 'Suchmaschinenoptimierung', text: 'Meta-Tags, semantisches HTML, strukturierte Daten, Sitemap, Google-Unternehmensprofil-Anbindung.' },
      { title: 'Mobil & barrierearm', text: 'Mobile-first, Tastaturbedienung, Kontraste geprüft – Lighthouse-Werte über 90.' },
      { title: 'Rechtssicherheit', text: 'Impressum, Datenschutzerklärung, Cookie-Hinweis, datenschutzfreundliche Statistik ohne Cookies.' },
      { title: 'Übergabe & Einweisung', text: 'Hosting, Domain, Zugänge – alles gehört Ihnen. Kurze Einweisung zur Selbstpflege inklusive.' },
    ],
    process: [
      { title: 'Erstgespräch', text: 'Wir klären Ziel, Zielgruppe und Umfang. Sie bekommen ein Festpreis-Angebot.' },
      { title: 'Design-Entwurf', text: 'Sie sehen Startseite und eine Unterseite als Entwurf in Figma und geben Feedback.' },
      { title: 'Umsetzung', text: 'Entwicklung, Texte, Bilder, SEO. Zwischenstände unter einer Vorschau-Adresse.' },
      { title: 'Livegang', text: 'Domain umziehen, Google informieren, Einweisung. Danach optional Betreuung.' },
    ],
    priceFrom: 'ab 1.900 €',
    priceNote: 'Website Starter (Onepager oder bis 5 Seiten). Website Business mit Leistungsseiten, Blog und Betreuung ab 3.900 €.',
    faqs: [
      { q: 'Was kostet eine Website?', a: 'Website Starter (Onepager oder bis 5 Seiten) ab 1.900 € netto, Website Business (bis 10 Seiten, Leistungsseiten, Blog, Betreuung) ab 3.900 €. Sie bekommen vorab einen Festpreis – keine Überraschungen.' },
      { q: 'Wie lange dauert es bis zum Livegang?', a: 'Kleine Websites sind in zwei bis vier Wochen online, vorausgesetzt Texte und Bilder liegen vor. Ich helfe bei beidem.' },
      { q: 'Kann ich die Seite später selbst pflegen?', a: 'Ja. Texte und Bilder ändern Sie selbst, ich zeige Ihnen wie. Für größere Änderungen gibt es die Betreuung ab 89 € im Monat oder Einzelaufträge.' },
      { q: 'Was ist mit Hosting und Domain?', a: 'Beides läuft auf Ihren Namen. Statisches Hosting kostet in der Regel 0 bis 15 € im Monat – Sie bleiben unabhängig von mir.' },
      { q: 'Brauche ich eine neue Website oder reicht eine Überarbeitung?', a: 'Das prüfe ich im kostenlosen Erstgespräch ehrlich. Manchmal reicht eine Überarbeitung – dann sage ich das auch.' },
    ],
  },
  {
    slug: 'ki-automatisierung',
    num: '02',
    title: 'KI-Automatisierung',
    serviceType: 'KI-Entwicklung & Automatisierung',
    seoTitle: 'KI-Automatisierung für kleine Betriebe – E-Mails, Belege, Anfragen automatisch verarbeiten',
    metaDescription:
      'KI-Automatisierung für Handwerk, Dienstleister und KMU: E-Mails sortieren, Belege erfassen, Anfragen beantworten – mit Ihrer Freigabe. Kostenlose Prozess-Analyse, Festpreis-Angebot, DSGVO-konform.',
    teaser:
      'E-Mail-Verarbeitung mit LLMs, Assistenten auf Ihren Daten, Workflow-Automatisierung – produktionsreif statt Experiment.',
    headline: 'KI-Automatisierung für Ihren Betrieb – produktionsreif statt Experiment.',
    lede:
      'Wiederkehrende Arbeit wie E-Mails sortieren, Belege erfassen oder Anfragen beantworten übernimmt ein KI-Workflow – mit Ihrer Freigabe an der entscheidenden Stelle. Getestet, dokumentiert, DSGVO-konform.',
    cta: 'Kostenlose Prozess-Analyse',
    formTopic: 'KI / Automatisierung',
    facts: [
      { label: 'Preis', value: 'ab 2.500 € (netto) – Festpreis nach Prozess-Analyse' },
      { label: 'Dauer', value: '2–8 Wochen je nach Umfang' },
      { label: 'Start', value: 'Kostenlose Prozess-Analyse, 30 Minuten' },
      { label: 'Technik', value: 'LLMs (OpenAI u. a.), LangGraph, RAG, API-Anbindung' },
      { label: 'Sicherheit', value: 'Human-in-the-Loop, Prompt-Injection-Härtung, Nachvollziehbarkeit' },
    ],
    problems: [
      {
        title: 'Das volle Postfach',
        before: '45 Minuten täglich Mails sortieren – wichtige Anfragen gehen zwischen Werbung und Rechnungen unter.',
        after: 'Anfragen, Aufträge und Belege sind automatisch vorsortiert, für Standardfragen liegt ein Antwortentwurf bereit. Sie geben nur noch frei.',
      },
      {
        title: 'Belege fürs Steuerbüro',
        before: 'Am Monatsende Rechnungen aus Mails, Downloads und Handyfotos zusammensuchen.',
        after: 'Belege werden automatisch erkannt, einheitlich benannt und gebündelt ans Steuerbüro übergeben.',
      },
      {
        title: 'Wissen steckt in Köpfen',
        before: 'Neue Mitarbeiter fragen dreimal täglich nach Preislisten, Abläufen und alten Angeboten.',
        after: 'Ein interner Assistent beantwortet Fragen direkt aus Ihren eigenen Unterlagen – sofort, rund um die Uhr.',
      },
    ],
    includes: [
      { title: 'Prozess-Analyse', text: 'Wir schauen uns den Ablauf an und prüfen ehrlich, ob und wo sich Automatisierung lohnt.' },
      { title: 'E-Mail-Verarbeitung', text: 'Klassifikation, Datenextraktion, Antwortentwürfe – für Microsoft 365, Gmail und IMAP.' },
      { title: 'Assistenten auf Ihren Daten', text: 'RAG-Systeme und Chatbots, die aus Ihren Dokumenten, Preislisten und Abläufen antworten.' },
      { title: 'Workflow-Automatisierung', text: 'Anbindung an Ihre Werkzeuge per API – CRM, Buchhaltung, Kalender, Ticketsystem.' },
      { title: 'Human-in-the-Loop', text: 'Nichts geht ohne Ihre Freigabe raus. Jede KI-Entscheidung ist einsehbar und nachvollziehbar.' },
      { title: 'Übergabe & Betreuung', text: 'Dokumentation, Einweisung, Tests – optional laufende Betreuung und Weiterentwicklung.' },
    ],
    process: [
      { title: 'Prozess-Analyse', text: '30 Minuten: Welcher Ablauf kostet am meisten Zeit? Was ist realistisch automatisierbar?' },
      { title: 'Festpreis-Angebot', text: 'Klar umrissener Umfang, klare Kosten. Sie entscheiden ohne Risiko.' },
      { title: 'Umsetzung & Tests', text: 'Iterative Entwicklung mit echten Beispielen aus Ihrem Alltag, automatisierte Tests.' },
      { title: 'Betrieb & Freigabe', text: 'Sie behalten die Kontrolle – die Automatisierung arbeitet vor, Sie geben frei.' },
    ],
    priceFrom: 'ab 2.500 €',
    priceNote: 'Nach der kostenlosen Prozess-Analyse erhalten Sie ein Festpreis-Angebot. Kleine Automatisierungen starten bei 2.500 €, komplexere Plattformen werden individuell kalkuliert.',
    faqs: [
      { q: 'Sind meine Daten bei KI-Lösungen sicher?', a: 'Ja. E-Mail-Inhalte werden strikt als Daten behandelt, nie als Anweisung an das Modell (Prompt-Injection-Härtung). Es werden nur die nötigen Daten verarbeitet, auf Wunsch mit EU-Hosting. Nichts geht ohne Ihre Freigabe raus.' },
      { q: 'Was kostet eine Automatisierung?', a: 'Kleine Automatisierungen starten bei 2.500 € netto. Nach der kostenlosen Prozess-Analyse bekommen Sie ein Festpreis-Angebot – so wissen Sie vorher, was es kostet.' },
      { q: 'Brauche ich technisches Wissen?', a: 'Nein. Sie beschreiben Ihren Ablauf, ich übersetze ihn in Technik. Die Bedienung ist so einfach wie ein Postfach: prüfen, freigeben, fertig.' },
      { q: 'Kann die KI Fehler machen?', a: 'Ja, deshalb entscheidet am Ende immer ein Mensch. Die KI bereitet vor, Sie geben frei. Jede Entscheidung ist protokolliert und nachvollziehbar.' },
      { q: 'Wie schnell rechnet sich das?', a: 'Beispiel: 45 Minuten Mail-Sortierung pro Tag sind rund 15 Stunden im Monat. Eine Automatisierung für 3.000 € hat sich damit oft nach wenigen Monaten bezahlt gemacht.' },
    ],
  },
  {
    slug: 'individuelle-software',
    num: '03',
    title: 'Individuelle Software',
    serviceType: 'Individualsoftware',
    seoTitle: 'Individuelle Software für kleine Unternehmen – Tools, interne Apps, API-Integrationen',
    metaDescription:
      'Individuelle Softwarelösungen für kleine und mittlere Betriebe: Tools, interne Apps und API-Integrationen, die genau Ihre Lücke schließen. Nach Aufwand oder Festpreis, mit Tests und Dokumentation.',
    teaser:
      'Kleine Tools, interne Apps und API-Integrationen – genau für Ihre Abläufe, wo Standardsoftware nicht passt.',
    headline: 'Software, die genau Ihre Lücke schließt.',
    lede:
      'Wo Standardsoftware nicht passt, baue ich kleine, präzise Werkzeuge: Angebotsgeneratoren, interne Apps, Schnittstellen zwischen Ihren Systemen. Kein Overhead, keine Lizenzfalle – ein Werkzeug, das Ihnen gehört.',
    cta: 'Projekt anfragen',
    formTopic: 'Individuelle Software',
    facts: [
      { label: 'Preis', value: 'Festpreis oder 95 €/Stunde – nach Erstgespräch' },
      { label: 'Dauer', value: '1–6 Wochen je nach Umfang' },
      { label: 'Technik', value: 'Python, TypeScript, React, REST-APIs, Datenbanken' },
      { label: 'Inklusive', value: 'Tests, Dokumentation, Quellcode, Übergabe' },
    ],
    problems: [
      {
        title: 'Angebote am Feierabend',
        before: 'Nach der Baustelle Aufmaße abtippen und Angebote in Word zusammenbauen – der Kunde wartet tagelang.',
        after: 'Eckdaten eingeben, fertiges Angebot als PDF im eigenen Design – noch am selben Tag beim Kunden.',
      },
      {
        title: 'Excel am Limit',
        before: 'Die eine Tabelle, die alles steuert – und die nur eine Person versteht.',
        after: 'Eine kleine interne App mit klaren Eingaben, Rechten und Auswertungen, die das ganze Team nutzt.',
      },
      {
        title: 'Systeme reden nicht miteinander',
        before: 'Daten aus dem Shop von Hand in die Buchhaltung, Termine doppelt gepflegt.',
        after: 'Eine Schnittstelle überträgt automatisch – einmal eingeben, überall aktuell.',
      },
    ],
    includes: [
      { title: 'Anforderungen klären', text: 'Wir schauen auf den Ablauf, nicht auf Features. Was muss das Werkzeug wirklich können?' },
      { title: 'Kleine Tools & Skripte', text: 'Angebots- und Rechnungsgeneratoren, Import/Export, Berichte – schnell umgesetzt, sofort nützlich.' },
      { title: 'Interne Apps', text: 'Web-Anwendungen für Ihr Team: Einsatzplanung, Lagerlisten, Checklisten, Kundenübersichten.' },
      { title: 'API-Integrationen', text: 'Verbindungen zwischen Shop, CRM, Buchhaltung, Kalender oder Branchensoftware.' },
      { title: 'Qualität', text: 'Automatisierte Tests, saubere Struktur, Dokumentation – wartbar auch durch Dritte.' },
      { title: 'Ihr Eigentum', text: 'Sie erhalten den Quellcode und alle Zugänge. Keine Abhängigkeit, keine versteckten Lizenzen.' },
    ],
    process: [
      { title: 'Erstgespräch', text: 'Problem verstehen, Lösung skizzieren, Aufwand ehrlich einschätzen.' },
      { title: 'Angebot', text: 'Festpreis für klar umrissene Tools, nach Aufwand für offene Entwicklungen.' },
      { title: 'Umsetzung', text: 'Kurze Iterationen, früh nutzbare Zwischenstände, Ihr Feedback fließt direkt ein.' },
      { title: 'Übergabe', text: 'Einweisung, Dokumentation, Quellcode – und auf Wunsch Betreuung.' },
    ],
    priceFrom: 'ab 1.500 €',
    priceNote: 'Kleine Tools und Skripte starten bei 1.500 € netto. Umfangreichere Anwendungen kalkuliere ich nach Aufwand (95 €/Stunde) oder als Festpreis.',
    faqs: [
      { q: 'Wann lohnt sich individuelle Software?', a: 'Wenn Sie regelmäßig Zeit mit Umwegen verlieren, weil Standardsoftware nicht zu Ihrem Ablauf passt – oder wenn Sie für eine Funktion eine teure Suite mieten. Das prüfen wir im Erstgespräch.' },
      { q: 'Wem gehört der Code?', a: 'Ihnen. Sie bekommen den vollständigen Quellcode, die Dokumentation und alle Zugänge.' },
      { q: 'Was ist, wenn ich später etwas ändern möchte?', a: 'Kleine Änderungen erledige ich nach Aufwand oder im Rahmen der Betreuung. Durch Tests und Dokumentation kann auch jeder andere Entwickler weiterarbeiten.' },
      { q: 'Wie läuft die Zusammenarbeit remote?', a: 'Video-Termine, ein gemeinsamer Chat-Kanal und Vorschau-Adressen für Zwischenstände. Persönliche Treffen in der Region Euskirchen/Köln nach Absprache.' },
    ],
  },
  {
    slug: 'email-automatisierung',
    num: '04',
    title: 'E-Mail-Automatisierung',
    serviceType: 'E-Mail-Automatisierung',
    seoTitle: 'E-Mail-Automatisierung mit KI – Postfach sortieren, Antwortentwürfe, Freigabe durch Sie',
    metaDescription:
      'E-Mail- und Postfach-Automatisierung mit KI: eingehende Mails automatisch sortieren, Anfragen erkennen, Antwortentwürfe erstellen – versendet wird nur nach Ihrer Freigabe. Microsoft 365, Gmail, IMAP.',
    teaser:
      'Intelligente Sortierung und Antwortentwürfe – Sie geben frei, nichts geht automatisch raus.',
    headline: 'Ihr Postfach arbeitet vor – Sie behalten die Kontrolle.',
    lede:
      'Eingehende Mails werden automatisch erkannt, sortiert und mit einem passenden Antwortentwurf versehen. Sie prüfen, geben frei, fertig. Kein Versand ohne Ihr Okay – so läuft es heute bereits produktiv für Betriebe mit hohem Mail-Aufkommen.',
    cta: 'Postfach-Analyse anfragen',
    formTopic: 'E-Mail-Automatisierung',
    facts: [
      { label: 'Preis', value: 'ab 2.500 € (netto) – Festpreis nach Postfach-Analyse' },
      { label: 'Dauer', value: '2–6 Wochen' },
      { label: 'Postfächer', value: 'Microsoft 365, Gmail, IMAP – auch mehrere Konten' },
      { label: 'Referenz', value: 'Booking Email Check – läuft produktiv, 276+ Tests' },
      { label: 'Sicherheit', value: 'Kein Versand ohne Freigabe, Prompt-Injection-Härtung' },
    ],
    problems: [
      {
        title: 'Anfragen gehen unter',
        before: 'Zwischen Newslettern, Rechnungen und Spam übersehen Sie die Buchung, die Geld bringt.',
        after: 'Anfragen werden erkannt und nach Dringlichkeit sortiert – die wichtige Mail steht oben.',
      },
      {
        title: 'Immer dieselben Antworten',
        before: 'Öffnungszeiten, Preise, Verfügbarkeit – jeden Tag dieselben Sätze tippen.',
        after: 'Ein passender Antwortentwurf liegt bereit. Sie lesen, passen an, klicken auf Freigeben.',
      },
      {
        title: 'Daten abtippen',
        before: 'Name, Datum, Personenzahl aus der Mail ins System übertragen – fehleranfällig und langsam.',
        after: 'Die Daten werden automatisch extrahiert und strukturiert übergeben – ohne Abtippen.',
      },
    ],
    includes: [
      { title: 'Postfach-Analyse', text: 'Welche Mail-Arten kommen wie oft? Was lässt sich vorbereiten, was braucht Sie persönlich?' },
      { title: 'Klassifikation', text: 'Anfrage, Buchung, Storno, Rechnung, Werbung – jede Mail landet in der richtigen Schublade.' },
      { title: 'Datenextraktion', text: 'Namen, Termine, Beträge und Anliegen werden strukturiert erkannt und weitergegeben.' },
      { title: 'Antwortentwürfe', text: 'In Ihrem Ton, mit Ihren Regeln. Kein Versand ohne Ihre Freigabe – ohne Ausnahme.' },
      { title: 'Multi-Account', text: 'Mehrere Postfächer und Mandanten sauber getrennt in einer Oberfläche.' },
      { title: 'Nachvollziehbarkeit', text: 'Jede KI-Entscheidung ist einsehbar. Automatisierte Tests sichern jede Änderung ab.' },
    ],
    process: [
      { title: 'Postfach-Analyse', text: '30 Minuten kostenlos: Wir schauen uns Ihr Mail-Aufkommen und die häufigsten Anliegen an.' },
      { title: 'Festpreis-Angebot', text: 'Sie wissen vorher, was es kostet und was die Automatisierung kann.' },
      { title: 'Einrichtung & Test', text: 'Anbindung des Postfachs, Regeln in Ihrem Ton, Testlauf mit echten Mails.' },
      { title: 'Freigabe-Betrieb', text: 'Sie prüfen und geben frei. Ich betreue auf Wunsch weiter.' },
    ],
    priceFrom: 'ab 2.500 €',
    priceNote: 'Einrichtung ab 2.500 € netto nach kostenloser Postfach-Analyse. Laufende Kosten für KI-Modelle liegen je nach Aufkommen meist bei 10 bis 50 € im Monat.',
    faqs: [
      { q: 'Werden E-Mails automatisch verschickt?', a: 'Nein. Die Automatisierung erstellt Entwürfe und sortiert vor. Versendet wird ausschließlich, wenn Sie oder Ihr Team freigeben.' },
      { q: 'Funktioniert das mit meinem Postfach?', a: 'Ja – Microsoft 365, Gmail/Google Workspace und jedes IMAP-Postfach, auch mehrere Konten gleichzeitig.' },
      { q: 'Was passiert mit den Mail-Inhalten?', a: 'Sie werden nur zur Klassifikation und zum Entwurf verarbeitet und strikt als Daten behandelt, nie als Anweisung an das Modell. Details regeln wir in einem Auftragsverarbeitungsvertrag.' },
      { q: 'Wie schnell ist der Antwortentwurf da?', a: 'In der Regel innerhalb weniger Sekunden nach Eingang der Mail.' },
    ],
  },
];

export const serviceUrl = (s: Service) => `/leistungen/${s.slug}.html`;

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
