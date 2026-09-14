import EmailDemo from './EmailDemo';

/** Sektion „Probieren Sie es aus“ – die Live-Demo mit Überschrift und Einordnung. */
export default function EmailDemoSection({
  title = 'Probieren Sie es aus: Die KI liest Ihre Mail.',
  text = 'So arbeitet die E-Mail-Automatisierung, die heute produktiv läuft: Mail einfügen, die KI ordnet ein, zieht die Daten heraus und legt einen Antwortentwurf vor. Versendet wird erst nach Ihrer Freigabe.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section id="demo" className="section on-surface">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Live-Demo</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-sub">{text}</p>
          </div>
        </div>
        <div className="reveal">
          <EmailDemo />
        </div>
      </div>
    </section>
  );
}
