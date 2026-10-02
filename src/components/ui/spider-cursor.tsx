"use client";

import { useEffect, useRef, type RefObject } from "react";

const POINTS = 333;
const SPIDERS = 2;
const BODY_POINTS = 9;
const MAX_LEGS = 8;
const LINE_SEGMENTS = 32;
// a decorative layer never needs full retina density, and the canvas is large
// enough that its pixel count drives the compositing cost
const MAX_DPR = 1.5;

type Pt = { x: number; y: number; len: number; r: number };

export function SpiderCursor({
  containerRef,
  className = "",
}: {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { sin, cos, PI, hypot, min, max } = Math;
    let width = 0;
    let height = 0;
    let rafId: number | null = null;

    const colors = { dim: "#888", accent: "#3b82f6", dimAlpha: 0.28 };
    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      colors.dim = styles.getPropertyValue("--foreground").trim() || "#888";
      colors.accent = styles.getPropertyValue("--primary").trim() || "#3b82f6";
      colors.dimAlpha = document.documentElement.classList.contains("dark")
        ? 0.4
        : 0.3;
    }

    const rnd = (x = 1, dx = 0) => Math.random() * x + dx;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // sine-field noise — gives every strand its hand-drawn wobble
    function noise(nx: number, ny: number, t = 101) {
      const w0 = sin(0.3 * nx + 1.4 * t + 2.0 + 2.5 * sin(0.4 * ny - 1.3 * t + 1.0));
      const w1 = sin(0.2 * ny + 1.5 * t + 2.8 + 2.3 * sin(0.5 * nx - 1.2 * t + 0.5));
      return w0 + w1;
    }

    // traces into the CURRENT path so a whole bundle strokes in one call
    function traceStrand(x0: number, y0: number, x1: number, y1: number) {
      const c = ctx!;
      c.moveTo(x0, y0);
      for (let i = 1; i <= LINE_SEGMENTS; i++) {
        const t = i / LINE_SEGMENTS;
        const px = lerp(x0, x1, t);
        const py = lerp(y0, y1, t);
        const k = noise(px / 5 + x0, py / 5 + y0) * 2;
        c.lineTo(px + k, py + k);
      }
    }

    function makeSpider() {
      let pts: Pt[] = [];
      const body = [...Array(BODY_POINTS)].map((_, i) => ({
        x: cos((i / BODY_POINTS) * PI * 2),
        y: sin((i / BODY_POINTS) * PI * 2),
      }));

      const seed = rnd(100);
      const kx = rnd(0.5, 0.5);
      const ky = rnd(0.5, 0.5);
      const walk = { x: rnd(50, 50), y: rnd(50, 50) };
      // body size is fixed per spider — recomputing it per frame makes the
      // whole web jitter
      const bodyScale = rnd(100, 100);

      let tx = 0;
      let ty = 0;
      let x = 0;
      let y = 0;

      return {
        reseed() {
          pts = [...Array(POINTS)].map(() => ({
            x: rnd(width),
            y: rnd(height),
            len: 0,
            r: 0,
          }));
          tx = x = rnd(width);
          ty = y = rnd(height);
        },
        follow(nx: number, ny: number) {
          tx = nx;
          ty = ny;
        },
        tick(t: number) {
          const c = ctx!;
          const fx = tx + cos(t * kx + seed) * walk.x;
          const fy = ty + sin(t * ky + seed) * walk.y;
          // Clamp the step's MAGNITUDE. A bare min() only caps positive steps,
          // which would leave the spider racing left/up but crawling right/down.
          const cap = width / 40;
          x += max(-cap, min(cap, (fx - x) / 5));
          y += max(-cap, min(cap, (fy - y) / 5));

          const reach = width / 10;
          const bodyR = width / bodyScale;
          let legs = 0;
          const spun: Pt[] = [];

          // pass 1: the point field, batched into a single fill
          c.fillStyle = colors.dim;
          c.globalAlpha = colors.dimAlpha;
          c.beginPath();
          for (const pt of pts) {
            const len = hypot(pt.x - x, pt.y - y);
            let r = min(1.3, width / max(len, 1) / 7);
            const latched = len < reach && legs < MAX_LEGS;
            if (latched) {
              legs++;
              r *= 1.35;
            }
            pt.r = r;
            pt.len = max(0, min(pt.len + (latched ? 0.1 : -0.1), 1));
            if (pt.len) spun.push(pt);
            else {
              c.moveTo(pt.x + r, pt.y);
              c.ellipse(pt.x, pt.y, r, r, 0, 0, PI * 2);
            }
          }
          c.fill();

          // pass 2: web strands — one stroke per anchor point, not per strand
          c.strokeStyle = colors.accent;
          c.lineWidth = 1;
          for (const pt of spun) {
            const ease = pt.len * pt.len;
            c.globalAlpha = pt.len * 0.55;
            c.beginPath();
            for (const b of body) {
              const bx = x + b.x * bodyR;
              const by = y + b.y * bodyR;
              traceStrand(lerp(bx, pt.x, ease), lerp(by, pt.y, ease), bx, by);
            }
            c.stroke();
          }

          // pass 3: the latched points themselves
          c.fillStyle = colors.accent;
          c.globalAlpha = 1;
          c.beginPath();
          for (const pt of spun) {
            c.moveTo(pt.x + pt.r, pt.y);
            c.ellipse(pt.x, pt.y, pt.r, pt.r, 0, 0, PI * 2);
          }
          c.fill();
        },
      };
    }

    const spiders = [...Array(SPIDERS)].map(makeSpider);

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      spiders.forEach((s) => s.reseed());
    }

    function tick(time: number) {
      ctx!.clearRect(0, 0, width, height);
      const t = time / 1000;
      spiders.forEach((s) => s.tick(t));
      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      // clamped so the spiders stay in frame once the cursor leaves the section
      const px = min(max(e.clientX - rect.left, 0), rect.width);
      const py = min(max(e.clientY - rect.top, 0), rect.height);
      spiders.forEach((s) => s.follow(px, py));
    }

    // pointless on touch (there is no cursor to follow) and unwelcome for
    // anyone who has asked for less motion
    const skip =
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) return;

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // the canvas is expensive to composite, so it must not keep animating
    // once the hero has scrolled away
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (rafId == null) rafId = requestAnimationFrame(tick);
        } else if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
          ctx!.clearRect(0, 0, width, height);
        }
      },
      { threshold: 0 }
    );
    visibility.observe(container);

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className={className} />;
}
