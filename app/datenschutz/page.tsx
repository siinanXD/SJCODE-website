import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – SJCODE',
  robots: { index: false },
  alternates: { canonical: 'https://sjcode.de/datenschutz.html' },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header active="none" />

      <main className="legal container">
        <h1>
          Datenschutz&shy;erklärung
        </h1>
        <div className="legal-body">
          <p>
            <strong>1. Verantwortlicher</strong>
            <br />
            Verantwortlich für die Datenverarbeitung auf dieser Website ist: Sinan Kahraman,
            Mühlenstraße 44, 53879 Euskirchen, kontakt@sjcode.de.
          </p>
          <p>
            <strong>2. Kontaktformular</strong>
            <br />
            Wenn Sie das Anfrageformular nutzen, verarbeite ich Ihre Angaben (Name, E-Mail-Adresse,
            Projektbeschreibung sowie Ihre Auswahl zu Thema, Zeitrahmen und Budget) ausschließlich
            zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Der technische Versand
            erfolgt über den Formulardienst Formspree (Formspree Inc., USA); dabei gelten dessen
            Datenschutzhinweise. Die Daten werden darüber hinaus nicht an Dritte weitergegeben und
            nach Abschluss der Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
            bestehen.
          </p>
          <p>
            <strong>3. Hosting &amp; Server-Logs</strong>
            <br />
            Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter automatisch technische
            Zugriffsdaten (IP-Adresse, Zeitpunkt, Browser) zur Sicherstellung des Betriebs (Art. 6
            Abs. 1 lit. f DSGVO). Diese Website wird bei Netlify gehostet (Netlify, Inc., 512 2nd
            Street, San Francisco, CA 94107, USA). Die Datenübermittlung in die USA erfolgt auf
            Grundlage der EU-Standardvertragsklauseln; Server-Logs werden von Netlify nach kurzer
            Zeit automatisch gelöscht.
          </p>
          <p>
            <strong>4. Terminbuchung</strong>
            <br />
            Für die Terminbuchung nutze ich den externen Dienst Calendly (Calendly LLC, USA). Bei
            Nutzung gelten die Datenschutzhinweise von Calendly.
          </p>
          <p>
            <strong>5. Reichweitenmessung (Umami)</strong>
            <br />
            Diese Website nutzt Umami Cloud (Umami Software, Inc.), einen datenschutzfreundlichen
            Analysedienst ohne Cookies. Erfasst werden anonymisierte Nutzungsdaten (aufgerufene
            Seiten, Referrer, Gerätetyp); IP-Adressen werden nicht gespeichert und es werden keine
            personenbezogenen Profile gebildet. Rechtsgrundlage ist mein berechtigtes Interesse an
            der Analyse der Websitenutzung (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            <strong>6. Ihre Rechte</strong>
            <br />
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch (Art. 15–21 DSGVO) und das Recht
            auf Beschwerde bei einer Aufsichtsbehörde.
          </p>
          <p className="note">
            Hinweis: Diese Erklärung wurde sorgfältig erstellt, ersetzt aber keine Rechtsberatung.
          </p>
        </div>
        <a href="/index.html" className="link-accent back-home" style={{ fontSize: 15 }}>
          ← Zurück zur Startseite
        </a>
      </main>

      <Footer active="datenschutz" />
      <CookieBanner />
    </>
  );
}
