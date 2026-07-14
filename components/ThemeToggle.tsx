'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Umschalter zwischen hellem und dunklem Modus.
 * Das initiale Theme setzt bereits ein Inline-Skript im <head> (siehe layout.tsx),
 * damit es beim ersten Paint kein Aufblitzen der falschen Farben gibt.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('sjcode-theme', next);
    } catch {
      /* localStorage kann blockiert sein – dann bleibt die Wahl nur für diese Sitzung */
    }
  };

  const toDark = theme === 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={toDark ? 'Zu dunklem Modus wechseln' : 'Zu hellem Modus wechseln'}
      title={toDark ? 'Dunkler Modus' : 'Heller Modus'}
    >
      {toDark ? (
        // Mond – wechselt zu dunkel
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Sonne – wechselt zu hell
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
