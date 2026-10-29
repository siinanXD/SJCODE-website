'use client';

import { useEffect, useRef, useState } from 'react';

const BRANCHES = [
  { id: '-K1', x: 120, title: 'Doku-Assistent', text: 'Handbücher fragen statt suchen.' },
  { id: '-K2', x: 300, title: 'Wartungs-Assistent', text: 'Störung rein, Ursachen und Schritte raus.' },
  { id: '-K3', x: 480, title: 'Stromlaufplan-KI', text: 'Fragen an Pläne und STEP-7-Programme.' },
  { id: '-K4', x: 660, title: 'Qualitätsprüfung', text: 'Trefferquote messen, bevor die KI live geht.' },
];
const SWITCHES = ['-S1', '-S2', '-S3', '-S4'];

/**
 * Szene 3–4: Bauteile werden zu Linien (Stromlaufplan zeichnet sich per stroke-dashoffset),
 * danach fließt Strom über -S1 → -S4, Lampe -H5 geht an, der Termin-Button wird aktiv.
 * Ohne JS bleibt der Endzustand sichtbar. Hover/Fokus/Tap auf -K1…-K4 schließt den Kontakt.
 * Bei prefers-reduced-motion blendet CSS den Abschnitt aus (der Plan steht statisch unter Leistungen).
 */
export default function ScrollCircuit({ href, label }: { href: string; label: string }) {
  const root = useRef<HTMLElement>(null);
  const [on, setOn] = useState<number | null>(null);

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
      const q = (s: string) => gsap.utils.toArray<SVGElement>(s, el);
      const animated = () => [...q('.cx-draw'), ...q('.cx-flow'), ...q('.cx-fade'), '.cx-h5'];

      const build = (tl: gsap.core.Timeline, scale: number) => {
        gsap.set([...q('.cx-draw'), ...q('.cx-flow')], { strokeDashoffset: 1 });
        gsap.set(q('.cx-fade'), { opacity: 0 });
        gsap.set('.cx-h5', { opacity: 0.2 });
        // Szene 3: Sammelschiene, dann die Zweige oben und unten
        tl.to('.cx-bus', { strokeDashoffset: 0, duration: 1.2 * scale, ease: 'none' })
          .to(q('.cx-up'), { strokeDashoffset: 0, duration: 0.6 * scale, stagger: 0.25 * scale, ease: 'none' })
          .to(q('.cx-low'), { strokeDashoffset: 0, duration: 0.6 * scale, stagger: 0.25 * scale, ease: 'none' }, '<0.3')
          .to(q('.cx-fade'), { opacity: 1, duration: 0.5 * scale, stagger: 0.05 })
          // Szene 4: Strom fließt über -S1 → -S4 zur Lampe -H5 (der Termin-Button bleibt immer voll deckend)
          .to(q('.cx-flow'), { strokeDashoffset: 0, duration: 2.4 * scale, ease: 'none' })
          .to('.cx-h5', { opacity: 1, duration: 0.4 * scale });
      };

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top top', end: '+=2200', pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        build(tl, 1);
        return () => gsap.set(animated(), { clearProps: 'all' });
      });

      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } });
        build(tl, 0.5);
        return () => gsap.set(animated(), { clearProps: 'all' });
      });

      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  const hold = (i: number) => ({
    onMouseEnter: () => setOn(i),
    onMouseLeave: () => setOn(null),
    onFocus: () => setOn(i),
    onBlur: () => setOn(null),
    onClick: () => setOn(i),
  });

  return (
    <section id="stromlauf" ref={root} className="cx" aria-labelledby="cx-title">
      <div className="hm-wrap cx-grid">
        <div>
          <p className="hm-kicker">-A1.2 · DER STROMLAUFPLAN</p>
          <h2 className="hm-h2" id="cx-title">Aus Bauteilen wird ein Plan. Und der Strom fließt zu Ihnen.</h2>
        </div>
        <svg viewBox="0 0 880 330" className="hm-svg cx-svg" aria-hidden="true" focusable="false">
          <g fill="none" strokeWidth="2.5" className="cx-lines">
            <path className="cx-draw cx-bus" pathLength={1} d="M40 40 H760" strokeWidth="5" />
            {BRANCHES.map((b, i) => (
              <g key={b.id} className={on === i ? 'cx-branch is-on' : 'cx-branch'}>
                <path className="cx-draw cx-up" pathLength={1} d={`M${b.x} 40 V95`} />
                <path className="cx-draw cx-low" pathLength={1} d={`M${b.x} 155 V215 M${b.x - 14} 215 H${b.x + 14} M${b.x - 8} 222 H${b.x + 8}`} />
                <circle className="cx-fade cx-term" cx={b.x} cy="95" r="4" />
                <circle className="cx-fade cx-term" cx={b.x} cy="155" r="4" />
                <line className="cx-fade cx-blade" x1={b.x} y1="155" x2={b.x} y2="95" style={{ transformOrigin: `${b.x}px 155px`, transformBox: 'view-box' }} />
                <text className="cx-fade cx-label" x={b.x + 16} y="130">{b.id}</text>
              </g>
            ))}
            <path className="cx-flow" pathLength={1} d="M40 290 H820" />
          </g>
          {SWITCHES.map((s, i) => (
            <g key={s} className="cx-fade">
              <rect x={150 + i * 160} y="276" width="44" height="28" className="cx-sw" />
              <text x={158 + i * 160} y="295" className="cx-label">{s}</text>
            </g>
          ))}
          <circle className="cx-h5" cx="840" cy="290" r="16" />
          <text className="cx-fade cx-label" x="822" y="326">-H5</text>
        </svg>
        <ul className="cx-cards">
          {BRANCHES.map((b, i) => (
            <li key={b.id}>
              <button type="button" className={on === i ? 'cx-card is-on' : 'cx-card'} aria-pressed={on === i} {...hold(i)}>
                <span className="hm-mono">{b.id}</span>
                <strong>{b.title}</strong>
                <span>{b.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="cx-cta-row">
          <a href={href} className="hm-btn hm-btn-primary cx-cta" data-umami-event="doku-check" data-umami-event-ort="stromlauf">{label}</a>
        </p>
      </div>
    </section>
  );
}
