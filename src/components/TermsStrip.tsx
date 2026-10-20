/** The white-label terms right under the hero, standing in for client logos. */
export function TermsStrip({ terms }: { terms: string }) {
  return (
    <div className="border-y border-line bg-navy-raised/60">
      <p className="page-x py-5 text-center text-xs uppercase leading-loose tracking-[0.16em] text-sand">{terms}</p>
    </div>
  );
}
