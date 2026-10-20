/**
 * The hero drawing: a palace arch on columns, drawn as gold blueprint line
 * art over a faint grid, inside the gold sun circle, with measurement marks.
 * Groups carry `data-draw` names so the step 4 animation can target them.
 */
export function HeroArch({ className = "" }: { className?: string }) {
  const gridRows = [60, 140, 220, 300, 380, 460, 540];
  const gridCols = [40, 120, 200, 280, 360, 440, 520];

  return (
    <svg viewBox="0 0 560 600" aria-hidden="true" direction="ltr" className={className}>
      <g data-draw="grid" stroke="rgb(201 164 92 / 0.10)" strokeWidth="1">
        {gridRows.map((y) => (
          <line key={`r${y}`} x1="0" y1={y} x2="560" y2={y} />
        ))}
        {gridCols.map((x) => (
          <line key={`c${x}`} x1={x} y1="0" x2={x} y2="600" />
        ))}
      </g>

      <g data-draw="sun">
        <circle cx="280" cy="250" r="215" fill="rgb(201 164 92 / 0.09)" stroke="#C9A45C" strokeWidth="1" />
        <circle
          cx="280"
          cy="250"
          r="232"
          fill="none"
          stroke="rgb(201 164 92 / 0.35)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        />
      </g>

      <g data-draw="arch" fill="none" stroke="#C9A45C" strokeWidth="1.6">
        <path d="M110 270 A170 170 0 0 1 450 270" />
        <path d="M160 270 A120 120 0 0 1 400 270" />
        <path d="M260 96 L300 96 L292 134 L268 134 Z" />
        <rect x="96" y="256" width="78" height="18" />
        <rect x="386" y="256" width="78" height="18" />
        <rect x="110" y="274" width="50" height="270" />
        <rect x="400" y="274" width="50" height="270" />
        <path d="M122 284 V534 M135 284 V534 M148 284 V534" />
        <path d="M412 284 V534 M425 284 V534 M438 284 V534" />
        <rect x="86" y="544" width="388" height="16" />
        <rect x="70" y="560" width="420" height="10" />
      </g>

      <g data-draw="measures" stroke="#C9A45C" strokeWidth="0.9" fill="none" opacity="0.8">
        <path d="M110 590 H450 M110 582 V598 M450 582 V598" />
        <path d="M30 274 V544 M22 274 H38 M22 544 H38" />
        <path d="M280 250 L400 160" strokeDasharray="3 4" />
      </g>

      <g data-draw="labels" fill="#C9A45C" fontFamily="var(--font-inter), sans-serif" fontSize="11" letterSpacing="2">
        <text x="262" y="586">8.40 M</text>
        <text x="12" y="414" transform="rotate(-90 12 414)">
          5.40 M
        </text>
        <text x="350" y="196">R 1.70</text>
      </g>
    </svg>
  );
}
