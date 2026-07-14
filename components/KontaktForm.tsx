'use client';

import { FormEvent, useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/mojorgeb';

const CHIP_OPTIONS = [
  'Website',
  'KI / Automatisierung',
  'Individuelle Software',
  'E-Mail-Automatisierung',
  'Weiß ich noch nicht',
];
const SITUATION_OPTIONS = ['Neu starten', 'Bestehendes verbessern', 'Etwas Vorhandenes ersetzen'];
const TIMELINE_OPTIONS = ['So schnell wie möglich', 'In 1–3 Monaten', 'Flexibel'];
const BUDGET_OPTIONS = ['Bis 3.000 €', '3.000–10.000 €', 'Über 10.000 €', 'Noch unklar'];

const STEP_HINTS: Record<number, string> = {
  1: 'Dauert insgesamt ca. 2 Minuten',
  2: 'Antippen genügt',
  3: 'Optional – gern überspringen',
  4: 'Fast geschafft',
};

function Pill({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`pill${on ? ' on' : ''}`} onClick={onClick} aria-pressed={on}>
      {label}
    </button>
  );
}

export default function KontaktForm() {
  const [step, setStep] = useState(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [situation, setSituation] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (label: string) =>
    setTopics((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );

  const toggleSingle = (setter: (v: string) => void, current: string) => (label: string) =>
    setter(current === label ? '' : label);

  const summary = [topics.join(', '), situation, timeline, budget].filter(Boolean).join(' · ');

  const reset = () => {
    setStep(1);
    setTopics([]);
    setSituation('');
    setTimeline('');
    setBudget('');
    setName('');
    setEmail('');
    setMsg('');
    setSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || submitted) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          nachricht: msg,
          themen: topics.join(', ') || '–',
          ausgangslage: situation || '–',
          zeitrahmen: timeline || '–',
          budget: budget || '–',
          _subject: 'Neue Projektanfrage über sjcode.de',
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-card" role="status">
        <div className="check" aria-hidden="true">✓</div>
        <h2>Danke für Ihre Anfrage!</h2>
        <p>Ich melde mich innerhalb von 24 Stunden persönlich bei Ihnen.</p>
        <button type="button" onClick={reset}>
          Neue Anfrage
        </button>
      </div>
    );
  }

  return (
    <form className="wizard" onSubmit={handleSubmit}>
      <div className="wizard-progress" aria-live="polite">
        <div className="row">
          <span className="step-label">Schritt {step} von 4</span>
          <span className="hint">{STEP_HINTS[step]}</span>
        </div>
        <div className="track">
          <div className="bar" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <h2>Worum geht es?</h2>
            <p className="field-hint">Mehrfachauswahl möglich – einfach antippen.</p>
          </div>
          <div className="pill-row">
            {CHIP_OPTIONS.map((label) => (
              <Pill
                key={label}
                label={label}
                on={topics.includes(label)}
                onClick={() => toggleTopic(label)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'grid', gap: 22 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gap: 4 }}>
              <h2>Wo stehen Sie gerade?</h2>
              <p className="field-hint">Ihre Ausgangslage – eine Auswahl genügt.</p>
            </div>
            <div className="pill-row">
              {SITUATION_OPTIONS.map((label) => (
                <Pill
                  key={label}
                  label={label}
                  on={situation === label}
                  onClick={() => toggleSingle(setSituation, situation)(label)}
                />
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <h2>Wie eilig ist es?</h2>
            <div className="pill-row">
              {TIMELINE_OPTIONS.map((label) => (
                <Pill
                  key={label}
                  label={label}
                  on={timeline === label}
                  onClick={() => toggleSingle(setTimeline, timeline)(label)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <h2>Gibt es einen Budgetrahmen?</h2>
            <p className="field-hint">
              Keine Festlegung – hilft mir nur, direkt einen passenden Vorschlag zu machen.
            </p>
          </div>
          <div className="pill-row">
            {BUDGET_OPTIONS.map((label) => (
              <Pill
                key={label}
                label={label}
                on={budget === label}
                onClick={() => toggleSingle(setBudget, budget)(label)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ display: 'grid', gap: 18 }}>
          {summary && (
            <div className="summary-box">
              Ihre Auswahl: <strong>{summary}</strong>
            </div>
          )}
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="msg">Kurze Projektbeschreibung</label>
            <textarea
              id="msg"
              required
              rows={4}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Zwei, drei Sätze genügen – was soll entstehen, was nervt heute?"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ihr Name"
              autoComplete="name"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@firma.de"
              autoComplete="email"
            />
          </div>
          <button type="submit" className="submit" disabled={sending}>
            {sending ? 'Wird gesendet …' : 'Anfrage senden'}
          </button>
          {error && (
            <p className="error" role="alert">
              Senden fehlgeschlagen – bitte erneut versuchen oder direkt an{' '}
              <a href="mailto:kontakt@sjcode.de">kontakt@sjcode.de</a> schreiben.
            </p>
          )}
          <p className="privacy-note">
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Beantwortung der
            Anfrage zu. Details in der <a href="/datenschutz.html">Datenschutzerklärung</a>.
          </p>
        </div>
      )}

      <div className="wizard-nav">
        {step > 1 && (
          <button type="button" className="back" onClick={() => setStep((s) => Math.max(1, s - 1))}>
            ← Zurück
          </button>
        )}
        {step < 4 && (
          <button type="button" className="next" onClick={() => setStep((s) => Math.min(4, s + 1))}>
            Weiter →
          </button>
        )}
      </div>
    </form>
  );
}
