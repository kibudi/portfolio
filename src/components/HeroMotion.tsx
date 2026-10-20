"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/** Animates the hero drawing while keeping its text independent of JavaScript. */
export function HeroMotion({ children }: { children: ReactNode }) {
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motionPreference = gsap.matchMedia();
      motionPreference.add("(prefers-reduced-motion: no-preference)", () => {
        const selectAnimationTargets = gsap.utils.selector(animationContainerRef);
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .set(selectAnimationTargets("svg"), { visibility: "visible" })
          .from(selectAnimationTargets("[data-draw='sun']"), { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 42%", duration: 1.4 })
          .from(selectAnimationTargets("[data-draw='grid']"), { autoAlpha: 0, duration: 1 }, 0.2)
          .from(selectAnimationTargets("[data-draw='arch'] > *"), { drawSVG: 0, duration: 1.2, stagger: 0.035, ease: "power2.inOut" }, 0.4)
          .from(selectAnimationTargets("[data-draw='measures'] > *"), { drawSVG: 0, duration: 0.8, stagger: 0.08 }, 1.5)
          .from(selectAnimationTargets("[data-draw='labels']"), { autoAlpha: 0, duration: 0.6 }, 1.8);
      });
      return () => motionPreference.revert();
    },
    { scope: animationContainerRef },
  );

  return (
    <div ref={animationContainerRef} data-hero-motion="">
      {children}
    </div>
  );
}
