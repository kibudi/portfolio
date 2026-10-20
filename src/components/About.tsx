import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SectionLabel } from "./SectionLabel";

/**
 * The construction-to-code story with three facts, beside a single gold
 * column drawn as blueprint line art (hidden on phones).
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <section id="about" className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-20 md:px-12 lg:grid-cols-12 lg:py-30 xl:px-24">
      <div data-scroll="up" className="flex flex-col gap-7 lg:col-span-7">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 className="font-display text-[44px] font-medium leading-[1.02] md:text-[64px]">
          {copy.titleLead}
          <br />
          <span className="italic text-gold rtl:not-italic">{copy.titleAccent}</span>
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
        <svg width="340" height="560" viewBox="0 0 340 560" aria-hidden="true" direction="ltr" data-scroll="draw">
          <circle cx="190" cy="230" r="120" fill="rgb(201 164 92 / 0.12)" stroke="#C9A45C" strokeWidth="1" />
          <g fill="none" stroke="#C9A45C" strokeWidth="1.6">
            <path d="M110 70 L230 70 L220 92 L120 92 Z" />
            <path d="M104 60 Q170 40 236 60" />
            <rect x="128" y="92" width="84" height="22" />
            <rect x="138" y="114" width="64" height="380" />
            <path d="M154 124 V484 M170 124 V484 M186 124 V484" />
            <rect x="122" y="494" width="96" height="20" />
            <rect x="108" y="514" width="124" height="14" />
          </g>
          <path d="M60 60 V528 M52 60 H68 M52 528 H68" stroke="#C9A45C" strokeWidth="0.9" opacity="0.8" />
          <text x="40" y="320" transform="rotate(-90 40 320)" fill="#C9A45C" fontSize="11" letterSpacing="2">
            4.68 M
          </text>
        </svg>
      </div>
    </section>
  );
}
