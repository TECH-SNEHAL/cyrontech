"use client";

import { useEffect, useRef, type RefObject } from "react";

// The image counterpart of ParticleTextEffect. It lies over an image and at
// rest draws nothing, so the image itself shows, as sharp as ever. Near the
// pointer the image breaks into dots, each the colour of the patch it covers;
// the dots are pushed away and drift back home.

// retina density is not worth the extra pixels here
const MAX_DPR = 2;
// Shortly after the image loads, a pointer of our own crosses the lower part of
// it once, with a shorter reach, so the effect is seen without hovering (and on
// touch screens). It starts below the top third, which in a portrait keeps the
// face clear.
const INTRO_DELAY = 700;
const INTRO_DURATION = 1300;
const INTRO_PENDING = -1;

export function ParticleImage({
  imageRef,
  className = "",
  particleDensity = 4,
  animationForce = 80,
  holeColor = "--background",
}: {
  /** The image underneath. It must fill the same box as this canvas, with object-fit: cover. */
  imageRef: RefObject<HTMLImageElement | null>;
  className?: string;
  /** Width of one dot's cell, in CSS pixels. */
  particleDensity?: number;
  animationForce?: number;
  /** What shows where a dot has left: a CSS colour, or a custom property name starting with `--`. */
  holeColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !image || !ctx) return;

    const { sqrt, sin, min, max, ceil, round, random, PI } = Math;
    const step = particleDensity;

    let width = 0;
    let height = 0;
    // one dot per cell of a grid over the image
    let cols = 0;
    let rows = 0;
    // where each dot is now; its home is the centre of its cell
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    // a per-dot factor on push strength and size, so the scatter is not a perfect ring
    let gain = new Float32Array(0);
    let colors: string[] = [];
    let radius = 100;
    let hole = "#fff";
    let pointer: { x: number; y: number } | null = null;
    let rafId: number | null = null;
    let introTimer: ReturnType<typeof setTimeout> | null = null;
    // null: not running. INTRO_PENDING: starts on the next frame. Otherwise the time it started.
    let introStart: number | null = null;
    let introDone = false;
    const displaced: number[] = [];

    // Reads the image into one colour per cell and sends every dot home.
    function build() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height || !image!.complete || !image!.naturalWidth) return;

      width = rect.width;
      height = rect.height;
      const dpr = min(window.devicePixelRatio || 1, MAX_DPR);
      canvas!.width = round(width * dpr);
      canvas!.height = round(height * dpr);
      // draw in CSS pixels
      ctx!.setTransform(canvas!.width / width, 0, 0, canvas!.height / height, 0, 0);

      cols = ceil(width / step);
      rows = ceil(height / step);
      const count = cols * rows;

      // Drawing the image at one pixel per cell averages each patch into its dot's colour.
      // The source rectangle is the part of the image that object-fit: cover leaves visible.
      const sampler = document.createElement("canvas");
      sampler.width = cols;
      sampler.height = rows;
      const sctx = sampler.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      const scale = max(width / image!.naturalWidth, height / image!.naturalHeight);
      const sw = width / scale;
      const sh = height / scale;
      let data: Uint8ClampedArray;
      try {
        sctx.drawImage(
          image!,
          (image!.naturalWidth - sw) / 2,
          (image!.naturalHeight - sh) / 2,
          sw,
          sh,
          0,
          0,
          width / step,
          height / step,
        );
        data = sctx.getImageData(0, 0, cols, rows).data;
      } catch {
        // an image from another origin cannot be read back: leave it as a plain image
        cols = rows = 0;
        return;
      }

      xs = new Float32Array(count);
      ys = new Float32Array(count);
      gain = new Float32Array(count);
      colors = new Array(count);
      for (let i = 0; i < count; i++) {
        xs[i] = ((i % cols) + 0.5) * step;
        ys[i] = (((i / cols) | 0) + 0.5) * step;
        gain[i] = 0.75 + random() * 0.5;
        colors[i] = `rgb(${data[i * 4]},${data[i * 4 + 1]},${data[i * 4 + 2]})`;
      }
      radius = max(70, min(130, width * 0.28));
      ctx!.clearRect(0, 0, width, height);

      if (!introDone && !still && introTimer == null) {
        introTimer = setTimeout(() => {
          if (pointer) return;
          // timed from its first frame, so a tab opened in the background still plays it
          introStart = INTRO_PENDING;
          wake();
        }, INTRO_DELAY);
      }
    }

    function tick(now: number) {
      rafId = null;

      // the pointer of our own: one pass down the lower two thirds in a shallow S
      if (introStart === INTRO_PENDING) introStart = now;
      if (introStart != null) {
        const p = (now - introStart) / INTRO_DURATION;
        if (p >= 1) {
          introStart = null;
          introDone = true;
          pointer = null;
        } else {
          pointer = {
            x: width * (0.5 + 0.2 * sin(p * PI * 2)),
            y: height * (0.38 + 0.54 * p),
          };
        }
      }

      ctx!.clearRect(0, 0, width, height);
      displaced.length = 0;
      const reach = introStart != null ? radius * 0.7 : radius;
      const r2 = reach * reach;

      for (let row = 0, i = 0; row < rows; row++) {
        const oy = (row + 0.5) * step;
        for (let col = 0; col < cols; col++, i++) {
          const ox = (col + 0.5) * step;
          let x = xs[i];
          let y = ys[i];

          if (pointer) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2 && d2 > 0) {
              const dist = sqrt(d2);
              const force = min(animationForce, ((reach - dist) / dist) * 2) * gain[i];
              x += (dx / dist) * force;
              y += (dy / dist) * force;
            }
          }

          const odx = ox - x;
          const ody = oy - y;
          const od2 = odx * odx + ody * ody;
          if (od2 > 1) {
            const od = sqrt(od2);
            // quicker home than the text version: an empty cell is a missing piece of the photo
            const restore = min(od * 0.12, 6);
            x += (odx / od) * restore;
            y += (ody / od) * restore;
            displaced.push(i);
          } else {
            x = ox;
            y = oy;
          }
          xs[i] = x;
          ys[i] = y;
        }
      }

      if (displaced.length) {
        // The empty cells first, so a dot that lands on one is not painted over. Each is a
        // hair larger than its cell, so no line of the image shows between neighbours.
        ctx!.fillStyle = hole;
        for (const i of displaced) {
          ctx!.fillRect(
            (i % cols) * step - 0.25,
            ((i / cols) | 0) * step - 0.25,
            step + 0.5,
            step + 0.5,
          );
        }
        for (const i of displaced) {
          ctx!.fillStyle = colors[i];
          ctx!.beginPath();
          ctx!.arc(xs[i], ys[i], step * (0.2 + gain[i] * 0.4), 0, 2 * PI);
          ctx!.fill();
        }
      }

      // once every dot is home the canvas is clear again, and there is nothing left to animate
      if (displaced.length || introStart != null) rafId = requestAnimationFrame(tick);
    }

    function wake() {
      if (rafId != null || !cols) return;
      // read at the start of each run, so it follows a change of theme
      hole =
        (holeColor.startsWith("--")
          ? getComputedStyle(canvas!).getPropertyValue(holeColor).trim()
          : holeColor) || "#fff";
      rafId = requestAnimationFrame(tick);
    }

    function handleMove(e: PointerEvent) {
      // a real pointer takes over from ours
      introStart = null;
      introDone = true;
      const rect = canvas!.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      wake();
    }

    function handleLeave() {
      pointer = null;
      wake();
    }

    // visitors who ask for less motion keep the plain image
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    build();
    image.addEventListener("load", build);
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);

    if (!still) {
      canvas.addEventListener("pointermove", handleMove);
      canvas.addEventListener("pointerdown", handleMove);
      canvas.addEventListener("pointerleave", handleLeave);
      canvas.addEventListener("pointercancel", handleLeave);
    }

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      if (introTimer != null) clearTimeout(introTimer);
      image.removeEventListener("load", build);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerdown", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      canvas.removeEventListener("pointercancel", handleLeave);
    };
  }, [imageRef, particleDensity, animationForce, holeColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // vertical swipes still scroll the page on touch screens
      className={`absolute inset-0 h-full w-full touch-pan-y ${className}`}
    />
  );
}
