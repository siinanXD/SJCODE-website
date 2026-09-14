'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { QUESTIONS, evaluate, type CheckResult } from '@/lib/automationCheck';
import { SITE } from '@/lib/site';

const FORM_ENDPOINT = 'https://formspree.io/f/mojorgeb';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const track = (name: string, data?: object) => {
  try {
    (window as unknown as { umami?: { track: (n: string, d?: object) => void } }).umami?.track(name, data);
  } catch {
    /* Tracking blockiert – egal */
  }
};

/**
 * Sechs Fragen, eine Minute: Wie viel Zeit steckt in Handarbeit, und was
 * wäre automatisierbar? Am Ende: Ergebnis, Empfehlung, optional per Mail
 * (Lead) und der Weg zur Prozess-Analyse.
 */
export default function AutomationCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CheckResult | null>(null);
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step, result]);

  const q = QUESTIONS[step];
  const total = QUESTIONS.length;

  const choose = (i: number) => {
    const next = { ...answers, [q.id]: i };
    setAnswers(next);
    if (step === 0) track('check-start');
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      const r = evaluate(next);
      setResult(r);
      track('check-ergebnis', { potential: r.potential, topic: r.topic });
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setSent(false);
    setError(null);
  };

  const sendResult = async (e: FormEvent) => {
    e.preventDefault();
    if (!result || sending) return;
    if (botField) {
      setSent(true);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          ergebnis: `${result.hoursSaved} h/Monat (${result.euroSaved} €), Potenzial ${result.potential}, Empfehlung ${result.topic}`,
          antworten: QUESTIONS.map((qq) => `${qq.q} → ${qq.options[answers[qq.id]]?.label ?? '–'}`).join(' | '),
          _subject: 'Automatisierungs-Check: Ergebnis angefordert',
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setSent(true);
      track('check-lead');
    } catch {
      setError('Senden fehlgeschlagen – bitte erneut versuchen oder direkt anfragen.');
    } finally {
      setSending(false);
    }
  };

  if (result) {
    const contactHref = `/kontakt.html?thema=${encodeURIComponent(result.topic)}`;
    return (
      <div className="wizard check" role="region" aria-label="Ihr Ergebnis">
        <p className="eyebrow" style={{ margin: 0 }}>
          Ihr Ergebnis
        </p>
        <h2 ref={headingRef} tabIndex={-1}>
          Rund {result.hoursPerMonth} Stunden Handarbeit im Monat.
        </h2>
        <div className="check-stats">
          <div>
            <strong>{result.hoursSaved} h</strong>
            <small>pro Monat automatisierbar</small>
          </div>
          <div>
            <strong>≈ {result.euroSaved.toLocaleString('de-DE')} €</strong>
            <small>Zeitwert pro Monat</small>
          </div>
          <div>
            <strong className={`potential-${result.potential}`}>
              {result.potential === 'hoch' ? 'Hoch' : result.potential === 'mittel' ? 'Mittel' : 'Gering'}
            </strong>
            <small>Automatisierungs-Potenzial</small>
          </div>
        </div>
        <p className="check-text">{result.summary}</p>
        <div className="check-reco">
          <strong>Empfehlung: {result.topic}</strong>
          <p>{result.topicReason}</p>
        </div>
        <p className="field-hint">
          Konservative Schätzung: 60 % der Handarbeit gelten als automatisierbar, 21 Arbeitstage pro
          Monat. Die genaue Zahl ergibt die kostenlose Prozess-Analyse.
        </p>
        <div className="actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a href={contactHref} className="btn btn-primary" data-umami-event="projekt-anfragen" data-umami-event-ort="check">
            Kostenlose Prozess-Analyse
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-umami-event="whatsapp" data-umami-event-ort="check">
            Per WhatsApp fragen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </div>

        {sent ? (
          <p className="check-sent" role="status">
            ✓ Danke – das Ergebnis ist unterwegs. Ich melde mich mit zwei, drei konkreten Ideen dazu.
          </p>
        ) : (
          <form className="check-mail" onSubmit={sendResult}>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="check-company">Bitte leer lassen</label>
              <input id="check-company" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
            </div>
            <label htmlFor="check-email">Ergebnis per E-Mail erhalten (optional)</label>
            <div className="check-mail-row">
              <input
                id="check-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@firma.de"
                autoComplete="email"
                aria-invalid={!!error}
              />
              <button type="submit" className="btn btn-outline" disabled={sending}>
                {sending ? 'Sende …' : 'Zusenden'}
              </button>
            </div>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <p className="privacy-note">
              Kein Newsletter. Ihre Adresse nutze ich nur, um Ihnen das Ergebnis und eine kurze
              Einschätzung zu schicken. <a href="/datenschutz.html">Datenschutz</a>
            </p>
          </form>
        )}
        <button type="button" className="rv-more" onClick={restart}>
          Check neu starten
        </button>
      </div>
    );
  }

  return (
    <div className="wizard check" role="region" aria-label="Automatisierungs-Check">
      <div className="wizard-progress" aria-live="polite">
        <div className="row">
          <span className="step-label">
            Frage {step + 1} von {total}
          </span>
          <span className="hint">Dauert etwa eine Minute</span>
        </div>
        <div className="track">
          <div className="bar" style={{ width: `${(step / total) * 100}%` }} />
        </div>
      </div>
      <div style={{ display: 'grid', gap: 4 }}>
        <h2 ref={headingRef} tabIndex={-1}>
          {q.q}
        </h2>
        {q.hint && <p className="field-hint">{q.hint}</p>}
      </div>
      <div className="pill-row">
        {q.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            className={`pill${answers[q.id] === i ? ' on' : ''}`}
            onClick={() => choose(i)}
            aria-pressed={answers[q.id] === i}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="wizard-nav">
        {step > 0 && (
          <button type="button" className="back" onClick={() => setStep(step - 1)}>
            ← Zurück
          </button>
        )}
      </div>
    </div>
  );
}
