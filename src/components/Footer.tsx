import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site } from "@/site";

/** Name, the credit to the original Figma design, and the GitHub link. */
export function Footer({ name, copy }: { name: string; copy: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 text-[13px] text-faint md:flex-row md:items-center md:justify-between md:px-12 xl:px-24">
        <span className="font-display text-xl text-ivory">{name}</span>
        <a href={site.designSource} className="transition-colors hover:text-gold">
          {copy.credit}
        </a>
        <nav aria-label={copy.social}>
          <a href={site.github} className="text-gold transition-colors hover:text-gold-bright">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
