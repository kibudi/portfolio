import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SectionLabel } from "./SectionLabel";

/** Three numbered service cards; the middle one is lightly tinted gold. */
export function Services({ copy }: { copy: Dictionary["services"] }) {
  return (
    <section id="services" className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 py-20 md:px-12 lg:py-30 xl:px-24">
      <div data-scroll="up" className="flex flex-col items-center gap-4 text-center">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 className="font-display text-[40px] font-medium leading-tight md:text-[64px]">{copy.title}</h2>
        <p className="max-w-[640px] text-base leading-relaxed text-muted md:text-lg">{copy.lead}</p>
      </div>
      <ul className="grid gap-6 lg:grid-cols-3">
        {copy.items.map((item, index) => (
          <li
            key={item.title}
            data-scroll="up"
            className={`group flex min-h-[340px] flex-col gap-4 border border-gold/35 px-8 py-10 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold ${
              index === 1 ? "bg-gold/6" : ""
            }`}
          >
            <span className="font-display text-[40px] text-gold">{item.numeral}</span>
            <h3 className="font-display text-[32px] font-semibold">{item.title}</h3>
            <p className="text-base leading-[1.65] text-muted">{item.body}</p>
            <p className="mt-auto text-[13px] uppercase tracking-[0.16em] text-sand">{item.tags}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
