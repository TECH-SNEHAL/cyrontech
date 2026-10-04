"use client";

import { useEffect, useRef } from "react";

// The reverse of the vapour text effect: instead of a phrase turning to dust,
// scattered dust gathers, from the first letter to the last, into the phrase.
// It plays once, when the phrase scrolls into view. The phrase itself is
// ordinary text in the page's own font and colour (filled or outlined); it is
// hidden while a canvas laid over it flies the dust into place, and shown once
// the dust has settled. Visitors who ask for reduced motion just get the text.

// retina density is not worth the extra dust here
const MAX_DPR = 2;
// seconds, at speed 1
const HANG = 0.35; // the dust hangs in the air before it starts to gather
const SWEEP = 0.8; // from the first letter starting to the last letter starting
const STRAGGLE = 0.3; // how unevenly neighbouring specks start
const FLIGHT = 0.8; // the quickest speck's journey; the slowest takes half as long again

export function DustText({
  text,
  className = "",
  delay = 0,
  speed = 1,
  density = 1,
}: {
  text: string;
  className?: string;
  /** Seconds to wait, once in view, before the dust appears. */
  delay?: number;
  /** 2 plays it twice as fast. */
  speed?: number;
  /**
   * How thick the dust is. At 1 there is one speck for each pixel of the text; at 3 there are
   * three, and they are less faint in the air, so the cloud is far heavier. The text it
   * settles into is the same.
   */
  density?: number;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    // The text is rendered hidden, so it never shows before its dust. Whenever the
    // dust is not going to play, it is simply shown.
    if (!root || !label || !canvas || !ctx) {
      if (label) label.style.opacity = "";
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      label.style.opacity = "";
      return;
    }
    // The dust is going to play, so the word must be hidden until it has settled. It is
    // hidden here as well as in the markup because this effect can run more than once (it
    // does on every page open in development): the clean-up below shows the word, and
    // without this the next run played its dust over a word that was already there.
    label.style.opacity = "0";

    let rafId: number | null = null;
    let done = false;
    let live = true;

    function finish() {
      done = true;
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = null;
      label!.style.opacity = "";
      canvas!.style.display = "none";
      visibility.disconnect();
      resizes.disconnect();
    }

    function start() {
      const { min, max, round, random, sin, cos, sqrt, PI } = Math;
      const dpr = min(window.devicePixelRatio || 1, MAX_DPR);
      const css = getComputedStyle(label!);
      const fontSize = parseFloat(css.fontSize);
      const box = root!.getBoundingClientRect();
      const textNode = label!.firstChild;
      if (!box.width || !textNode) return finish();

      // The canvas reaches past the text so there is air for the dust to hang in, but never
      // past the edge of the window, where it would let the page scroll sideways.
      const reachX = min(fontSize * 1.3, 120);
      const reachY = min(fontSize * 0.75, 70);
      const padLeft = max(0, min(reachX, box.left - 2));
      const padRight = max(0, min(reachX, document.documentElement.clientWidth - box.right - 2));
      const cssWidth = box.width + padLeft + padRight;
      const cssHeight = box.height + reachY * 2;
      canvas!.style.left = `${-padLeft}px`;
      canvas!.style.top = `${-reachY}px`;
      canvas!.style.width = `${cssWidth}px`;
      canvas!.style.height = `${cssHeight}px`;
      canvas!.style.display = "block";
      const w = round(cssWidth * dpr);
      const h = round(cssHeight * dpr);
      canvas!.width = w;
      canvas!.height = h;

      // Draw the phrase exactly where the page has laid it out, a word at a time, so wrapped
      // lines and letter spacing match the real text underneath. Text that may break inside a
      // word (overflow-wrap: anywhere) is drawn a letter at a time, as a word can then be
      // split over two lines.
      ctx!.font = `${css.fontStyle} ${css.fontWeight} ${fontSize * dpr}px ${css.fontFamily}`;
      ctx!.fillStyle = css.color;
      ctx!.textBaseline = "alphabetic";
      const spacing = parseFloat(css.letterSpacing);
      if ("letterSpacing" in ctx! && !Number.isNaN(spacing)) {
        ctx!.letterSpacing = `${spacing * dpr}px`;
      }
      // Outlined text (-webkit-text-stroke) is drawn as an outline too. Its fill is usually
      // transparent, in which case fillText draws nothing.
      const outline = parseFloat(css.webkitTextStrokeWidth) || 0;
      if (outline) {
        ctx!.strokeStyle = css.webkitTextStrokeColor;
        ctx!.lineWidth = outline * dpr;
        ctx!.lineJoin = "miter";
        ctx!.miterLimit = 4;
      }
      const ascent = ctx!.measureText("Hg").fontBoundingBoxAscent;
      const range = document.createRange();
      const pieces = css.overflowWrap === "anywhere" ? /\S/gu : /\S+/g;
      for (const piece of text.matchAll(pieces)) {
        const at = piece.index ?? 0;
        range.setStart(textNode, at);
        range.setEnd(textNode, at + piece[0].length);
        const r = range.getBoundingClientRect();
        const x = (r.left - box.left + padLeft) * dpr;
        const y = (r.top - box.top + reachY) * dpr + ascent;
        ctx!.fillText(piece[0], x, y);
        if (outline) ctx!.strokeText(piece[0], x, y);
      }

      // One speck for each CSS pixel of ink, whatever the screen density. An outline is too
      // thin for that on a dense screen: it gets one for each device pixel.
      const size = dpr >= 1.5 && !outline ? 2 : 1;
      const src = ctx!.getImageData(0, 0, w, h).data;
      // The phrase was only drawn to be read. Left on the canvas, it would show as a finished
      // word until the first frame of dust is drawn over it, which with a `delay` is a while.
      ctx!.clearRect(0, 0, w, h);
      const homeX: number[] = [];
      const homeY: number[] = [];
      const ink: number[] = [];
      let rgb = [0, 0, 0];
      let strongest = 0;
      let left = w;
      let right = 0;
      for (let y = 0; y + size <= h; y += size) {
        for (let x = 0; x + size <= w; x += size) {
          let a = 0;
          for (let by = 0; by < size; by++) {
            for (let bx = 0; bx < size; bx++) a += src[((y + by) * w + x + bx) * 4 + 3];
          }
          a /= size * size;
          if (a < 12) continue;
          const i = (y * w + x) * 4;
          if (src[i + 3] > strongest) {
            strongest = src[i + 3];
            rgb = [src[i], src[i + 1], src[i + 2]];
          }
          homeX.push(x);
          homeY.push(y);
          ink.push(a);
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
      const pixels = homeX.length;
      if (!pixels) return finish();

      // A heavier cloud has several specks heading for each pixel, each from its own place and
      // at its own time, and they show more strongly while they are in the air.
      const copies = max(1, round(density));
      const count = pixels * copies;
      const air = min(0.85, 0.45 * sqrt(copies));
      const toX = new Float32Array(count);
      const toY = new Float32Array(count);
      const strength = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        toX[i] = homeX[i % pixels];
        toY[i] = homeY[i % pixels];
        strength[i] = ink[i % pixels];
      }

      // Where each speck hangs before it travels: scattered around its home, thinning outwards.
      // A start that would fall outside the canvas is folded back in, not piled up at the edge.
      const startX = new Float32Array(count);
      const startY = new Float32Array(count);
      const startAt = new Float32Array(count);
      const flight = new Float32Array(count);
      const phase = new Float32Array(count);
      const fold = (v: number, limit: number) => {
        if (v < 0) v = -v;
        if (v > limit) v = 2 * limit - v;
        return max(0, min(limit, v));
      };
      const span = max(1, right - left);
      for (let i = 0; i < count; i++) {
        const angle = random() * 2 * PI;
        const reach = 0.2 + 0.8 * sqrt(random());
        startX[i] = fold(toX[i] + cos(angle) * reach * reachX * dpr, w - size);
        startY[i] = fold(toY[i] + sin(angle) * reach * reachY * dpr, h - size);
        startAt[i] = (HANG + ((toX[i] - left) / span) * SWEEP + random() * STRAGGLE) / speed;
        flight[i] = (FLIGHT * (1 + random() * 0.5)) / speed;
        phase[i] = random() * 2 * PI;
      }
      const end = (HANG + SWEEP + STRAGGLE + FLIGHT * 1.5) / speed;

      const frame = ctx!.createImageData(w, h);
      const dst = frame.data;
      const [red, green, blue] = rgb;
      let began = 0;

      function tick(now: number) {
        // timed from its first frame, so a tab opened in the background still plays it
        if (!began) began = now;
        const t = (now - began) / 1000 - delay;
        if (t < 0) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        dst.fill(0);
        const appear = min(1, (t * speed) / 0.3);

        for (let i = 0; i < count; i++) {
          const k = max(0, min(1, (t - startAt[i]) / flight[i]));
          // quick away, slow to settle
          const eased = 1 - (1 - k) ** 3;
          // hanging dust drifts a little; the drift dies away as the speck comes home
          const drift = (1 - eased) * 1.5 * dpr;
          const x = round(startX[i] + (toX[i] - startX[i]) * eased + sin(t * 1.6 + phase[i]) * drift);
          const y = round(startY[i] + (toY[i] - startY[i]) * eased + cos(t * 1.3 + phase[i]) * drift);
          if (x < 0 || y < 0 || x + size > w || y + size > h) continue;
          // fainter in the air than on the page
          const alpha = strength[i] * (air + (1 - air) * k) * appear;
          for (let by = 0; by < size; by++) {
            for (let bx = 0; bx < size; bx++) {
              const p = ((y + by) * w + x + bx) * 4;
              if (alpha > dst[p + 3]) {
                dst[p] = red;
                dst[p + 1] = green;
                dst[p + 2] = blue;
                dst[p + 3] = alpha;
              }
            }
          }
        }
        ctx!.putImageData(frame, 0, 0);

        // every speck is home: the dust now covers the real text exactly, so swap them
        if (t >= end) finish();
        else rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafId == null && !done) start();
      },
      { threshold: 0.4 },
    );
    // The dust is drawn in the page's own typeface, so wait until it has loaded: a late font
    // would also move the text the dust is heading for.
    document.fonts.ready.then(() => {
      if (live) visibility.observe(root);
    });

    // A change of size part-way would leave the dust heading for the wrong places: show the text.
    let firstSize = true;
    const resizes = new ResizeObserver(() => {
      if (firstSize) firstSize = false;
      else if (rafId != null) finish();
    });
    resizes.observe(root);

    return () => {
      live = false;
      if (rafId != null) cancelAnimationFrame(rafId);
      visibility.disconnect();
      resizes.disconnect();
      label.style.opacity = "";
      canvas.style.display = "none";
    };
  }, [text, delay, speed, density]);

  return (
    <span ref={rootRef} className={`relative inline-block ${className}`}>
      <span ref={labelRef} style={{ opacity: 0 }}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none"
        style={{ display: "none" }}
      />
    </span>
  );
}
