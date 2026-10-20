import type { Dictionary } from "@/app/[lang]/dictionaries";
import { AboutColumn } from "./AboutColumn";
import { Accent } from "./Accent";
import { SectionLabel } from "./SectionLabel";

/**
 * The construction-to-code story with three facts, beside the Ionic column
 * drawing (hidden on phones).
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <section id="about" className="page-x section-y grid items-center gap-12 lg:grid-cols-12">
      <div data-scroll="up" className="flex flex-col gap-7 lg:col-span-7">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 className="font-display text-[44px] font-medium leading-[1.02] md:text-[64px]">
          <Accent lead={copy.titleLead} accent={copy.titleAccent} />
        </h2>
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-[620px] text-base leading-[1.7] text-muted md:text-lg">
            {paragraph}
          </p>
        ))}
        <dl className="mt-4 grid grid-cols-3 gap-4 md:gap-6">
          {copy.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-t border-gold/40 pt-4">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-3xl text-gold md:text-[44px]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="hidden justify-center lg:col-span-4 lg:col-start-9 lg:flex">
        <AboutColumn />
      </div>
    </section>
  );
}
