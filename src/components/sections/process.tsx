"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const STEPS = [
  {
    title: "Discover",
    description:
      "We start by understanding your business, your users, and what actually needs to get built.",
  },
  {
    title: "Design",
    description:
      "Clean, modern interfaces mapped out before a line of code is written.",
  },
  {
    title: "Build",
    description:
      "Production-grade engineering from day one — what we build is what ships.",
  },
  {
    title: "Ship & Support",
    description:
      "Launched, monitored, and iterated on. We stay in the loop after go-live.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <section id="process" className="relative z-10">
      <div className="px-6 pt-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            How we work
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A process built to ship
          </h2>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        style={{ height: `${STEPS.length * 100}vh` }}
        className="relative mt-16"
      >
        <div className="sticky top-24 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/10">
            <video
              src="/videos/process-transition.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                animate={{
                  opacity: active === i ? 1 : 0.35,
                  scale: active === i ? 1.06 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="origin-left"
              >
                <span
                  className={`font-mono text-base transition-colors duration-300 ${
                    active === i ? "text-primary" : "text-foreground/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-1 text-4xl font-bold transition-colors duration-300 ${
                    active === i ? "text-primary" : "text-foreground"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-foreground/60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
