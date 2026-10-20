"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * Draws the hero's blueprint arch once: the gold sun rises, the grid fades
 * in, the arch draws itself line by line, and the measurements follow.
 * Targets are the `data-draw` groups inside the drawing. The text beside it
 * animates with CSS (globals.css), so it never waits for this script.
 * Reduced motion skips the drawing and shows it complete.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .set(q("svg"), { visibility: "visible" })
          .from(q("[data-draw='sun']"), { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 42%", duration: 1.4 })
          .from(q("[data-draw='grid']"), { autoAlpha: 0, duration: 1 }, 0.2)
          .from(q("[data-draw='arch'] > *"), { drawSVG: 0, duration: 1.3, stagger: 0.07, ease: "power2.inOut" }, 0.4)
          .from(q("[data-draw='measures'] > *"), { drawSVG: 0, duration: 0.8, stagger: 0.1 }, 1.4)
          .from(q("[data-draw='labels']"), { autoAlpha: 0, duration: 0.6 }, 1.8);
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
