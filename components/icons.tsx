/** Kleine Line-Icons, inline SVG – keine Extra-Requests. */

const common = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
} as const;

export function IconWeb() {
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6.5" cy="6.5" r="0.8" fill="currentColor" />
      <circle cx="9" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function IconAi() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 5V3M12 21v-2M5 12H3M21 12h-2M7.05 7.05 5.64 5.64M18.36 18.36l-1.41-1.41M7.05 16.95l-1.41 1.41M18.36 5.64l-1.41 1.41"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCode() {
  return (
    <svg {...common}>
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg {...common}>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SERVICE_ICONS = {
  web: IconWeb,
  ai: IconAi,
  code: IconCode,
  mail: IconMail,
} as const;
