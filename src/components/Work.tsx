import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import huntpilotBoard from "@/assets/huntpilot-board.jpg";
import { site } from "@/site";
import { OliveBranch } from "./OliveBranch";
import { SectionLabel } from "./SectionLabel";

/**
 * Selected work in the original Figma's card shape: huntpilot as the large
 * featured card (screenshot uses mock data), and two cards for the projects
 * that come next, each with the gold olive branch in its corner.
 */
export function Work({ copy }: { copy: Dictionary["work"] }) {
  const { featured } = copy;

  return (
    <section id="work" className="page-x section-y flex flex-col gap-12">
      <div data-scroll="up" className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="font-display text-[40px] font-medium leading-tight md:text-[64px]">{copy.title}</h2>
        </div>
        <a
          href={site.github}
          className="shrink-0 text-sm uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-bright"
        >
          {copy.github} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article
          data-scroll="up"
          className="card group flex flex-col gap-4 p-6 md:p-10 lg:row-span-2"
        >
          <div className="overflow-hidden rounded-xl">
            <Image
              src={huntpilotBoard}
              alt={featured.imageAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-gold">{featured.kind}</p>
          <h3 className="font-display text-[40px] font-semibold">{featured.title}</h3>
          <p className="max-w-[520px] text-base leading-[1.65] text-muted">{featured.body}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
            <p className="text-[13px] uppercase tracking-[0.14em] text-sand">{featured.tags}</p>
            <a
              href={site.huntpilotRepo}
              className="text-sm uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-bright"
            >
              {featured.cta} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
            </a>
          </div>
        </article>

        {copy.upcoming.map((card) => (
          <article
            key={card.title}
            data-scroll="up"
            className="card flex min-h-[260px] flex-col justify-end gap-3 p-6 md:p-10"
          >
            <OliveBranch className="pointer-events-none absolute -end-2 -bottom-2 w-44 text-gold opacity-25 rtl:-scale-x-100" />
            <p className="relative text-[13px] uppercase tracking-[0.2em] text-gold">{card.kind}</p>
            <h3 className="relative font-display text-[34px] font-semibold leading-tight">{card.title}</h3>
            <p className="relative text-[15px] text-muted">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
