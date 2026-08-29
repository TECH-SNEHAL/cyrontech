"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };
const MAX_TILT = 9;

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // -0.5 .. 0.5, where the cursor sits within the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx - 0.5);
    py.set(ny - 0.5);
    // drives the glow that follows the cursor across the surface
    el.style.setProperty("--x", `${nx * 100}%`);
    el.style.setProperty("--y", `${ny * 100}%`);
  }

  function handleMouseLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative h-full ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)",
          }}
        />
        {/* lifted slightly out of the card plane so the tilt reads as depth */}
        <div className="relative z-10 h-full" style={{ transform: "translateZ(28px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
