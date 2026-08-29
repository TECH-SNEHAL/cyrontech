"use client";

import { motion } from "framer-motion";
import { Users, Cpu, Clock, Headphones } from "lucide-react";
import { CountUp } from "@/components/count-up";

const STATS = [
  {
    target: 5,
    suffix: "+ yrs",
    label: "Experienced Team",
    description: "Senior engineers and designers across web, mobile, and cloud.",
    icon: Users,
  },
  {
    target: 20,
    suffix: "+ tools",
    label: "Modern Technologies",
    description: "We build on today's best stack — not yesterday's templates.",
    icon: Cpu,
  },
  {
    target: 98,
    suffix: "% on-time",
    label: "On-Time Delivery",
    description: "Transparent milestones and predictable, on-schedule launches.",
    icon: Clock,
  },
  {
    target: 24,
    suffix: "/7 care",
    label: "Dedicated Support",
    description: "A real team that responds — long after your project ships.",
    icon: Headphones,
  },
];

export function WhyUs() {
  return (
    <section className="relative z-10 bg-foreground px-6 py-24 text-background md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Why us
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Reasons teams choose us — and stay
        </h2>
        <p className="mt-4 text-base leading-relaxed text-background/60">
          The reasons teams choose us — and stay with us — for the long run.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-background/10 bg-background/[0.03] p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
                <Icon className="size-5 text-primary" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-2xl font-bold">
                <CountUp target={s.target} suffix={s.suffix} duration={1} />
              </p>
              <p className="mt-1 text-sm font-semibold text-background/80">
                {s.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-background/50">
                {s.description}
              </p>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
