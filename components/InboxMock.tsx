import { Fragment } from 'react';

const PIPELINE = ['Eingang', 'Klassifikation', 'Datenextraktion', 'Entwurf', 'Ihre Freigabe'];

/**
 * Illustration der E-Mail-Automatisierung: ein Posteingang, in dem die KI
 * vorsortiert hat und ein Entwurf auf Freigabe wartet. Rein dekorativ.
 */
export default function InboxMock({ withPipeline = true }: { withPipeline?: boolean }) {
  return (
    <div className="inbox-mock" aria-hidden="true">
      <div className="window">
        <div className="window-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="title">posteingang · automatisch sortiert</span>
        </div>
        <div className="window-body">
          <div className="mail-row active">
            <div className="meta">
              <div className="subject">Anfrage Juli · 04.–11.07., 2 Personen</div>
              <div className="from">gast.mueller@web.de</div>
            </div>
            <span className="badge accent">Buchung · 98%</span>
          </div>
          <div className="mail-row">
            <div className="meta">
              <div className="subject">Frage zur Anreise &amp; Schlüsselübergabe</div>
              <div className="from">info@ferienhof-nord.de</div>
            </div>
            <span className="badge">Anfrage · 94%</span>
          </div>
          <div className="mail-row">
            <div className="meta">
              <div className="subject">Rechnung 2026-0815</div>
              <div className="from">buchhaltung@lieferant.de</div>
            </div>
            <span className="badge">Beleg · 99%</span>
          </div>
        </div>
        <div className="window-foot">
          <span className="pulse-dot" />
          <span className="status">Antwortentwurf erstellt – wartet auf Ihre Freigabe</span>
          <span style={{ display: 'inline-flex', gap: 8 }}>
            <span className="chip-btn solid">Freigeben</span>
            <span className="chip-btn ghost">Bearbeiten</span>
          </span>
        </div>
      </div>
      {withPipeline && (
        <div className="pipeline">
          {PIPELINE.map((stage, i) => (
            <Fragment key={stage}>
              {i > 0 && <span className="pipeline-line" />}
              <span className={`stage${i === PIPELINE.length - 1 ? ' accent' : ''}`}>{stage}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
