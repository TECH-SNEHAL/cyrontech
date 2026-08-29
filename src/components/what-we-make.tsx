"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Code2 } from "lucide-react";

const OFFERINGS = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Fast, responsive apps for Android & iOS that feel native and load instantly.",
    tag: "Build. Innovate. Grow.",
  },
  {
    icon: Globe,
    title: "Websites, Automation",
    description:
      "Fast, modern websites paired with automation that removes repetitive manual work.",
    tag: "Build. Automate. Achieve.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Scalable, secure systems engineered around your exact business needs.",
    tag: "Custom. Scalable. Reliable.",
  },
];

export function WhatWeMake() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        What we make
      </span>

      <div className="mt-5 flex flex-col divide-y divide-border">
        {OFFERINGS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                {item.description}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
