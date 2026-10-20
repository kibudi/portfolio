"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * Scroll animations for everything below the hero. Elements marked
 * `data-scroll="up"` rise and fade in, in small staggered batches, the first
 * time they come into view; an SVG marked `data-scroll="draw"` draws its
 * lines. An IntersectionObserver reports every element's position as soon
 * as it starts watching, so a page that opens already scrolled (an anchor
 * link, a reload) reveals what is on screen and shows what it skipped past
 * at once.
 *
 * Only opacity is animated, never visibility, so keyboard users can still
 * Tab into a section before it has appeared; focusing inside one reveals it
 * immediately. Reduced motion skips all of it.
 */
export function ScrollMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const risers = q("[data-scroll='up']");
        const drawings = q("[data-scroll='draw']");
        const lines = (svg: Element) => svg.querySelectorAll("path, rect, circle");
        const isDrawing = (element: Element) => (element as HTMLElement).dataset.scroll === "draw";
        const show = (element: Element) => gsap.set(element, { opacity: 1, y: 0, overwrite: true });

        gsap.set(risers, { opacity: 0, y: 32 });
        drawings.forEach((svg) => gsap.set(lines(svg), { drawSVG: 0 }));

        const observer = new IntersectionObserver(
          (entries) => {
            const entering: Element[] = [];
            for (const entry of entries) {
              if (entry.isIntersecting) entering.push(entry.target);
              else if (entry.boundingClientRect.bottom < 0) {
                if (isDrawing(entry.target)) gsap.set(lines(entry.target), { drawSVG: "100%" });
                else show(entry.target);
              } else continue;
              observer.unobserve(entry.target);
            }

            const enteringRisers = entering.filter((target) => !isDrawing(target));
            if (enteringRisers.length) {
              gsap.to(enteringRisers, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
            }
            for (const svg of entering.filter(isDrawing)) {
              gsap.to(lines(svg), { drawSVG: "100%", duration: 1.4, stagger: 0.08, ease: "power2.inOut" });
            }
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        [...risers, ...drawings].forEach((element) => observer.observe(element));

        const onFocus = (event: FocusEvent) => {
          const riser = (event.target as Element).closest("[data-scroll='up']");
          if (riser) {
            observer.unobserve(riser);
            show(riser);
          }
        };
        const root = scope.current;
        root?.addEventListener("focusin", onFocus);

        return () => {
          observer.disconnect();
          root?.removeEventListener("focusin", onFocus);
        };
      });
      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
