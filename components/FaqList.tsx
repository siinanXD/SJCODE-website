import type { Faq } from '@/lib/services';

/**
 * Aufklappbare Fragen (native <details>) + FAQPage-Schema.
 * `withSchema` nur EINMAL pro Seite setzen – Google akzeptiert ein FAQPage pro URL.
 */
export default function FaqList({
  faqs,
  title = 'Häufige Fragen',
  eyebrow = 'FAQ',
  withSchema = true,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  withSchema?: boolean;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <section className="section faq">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="faq-list reveal">
          {faqs.map((f) => (
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
