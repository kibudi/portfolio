import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SectionLabel } from "./SectionLabel";

/** The three-step "How it works" strip, joined by a dashed gold blueprint line. */
export function Process({ copy }: { copy: Dictionary["process"] }) {
  return (
    <section id="process" className="page-x pb-20 lg:pb-30">
      <div data-scroll="up" className="mb-12 flex flex-col items-center gap-4 text-center">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 className="font-display text-[36px] font-medium leading-tight md:text-[52px]">{copy.title}</h2>
      </div>
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-[16%] top-7 hidden border-t border-dashed border-gold/50 md:block"
        />
        {copy.steps.map((processStep, stepIndex) => (
          <li key={processStep.title} data-scroll="up" className="relative flex flex-col items-center gap-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full border border-gold bg-navy font-display text-2xl text-gold">
              {stepIndex + 1}
            </span>
            <h3 className="font-display text-2xl font-semibold">{processStep.title}</h3>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-muted">{processStep.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
