"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScatterText } from "@/components/scatter-text";
import { WhatWeMake } from "@/components/what-we-make";
import { SpiderCursor } from "@/components/ui/spider-cursor";

const EXPERTISE = ["Web", "Mobile", "Cloud", "UI/UX", "CRM", "Automation"];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background pb-20 pt-32 md:pb-28"
    >
      {/* warm radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 15% 20%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), radial-gradient(500px circle at 85% 60%, color-mix(in oklch, var(--brand-blue) 14%, transparent), transparent 60%)",
        }}
      />
      {/* static dot grid — pure CSS, so it costs nothing per frame */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
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
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ScatterText
            text="Cyron Tech"
            progress={scrollYProgress}
            className="mb-5 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Trusted Technology Partner
          </span>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Software built around{" "}
            <span className="bg-gradient-to-r from-primary to-brand-blue bg-clip-text text-transparent">
              your business, not ours
            </span>
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
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <WhatWeMake />
        </motion.div>
      </div>
    </div>
  );
}
