"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/** Reveals sections on scroll without hiding content from keyboard users. */
export function ScrollMotion({ children }: { children: ReactNode }) {
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motionPreference = gsap.matchMedia();
      motionPreference.add("(prefers-reduced-motion: no-preference)", () => {
        const selectAnimationTargets = gsap.utils.selector(animationContainerRef);
        const risingElements = selectAnimationTargets("[data-scroll='up']");
        const drawingElements = selectAnimationTargets("[data-scroll='draw']");
        const getDrawingShapes = (svgElement: Element) => svgElement.querySelectorAll("path, rect, circle");
        const isDrawingElement = (element: Element) => (element as HTMLElement).dataset.scroll === "draw";
        const showElement = (element: Element) => gsap.set(element, { opacity: 1, y: 0, overwrite: true });

        gsap.set(risingElements, { opacity: 0, y: 32 });
        drawingElements.forEach((svgElement) => gsap.set(getDrawingShapes(svgElement), { drawSVG: 0 }));

        const observer = new IntersectionObserver(
          (entries) => {
            const enteringElements: Element[] = [];
            for (const entry of entries) {
              if (entry.isIntersecting) enteringElements.push(entry.target);
              else if (entry.boundingClientRect.bottom < 0) {
                if (isDrawingElement(entry.target)) {
                  gsap.set(getDrawingShapes(entry.target), { drawSVG: "100%" });
                } else {
                  showElement(entry.target);
                }
              } else continue;
              observer.unobserve(entry.target);
            }

            const enteringRisingElements = enteringElements.filter((target) => !isDrawingElement(target));
            if (enteringRisingElements.length) {
              gsap.to(enteringRisingElements, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
            }
            for (const svgElement of enteringElements.filter(isDrawingElement)) {
              gsap.to(getDrawingShapes(svgElement), { drawSVG: "100%", duration: 1.4, stagger: 0.08, ease: "power2.inOut" });
            }
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        [...risingElements, ...drawingElements].forEach((element) => observer.observe(element));

        const revealFocusedSection = (event: FocusEvent) => {
          const focusedSection = (event.target as Element).closest("[data-scroll='up']");
          if (focusedSection) {
            observer.unobserve(focusedSection);
            showElement(focusedSection);
          }
        };
        const animationContainer = animationContainerRef.current;
        animationContainer?.addEventListener("focusin", revealFocusedSection);

        return () => {
          observer.disconnect();
          animationContainer?.removeEventListener("focusin", revealFocusedSection);
        };
      });
      return () => motionPreference.revert();
    },
    { scope: animationContainerRef },
  );

  return <div ref={animationContainerRef}>{children}</div>;
}
