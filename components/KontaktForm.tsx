'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/mojorgeb';
const DRAFT_KEY = 'sjcode-form-draft';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [botField, setBotField] = useState(''); // Honeypot – für Menschen unsichtbar
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const didMount = useRef(false);
  const draftLoaded = useRef(false);

  // Entwurf laden (nur die Auswahl, keine persönlichen Daten).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.topics)) setTopics(d.topics);
        if (typeof d.situation === 'string') setSituation(d.situation);
        if (typeof d.timeline === 'string') setTimeline(d.timeline);
        if (typeof d.budget === 'string') setBudget(d.budget);
      }
    } catch {
      /* localStorage evtl. blockiert – dann eben ohne Entwurf */
    }
    draftLoaded.current = true;
  }, []);

  // Entwurf speichern, sobald sich die Auswahl ändert.
  useEffect(() => {
    if (!draftLoaded.current) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ topics, situation, timeline, budget }));
    } catch {
      /* ignorieren */
    }
  }, [topics, situation, timeline, budget]);

  // Beim Schrittwechsel den Fokus auf die neue Überschrift setzen
  // (nicht beim ersten Rendern – sonst würde die Seite unerwartet springen).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignorieren */
    }
  };

  const toggleTopic = (label: string) =>
    setTopics((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );

  const toggleSingle = (setter: (v: string) => void, current: string) => (label: string) =>
    setter(current === label ? '' : label);

  const summary = [topics.join(', '), situation, timeline, budget].filter(Boolean).join(' · ');
  const step1Incomplete = step === 1 && topics.length === 0;

  const reset = () => {
    setStep(1);
    setTopics([]);
    setSituation('');
    setTimeline('');
    setBudget('');
    setName('');
    setEmail('');
    setPhone('');
    setMsg('');
    setEmailError(false);
    setSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || submitted) return;
    // Honeypot: von einem Bot ausgefüllt – still tun, als wäre alles gut.
    if (botField) {
      setSubmitted(true);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setEmailError(true);
      document.getElementById('email')?.focus();
      return;
    }
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          telefon: phone || '–',
          nachricht: msg,
          themen: topics.join(', ') || '–',
          ausgangslage: situation || '–',
          zeitrahmen: timeline || '–',
          budget: budget || '–',
          _subject: 'Neue Projektanfrage über sjcode.de',
        }),
      });
      if (!res.ok) throw new Error('send failed');
      clearDraft();
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
      {/* Honeypot gegen Spam-Bots – für Menschen ausgeblendet, nicht fokussierbar. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company-website">Bitte dieses Feld leer lassen</label>
        <input
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

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
            <h2 ref={headingRef} tabIndex={-1}>Worum geht es?</h2>
            <p className="field-hint">Mehrfachauswahl möglich – bitte mindestens eine Option antippen.</p>
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
              <h2 ref={headingRef} tabIndex={-1}>Wo stehen Sie gerade?</h2>
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
            <h2 ref={headingRef} tabIndex={-1}>Gibt es einen Budgetrahmen?</h2>
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
          <h2 ref={headingRef} tabIndex={-1} className="sr-only">Ihre Kontaktdaten</h2>
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
              }}
              placeholder="name@firma.de"
              autoComplete="email"
              aria-invalid={emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
            {emailError && (
              <p id="email-error" className="field-error" role="alert">
                Bitte eine gültige E-Mail-Adresse eingeben (z. B. name@firma.de).
              </p>
            )}
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="phone">
              Telefon <span className="label-optional">(optional, falls Rückruf gewünscht)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Für einen kurzen Rückruf"
              autoComplete="tel"
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
          <button
            type="button"
            className="next"
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            disabled={step1Incomplete}
            title={step1Incomplete ? 'Bitte mindestens eine Option wählen' : undefined}
          >
            Weiter →
          </button>
        )}
      </div>
    </form>
  );
}
