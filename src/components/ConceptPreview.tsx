import { ConceptDrawing } from "./ConceptDrawing";

const pageWidth = 360;

/** Apartment grid with sold units filled, then gallery and lead form, for the real-estate wireframe. */
function RealEstateSections() {
  const soldUnits = new Set([1, 4, 5, 9, 12, 14, 18]);
  return (
    <>
      {Array.from({ length: 20 }, (_, unitIndex) => (
        <rect
          key={unitIndex}
          x={40 + (unitIndex % 5) * 58}
          y={330 + Math.floor(unitIndex / 5) * 34}
          width="50"
          height="26"
          rx="3"
          fill="currentColor"
          fillOpacity={soldUnits.has(unitIndex) ? 0.35 : 0}
        />
      ))}
      <path d="M40 316 H180" strokeOpacity="0.7" />
      <rect x="40" y="490" width="134" height="110" rx="4" />
      <rect x="186" y="490" width="134" height="52" rx="4" />
      <rect x="186" y="548" width="134" height="52" rx="4" />
      <path d="M40 640 H200 M40 680 H320 M40 714 H320 M40 748 H320" strokeOpacity="0.6" />
      <rect x="40" y="776" width="110" height="28" rx="14" fill="currentColor" fillOpacity="0.35" />
    </>
  );
}

/** Logo row, three feature cards, the AI chat and pricing, for the startup wireframe. */
function StartupSections() {
  return (
    <>
      <path d="M40 320 H90 M110 320 H160 M180 320 H230 M250 320 H300" strokeOpacity="0.5" />
      {[40, 136, 232].map((cardX) => (
        <rect key={cardX} x={cardX} y="360" width="88" height="110" rx="6" />
      ))}
      <rect x="60" y="510" width="240" height="120" rx="10" />
      <path d="M80 540 H220 M80 560 H180" strokeOpacity="0.6" />
      <rect x="150" y="584" width="130" height="28" rx="14" fill="currentColor" fillOpacity="0.3" />
      {[40, 136, 232].map((planX) => (
        <rect key={planX} x={planX} y="670" width="88" height="140" rx="6" />
      ))}
    </>
  );
}

/** Practice areas, team portraits and the three-step intake, for the law-firm wireframe. */
function LawFirmSections() {
  return (
    <>
      {[330, 362, 394, 426].map((rowY) => (
        <path key={rowY} d={`M40 ${rowY} H320 M40 ${rowY + 14} H200`} strokeOpacity="0.6" />
      ))}
      {[80, 180, 280].map((portraitX) => (
        <circle key={portraitX} cx={portraitX} cy="520" r="34" />
      ))}
      {[80, 180, 280].map((stepX, stepIndex) => (
        <g key={stepX}>
          <circle cx={stepX} cy="650" r="16" fill="currentColor" fillOpacity={stepIndex === 0 ? 0.35 : 0} />
          <path d={`M${stepX - 30} 690 H${stepX + 30}`} strokeOpacity="0.6" />
        </g>
      ))}
      <path d="M96 650 H164 M196 650 H264" strokeDasharray="4 4" />
      <rect x="125" y="740" width="110" height="30" rx="15" fill="currentColor" fillOpacity="0.35" />
    </>
  );
}

const sectionsByConceptIndex = [RealEstateSections, StartupSections, LawFirmSections];

/**
 * A small browser window showing the concept's whole page; hovering the card
 * scrolls the page inside the frame. Shows a blueprint wireframe until the
 * concept site exists and a real screenshot replaces it.
 */
export function ConceptPreview({ conceptIndex }: { conceptIndex: number }) {
  const Sections = sectionsByConceptIndex[conceptIndex];
  return (
    <div className="relative mb-4 overflow-hidden rounded-lg border border-gold/25 bg-navy">
      <div className="flex h-7 items-center gap-1.5 border-b border-gold/20 px-3" dir="ltr">
        <span className="size-2 rounded-full bg-gold/40" />
        <span className="size-2 rounded-full bg-gold/25" />
        <span className="size-2 rounded-full bg-gold/15" />
        <span className="ms-3 h-3 w-28 rounded-full bg-gold/10" />
      </div>
      <div className="h-56 overflow-hidden">
        <div className="motion-safe:transition-transform motion-safe:duration-[4000ms] motion-safe:ease-in-out motion-safe:group-hover:-translate-y-[calc(100%-14rem)]">
          <div className="flex justify-center pt-8 pb-4">
            <ConceptDrawing conceptIndex={conceptIndex} />
          </div>
          <svg
            viewBox={`0 170 ${pageWidth} 690`}
            aria-hidden="true"
            direction="ltr"
            className="block w-full text-gold"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M40 200 H260 M40 222 H220 M40 250 H150" strokeOpacity="0.6" />
              <rect x="40" y="270" width="90" height="26" rx="13" fill="currentColor" fillOpacity="0.3" />
              <Sections />
              <path d={`M0 840 H${pageWidth}`} strokeOpacity="0.3" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
