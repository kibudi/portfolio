/**
 * A two-line title: the lead line, then the gold accent line. The accent is
 * italic in English and upright in Hebrew, which has no italic tradition.
 * The space before the line break keeps the words apart for screen readers.
 */
export function Accent({ lead, accent }: { lead: string; accent: string }) {
  return (
    <>
      {lead}{" "}
      <br />
      <span className="italic text-gold rtl:not-italic">{accent}</span>
    </>
  );
}
