/**
 * Automatisierungs-Check – sechs Fragen, eine Minute, Ergebnis: geschätzte
 * Zeitersparnis pro Monat und passende Empfehlung. Läuft komplett im Browser,
 * kostet keinen API-Aufruf. Zahlen sind bewusst konservativ.
 */

export type Option = { label: string; minutes?: number; factor?: number; rate?: number };
export type Question = {
  id: 'mails' | 'antworten' | 'belege' | 'angebote' | 'team' | 'stundensatz';
  q: string;
  hint?: string;
  /** Welche Leistung profitiert, wenn hier viel Zeit anfällt */
  topic?: 'E-Mail-Automatisierung' | 'KI / Automatisierung' | 'Individuelle Software';
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: 'mails',
    q: 'Wie viele E-Mails bearbeiten Sie an einem normalen Tag?',
    hint: 'Lesen, sortieren, weiterleiten, ablegen – alles zusammen.',
    topic: 'E-Mail-Automatisierung',
    options: [
      { label: 'Unter 10', minutes: 10 },
      { label: '10 bis 30', minutes: 30 },
      { label: '30 bis 80', minutes: 60 },
      { label: 'Über 80', minutes: 120 },
    ],
  },
  {
    id: 'antworten',
    q: 'Wie oft schreiben Sie sinngemäß dieselbe Antwort?',
    hint: 'Öffnungszeiten, Preise, Verfügbarkeit, Terminbestätigung …',
    topic: 'E-Mail-Automatisierung',
    options: [
      { label: 'Selten', minutes: 0 },
      { label: 'Ein paar Mal pro Woche', minutes: 10 },
      { label: 'Täglich', minutes: 25 },
      { label: 'Mehrmals täglich', minutes: 45 },
    ],
  },
  {
    id: 'belege',
    q: 'Wie landen Rechnungen und Belege beim Steuerbüro?',
    topic: 'KI / Automatisierung',
    options: [
      { label: 'Automatisch per Software', minutes: 0 },
      { label: 'Ich lade sie regelmäßig hoch', minutes: 8 },
      { label: 'Ich sammle sie am Monatsende zusammen', minutes: 20 },
      { label: 'Schuhkarton, ehrlich gesagt', minutes: 30 },
    ],
  },
  {
    id: 'angebote',
    q: 'Wie entstehen Angebote, Bestätigungen oder Termine?',
    topic: 'Individuelle Software',
    options: [
      { label: 'Automatisch aus dem System', minutes: 0 },
      { label: 'Aus einer Vorlage', minutes: 10 },
      { label: 'Jedes Mal von Hand', minutes: 30 },
      { label: 'Dauert oft Tage', minutes: 45 },
    ],
  },
  {
    id: 'team',
    q: 'Wie viele Personen machen diese Arbeit bei Ihnen?',
    options: [
      { label: 'Nur ich', factor: 1 },
      { label: '2 bis 3', factor: 2 },
      { label: '4 oder mehr', factor: 3.5 },
    ],
  },
  {
    id: 'stundensatz',
    q: 'Was ist eine Stunde dieser Arbeit ungefähr wert?',
    hint: 'Ihr Stundensatz oder der Ihrer Mitarbeiter – grobe Schätzung reicht.',
    options: [
      { label: '40 €', rate: 40 },
      { label: '60 €', rate: 60 },
      { label: '90 €', rate: 90 },
      { label: '120 €', rate: 120 },
    ],
  },
];

/** Anteil der Handarbeit, der sich erfahrungsgemäß automatisieren lässt – konservativ. */
const AUTOMATABLE_SHARE = 0.6;
const WORKDAYS_PER_MONTH = 21;

export type CheckResult = {
  hoursPerMonth: number;
  hoursSaved: number;
  euroSaved: number;
  /** 'hoch' | 'mittel' | 'niedrig' */
  potential: 'hoch' | 'mittel' | 'niedrig';
  topic: NonNullable<Question['topic']>;
  topicReason: string;
  summary: string;
};

export function evaluate(answers: Record<string, number>): CheckResult {
  let minutesPerDay = 0;
  let factor = 1;
  let rate = 60;
  const byTopic: Record<string, number> = {};
  for (const q of QUESTIONS) {
    const opt = q.options[answers[q.id]];
    if (!opt) continue;
    if (opt.minutes !== undefined) {
      minutesPerDay += opt.minutes;
      if (q.topic) byTopic[q.topic] = (byTopic[q.topic] ?? 0) + opt.minutes;
    }
    if (opt.factor !== undefined) factor = opt.factor;
    if (opt.rate !== undefined) rate = opt.rate;
  }
  const hoursPerMonth = Math.round((minutesPerDay * WORKDAYS_PER_MONTH * factor) / 60);
  const hoursSaved = Math.round(hoursPerMonth * AUTOMATABLE_SHARE);
  const euroSaved = Math.round((hoursSaved * rate) / 10) * 10;

  const topic = (Object.entries(byTopic).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    'KI / Automatisierung') as CheckResult['topic'];
  const reasons: Record<CheckResult['topic'], string> = {
    'E-Mail-Automatisierung':
      'Der größte Zeitfresser ist Ihr Postfach. Sortierung und Antwortentwürfe mit Freigabe bringen hier am schnellsten Entlastung.',
    'KI / Automatisierung':
      'Belege und wiederkehrende Abläufe kosten Sie am meisten. Eine Automatisierung, die erkennt, benennt und weitergibt, lohnt sich hier zuerst.',
    'Individuelle Software':
      'Angebote und Bestätigungen von Hand sind Ihr größter Hebel. Ein kleines Werkzeug, das aus Eckdaten fertige Dokumente macht, spart hier am meisten.',
  };

  const potential: CheckResult['potential'] = hoursSaved >= 15 ? 'hoch' : hoursSaved >= 6 ? 'mittel' : 'niedrig';
  const summary =
    potential === 'niedrig'
      ? 'Ehrlich gesagt: Bei Ihnen ist der Hebel klein. Eine Automatisierung lohnt sich erst, wenn das Aufkommen wächst – ich sage Ihnen das im Gespräch genauso.'
      : potential === 'mittel'
        ? 'Das lohnt sich, wenn wir den Umfang klein halten: ein Ablauf, ein Postfach, vier Wochen. Genau dafür ist der Pilot ab 2.500 € gedacht.'
        : 'Das ist ein klarer Fall. Eine Automatisierung hat sich bei diesem Aufwand meist nach wenigen Monaten bezahlt gemacht.';

  return { hoursPerMonth, hoursSaved, euroSaved, potential, topic, topicReason: reasons[topic], summary };
}
