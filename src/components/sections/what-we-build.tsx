"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Users,
  Workflow,
  Monitor,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Websites",
    description:
      "Marketing sites, landing pages, and full web platforms — fast, responsive, and built to convert.",
  },
  {
    icon: Smartphone,
    title: "Apps",
    description:
      "Mobile and web apps designed around real user workflows, from first prototype to production.",
  },
  {
    icon: Users,
    title: "CRM",
    description:
      "Custom CRM systems that fit how your team actually sells and supports customers.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Workflow and process automation that cuts out manual busywork and connects your tools.",
  },
  {
    icon: Monitor,
    title: "Desktop Applications",
    description:
      "Native-feeling desktop software for Windows, macOS, and Linux built on modern frameworks.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function WhatWeBuild() {
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
          What we do
        </span>
        <h2 className="mt-5 bg-gradient-to-b from-white to-white/40 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          We build the whole stack
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/50">
          From the first pixel to the backend running it — Cyrontech designs
          and ships software end to end.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={item}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition-colors group-hover:text-white">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
