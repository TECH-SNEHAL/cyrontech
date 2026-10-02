"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked drift for a single element — a few pixels of travel as the
 * element crosses the viewport, driven directly off a motion value (no
 * per-frame setState), so it never competes with the thread doing the
 * scrolling. Disabled under prefers-reduced-motion.
 *
 * For an image, give the element extra bleed (e.g. `absolute inset-[-8%]`
 * on a parent with `overflow-hidden`) so the translation never uncovers an
 * edge.
 */
export function Parallax({
  children,
  strength = 30,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  return (
    <motion.div ref={ref} style={{ y: reduceMotion ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
