/**
 * Häufige Fragen. Nutzt native <details>/<summary> – funktioniert auch ohne
 * JavaScript und ist von Haus aus barrierefrei. Enthält zusätzlich das
 * FAQPage-Schema (JSON-LD), damit Google die Fragen direkt anzeigen kann.
 */

const FAQS = [
  {
    q: 'Was kostet die Zusammenarbeit?',
    a: 'Das hängt vom Umfang ab. Eine Website startet meist bei einem fairen Festpreis, Automatisierungen kalkuliere ich nach Aufwand. Im kostenlosen Erstgespräch bekommen Sie eine ehrliche Einschätzung und ein klares Angebot – vorher fließt kein Geld.',
  },
  {
    q: 'Wie lange dauert ein Projekt?',
    a: 'Kleine Websites sind oft in ein bis zwei Wochen fertig, Automatisierungen je nach Komplexität in einigen Wochen. Sie bekommen von Anfang an einen realistischen Zeitplan und regelmäßige Zwischenstände.',
  },
  {
    q: 'Wie läuft die Zusammenarbeit ab?',
    a: 'In drei Schritten: kostenloses Erstgespräch, klares Angebot, dann iterative Umsetzung mit regelmäßigen Zwischenständen. Am Ende steht eine saubere Übergabe mit Dokumentation – Sie bekommen keine Blackbox, sondern ein Werkzeug, das Sie verstehen und behalten.',
  },
  {
    q: 'Arbeiten Sie auch remote und deutschlandweit?',
    a: 'Ja. Die Zusammenarbeit läuft komplett remote per Video, Telefon und E-Mail – unabhängig davon, wo Sie sitzen. Persönliche Treffen in der Region Euskirchen/Köln sind nach Absprache möglich.',
  },
  {
    q: 'Was passiert mit meinen Daten?',
    a: 'Datenschutz hat Priorität. Ich arbeite DSGVO-konform, bei KI-Lösungen werden E-Mail-Inhalte streng als Daten behandelt – nie als Anweisung an das Modell – und nichts geht ohne Ihre Freigabe raus. Details in der Datenschutzerklärung.',
  },
  {
    q: 'Ich weiß noch nicht genau, was ich brauche – ist das ein Problem?',
    a: 'Überhaupt nicht. Genau dafür ist das Erstgespräch da. Beschreiben Sie einfach Ihr Problem in ein paar Sätzen – ich sage Ihnen ehrlich, ob und wie sich das lösen lässt, auch wenn sich etwas nicht lohnt.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Faq() {
  return (
    <section className="section faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Häufige Fragen</h2>
          </div>
        </div>
        <div className="faq-list reveal">
          {FAQS.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
