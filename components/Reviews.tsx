/**
 * Bewertungs-Sektion mit Google-Bewertungen.
 * Daten pflegen in `components/reviewsData.ts`.
 */

import ReviewsCarousel, { Stars } from './ReviewsCarousel';
import { REVIEWS, REVIEW_STATS } from './reviewsData';
import { SITE } from '@/lib/site';

// JSON-LD: AggregateRating + einzelne Reviews, angehängt an die SJCODE-Entität
// (gleiche @id wie die ProfessionalService auf der Startseite -> wird zusammengeführt).
const REVIEWS_SCHEMA =
  REVIEW_STATS.count > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': SITE.businessId,
        name: SITE.name,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(REVIEW_STATS.average.toFixed(1)),
          reviewCount: REVIEW_STATS.count,
          bestRating: 5,
          worstRating: 1,
        },
        review: REVIEWS.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: r.text,
          ...(r.datePublished ? { datePublished: r.datePublished } : {}),
        })),
      }
    : null;

export default function Reviews({ withSchema = true }: { withSchema?: boolean }) {
  const { count, average } = REVIEW_STATS;

  return (
    <section className="section reviews">
      {withSchema && REVIEWS_SCHEMA && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWS_SCHEMA) }}
        />
      )}
      <div className="container">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Bewertungen</p>
            <h2 className="section-title">Was Kundinnen und Kunden sagen</h2>
          </div>
          {count > 0 && (
            <div className="reviews-summary">
              <Stars rating={average} />
              <span>
                <strong>{average.toFixed(1).replace('.', ',')}</strong> · {count}{' '}
                {count === 1 ? 'Bewertung' : 'Bewertungen'} auf Google
              </span>
            </div>
          )}
        </div>

        {REVIEWS.length > 0 && (
          <div className="reveal">
            <ReviewsCarousel reviews={REVIEWS} />
          </div>
        )}

        <div className="reviews-cta reveal">
          <a
            href={SITE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Auf Google bewerten ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
