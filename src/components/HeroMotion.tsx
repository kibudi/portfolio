"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, SplitText);

/**
 * Plays the hero's opening once: the gold sun rises, the blueprint grid
 * fades in, the arch draws itself line by line, the measurements follow,
 * and the title slides up word by word with the intro and buttons after it.
 *
 * Targets are found by `data-draw` (inside the arch drawing) and
 * `data-reveal` (text) within this wrapper. They start hidden through CSS
 * in globals.css, only when the visitor allows motion; with reduced motion
 * nothing is hidden and nothing animates.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const title = q("[data-reveal='title']")[0];

        SplitText.create(title, {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit: (split) => {
            const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
            timeline
              .set(scope.current, { autoAlpha: 1 })
              .from(q("[data-draw='sun']"), { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 42%", duration: 1.4 })
              .from(q("[data-draw='grid']"), { autoAlpha: 0, duration: 1 }, 0.2)
              .from(
                q("[data-draw='arch'] > *"),
                { drawSVG: 0, duration: 1.3, stagger: 0.07, ease: "power2.inOut" },
                0.4,
              )
              .from(q("[data-draw='measures'] > *"), { drawSVG: 0, duration: 0.8, stagger: 0.1 }, 1.4)
              .from(q("[data-draw='labels']"), { autoAlpha: 0, duration: 0.6 }, 1.8)
              .from(q("[data-reveal='eyebrow']"), { autoAlpha: 0, y: 12, duration: 0.7 }, 0.3)
              .from(split.words, { yPercent: 110, duration: 1, stagger: 0.08 }, 0.45)
              .from(q("[data-reveal='body'], [data-reveal='actions']"), {
                autoAlpha: 0,
                y: 16,
                duration: 0.8,
                stagger: 0.12,
              }, 1);
            return timeline;
          },
        });
      });
      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} data-hero-motion="">
      {children}
    </div>
  );
}
