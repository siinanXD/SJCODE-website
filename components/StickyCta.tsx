'use client';

import { useEffect, useState } from 'react';

/**
 * Schwebender „Projekt anfragen"-Button unten rechts.
 * Mit `watch` (CSS-Selektor) erscheint er erst, wenn das beobachtete
 * Element – z. B. der Hero – aus dem Viewport gescrollt ist.
 */
export default function StickyCta({ watch }: { watch?: string }) {
  const [show, setShow] = useState(!watch);

  useEffect(() => {
    if (!watch) return;
    const target = document.querySelector(watch);
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setShow(!entries[0].isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watch]);

  return (
    <a href="/kontakt.html" className={`sticky-cta${show ? '' : ' hidden'}`}>
      Projekt anfragen →
    </a>
  );
}
