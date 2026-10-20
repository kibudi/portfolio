import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeroArch } from "./HeroArch";
import { HeroMotion } from "./HeroMotion";

/**
 * Top of the page: eyebrow, the two-line title with the gold accent, the
 * construction-to-code intro, two calls to action, and the blueprint arch.
 * On phones the arch sits above the text; on desktop it sits beside it (on
 * the left in Hebrew, since the grid follows the text direction).
 * `data-reveal` marks what HeroMotion animates; the <noscript> style keeps
 * the hero visible when JavaScript is off.
 */
export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <HeroMotion>
      <noscript>
        <style>{"[data-hero-motion]{visibility:visible!important}"}</style>
      </noscript>
      <section
        id="top"
        className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 pt-8 pb-16 md:px-12 lg:grid-cols-2 lg:gap-12 lg:pt-16 xl:px-24"
      >
        <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-7">
          <p
            data-reveal="eyebrow"
            className="text-xs uppercase tracking-[0.22em] text-gold md:text-[13px] md:tracking-[0.24em]"
          >
            {copy.eyebrow}
          </p>
          <h1
            data-reveal="title"
            className="font-display text-[56px] font-medium leading-[0.95] md:text-[80px] xl:text-[104px]"
          >
            {copy.titleLead}
            <br />
            <span className="italic text-gold rtl:not-italic">{copy.titleAccent}</span>
          </h1>
          <p data-reveal="body" className="max-w-[480px] text-base leading-relaxed text-muted md:text-lg">
            {copy.body}
          </p>
          <div data-reveal="actions" className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#work"
              className="flex h-13 items-center justify-center bg-gold px-7 text-sm font-medium uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-bright"
            >
              {copy.primaryCta}
            </a>
            <a
              href="#contact"
              className="flex h-13 items-center justify-center border border-gold px-7 text-sm font-medium uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              {copy.secondaryCta}
            </a>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <HeroArch className="w-[280px] md:w-[420px] xl:w-[560px]" />
        </div>
      </section>
    </HeroMotion>
  );
}
