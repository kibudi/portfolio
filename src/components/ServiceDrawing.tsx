const gearTeethPath = (toothBase: number, toothTip: number, halfWidth: number) =>
  `M${-halfWidth} ${-toothBase} V${-toothTip} H${halfWidth} V${-toothBase} ` +
  `M${-halfWidth} ${toothBase} V${toothTip} H${halfWidth} V${toothBase} ` +
  `M${-toothBase} ${-halfWidth} H${-toothTip} V${halfWidth} H${-toothBase} ` +
  `M${toothBase} ${-halfWidth} H${toothTip} V${halfWidth} H${toothBase}`;

/** A measured page plan with a drafting compass, for "design to code". */
function PagePlanDrawing() {
  return (
    <>
      <rect x="30" y="14" width="120" height="82" rx="3" />
      <path d="M30 26 H150 M36 20 h3 M42 20 h3 M48 20 h3" />
      <rect x="40" y="34" width="56" height="10" />
      <path d="M40 52 H120 M40 58 H110 M40 64 H116" />
      <rect x="40" y="72" width="30" height="14" />
      <rect x="104" y="34" width="36" height="38" />
      <path d="M30 104 H150 M30 100 V108 M150 100 V108" strokeOpacity="0.7" />
      <path d="M160 14 V96 M156 14 H164 M156 96 H164" strokeOpacity="0.7" />
      <path d="M14 90 L52 30 M14 90 L30 92" strokeOpacity="0.7" />
      <circle cx="52" cy="30" r="2.5" />
    </>
  );
}

/** A shop front elevation with awning, arched door and windows, for "stores and systems". */
function ShopFrontDrawing() {
  const awningScallops = Array.from({ length: 8 }, () => "q7 10 14 0").join(" ");
  return (
    <>
      <rect x="34" y="18" width="112" height="14" />
      <path d={`M34 32 ${awningScallops}`} />
      <rect x="38" y="44" width="104" height="54" />
      <path d="M78 98 V66 A12 12 0 0 1 102 66 V98" />
      <rect x="46" y="54" width="24" height="28" />
      <rect x="110" y="54" width="24" height="28" />
      <path d="M58 54 V82 M46 68 H70 M122 54 V82 M110 68 H134" />
      <path d="M26 98 H154" />
      <path d="M60 22 H120" strokeOpacity="0.6" />
    </>
  );
}

/** Two meshing gears with a spark, for "AI and automation". */
function MechanismDrawing() {
  const largeGearTeeth = gearTeethPath(26, 33, 4);
  const smallGearTeeth = gearTeethPath(16, 21, 3);
  return (
    <>
      <circle cx="72" cy="56" r="26" />
      <circle cx="72" cy="56" r="8" />
      <g transform="translate(72 56)">
        <path d={largeGearTeeth} />
        <path d={largeGearTeeth} transform="rotate(45)" />
      </g>
      <circle cx="122" cy="40" r="16" />
      <circle cx="122" cy="40" r="5" />
      <g transform="translate(122 40)">
        <path d={smallGearTeeth} />
        <path d={smallGearTeeth} transform="rotate(45)" />
      </g>
      <path d="M118 70 l4 -8 l4 8 l8 4 l-8 4 l-4 8 l-4 -8 l-8 -4 Z" />
      <path d="M20 100 H160" strokeOpacity="0.6" strokeDasharray="3 4" />
    </>
  );
}

const drawingsByServiceIndex = [PagePlanDrawing, ShopFrontDrawing, MechanismDrawing];

/** The small gold blueprint drawing shown at the top of each service card. */
export function ServiceDrawing({ serviceIndex }: { serviceIndex: number }) {
  const Drawing = drawingsByServiceIndex[serviceIndex];
  return (
    <svg
      width="180"
      height="110"
      viewBox="0 0 180 110"
      aria-hidden="true"
      direction="ltr"
      data-scroll="draw"
      className="self-center text-gold"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <Drawing />
      </g>
    </svg>
  );
}
