"use client";

import { useEffect, useRef } from "react";

// Text drawn as dots that scatter away from the pointer and drift back.
// Adapted from "Interactive Text Particle" on 21st.dev (easemize). The original
// fills the whole window, takes hex colours and never stops its loop; this one
// fills its own box, takes its typeface and colours from CSS so it follows the
// theme, and only animates while dots are out of place.

type Particle = {
  // where the dot belongs, and where it is now
  ox: number;
  oy: number;
  x: number;
  y: number;
  r: number;
  // the most the pointer can push it in one frame
  f: number;
  color: string;
};

export interface ParticleTextEffectProps {
  text: string;
  /**
   * Colours for the gradient across the text, left to right. Any CSS colour
   * works; an entry starting with `--` is read from that custom property.
   */
  colors?: string[];
  /** Sizes the canvas. The text is as large as fits inside it. */
  className?: string;
  align?: "left" | "center";
  animationForce?: number;
  /** Gap between dots, in CSS pixels. Small text gets a finer gap so it stays readable. */
  particleDensity?: number;
  /**
   * The share of the box's height the font size may take; the rest is room for
   * dots to scatter into. At 1 the text is as large as the box allows.
   */
  textHeight?: number;
}

// retina density is not worth the extra dots here
const MAX_DPR = 2;

export function ParticleTextEffect({
  text,
  colors = ["--primary", "--brand-blue"],
  className = "",
  align = "center",
  animationForce = 80,
  particleDensity = 4,
  textHeight = 0.62,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // a string, so a new array with the same colours does not rebuild the dots
  const colorKey = colors.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const { hypot, min, max, round, random } = Math;
    const rand = (lo: number, hi: number) => lo + random() * (hi - lo);

    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let radius = 50;
    let dpr = 1;
    let rafId: number | null = null;
    let disposed = false;
    // the dots are built once the typeface has loaded, and again only when something changes
    let ready = false;
    let builtW = 0;
    let builtH = 0;

    function draw(p: Particle) {
      ctx!.fillStyle = p.color;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx!.fill();
    }

    // Draws the text once, reads back which pixels it covers, and turns a grid of them into dots.
    // Unless `force` is set, a canvas that is still the size it was built at is left alone.
    function build(force: boolean) {
      if (disposed || !ready) return;
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      dpr = min(window.devicePixelRatio || 1, MAX_DPR);
      const w = round(rect.width * dpr);
      const h = round(rect.height * dpr);
      if (!force && w === builtW && h === builtH) return;
      builtW = w;
      builtH = h;
      canvas!.width = w;
      canvas!.height = h;

      const styles = getComputedStyle(canvas!);
      const family = styles.fontFamily || "sans-serif";
      let size = h * textHeight;
      ctx!.font = `900 ${size}px ${family}`;
      const fit = (w * 0.98) / ctx!.measureText(text).width;
      if (fit < 1) size *= fit;
      ctx!.font = `900 ${size}px ${family}`;
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "left";

      const textWidth = ctx!.measureText(text).width;
      const left = align === "center" ? (w - textWidth) / 2 : 0;
      const gradient = ctx!.createLinearGradient(left, 0, left + textWidth, 0);
      const stops = colorKey
        .split("|")
        .map((c) => (c.startsWith("--") ? styles.getPropertyValue(c).trim() : c))
        .filter(Boolean);
      stops.forEach((c, i) => {
        const at = stops.length > 1 ? i / (stops.length - 1) : 0;
        try {
          gradient.addColorStop(at, c);
        } catch {
          // an older browser that cannot parse the colour (oklch) still gets blue text
          gradient.addColorStop(at, "#2563eb");
        }
      });

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = gradient;
      ctx!.fillText(text, left, h / 2);

      // at most a 22nd of the font size, or small letters would be too few dots to read
      const gap = min(particleDensity, max(1.5, size / dpr / 22));
      const step = max(1, round(gap * dpr));
      const data = ctx!.getImageData(0, 0, w, h).data;
      const next: Particle[] = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          // skip the faint anti-aliased fringe, so edges stay crisp
          if (data[i + 3] < 128) continue;
          // each dot keeps the colour under it, nudged a little so the fill is not flat
          const r = max(0, min(255, round(data[i] + rand(-13, 13))));
          const g = max(0, min(255, round(data[i + 1] + rand(-13, 13))));
          const b = max(0, min(255, round(data[i + 2] + rand(-13, 13))));
          next.push({
            ox: x,
            oy: y,
            x,
            y,
            r: rand(0.3, 0.75) * step,
            f: rand(animationForce - 15, animationForce + 15) * dpr,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }
      particles = next;
      radius = max(50 * dpr, size * 1.5);

      ctx!.clearRect(0, 0, w, h);
      particles.forEach(draw);
    }

    function tick() {
      rafId = null;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      let moving = false;

      for (const p of particles) {
        if (pointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = hypot(dx, dy);
          if (dist < radius && dist > 0) {
            const force = min(p.f, ((radius - dist) / dist) * 2 * dpr);
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            moving = true;
          }
        }

        const odx = p.ox - p.x;
        const ody = p.oy - p.y;
        const od = hypot(odx, ody);
        if (od > dpr) {
          const restore = min(od * 0.1, 3 * dpr);
          p.x += (odx / od) * restore;
          p.y += (ody / od) * restore;
          moving = true;
        } else if (od > 0) {
          p.x = p.ox;
          p.y = p.oy;
        }

        draw(p);
      }

      // once every dot is home there is nothing left to animate
      if (moving) rafId = requestAnimationFrame(tick);
    }

    const wake = () => {
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };

    function handleMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
      wake();
    }

    function handleLeave() {
      pointer = null;
      wake();
    }

    // the text must be drawn in the page's own typeface, so wait until it has loaded
    const family = getComputedStyle(canvas).fontFamily || "sans-serif";
    const first = () => {
      ready = true;
      build(true);
    };
    document.fonts.load(`900 48px ${family}`, text).then(first, first);

    // An observer also reports once when it starts watching, when nothing has changed:
    // building the dots then as well would do the whole job twice as the page opens.
    const resizeObserver = new ResizeObserver(() => build(false));
    resizeObserver.observe(canvas);
    // the colours come from CSS variables, which change with the theme class on <html>
    const themeObserver = new MutationObserver(() => build(true));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // visitors who ask for less motion get the still text
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still) {
      canvas.addEventListener("pointermove", handleMove);
      canvas.addEventListener("pointerdown", handleMove);
      canvas.addEventListener("pointerleave", handleLeave);
      canvas.addEventListener("pointercancel", handleLeave);
    }

    return () => {
      disposed = true;
      if (rafId != null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerdown", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      canvas.removeEventListener("pointercancel", handleLeave);
    };
  }, [text, colorKey, align, animationForce, particleDensity, textHeight]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={text}
      // vertical swipes still scroll the page on touch screens
      className={`block touch-pan-y ${className}`}
    />
  );
}
