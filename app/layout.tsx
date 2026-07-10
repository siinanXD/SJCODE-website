import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sjcode.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'SJCODE',
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        {/* Umami: cookieloses, datenschutzfreundliches Analytics (siehe Datenschutzerklärung) */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="840bb33e-0e63-4c0c-b327-5358039eb0f1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
