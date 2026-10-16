'use client';

import { useEffect, useRef } from 'react';

const NUMBERS = [
  { id: '-K1', value: '60–75 %', text: 'wiederkehrende Anfragen' },
  { id: '-K2', value: '6–12 Mon.', text: 'bis die Anlage sitzt' },
  { id: '-K3', value: '1 Engpass', text: 'verstreute Doku' },
];

/**
 * Szene 1–2: Schrank geschlossen → Tür öffnet → Zahlen erscheinen.
 * Ohne JS bleibt der Endzustand sichtbar. GSAP wird nur im Client nachgeladen.
 * Bei prefers-reduced-motion blendet CSS den Abschnitt aus (Standbilder stehen in Hero und Problem).
 */
export default function ScrollScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, el);

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top top', end: '+=1800', pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        gsap.set('.sc-door', { rotateY: 0 });
        gsap.set(q('.sc-k-lamp'), { opacity: 0.15 });
        gsap.set(q('.sc-num'), { opacity: 0, y: -90, scale: 0.6 });
        gsap.set('.sc-inside', { opacity: 0.2 });
        // Szene 1: Lampe -H1 pulsiert, Tür schwingt auf
        tl.to('.sc-h1', { opacity: 0.35, repeat: 3, yoyo: true, duration: 0.3 })
          .to('.sc-door', { rotateY: -105, duration: 2, ease: 'power2.inOut' })
          .to('.sc-inside', { opacity: 1, duration: 1 }, '<');
        // Szene 2: -K1…-K3 leuchten nacheinander, Zahlen fliegen an ihre Leitungen
        q('.sc-k-lamp').forEach((lamp, i) => {
          tl.to(lamp, { opacity: 1, duration: 0.4 }).to(
            q('.sc-num')[i],
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            '<',
          );
        });
        return () => gsap.set(['.sc-door', '.sc-h1', '.sc-inside', ...q('.sc-k-lamp'), ...q('.sc-num')], { clearProps: 'all' });
      });

      mm.add('(max-width: 767px)', () => {
        const cards = q('.sc-card');
        gsap.set(cards, { opacity: 0, y: 24 });
        ScrollTrigger.batch(cards, {
          start: 'top 85%',
          once: true,
          onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }),
        });
        return () => gsap.set(cards, { clearProps: 'all' });
      });

      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section id="schrank" ref={root} className="sc" aria-labelledby="sc-title">
      <div className="hm-wrap sc-grid">
        <div className="sc-copy">
          <p className="hm-kicker">-A1.1 · DER SCHRANK</p>
          <h2 className="hm-h2" id="sc-title">Tür auf. Drei Zahlen, die jede Instandhaltung kennt.</h2>
        </div>
        <div className="sc-stage" aria-hidden="true">
          <div className="sc-inside">
            {[0, 1, 2].map((i) => (
              <div key={i} className="sc-k">
                <span className="sc-k-lamp" />
                <span className="hm-mono">{NUMBERS[i].id}</span>
              </div>
            ))}
          </div>
          <div className="sc-door">
            <span className="sc-h1" />
            <span className="hm-mono">-H1</span>
          </div>
        </div>
        <ul className="sc-cards">
          {NUMBERS.map((n) => (
            <li key={n.id} className="sc-card sc-num">
              <span className="hm-mono">{n.id}</span>
              <strong>{n.value}</strong>
              <span>{n.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
