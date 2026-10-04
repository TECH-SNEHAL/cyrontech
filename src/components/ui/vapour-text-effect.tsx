"use client";

import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// A phrase that turns to dust from one side to the other, after which the next
// phrase fades in. Adapted from the "Vapour Text Effect" (VaporizeTextCycle) on
// 21st.dev. Differences from the original: the typeface, size and colour default
// to the element's own CSS, so the text follows the theme and Tailwind classes;
// the size shrinks to fit the widest phrase; each phrase is held before it
// goes; and visitors who ask for reduced motion get still text.
//
// It is also far cheaper to run than the original, with the same picture: nothing
// is measured or built until the text is near the screen; a phrase that is standing
// still is drawn once, not sixty times a second; and a speck's colour is set as a
// number, not rebuilt as a string for every speck in every frame.

// How close to the screen the text has to be before its specks are built.
const NEAR_MARGIN = "600px";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  /** Any field left out is read from the element's own CSS. */
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  /** Left out, the text takes the element's CSS colour. */
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
  /** Sizes the box the text is drawn in. */
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  // the speck's colour without its opacity, which is set separately on each draw
  rgb: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

// Everything the canvas needs that comes from the DOM.
type Layout = {
  width: number;
  height: number;
  dpr: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  color: string;
};

type AnimationState = "static" | "vaporizing" | "fadingIn" | "waiting";

export default function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font,
  color,
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
  className,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef);
  // true from the first time the text comes near the screen
  const isNear = useIsInView(wrapperRef, NEAR_MARGIN, true);
  const particlesRef = useRef<Particle[]>([]);
  const textBoundariesRef = useRef<TextBoundaries | null>(null);
  const waitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A phrase that is standing still is drawn once. This asks for it to be drawn again,
  // and `wakeRef` restarts the loop if it has stopped to wait.
  const redrawRef = useRef(true);
  const wakeRef = useRef<(() => void) | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<AnimationState>("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [layout, setLayout] = useState<Layout | null>(null);
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);
  // a string, so a new array holding the same phrases does not redraw the canvas
  const textsKey = texts.join("\n");
  const { fontFamily, fontSize, fontWeight } = font ?? {};
  const globalDpr = layout?.dpr ?? 1;

  // Memoize animation durations
  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const MULTIPLIED_VAPORIZE_SPREAD = calculateVaporizeSpread(layout?.fontSize ?? 50) * spread;

  // Memoize particle update function
  const memoizedUpdateParticles = useCallback((particles: Particle[], vaporizeX: number, deltaTime: number) => {
    return updateParticles(
      particles,
      vaporizeX,
      deltaTime,
      MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity
    );
  }, [MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  // Memoize render function
  const memoizedRenderParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  // Size, typeface and colour all come from the DOM. Read them again when the
  // box resizes, the web font arrives, or the theme class on <html> changes.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !isNear) return;

    const read = () => {
      const css = getComputedStyle(el);
      const next: Layout = {
        width: el.clientWidth,
        height: el.clientHeight,
        dpr: Math.min((window.devicePixelRatio || 1) * 1.5, 3),
        fontFamily: fontFamily ?? css.fontFamily,
        fontSize: parseFloat(fontSize ?? css.fontSize) || 50,
        fontWeight: fontWeight ?? css.fontWeight,
        color: color ?? css.color,
      };
      setLayout((prev) =>
        prev && (Object.keys(next) as (keyof Layout)[]).every((k) => prev[k] === next[k])
          ? prev
          : next,
      );
    };

    const resizeObserver = new ResizeObserver(read);
    resizeObserver.observe(el);
    const themeObserver = new MutationObserver(read);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // If the typeface has not loaded yet, the first draw uses a fallback face: redraw in the
    // real one when it arrives. A typeface that is already here needs no second draw.
    let live = true;
    const css = getComputedStyle(el);
    const face = `${fontWeight ?? css.fontWeight} 16px ${fontFamily ?? css.fontFamily}`;
    const redraw = () => {
      if (live) setLayout((prev) => (prev ? { ...prev } : prev));
    };
    try {
      if (!document.fonts.check(face, textsKey)) {
        document.fonts.load(face, textsKey).then(redraw, () => {});
      }
    } catch {
      // a font list the browser cannot parse: fall back to waiting for every font
      document.fonts.ready.then(redraw);
    }

    return () => {
      live = false;
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [isNear, fontFamily, fontSize, fontWeight, color, textsKey]);

  // Start the cycle when in view; hold the first phrase for a moment before it goes
  useEffect(() => {
    if (!isInView) {
      // When component goes out of view, reset to static state
      const reset = setTimeout(() => setAnimationState("static"), 0);
      return () => clearTimeout(reset);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startAnimationTimeout = setTimeout(() => {
      vaporizeProgressRef.current = 0;
      resetParticles(particlesRef.current);
      setAnimationState("vaporizing");
    }, animationDurations.WAIT_DURATION);
    return () => clearTimeout(startAnimationTimeout);
  }, [isInView, animationDurations.WAIT_DURATION]);

  useEffect(() => {
    return () => {
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, []);

  // Animation loop - only run when in view
  useEffect(() => {
    if (!isInView) return;

    let lastTime = performance.now();
    let frameId = 0;
    // a loop that has just started always draws
    redrawRef.current = true;

    const animate = (currentTime: number) => {
      frameId = 0;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      // A phrase that is standing still looks the same in every frame: draw it once and stop.
      // The loop starts again when the state changes, or when the phrase is redrawn (wakeRef).
      if (animationState === "static" || animationState === "waiting") {
        if (redrawRef.current) {
          redrawRef.current = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          memoizedRenderParticles(ctx, particlesRef.current);
        }
        return;
      }

      // Clear canvas only if we're going to draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update based on animation state
      switch (animationState) {
        case "vaporizing": {
          // Calculate progress based on duration
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);

          // Get text boundaries
          const textBoundaries = textBoundariesRef.current;
          if (!textBoundaries) break;

          // Calculate vaporize position based on text boundaries and direction
          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? textBoundaries.left + textBoundaries.width * progress / 100
            : textBoundaries.right - textBoundaries.width * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
          memoizedRenderParticles(ctx, particlesRef.current);

          // Check if vaporization is complete
          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
            // so a frame that runs before the state change lands cannot advance twice
            vaporizeProgressRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;

          // Use particles for fade-in
          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          const fade = Math.min(fadeOpacityRef.current, 1);
          let rgb = "";
          for (const particle of particlesRef.current) {
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            if (particle.rgb !== rgb) {
              rgb = particle.rgb;
              ctx.fillStyle = rgb;
            }
            ctx.globalAlpha = fade * particle.originalAlpha;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
          }
          ctx.restore();

          // a frame can run again before the state change lands, so only one timer is set
          if (fadeOpacityRef.current >= 1 && !waitTimerRef.current) {
            setAnimationState("waiting");
            waitTimerRef.current = setTimeout(() => {
              waitTimerRef.current = null;
              setAnimationState("vaporizing");
              vaporizeProgressRef.current = 0;
              resetParticles(particlesRef.current);
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    const wake = () => {
      if (!frameId) frameId = requestAnimationFrame(animate);
    };
    wakeRef.current = wake;
    wake();

    return () => {
      wakeRef.current = null;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    animationState,
    isInView,
    texts.length,
    direction,
    globalDpr,
    memoizedUpdateParticles,
    memoizedRenderParticles,
    animationDurations.FADE_IN_DURATION,
    animationDurations.WAIT_DURATION,
    animationDurations.VAPORIZE_DURATION
  ]);

  // Draw the current phrase and turn it into particles
  useEffect(() => {
    if (!layout) return;
    const rendered = renderCanvas({
      canvas: canvasRef.current,
      layout,
      texts: textsKey.split("\n"),
      currentTextIndex,
      alignment,
    });
    if (rendered) {
      particlesRef.current = rendered.particles;
      textBoundariesRef.current = rendered.textBoundaries;
      // the canvas was emptied for the new phrase: a loop that is standing still must draw it
      redrawRef.current = true;
      wakeRef.current?.();
    }
  }, [layout, textsKey, currentTextIndex, alignment]);

  return (
    <div ref={wrapperRef} className={cn("h-full w-full", className)} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

const wrapperStyle = { pointerEvents: "none" as const };

const canvasStyle = {
  display: "block",
  minWidth: "30px",
  minHeight: "20px",
  pointerEvents: "none" as const,
};

// ------------------------------------------------------------ //
// SEO ELEMENT
// ------------------------------------------------------------ //
// The canvas holds no text, so the phrases are also written into the page for
// search engines and screen readers.
const seoStyle = {
  position: "absolute" as const,
  width: "0",
  height: "0",
  overflow: "hidden",
  userSelect: "none" as const,
  pointerEvents: "none" as const,
};

function SeoElement({ tag = Tag.P, texts }: { tag: Tag; texts: string[] }) {
  // Ensure tag is a valid HTML element string
  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";

  return createElement(safeTag, { style: seoStyle }, texts?.join(" ") ?? "");
}

// ------------------------------------------------------------ //
// RENDER CANVAS
// ------------------------------------------------------------ //
// Shared by every instance: it is only used for the moment a phrase is read.
let sampler: HTMLCanvasElement | null = null;

const renderCanvas = ({
  canvas,
  layout,
  texts,
  currentTextIndex,
  alignment,
}: {
  canvas: HTMLCanvasElement | null;
  layout: Layout;
  texts: string[];
  currentTextIndex: number;
  alignment: "left" | "center" | "right";
}) => {
  if (!canvas || !layout.width || !layout.height) return null;

  // The phrase is drawn and read back on a canvas of its own, never shown. Reading pixels
  // back from the visible canvas would make the browser draw every frame of it in software.
  sampler ??= document.createElement("canvas");
  const ctx = sampler.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const { width, height, dpr } = layout;

  // Scale for retina/high DPI displays
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  sampler.width = canvas.width;
  sampler.height = canvas.height;

  // One size for every phrase: the CSS size, or smaller if the widest phrase would not fit
  const fontAt = (px: number) => `${layout.fontWeight} ${px}px ${layout.fontFamily}`;
  let fontPx = layout.fontSize * dpr;
  ctx.font = fontAt(fontPx);
  const widest = Math.max(...texts.map((t) => ctx.measureText(t).width));
  if (widest > canvas.width) fontPx *= canvas.width / widest;

  // Calculate text position
  let textX;
  const textY = canvas.height / 2;
  const currentText = texts[currentTextIndex] || texts[0] || "";

  if (alignment === "center") {
    textX = canvas.width / 2;
  } else if (alignment === "left") {
    textX = 0;
  } else {
    textX = canvas.width;
  }

  // Create particles from the rendered text and get text boundaries
  return createParticles(ctx, canvas, currentText, textX, textY, fontAt(fontPx), layout.color, alignment);
};

// ------------------------------------------------------------ //
// PARTICLE SYSTEM
// ------------------------------------------------------------ //
const createParticles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  textX: number,
  textY: number,
  font: string,
  color: string,
  alignment: "left" | "center" | "right"
) => {
  const particles: Particle[] = [];

  // Clear any previous content
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set text properties for sampling
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;

  if ("fontKerning" in ctx) {
    ctx.fontKerning = "normal";
  }

  if ("textRendering" in ctx) {
    ctx.textRendering = "geometricPrecision";
  }

  // Calculate text boundaries
  const metrics = ctx.measureText(text);
  let textLeft;
  const textWidth = metrics.width;

  if (alignment === "center") {
    textLeft = textX - textWidth / 2;
  } else if (alignment === "left") {
    textLeft = textX;
  } else {
    textLeft = textX - textWidth;
  }

  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  // Render the text for sampling
  ctx.fillText(text, textX, textY);

  // Sample the rendered text
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate sampling rate based on DPR and density to maintain consistent particle density
  const baseDPR = 3; // Base DPR we're optimizing for
  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const baseSampleRate = Math.max(1, Math.round(currentDPR / baseDPR));
  const sampleRate = Math.max(1, Math.round(baseSampleRate)); // Adjust sample rate by density

  // Sample the text pixels and create particles
  // nearly every speck is the same colour, so its string is made once and shared
  let lastKey = -1;
  let rgb = "";
  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];

      if (alpha > 0) {
        const key = (data[index] << 16) | (data[index + 1] << 8) | data[index + 2];
        if (key !== lastKey) {
          lastKey = key;
          rgb = `rgb(${data[index]}, ${data[index + 1]}, ${data[index + 2]})`;
        }
        // Remove density from opacity calculation
        const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
        const particle = {
          x,
          y,
          originalX: x,
          originalY: y,
          rgb,
          opacity: originalAlpha,
          originalAlpha,
          // Animation properties
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        };

        particles.push(particle);
      }
    }
  }

  // Clear the canvas after sampling
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return { particles, textBoundaries };
};

// Helper functions for particle animation
const updateParticles = (
  particles: Particle[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) => {
  let allParticlesVaporized = true;

  for (const particle of particles) {
    // Only animate particles that have been "vaporized"
    const shouldVaporize = direction === "left-to-right"
      ? particle.originalX <= vaporizeX
      : particle.originalX >= vaporizeX;

    // a speck that has already faded out is never drawn again: there is nothing left to move
    if (shouldVaporize && particle.speed !== 0 && particle.opacity <= 0) continue;

    if (shouldVaporize) {
      // When a particle is first vaporized, determine if it should fade quickly based on density
      if (particle.speed === 0) {
        // Initialize particle motion when first vaporized
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;

        // Determine if particle should fade quickly based on density
        // density of 1 means all particles animate normally
        // density of 0.5 means 50% of particles fade quickly
        particle.shouldFadeQuickly = Math.random() > density;
      }

      if (particle.shouldFadeQuickly) {
        // Quick fade out for particles marked to fade quickly
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        // Apply normal particle physics and animation
        // Apply damping based on distance from original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);

        // Damping factor increases with distance, creating a more natural motion
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));

        // Add slight random motion to create a more organic feel
        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;

        // Update velocities with damping and random motion
        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;

        // Limit maximum velocity
        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);

        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }

        // Update position
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;

        // Calculate fade rate based on vaporize duration
        const baseFadeRate = 0.25;
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);

        // Slower fade out for more persistence, scaled by duration
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }

      // Check if this particle is still visible
      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      // If there are any particles not yet reached by the vaporize wave
      allParticlesVaporized = false;
    }
  }

  return allParticlesVaporized;
};

// Each speck's opacity goes in as a number (globalAlpha) and its colour is only set when it
// differs from the last speck's. Writing an "rgba(…)" string for every speck made the browser
// build and parse tens of thousands of strings a frame, for the same picture.
const renderParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], globalDpr: number) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);

  let rgb = "";
  for (const particle of particles) {
    if (particle.opacity > 0) {
      if (particle.rgb !== rgb) {
        rgb = particle.rgb;
        ctx.fillStyle = rgb;
      }
      ctx.globalAlpha = particle.opacity;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  }

  ctx.restore();
};

const resetParticles = (particles: Particle[]) => {
  for (const particle of particles) {
    particle.x = particle.originalX;
    particle.y = particle.originalY;
    particle.opacity = particle.originalAlpha;
    particle.speed = 0;
    particle.velocityX = 0;
    particle.velocityY = 0;
  }
};

// ------------------------------------------------------------ //
// CALCULATE VAPORIZE SPREAD
// ------------------------------------------------------------ //
const calculateVaporizeSpread = (fontSize: number) => {
  // Define our known points for interpolation
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];

  // Handle edge cases
  if (fontSize <= points[0].size) return points[0].spread;
  if (fontSize >= points[points.length - 1].size) return points[points.length - 1].spread;

  // Find the two points to interpolate between
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < fontSize) i++;

  // Linear interpolation between the two closest points
  const p1 = points[i];
  const p2 = points[i + 1];

  return p1.spread + (fontSize - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
};

/**
 * Maps a value from one range to another, optionally clamping the result.
 */
function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;

  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);

  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }

  return result;
}

/**
 * Custom hook to check if an element is in the viewport, or within `rootMargin` of it.
 * With `once`, it stays true from the first time the element is seen.
 */
function useIsInView(ref: React.RefObject<HTMLElement | null>, rootMargin = "50px", once = false) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, once]);

  return isInView;
}
