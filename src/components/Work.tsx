import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import huntpilotBoard from "@/assets/huntpilot-board.jpg";
import { site } from "@/site";
import { ConceptDrawing } from "./ConceptDrawing";
import { OliveBranch } from "./OliveBranch";
import { SectionLabel } from "./SectionLabel";

/** The catalog of concept sites, then huntpilot as a smaller "also built" card. */
export function Work({ copy }: { copy: Dictionary["work"] }) {
  const { featured } = copy;

  return (
    <section id="work" className="page-x section-y flex flex-col gap-12">
      <div data-scroll="up" className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[720px] flex-col gap-4">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="font-display text-[40px] font-medium leading-tight md:text-[64px]">{copy.title}</h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">{copy.lead}</p>
        </div>
        <a
          href={site.github}
          className="shrink-0 text-sm uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-bright"
        >
          {copy.github} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
        </a>
      </div>

      <ul className="grid gap-6 lg:grid-cols-3">
        {copy.concepts.map((concept, conceptIndex) => (
          <li
            key={concept.title}
            data-scroll="up"
            className="card flex min-h-[460px] flex-col gap-3 p-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-xl border border-gold/35" />
            <OliveBranch className="pointer-events-none absolute -end-2 -bottom-2 w-36 text-gold opacity-15 rtl:-scale-x-100" />
            <div className="relative mb-4 flex justify-center rounded-lg bg-navy/60 py-6">
              <ConceptDrawing conceptIndex={conceptIndex} />
            </div>
            <p className="relative text-[13px] uppercase tracking-[0.2em] text-gold">{concept.kind}</p>
            <h3 className="relative font-display text-[30px] font-semibold leading-tight">{concept.title}</h3>
            <p className="relative text-[15px] leading-[1.6] text-muted">{concept.body}</p>
            <p className="relative mt-auto self-start rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sand">
              {copy.status}
            </p>
          </li>
        ))}
      </ul>

      <article data-scroll="up" className="card group grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-xl border border-gold/35" />
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={huntpilotBoard}
            alt={featured.imageAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 680px, 100vw"
            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className="text-[13px] uppercase tracking-[0.2em] text-gold">
            {copy.alsoBuiltLabel} · {featured.kind}
          </p>
          <h3 className="font-display text-[36px] font-semibold">{featured.title}</h3>
          <p className="text-base leading-[1.65] text-muted">{featured.body}</p>
          <p className="text-[13px] uppercase tracking-[0.14em] text-sand">{featured.tags}</p>
          <a
            href={site.huntpilotRepo}
            className="mt-2 self-start text-sm uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-bright"
          >
            {featured.cta} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
          </a>
        </div>
      </article>
    </section>
  );
}
