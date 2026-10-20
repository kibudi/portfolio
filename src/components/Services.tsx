import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SectionLabel } from "./SectionLabel";

const icons = [
  "M24 6 L34 22 L24 42 L14 22 Z M24 22 V42 M21 22 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0",
  "M10 18 H38 L35 42 H13 Z M18 18 V14 a6 6 0 0 1 12 0 V18",
  "M24 6 C25 16 32 23 42 24 C32 25 25 32 24 42 C23 32 16 25 6 24 C16 23 23 16 24 6 Z M38 8 V14 M35 11 H41",
];

/**
 * Three service cards in the shape of the original Figma's "Why hire us"
 * cards: numeral, title and text on one side, and a gold sun holding a line
 * icon (pen nib, shopping bag, spark) peeking in from the far edge.
 */
export function Services({ copy }: { copy: Dictionary["services"] }) {
  return (
    <section id="services" className="page-x section-y flex flex-col gap-12">
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
            className="card group flex min-h-[300px] flex-col gap-3 py-9 ps-8 pe-28 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="font-display text-3xl text-gold">{item.numeral}</span>
            <h3 className="font-display text-[28px] font-semibold uppercase tracking-[0.06em]">{item.title}</h3>
            <p className="text-[15px] leading-[1.65] text-muted">{item.body}</p>
            <p className="mt-auto text-xs uppercase tracking-[0.16em] text-sand">{item.tags}</p>
            <svg
              width="150"
              height="150"
              viewBox="0 0 150 150"
              aria-hidden="true"
              className="absolute -end-12 top-1/2 -translate-y-1/2 text-gold transition-transform duration-500 group-hover:scale-105"
            >
              <circle cx="75" cy="75" r="70" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" />
              <path
                d={icons[index]}
                transform="translate(39 39) scale(1.5)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}
