import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site } from "@/site";
import { ArchMark } from "./ArchMark";

const socials = [
  {
    name: "LinkedIn",
    href: site.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21H9z",
  },
  {
    name: "GitHub",
    href: site.github,
    path: "M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
];

/**
 * Footer in the original Figma's shape: logo and a short line on one side,
 * a row of square gold-outlined social buttons under it, and the gold arch
 * on the other side; the credit to the original design runs along the
 * bottom. Buttons fill gold on hover and focus.
 */
export function Footer({ name, copy }: { name: string; copy: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line bg-navy-raised">
      <div className="page-x flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-gold">
            <ArchMark />
            <span className="font-display text-2xl font-semibold text-ivory">{name}</span>
          </div>
          <p className="max-w-[320px] text-[15px] leading-relaxed text-muted">{copy.tagline}</p>
          <ul className="flex gap-3">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={social.name}
                  className="flex size-11 items-center justify-center border border-gold text-gold transition-colors hover:bg-gold hover:text-navy focus-visible:bg-gold focus-visible:text-navy"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <svg width="120" height="150" viewBox="0 0 340 420" aria-hidden="true" className="hidden text-gold opacity-70 md:block">
          <circle cx="170" cy="150" r="110" fill="currentColor" fillOpacity="0.10" stroke="currentColor" strokeWidth="2" />
          <g fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M70 180 A100 100 0 0 1 270 180" />
            <path d="M105 180 A65 65 0 0 1 235 180" />
            <rect x="70" y="180" width="35" height="200" />
            <rect x="235" y="180" width="35" height="200" />
            <rect x="50" y="380" width="240" height="16" />
          </g>
        </svg>
      </div>
      <div className="border-t border-line">
        <div className="page-x py-5 text-[13px] text-faint">
          <a href={site.designSource} className="transition-colors hover:text-gold">
            {copy.credit}
          </a>
        </div>
      </div>
    </footer>
  );
}
