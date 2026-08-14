'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  suffix?: string;
  label: string;
  durationMs?: number;
};

/**
 * Number-Ticker à la Magic UI – RAF, pausiert bei prefers-reduced-motion.
 */
export default function StatTicker({ value, suffix = '', label, durationMs = 1200 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (reduce) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          setStarted(true);
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs, started]);

  return (
    <div ref={ref}>
      <strong>
        {display}
        {suffix}
      </strong>
      <small>{label}</small>
    </div>
  );
}
