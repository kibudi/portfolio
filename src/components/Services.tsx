import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SectionLabel } from "./SectionLabel";
import { ServiceDrawing } from "./ServiceDrawing";

/** Service cards shaped like palace windows, with the numeral on a gold keystone. */
export function Services({ copy }: { copy: Dictionary["services"] }) {
  return (
    <section id="services" className="page-x section-y flex flex-col gap-12">
      <div data-scroll="up" className="flex flex-col items-center gap-4 text-center">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 className="font-display text-[40px] font-medium leading-tight md:text-[64px]">{copy.title}</h2>
        <p className="max-w-[640px] text-base leading-relaxed text-muted md:text-lg">{copy.lead}</p>
      </div>
      <ul className="grid gap-8 lg:grid-cols-3">
        {copy.items.map((serviceItem, serviceIndex) => (
          <li
            key={serviceItem.title}
            data-scroll="up"
            className="card flex min-h-[520px] flex-col gap-3 rounded-t-[200px] px-9 pt-28 pb-8 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 rounded-t-[190px] rounded-b-xl border border-gold/45"
            />
            <span dir="ltr" className="absolute top-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center bg-gold font-display text-[22px] font-semibold text-navy [clip-path:polygon(0_0,100%_0,82%_100%,18%_100%)]">
              {serviceItem.numeral}
            </span>
            <ServiceDrawing serviceIndex={serviceIndex} />
            <h3 className="mt-2 font-display text-[28px] font-semibold uppercase tracking-[0.06em]">{serviceItem.title}</h3>
            <p className="text-[15px] leading-[1.6] text-muted">{serviceItem.body}</p>
            <p className="mt-auto text-xs uppercase tracking-[0.16em] text-sand">{serviceItem.tags}</p>
          </li>
        ))}
      </ul>
      <p data-scroll="up" className="text-center text-xs uppercase leading-loose tracking-[0.16em] text-sand">
        {copy.terms}
      </p>
    </section>
  );
}
