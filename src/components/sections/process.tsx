"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const STEPS = [
  {
    title: "Discover",
    icon: Search,
    description:
      "We start by understanding your business, your users, and what actually needs to get built.",
  },
  {
    title: "Design",
    icon: PenTool,
    description:
      "Clean, modern interfaces mapped out before a line of code is written.",
  },
  {
    title: "Build",
    icon: Code2,
    description:
      "Production-grade engineering from day one — what we build is what ships.",
  },
  {
    title: "Ship & Support",
    icon: Rocket,
    description:
      "Launched, monitored, and iterated on. We stay in the loop after go-live.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative z-10 px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
          <TextAnimate as="span" animation="slideLeft" by="character" once>
            How we work
          </TextAnimate>
        </span>
        <TextAnimate
          as="h2"
          animation="slideUp"
          by="word"
          once
          accessible={false}
          className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          A process built to ship
        </TextAnimate>
        <p className="mt-4 text-base leading-relaxed text-foreground/50">
          Four stages, no surprises — you always know what we&apos;re working on
          and what comes next.
        </p>
      </motion.div>

      <ol className="relative mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* the rail that ties the four stages together on wide screens */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
        />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="relative rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="relative flex size-11 items-center justify-center rounded-xl bg-accent">
                  <Icon className="size-5 text-primary" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-xs text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                {step.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
