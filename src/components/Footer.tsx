import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site } from "@/site";

/** Name, the credit to the original Figma design, and the GitHub link. */
export function Footer({ name, copy }: { name: string; copy: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="page-x flex flex-col gap-4 py-8 text-[13px] text-faint md:flex-row md:items-center md:justify-between">
        <span className="font-display text-xl text-ivory">{name}</span>
        <a href={site.designSource} className="transition-colors hover:text-gold">
          {copy.credit}
        </a>
        <a href={site.github} className="text-gold transition-colors hover:text-gold-bright">
          GitHub
        </a>
      </div>
    </footer>
  );
}
