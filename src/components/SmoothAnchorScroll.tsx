"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const minimumDurationSeconds = 0.9;
const maximumDurationSeconds = 2.2;
const pixelsPerSecond = 1800;

/** Glides to in-page anchors so visitors pass through every section's animation on the way. */
export function SmoothAnchorScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const glideToAnchor = (clickEvent: MouseEvent) => {
      if (prefersReducedMotion.matches || clickEvent.defaultPrevented || clickEvent.button !== 0) return;
      if (clickEvent.metaKey || clickEvent.ctrlKey || clickEvent.shiftKey || clickEvent.altKey) return;

      const anchorLink = (clickEvent.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      const targetId = anchorLink?.getAttribute("href")?.slice(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      if (!targetSection) return;

      clickEvent.preventDefault();
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const distanceInPixels = Math.abs(targetSection.getBoundingClientRect().top - headerHeight);
      const durationSeconds = gsap.utils.clamp(
        minimumDurationSeconds,
        maximumDurationSeconds,
        distanceInPixels / pixelsPerSecond,
      );

      gsap.to(window, {
        scrollTo: { y: targetSection, offsetY: headerHeight, autoKill: true },
        duration: durationSeconds,
        ease: "power2.inOut",
        onComplete: () => {
          history.pushState(null, "", `#${targetId}`);
          targetSection.setAttribute("tabindex", "-1");
          targetSection.focus({ preventScroll: true });
        },
      });
    };

    document.addEventListener("click", glideToAnchor);
    return () => document.removeEventListener("click", glideToAnchor);
  }, []);

  return null;
}
