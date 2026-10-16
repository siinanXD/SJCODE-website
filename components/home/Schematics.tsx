/** Statische Inline-SVGs der Startseite (Schrank, Schaltplan). Text steht als HTML daneben. */

const CABINET = '#D5D7D3';
const CABINET_EDGE = '#9EA19B';
const BLUE = '#1A4099';

export function CabinetClosed() {
  return (
    <svg viewBox="0 0 320 420" role="img" aria-label="Geschlossener Schaltschrank mit grüner Meldeleuchte und Typenschild" className="hm-svg">
      <rect x="20" y="10" width="280" height="400" rx="6" fill={CABINET_EDGE} />
      <rect x="30" y="20" width="260" height="380" rx="4" fill={CABINET} stroke="#8A8D87" />
      <rect x="44" y="34" width="232" height="352" rx="3" fill="none" stroke="#B9BCB6" />
      <circle cx="160" cy="70" r="14" fill="#2E9E4F" stroke="#1C6B33" strokeWidth="3" />
      <circle cx="155" cy="65" r="4" fill="#8FE0A8" />
      <rect x="248" y="180" width="14" height="70" rx="7" fill="#7C7F79" />
      <rect x="64" y="250" width="170" height="86" rx="3" fill="#F5F5F2" stroke="#8A8D87" />
      <text x="76" y="278" fontFamily="'Geist Mono', monospace" fontSize="12" fontWeight="700" fill="#211E19">
        =A1 +SJ1 SCHALTSCHRANK
      </text>
      <text x="76" y="302" fontFamily="'Geist Mono', monospace" fontSize="10" fill="#211E19">
        Doku · Wartung · Pläne · Prüfung
      </text>
      <circle cx="72" cy="322" r="3" fill="#8A8D87" />
      <circle cx="226" cy="322" r="3" fill="#8A8D87" />
    </svg>
  );
}

export function CabinetOpen() {
  return (
    <svg viewBox="0 0 400 420" role="img" aria-label="Offener Schaltschrank mit Hutschiene, Klemmen und Aktenordnern" className="hm-svg">
      <rect x="110" y="10" width="270" height="400" rx="6" fill={CABINET_EDGE} />
      <rect x="120" y="20" width="250" height="380" rx="4" fill="#ECEDE9" stroke="#8A8D87" />
      <path d="M110 14 L20 40 L20 380 L110 406 Z" fill={CABINET} stroke="#8A8D87" />
      <rect x="40" y="200" width="10" height="50" rx="5" fill="#7C7F79" />
      {[60, 150, 240, 330].map((y) => (
        <g key={y}>
          <rect x="136" y={y} width="218" height="10" fill="#9A9D97" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={142 + i * 26} y={y - 28} width="20" height="28" rx="2" fill={i % 3 === 0 ? '#DD7348' : '#C9CCC6'} stroke="#7C7F79" />
          ))}
        </g>
      ))}
      <path d="M150 120 C200 150 260 100 340 140 M150 210 C220 240 280 190 340 230" fill="none" stroke="#66615A" strokeWidth="3" />
    </svg>
  );
}

export function Schematic() {
  const grid = [];
  for (let x = 0; x <= 800; x += 40) grid.push(<line key={`x${x}`} x1={x} y1="0" x2={x} y2="260" />);
  for (let y = 0; y <= 260; y += 40) grid.push(<line key={`y${y}`} x1="0" y1={y} x2="800" y2={y} />);
  return (
    <svg viewBox="0 0 800 260" role="img" aria-label="Stromlaufplan: eine Sammelschiene L1 speist die vier Stromkreise -K1 bis -K4" className="hm-svg hm-schematic">
      <rect width="800" height="260" fill="#FFFFFF" />
      <g stroke="#E3E7F0" strokeWidth="1">{grid}</g>
      <g stroke={BLUE} strokeWidth="2" fill="none">
        <line x1="40" y1="40" x2="760" y2="40" strokeWidth="4" />
        {[140, 340, 540, 740].map((x) => (
          <g key={x}>
            <line x1={x} y1="40" x2={x} y2="90" />
            <rect x={x - 22} y="90" width="44" height="60" fill="#FFFFFF" />
            <line x1={x} y1="150" x2={x} y2="220" />
            <line x1={x - 16} y1="220" x2={x + 16} y2="220" />
            <line x1={x - 10} y1="226" x2={x + 10} y2="226" />
            <line x1={x - 4} y1="232" x2={x + 4} y2="232" />
          </g>
        ))}
      </g>
      <g fontFamily="'Geist Mono', monospace" fontSize="14" fill={BLUE}>
        <text x="44" y="30">L1</text>
        <text x="86" y="125">-K1</text>
        <text x="286" y="125">-K2</text>
        <text x="486" y="125">-K3</text>
        <text x="686" y="125">-K4</text>
      </g>
    </svg>
  );
}
