'use client';

import { useState } from 'react';
import { DEMO_LIMITS, EXAMPLES, type EmailCheckResult } from '@/lib/emailCheck';
import { SITE } from '@/lib/site';

const ENDPOINT = '/api/email-check';

/**
 * Live-Demo: Besucher fügt einen Mail-Text ein, die KI ordnet ein, zieht Daten
 * heraus und schreibt einen Antwortentwurf. Beispiele zeigen vorberechnete
 * Ergebnisse (kein API-Aufruf); eigener Text läuft live mit Tageslimit.
 */
export default function EmailDemo() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<EmailCheckResult | null>(null);
  const [source, setSource] = useState<'beispiel' | 'live' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  const showExample = (i: number) => {
    const ex = EXAMPLES[i];
    setText(ex.text);
    setResult(ex.result);
    setSource('beispiel');
    setError(null);
  };

  const run = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as { result?: EmailCheckResult; error?: string; remaining?: number };
      if (typeof data.remaining === 'number') setRemaining(data.remaining);
      if (!res.ok || !data.result) {
        setError(data.error || 'Die Auswertung ist fehlgeschlagen.');
        setResult(null);
        setSource(null);
      } else {
        setResult(data.result);
        setSource('live');
        try {
          (window as unknown as { umami?: { track: (n: string) => void } }).umami?.track('demo-live');
        } catch {
          /* Tracking blockiert – egal */
        }
      }
    } catch {
      setError('Netzwerkfehler – bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  };

  const chars = text.length;
  const tooLong = chars > DEMO_LIMITS.maxChars;

  return (
    <div className="demo">
      <div className="demo-input">
        <div className="demo-examples" role="group" aria-label="Beispiel-Mails">
          <span>Beispiel laden:</span>
          {EXAMPLES.map((ex, i) => (
            <button key={ex.label} type="button" className="pill-btn" onClick={() => showExample(i)}>
              {ex.label}
            </button>
          ))}
        </div>
        <label htmlFor="demo-text" className="sr-only">
          E-Mail-Text
        </label>
        <textarea
          id="demo-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (source === 'beispiel') {
              setResult(null);
              setSource(null);
            }
          }}
          rows={9}
          maxLength={DEMO_LIMITS.maxChars + 200}
          placeholder="Oder eigenen Mail-Text hier einfügen – z. B. eine Anfrage, wie sie bei Ihnen täglich ankommt. Bitte keine echten personenbezogenen Daten."
          aria-describedby="demo-hint"
        />
        <div className="demo-foot">
          <span id="demo-hint" className={`demo-count${tooLong ? ' over' : ''}`}>
            {chars} / {DEMO_LIMITS.maxChars} Zeichen
            {remaining !== null && ` · noch ${remaining} Live-Auswertung${remaining === 1 ? '' : 'en'} heute`}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={run}
            disabled={loading || tooLong || text.trim().length < 20 || remaining === 0}
            data-umami-event="demo-start"
          >
            {loading ? 'KI liest …' : 'Live auswerten'}
          </button>
        </div>
        <p className="demo-privacy">
          Der Text wird zur Auswertung einmalig an OpenAI übermittelt und nicht gespeichert.{' '}
          {DEMO_LIMITS.perIpPerDay} Live-Auswertungen pro Tag. Details in der{' '}
          <a href="/datenschutz.html">Datenschutzerklärung</a>.
        </p>
        {error && (
          <p className="error" role="alert">
            {error}{' '}
            {remaining === 0 && (
              <>
                <a href="/kontakt.html?thema=E-Mail-Automatisierung">Postfach-Analyse anfragen</a> oder{' '}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  per WhatsApp schreiben
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>

      <div className="demo-output" aria-live="polite">
        {!result ? (
          <div className="demo-empty">
            <div className="wf-circle" aria-hidden="true">
              KI
            </div>
            <p>
              {loading
                ? 'Die KI liest die Mail, ordnet sie ein und schreibt einen Entwurf …'
                : 'Hier erscheint das Ergebnis: Kategorie, erkannte Daten und ein Antwortentwurf – so, wie es später in Ihrem Posteingang aussieht.'}
            </p>
          </div>
        ) : (
          <div className="window">
            <div className="window-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="title">
                {source === 'live' ? 'live ausgewertet' : 'beispielergebnis'} · {result.sicherheit}% sicher
              </span>
            </div>
            <div className="window-body demo-result">
              <div className="demo-badges">
                <span className="badge accent">{result.kategorie}</span>
                <span className={`badge urg-${result.dringlichkeit}`}>Dringlichkeit: {result.dringlichkeit}</span>
              </div>
              <dl className="demo-data">
                <div>
                  <dt>Absender</dt>
                  <dd>{result.daten.name}</dd>
                </div>
                <div>
                  <dt>Zeitraum</dt>
                  <dd>{result.daten.zeitraum}</dd>
                </div>
                <div>
                  <dt>Personen</dt>
                  <dd>{result.daten.personen}</dd>
                </div>
                <div>
                  <dt>Anliegen</dt>
                  <dd>{result.daten.anliegen}</dd>
                </div>
              </dl>
              <div className="demo-draft">
                <span className="demo-draft-label">Antwortentwurf</span>
                <p>{result.antwortentwurf}</p>
              </div>
            </div>
            <div className="window-foot">
              <span className="pulse-dot" />
              <span className="status">Wartet auf Ihre Freigabe – nichts wird automatisch versendet</span>
              <span style={{ display: 'inline-flex', gap: 8 }}>
                <span className="chip-btn solid">Freigeben</span>
                <span className="chip-btn ghost">Bearbeiten</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
