"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Mounted once in the root layout. Replaces native scrolling with an eased,
// weighted one on both pages — a deliberate trade against the main-thread
// cost native scrolling avoided (see globals.css's `scroll-behavior: smooth`
// comment and the perf notes this undoes): every wheel/touch frame now runs
// through Lenis's own rAF loop instead of the compositor-only native path.
export function LenisScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // trackpad/touch keep their native feel; only the wheel is re-driven
      syncTouch: false,
      // so the navbar's #services/#contact links ease in too, instead of
      // jumping while the wheel scrolls smoothly
      anchors: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
