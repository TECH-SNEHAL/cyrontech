"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

function AnchorScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 1.2 });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}
