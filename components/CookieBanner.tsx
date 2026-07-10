'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sjcode-cookie-consent';

export default function CookieBanner() {
  // Erst nach dem Mount prüfen – localStorage existiert beim Server-Rendern nicht.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  if (!visible) return null;

  const choose = (value: 'all' | 'necessary') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <div className="cookie-wrap" role="dialog" aria-label="Cookie-Einstellungen">
      <div className="cookie-card">
        <h2>Cookies auf dieser Website</h2>
        <p>
          Diese Website verwendet technisch notwendige Cookies. Optionale Cookies helfen zu
          verstehen, wie die Seite genutzt wird. Ihre Auswahl können Sie jederzeit ändern –
          Details in der <a href="/datenschutz.html">Datenschutzerklärung</a>.
        </p>
        <div className="cookie-actions">
          <button type="button" className="accept" onClick={() => choose('all')}>
            Alle akzeptieren
          </button>
          <button type="button" className="necessary" onClick={() => choose('necessary')}>
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
