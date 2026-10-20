const center = 302;
const gridStep = 27;
const archRadii = [122, 116, 108, 103];

/**
 * One column, drawn around `axis`: capital with volutes and leaves, a
 * fluted shaft, and a moulded base on a plinth.
 */
function Column({ axis }: { axis: number }) {
  const x = (offset: number) => axis + offset;
  const flutes = [-11, -6, 0, 6, 11];

  return (
    <>
      <rect x={x(-28)} y="220" width="56" height="6" />
      <rect x={x(-24)} y="226" width="48" height="9" />
      <path d={`M${x(-22)} 240 Q${axis} 236 ${x(22)} 240`} />
      <circle cx={x(-14)} cy="247" r="7.5" />
      <circle cx={x(14)} cy="247" r="7.5" />
      <path d={`M${x(-14)} 247 m-3 0 a3 3 0 1 0 3 -3 M${x(14)} 247 m3 0 a3 3 0 1 1 -3 -3`} />
      <path
        d={`M${x(-10)} 276 C${x(-8)} 266 ${x(-4)} 258 ${axis} 252 M${axis} 276 V250 M${x(10)} 276 C${x(8)} 266 ${x(4)} 258 ${axis} 252 M${x(-16)} 276 C${x(-14)} 268 ${x(-12)} 263 ${x(-8)} 260 M${x(16)} 276 C${x(14)} 268 ${x(12)} 263 ${x(8)} 260`}
      />
      <rect x={x(-18)} y="276" width="36" height="4" />
      <rect x={x(-16)} y="280" width="32" height="218" />
      <path d={flutes.map((f) => `M${x(f)} 285 V493`).join(" ")} />
      <rect x={x(-20)} y="498" width="40" height="5" />
      <rect x={x(-24)} y="503" width="48" height="7" />
      <rect x={x(-34)} y="512" width="68" height="28" />
    </>
  );
}

/**
 * The hero drawing, a front elevation of a classical arch as gold blueprint
 * line art: a faint grid, the gold sun circle, an archivolt of four bands
 * with a keystone, two columns on a three-step base, the centre axes, and
 * dimension lines with labels. Groups carry `data-draw` names so
 * HeroMotion can draw them in order; colors follow `currentColor`, so the
 * caller sets the gold through `className`. Labels stay left to right on
 * Hebrew pages.
 */
export function HeroArch({ className }: { className: string }) {
  const gridX = Array.from({ length: 22 }, (_, i) => 18 + i * gridStep);
  const gridY = Array.from({ length: 23 }, (_, i) => 22 + i * gridStep);

  return (
    <svg viewBox="0 0 606 649" aria-hidden="true" direction="ltr" className={className}>
      <g data-draw="grid" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.8">
        {gridX.map((x) => (
          <line key={`x${x}`} x1={x} y1="22" x2={x} y2="616" />
        ))}
        {gridY.map((y) => (
          <line key={`y${y}`} x1="18" y1={y} x2="585" y2={y} />
        ))}
      </g>

      <g data-draw="sun">
        <circle cx={center} cy="241" r="188" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1" />
      </g>

      <g data-draw="arch" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        {archRadii.map((r) => (
          <path key={r} d={`M${center - r} 220 A${r} ${r} 0 0 1 ${center + r} 220`} />
        ))}
        <rect x="281" y="92" width="42" height="7" />
        <path d="M285 99 L319 99 L312 141 L292 141 Z" />
        <path d="M291 105 H313 M302 105 V135" />
        <Column axis={194} />
        <Column axis={410} />
        <rect x="148" y="540" width="309" height="12" />
        <rect x="128" y="552" width="349" height="11" />
        <rect x="115" y="563" width="374" height="11" />
      </g>

      <g data-draw="measures" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d={`M${center} 24 V614`} strokeDasharray="6 4" strokeOpacity="0.6" />
        <path d="M226 249 H378" strokeDasharray="6 4" strokeOpacity="0.6" />
        <path d="M40 92 H272 M40 574 H108" />
        <path d="M54 92 V574 M49 101 L54 92 L59 101 M49 565 L54 574 L59 565" />
        <path d="M115 580 V610 M489 580 V610" />
        <path d="M115 600 H268 M336 600 H489 M124 595 L115 600 L124 605 M480 595 L489 600 L480 605" />
        <path d="M548 79 H497 L452 116 M452 116 l3 -9 M452 116 l9 -3" />
      </g>

      <g data-draw="labels" fill="currentColor" fontFamily="var(--font-inter), sans-serif" fontSize="12" letterSpacing="2.4">
        <text x="276" y="604">8.40 M</text>
        <text x="48" y="362" transform="rotate(-90 48 362)">10.80 M</text>
        <text x="502" y="73">R 4.20</text>
      </g>
    </svg>
  );
}
