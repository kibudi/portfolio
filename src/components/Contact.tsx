import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ContactForm } from "./ContactForm";
import { SectionLabel } from "./SectionLabel";

/**
 * Contact block: the form on one side, a raised panel with location and
 * reply time on the other, with the gold arch drawn faintly behind it.
 */
export function Contact({ copy }: { copy: Dictionary["contact"] }) {
  return (
    <section id="contact" className="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-12 lg:py-30 xl:px-24">
      <div data-scroll="up" className="grid overflow-hidden border border-gold/35 lg:grid-cols-2">
        <div className="flex flex-col gap-5 p-6 md:p-16">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="mb-2 font-display text-[40px] font-medium leading-[1.05] md:text-[52px]">
            {copy.titleLead}
            <br />
            <span className="italic text-gold rtl:not-italic">{copy.titleAccent}</span>
          </h2>
          <ContactForm copy={copy} />
        </div>
        <div className="relative flex min-h-[320px] flex-col justify-between gap-10 overflow-hidden bg-navy-raised p-6 md:p-16">
          <svg
            width="420"
            height="420"
            viewBox="0 0 420 420"
            aria-hidden="true"
            className="pointer-events-none absolute -end-15 -bottom-10 opacity-80"
          >
            <circle cx="210" cy="190" r="170" fill="rgb(201 164 92 / 0.10)" stroke="#C9A45C" strokeWidth="1" />
            <g fill="none" stroke="#C9A45C" strokeWidth="1.4">
              <path d="M70 220 A140 140 0 0 1 350 220" />
              <path d="M112 220 A98 98 0 0 1 308 220" />
              <rect x="70" y="220" width="42" height="180" />
              <rect x="308" y="220" width="42" height="180" />
              <path d="M193 72 L227 72 L221 104 L199 104 Z" />
            </g>
          </svg>
          <div className="relative">
            <p className="text-[13px] uppercase tracking-[0.2em] text-faint">{copy.basedInLabel}</p>
            <p className="font-display text-3xl">{copy.basedIn}</p>
          </div>
          <p className="relative text-[15px] text-muted">{copy.reply}</p>
        </div>
      </div>
    </section>
  );
}
