"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WhatWeMake } from "@/components/what-we-make";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { SpiderCursor } from "@/components/ui/spider-cursor";
import { TextAnimate } from "@/components/ui/text-animate";

const EXPERTISE = ["Web", "Mobile", "Cloud", "UI/UX", "CRM", "Automation"];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background pb-20 pt-32 md:pb-28"
    >
      {/* brand glow and dot grid are both painted once by CSS — no per-frame cost */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 15% 20%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), radial-gradient(500px circle at 85% 60%, color-mix(in oklch, var(--brand-blue) 14%, transparent), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 100%)",
        }}
      />
      {/* spiders that crawl after the cursor, spinning web strands */}
      <SpiderCursor
        containerRef={sectionRef}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* the brand name in dots that scatter away from the pointer */}
          <ParticleTextEffect
            text="CYRONTECH"
            align="left"
            particleDensity={2}
            className="mb-3 aspect-[5/1] w-full max-w-lg"
          />
          <h1 className="text-balance text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            <TextAnimate as="span" animation="blurIn" by="word" once accessible={false}>
              Software built around
            </TextAnimate>{" "}
            <AnimatedGradientText colorFrom="var(--primary)" colorTo="var(--brand-blue)">
              your business, not ours
            </AnimatedGradientText>
          </h1>

          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-foreground/60 sm:text-lg">
            Websites, apps, CRMs, and automation — designed around how you
            actually work, so technology finally feels like it&apos;s helping
            instead of getting in the way.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
            >
              Get Free Consultation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/sharon7103?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground/80 transition hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-6 text-xs text-foreground/70">
            <span className="font-semibold uppercase tracking-widest text-foreground/80">
              Our expertise spans
            </span>
            {EXPERTISE.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <WhatWeMake />
        </motion.div>
      </div>
    </div>
  );
}
