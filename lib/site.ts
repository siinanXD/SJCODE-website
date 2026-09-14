/**
 * Zentrale Stammdaten der Website – EINMAL hier pflegen, überall verwendet
 * (Header, Footer, Kontakt, JSON-LD, Impressum).
 */

export const SITE = {
  name: 'SJCODE',
  owner: 'Sinan Kahraman',
  url: 'https://sjcode.de',
  email: 'kontakt@sjcode.de',
  /** Anzeigeformat, tel:-Link und WhatsApp-Link – alle drei aus derselben Nummer. */
  phoneDisplay: '0152 5583 4196',
  phoneIntl: '+49 152 5583 4196',
  phoneHref: 'tel:+4915255834196',
  whatsapp: 'https://wa.me/4915255834196?text=Hallo%20Sinan%2C%20ich%20habe%20eine%20Frage%20zu%20',
  calendly: 'https://calendly.com/sjcode',
  googleReviewUrl: 'https://g.page/r/CZdmOonQJkltEBM/review',
  googleProfileUrl: 'https://g.page/r/CZdmOonQJkltEBM',
  github: 'https://github.com/siinanxd',
  linkedin: 'https://www.linkedin.com/in/kahraman-sinan/',
  street: 'Mühlenstraße 44',
  zip: '53879',
  city: 'Euskirchen',
  /** Schema.org-@id der Geschäftsentität – verbindet alle JSON-LD-Blöcke. */
  businessId: 'https://sjcode.de/#business',
  personId: 'https://sjcode.de/#sinan',
} as const;

/** Öffentliche Kennzahlen – werden in Trust-Leiste und Hero angezeigt. */
export const PROOF = {
  yearsIndustry: '10+',
  responseTime: '24 h',
  testsInReference: '276+',
  releasesInReference: '60+',
} as const;
