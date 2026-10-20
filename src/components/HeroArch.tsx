const archCenterX = 302;
const gridSpacing = 27;
const archRadii = [122, 116, 108, 103];

function ClassicalColumn({ centerX }: { centerX: number }) {
  const xAtOffset = (offset: number) => centerX + offset;
  const shaftFluteOffsets = [-11, -6, 0, 6, 11];

  return (
    <>
      <rect x={xAtOffset(-28)} y="220" width="56" height="6" />
      <rect x={xAtOffset(-24)} y="226" width="48" height="9" />
      <path d={`M${xAtOffset(-22)} 240 Q${centerX} 236 ${xAtOffset(22)} 240`} />
      <circle cx={xAtOffset(-14)} cy="247" r="7.5" />
      <circle cx={xAtOffset(14)} cy="247" r="7.5" />
      <path d={`M${xAtOffset(-14)} 247 m-3 0 a3 3 0 1 0 3 -3 M${xAtOffset(14)} 247 m3 0 a3 3 0 1 1 -3 -3`} />
      <path
        d={`M${xAtOffset(-10)} 276 C${xAtOffset(-8)} 266 ${xAtOffset(-4)} 258 ${centerX} 252 M${centerX} 276 V250 M${xAtOffset(10)} 276 C${xAtOffset(8)} 266 ${xAtOffset(4)} 258 ${centerX} 252 M${xAtOffset(-16)} 276 C${xAtOffset(-14)} 268 ${xAtOffset(-12)} 263 ${xAtOffset(-8)} 260 M${xAtOffset(16)} 276 C${xAtOffset(14)} 268 ${xAtOffset(12)} 263 ${xAtOffset(8)} 260`}
      />
      <rect x={xAtOffset(-18)} y="276" width="36" height="4" />
      <rect x={xAtOffset(-16)} y="280" width="32" height="218" />
      <path d={shaftFluteOffsets.map((fluteOffset) => `M${xAtOffset(fluteOffset)} 285 V493`).join(" ")} />
      <rect x={xAtOffset(-20)} y="498" width="40" height="5" />
      <rect x={xAtOffset(-24)} y="503" width="48" height="7" />
      <rect x={xAtOffset(-34)} y="512" width="68" height="28" />
    </>
  );
}

/** The arch itself (archivolt, keystone, two columns, stepped base) as separate shapes, shared by every arch drawing. */
export function ArchStructure() {
  return (
    <>
      {archRadii.map((radius) => (
        <path key={radius} d={`M${archCenterX - radius} 220 A${radius} ${radius} 0 0 1 ${archCenterX + radius} 220`} />
      ))}
      <rect x="281" y="92" width="42" height="7" />
      <path d="M285 99 L319 99 L312 141 L292 141 Z" />
      <path d="M291 105 H313 M302 105 V135" />
      <ClassicalColumn centerX={194} />
      <ClassicalColumn centerX={410} />
      <rect x="148" y="540" width="309" height="12" />
      <rect x="128" y="552" width="349" height="11" />
      <rect x="115" y="563" width="374" height="11" />
    </>
  );
}

/** The arch in front of the gold sun, without grid or measurements, for decorative spots. */
export function ClassicalArch({ className }: { className: string }) {
  return (
    <svg viewBox="96 50 414 530" aria-hidden="true" className={className}>
      <circle cx={archCenterX} cy="241" r="188" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.2" />
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <ArchStructure />
      </g>
    </svg>
  );
}

/** Blueprint SVG; HeroMotion animates its named `data-draw` groups in order. */
export function HeroArch({ className }: { className: string }) {
  const verticalGridPositions = Array.from({ length: 22 }, (_, index) => 18 + index * gridSpacing);
  const horizontalGridPositions = Array.from({ length: 23 }, (_, index) => 22 + index * gridSpacing);

  return (
    <svg viewBox="0 0 606 649" aria-hidden="true" direction="ltr" className={className}>
      <g data-draw="grid" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.8">
        {verticalGridPositions.map((gridX) => (
          <line key={`x${gridX}`} x1={gridX} y1="22" x2={gridX} y2="616" />
        ))}
        {horizontalGridPositions.map((gridY) => (
          <line key={`y${gridY}`} x1="18" y1={gridY} x2="585" y2={gridY} />
        ))}
      </g>

      <g data-draw="sun">
        <circle cx={archCenterX} cy="241" r="188" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1" />
      </g>

      <g data-draw="arch" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <ArchStructure />
      </g>

      <g data-draw="measures" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d={`M${archCenterX} 24 V614`} strokeDasharray="6 4" strokeOpacity="0.6" />
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
