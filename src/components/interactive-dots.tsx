"use client";

import { useEffect, useRef, type RefObject } from "react";

const SPACING = 22;
const JITTER = SPACING * 0.35;
const RADIUS = 150;
const CONNECT_DIST = 38;
const CHASE_EASE = 0.12;

export function InteractiveDots({
  containerRef,
  className = "",
}: {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const visualRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function draw() {
      const c = ctxRef.current;
      if (!c) return;
      const { width, height } = sizeRef.current;
      c.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const dimColor = styles.getPropertyValue("--foreground").trim();
      const accentColor = styles.getPropertyValue("--primary").trim();
      const isDark = document.documentElement.classList.contains("dark");
      const dimAlpha = isDark ? 0.35 : 0.28;
      const mouse = visualRef.current;

      // base grid, dim
      c.fillStyle = dimColor;
      c.globalAlpha = dimAlpha;
      for (const dot of dotsRef.current) {
        c.beginPath();
        c.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        c.fill();
      }

      if (mouse) {
        const active: { x: number; y: number; t: number }[] = [];
        for (const dot of dotsRef.current) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) active.push({ x: dot.x, y: dot.y, t: 1 - dist / RADIUS });
        }

        // irregular web mesh — dots connect to nearby dots, not all to one point
        c.strokeStyle = accentColor;
        c.lineWidth = 1;
        for (let i = 0; i < active.length; i++) {
          for (let j = i + 1; j < active.length; j++) {
            const dx = active[i].x - active[j].x;
            const dy = active[i].y - active[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECT_DIST) {
              const strength = (active[i].t + active[j].t) / 2;
              c.globalAlpha = strength * 0.55 * (1 - d / CONNECT_DIST);
              c.beginPath();
              c.moveTo(active[i].x, active[i].y);
              c.lineTo(active[j].x, active[j].y);
              c.stroke();
            }
          }
        }

        c.fillStyle = accentColor;
        for (const dot of active) {
          c.globalAlpha = Math.min(1, dimAlpha + dot.t * 0.9);
          c.beginPath();
          c.arc(dot.x, dot.y, 1.5 + dot.t, 0, Math.PI * 2);
          c.fill();
        }
      }
      c.globalAlpha = 1;
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dots: { x: number; y: number }[] = [];
      for (let x = SPACING / 2; x < rect.width; x += SPACING) {
        for (let y = SPACING / 2; y < rect.height; y += SPACING) {
          dots.push({
            x: x + (Math.random() - 0.5) * JITTER,
            y: y + (Math.random() - 0.5) * JITTER,
          });
        }
      }
      dotsRef.current = dots;
      draw();
    }

    function chase() {
      const target = targetRef.current;
      if (!target) {
        rafRef.current = null;
        return;
      }
      if (!visualRef.current) visualRef.current = { ...target };
      const cur = visualRef.current;
      cur.x += (target.x - cur.x) * CHASE_EASE;
      cur.y += (target.y - cur.y) * CHASE_EASE;
      draw();
      rafRef.current = requestAnimationFrame(chase);
    }

    function handleMove(e: globalThis.MouseEvent) {
      const rect = container!.getBoundingClientRect();
      targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(chase);
      }
    }

    function handleLeave() {
      targetRef.current = null;
      visualRef.current = null;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    const themeObserver = new MutationObserver(() => draw());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className={className} />;
}
