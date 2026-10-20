export function Accent({ lead, accent }: { lead: string; accent: string }) {
  return (
    <>
      {lead}{" "}
      <br />
      <span className="italic text-gold rtl:not-italic">{accent}</span>
    </>
  );
}
