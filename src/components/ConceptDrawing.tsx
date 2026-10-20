/** A residential tower elevation with floor lines and a highlighted unit, for the real-estate concept. */
function TowerDrawing() {
  const floorLines = Array.from({ length: 9 }, (_, floorIndex) => `M64 ${30 + floorIndex * 8} H116`).join(" ");
  return (
    <>
      <path d="M64 102 V22 L90 10 L116 22 V102" />
      <path d={floorLines} strokeOpacity="0.6" />
      <path d="M77 22 V102 M90 14 V102 M103 22 V102" strokeOpacity="0.35" />
      <rect x="90" y="54" width="13" height="8" fill="currentColor" fillOpacity="0.35" />
      <path d="M40 102 H140 M48 102 V78 H64 M116 86 H132 V102" />
      <path d="M103 58 H150 M150 52 V64" strokeOpacity="0.7" />
    </>
  );
}

/** A browser window with a product chart and an AI chat bubble, for the startup concept. */
function LaunchSiteDrawing() {
  return (
    <>
      <rect x="22" y="14" width="112" height="78" rx="4" />
      <path d="M22 26 H134 M28 20 h3 M34 20 h3 M40 20 h3" />
      <path d="M32 78 L52 62 L68 68 L92 44 L118 52" />
      <path d="M32 84 H124" strokeOpacity="0.5" />
      <rect x="32" y="34" width="38" height="8" strokeOpacity="0.7" />
      <path d="M112 64 H160 a6 6 0 0 1 6 6 V92 a6 6 0 0 1 -6 6 H130 L120 106 V98 H112 a6 6 0 0 1 -6 -6 V70 a6 6 0 0 1 6 -6 Z" />
      <path d="M116 76 H156 M116 84 H146" strokeOpacity="0.7" />
    </>
  );
}

/** A classical portico with the scales of justice, for the law-firm concept. */
function LawFirmDrawing() {
  return (
    <>
      <path d="M40 34 L90 12 L140 34 Z" />
      <path d="M44 38 H136 M44 100 H136 M38 106 H142" />
      <path d="M54 42 V96 M66 42 V96 M114 42 V96 M126 42 V96" />
      <path d="M90 46 V90 M78 90 H102" />
      <path d="M72 54 H108" />
      <path d="M72 54 L64 70 H80 Z M108 54 L100 70 H116 Z" />
    </>
  );
}

const drawingsByConceptIndex = [TowerDrawing, LaunchSiteDrawing, LawFirmDrawing];

/** The gold blueprint drawing at the top of each concept card. */
export function ConceptDrawing({ conceptIndex }: { conceptIndex: number }) {
  const Drawing = drawingsByConceptIndex[conceptIndex];
  return (
    <svg
      width="180"
      height="118"
      viewBox="0 0 180 118"
      aria-hidden="true"
      direction="ltr"
      data-scroll="draw"
      className="text-gold"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <Drawing />
      </g>
    </svg>
  );
}
