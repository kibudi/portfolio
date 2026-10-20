/** The small gold uppercase line above every section title. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] uppercase tracking-[0.24em] text-gold">{children}</p>;
}
