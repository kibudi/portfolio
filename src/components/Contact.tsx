import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Accent } from "./Accent";
import { AvailabilityNote } from "./AvailabilityNote";
import { ContactForm } from "./ContactForm";
import { ClassicalArch } from "./HeroArch";
import { SectionLabel } from "./SectionLabel";

export function Contact({ copy }: { copy: Dictionary["contact"] }) {
  return (
    <section id="contact" className="page-x section-y">
      <div data-scroll="up" className="card grid lg:grid-cols-2">
        <div className="flex flex-col gap-5 p-6 md:p-16">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="mb-2 font-display text-[40px] font-medium leading-[1.05] md:text-[52px]">
            <Accent lead={copy.titleLead} accent={copy.titleAccent} />
          </h2>
          <ContactForm copy={copy} />
        </div>
        <div className="relative flex min-h-[320px] flex-col justify-between gap-10 overflow-hidden bg-navy/60 p-6 md:p-16">
          <ClassicalArch className="pointer-events-none absolute -end-16 -bottom-12 w-[380px] text-gold opacity-70" />
          <div className="relative flex flex-col gap-8">
            <AvailabilityNote text={copy.availability} />
            <div>
              <p className="text-[13px] uppercase tracking-[0.2em] text-faint">{copy.basedInLabel}</p>
              <p className="font-display text-3xl">{copy.basedIn}</p>
            </div>
          </div>
          <p className="relative text-[15px] text-muted">{copy.reply}</p>
        </div>
      </div>
    </section>
  );
}
