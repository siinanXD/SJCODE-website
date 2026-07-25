'use client';

/**
 * Bewertungs-Karussell.
 *
 * Progressive Enhancement: Die Grundlage ist eine horizontal scrollbare Liste
 * mit CSS scroll-snap – die funktioniert ohne JavaScript (Wischen am Handy,
 * Scrollen am Desktop). Pfeile, Punkte und der automatische Wechsel kommen
 * erst dazu, wenn JavaScript läuft.
 *
 * Der automatische Wechsel pausiert bei Hover/Fokus und stoppt dauerhaft,
 * sobald jemand selbst blättert. Bei „prefers-reduced-motion“ bleibt er aus.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export type CarouselReview = {
  name: string;
  rating: number;
  text: string;
  date?: string;
};

// Wechselintervall des automatischen Durchlaufs in Millisekunden.
const AUTOPLAY_MS = 7000;

export function Stars({ rating }: { rating: number }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span className="stars" role="img" aria-label={`${full} von 5 Sternen`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star on' : 'star'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function ReviewsCarousel({ reviews }: { reviews: CarouselReview[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef(0);
  const expandedRef = useRef<number | null>(null);
  const quoteRefs = useRef<(HTMLQuoteElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [clipped, setClipped] = useState<boolean[]>([]);

  // Steuerelemente erst einblenden, wenn JavaScript tatsächlich läuft.
  useEffect(() => setEnhanced(true), []);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  // „Mehr lesen“ nur dort zeigen, wo der Text tatsächlich abgeschnitten wird –
  // gemessen statt an der Zeichenzahl geraten.
  const measure = useCallback(() => {
    setClipped((prev) =>
      quoteRefs.current.map((el, i) => {
        if (!el) return prev[i] ?? false;
        // Aufgeklappte Karten überlaufen nicht mehr – alten Wert behalten.
        if (expandedRef.current === i) return prev[i] ?? true;
        return el.scrollHeight - el.clientHeight > 4;
      }),
    );
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    measure();
    // Schriften können die Zeilenumbrüche noch verschieben.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enhanced, measure]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      const card = cards[Math.max(0, Math.min(cards.length - 1, target))];
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    },
    [reduceMotion],
  );

  // Aktive Folie aus der Scrollposition ableiten – gilt auch fürs Wischen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Automatischer Durchlauf.
  useEffect(() => {
    if (!enhanced || stopped || paused || reduceMotion || reviews.length < 2) return;
    const timer = window.setInterval(() => {
      goTo((indexRef.current + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [enhanced, stopped, paused, reduceMotion, reviews.length, goTo]);

  const step = (delta: number) => {
    setStopped(true);
    goTo((indexRef.current + delta + reviews.length) % reviews.length);
  };

  return (
    <div
      className="reviews-carousel"
      role="region"
      aria-roledescription="Karussell"
      aria-label="Kundenbewertungen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setStopped(true)}
    >
      <ul className="reviews-track" ref={trackRef} tabIndex={0} aria-label="Bewertungen">
        {reviews.map((r, i) => {
          const isOpen = expanded === i;
          const showToggle = enhanced && (clipped[i] || isOpen);
          return (
            <li
              key={r.name}
              className="review-slide"
              aria-roledescription="Folie"
              aria-label={`Bewertung ${i + 1} von ${reviews.length}`}
            >
              <figure className="review-card">
                <span className="rv-quote" aria-hidden="true">
                  &rdquo;
                </span>
                <Stars rating={r.rating} />
                <blockquote
                  ref={(el) => {
                    quoteRefs.current[i] = el;
                  }}
                  className={enhanced && !isOpen ? 'rv-clamp' : undefined}
                >
                  {r.text}
                </blockquote>
                {showToggle && (
                  <button
                    type="button"
                    className="rv-more"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    {isOpen ? 'Weniger anzeigen' : 'Mehr lesen'}
                  </button>
                )}
                <figcaption>
                  <span className="rv-avatar" aria-hidden="true">
                    {initials(r.name)}
                  </span>
                  <span className="rv-meta">
                    <span className="review-author">{r.name}</span>
                    <span className="review-date">
                      {r.date ? `${r.date} · ` : ''}Google&#8209;Bewertung
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {enhanced && reviews.length > 1 && (
        <div className="reviews-controls">
          <button
            type="button"
            className="rv-arrow"
            onClick={() => step(-1)}
            aria-label="Vorherige Bewertung"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="rv-arrow"
            onClick={() => step(1)}
            aria-label="Nächste Bewertung"
          >
            <span aria-hidden="true">→</span>
          </button>
          <div className="rv-dots">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                className="rv-dot"
                aria-current={i === index}
                aria-label={`Bewertung ${i + 1} anzeigen`}
                onClick={() => {
                  setStopped(true);
                  goTo(i);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
