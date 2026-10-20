const columnCenterX = 244;
const shaftFluteXPositions = [222, 233, 244, 255, 266];
const capitalEggCount = 8;

/** Blueprint drawing; individual SVG shapes let ScrollMotion draw it on entry. */
export function AboutColumn() {
  return (
    <svg
      width="340"
      height="561"
      viewBox="0 0 488 805"
      aria-hidden="true"
      direction="ltr"
      data-scroll="draw"
      className="text-gold"
    >
      <circle cx={columnCenterX} cy="192" r="118" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M181 132 H307 L301 142 H187 Z" />
        <rect x="190" y="142" width="108" height="8" />
        <path d={`M196 158 ${Array.from({ length: capitalEggCount }, () => "q5.5 9 11 0").join(" ")}`} />
        <circle cx="195" cy="176" r="15" />
        <circle cx="293" cy="176" r="15" />
        <path d="M195 176 m-8 0 a8 8 0 1 0 8 -8 a5 5 0 1 1 -5 5 M293 176 m8 0 a8 8 0 1 1 -8 -8 a5 5 0 1 0 5 5" />
        <path d="M210 170 H278 M210 182 H278" />
        <rect x="207" y="190" width="74" height="9" />
        <rect x="212" y="199" width="64" height="446" />
        <path d={shaftFluteXPositions.map((fluteX) => `M${fluteX} 206 V639`).join(" ")} />
        <rect x="200" y="645" width="88" height="10" rx="5" />
        <rect x="206" y="655" width="76" height="7" />
        <rect x="197" y="662" width="94" height="12" rx="6" />
        <rect x="190" y="674" width="108" height="14" />
        <rect x="176" y="688" width="136" height="18" />
      </g>
      <path
        d="M391 114 V385 M391 425 V697 M382 114 H400 M382 697 H400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <text
        x="391"
        y="411"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="17"
        letterSpacing="1"
      >
        4.68 M
      </text>
    </svg>
  );
}
