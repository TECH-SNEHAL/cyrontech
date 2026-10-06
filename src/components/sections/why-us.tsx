"use client";

import { motion } from "framer-motion";
import {
  Users,
  Cpu,
  Clock,
  Headphones,
  Gem,
  Handshake,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Hammer,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Marquee } from "@/components/ui/marquee";
import { TextAnimate } from "@/components/ui/text-animate";
import { useCursorHover } from "@/components/ui/smooth-cursor";
import VaporizeTextCycle from "@/components/ui/vapour-text-effect";

// The three promises from the hero's "What we make" panel, shown one at a time.
const PROMISES = [
  "Build. Innovate. Grow.",
  "Build. Automate. Achieve.",
  "Custom. Scalable. Reliable.",
];

const STATS = [
  {
    target: 5,
    suffix: "+ yrs",
    label: "Experienced Team",
    description:
      "Engineers trained at IIT- and NIT-caliber institutes, plus universities abroad.",
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

const VALUES = [
  {
    n: "01",
    label: "Excellence",
    description: "Quality isn't an act, it's a habit. We obsess over the details to ensure seamless impact.",
    icon: Gem,
    color: "text-emerald-400",
    tile: "bg-emerald-400/15",
  },
  {
    n: "02",
    label: "Collaboration",
    description: "Great minds work together. We foster an environment where ideas are freely shared.",
    icon: Handshake,
    color: "text-rose-400",
    tile: "bg-rose-400/15",
  },
  {
    n: "03",
    label: "Agility",
    description: "The market moves fast, and so do we. Adapting quickly to challenges is our superpower.",
    icon: Gauge,
    color: "text-amber-400",
    tile: "bg-amber-400/15",
  },
  {
    n: "04",
    label: "Innovation",
    description: "We chase the better way, not just the familiar one. Fresh thinking shapes everything we ship.",
    icon: Lightbulb,
    color: "text-sky-400",
    tile: "bg-sky-400/15",
  },
  {
    n: "05",
    label: "Integrity",
    description: "Honest timelines, honest pricing, honest advice — even when it isn't what you want to hear.",
    icon: ShieldCheck,
    color: "text-violet-400",
    tile: "bg-violet-400/15",
  },
  {
    n: "06",
    label: "Craftsmanship",
    description: "Code we'd put our own name on. Built to last, not just to launch.",
    icon: Hammer,
    color: "text-teal-400",
    tile: "bg-teal-400/15",
  },
];

function ValueCard({ value }: { value: (typeof VALUES)[number] }) {
  const Icon = value.icon;
  const hoverRef = useCursorHover<HTMLDivElement>();

  return (
    <div
      ref={hoverRef}
      className="group relative w-72 shrink-0 overflow-hidden rounded-2xl border border-background/10 bg-background/[0.03] p-6 transition-colors duration-200 hover:border-background/20 hover:bg-background/[0.05] sm:w-80"
    >
      {/* large faint number watermark, like the reference */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-3 select-none font-mono text-7xl font-bold text-background/5"
      >
        {value.n}
      </span>

      <div className={`relative flex size-11 items-center justify-center rounded-xl ${value.tile} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`size-5 ${value.color}`} strokeWidth={1.75} />
      </div>
      <h3 className="relative mt-5 text-lg font-bold">{value.label}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-background/55">
        {value.description}
      </p>
    </div>
  );
}

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
        <TextAnimate
          as="span"
          animation="slideLeft"
          by="character"
          once
          className="text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Why us
        </TextAnimate>
        <TextAnimate
          as="h2"
          animation="slideUp"
          by="word"
          once
          accessible={false}
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Reasons teams choose us — and stay
        </TextAnimate>
        <p className="mt-4 text-base leading-relaxed text-background/60">
          The reasons teams choose us — and stay with us — for the long run.
        </p>
        {/* each promise turns to dust before the next one fades in */}
        <VaporizeTextCycle
          texts={PROMISES}
          animation={{ vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 1.5 }}
          className="mt-6 h-12 text-2xl font-bold text-primary sm:text-3xl"
        />
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

      {/* what we stand for: an auto-scrolling wall, full-bleed off the section padding */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative mx-auto mt-20 max-w-7xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          What drives us
        </p>
      </motion.div>
      <div className="relative mt-8 -mx-6 overflow-hidden md:-mx-12">
        <Marquee pauseOnHover repeat={2} className="[--duration:45s]">
          {VALUES.map((v) => (
            <ValueCard key={v.label} value={v} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-foreground sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-foreground sm:w-32" />
      </div>
    </section>
  );
}
