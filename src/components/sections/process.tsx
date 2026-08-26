"use client";

import { motion } from "framer-motion";
import { Box, Code2, Rocket, type LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Box,
    step: "01",
    title: "Design in 3D",
    description:
      "Every product starts as an interactive 3D concept, not a flat mockup — so you see and feel it before a line of code is written.",
  },
  {
    icon: Code2,
    step: "02",
    title: "Build for real",
    description:
      "Modern, production-grade engineering — no throwaway prototypes. What we build is what you ship.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Ship & support",
    description:
      "Launched, monitored, and iterated on. We stay in the loop after go-live, not just for the demo.",
  },
];

export function Process() {
  return (
    <section className="relative z-10 border-t border-white/10 px-6 py-20 md:px-12 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          How we work
        </span>
        <h2 className="mt-5 bg-gradient-to-b from-white to-white/40 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          Best-in-class 3D design, built to last
        </h2>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {steps.map(({ icon: Icon, step, title, description }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="text-sm font-mono text-white/25">{step}</span>
            <div className="mt-3 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
