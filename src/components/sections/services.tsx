"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Users,
  Workflow,
  Monitor,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { TiltCard } from "@/components/tilt-card";

const SERVICES = [
  {
    title: "Apps",
    tagline: "Built around the job, not the demo",
    description:
      "Android, iOS, and web apps shaped around how your team actually works — the way we built lead and placement tracking for a recruitment agency.",
    icon: Smartphone,
    capabilities: ["Android & iOS", "Offline-ready", "Web dashboards"],
  },
  {
    title: "CRM",
    tagline: "Your pipeline, your rules",
    description:
      "Leads, follow-ups, and reporting modelled on the way your team already sells, instead of bending your process around someone else's tool.",
    icon: Users,
    capabilities: ["Lead tracking", "Call reminders", "Custom reports"],
  },
  {
    title: "Automation",
    tagline: "The busywork, handled",
    description:
      "We connect the tools you already pay for and let the repetitive steps run themselves — no more copy-pasting between five tabs.",
    icon: Workflow,
    capabilities: ["Integrations", "Scheduled jobs", "Alerts"],
  },
  {
    title: "Desktop Applications",
    tagline: "Software that feels at home",
    description:
      "Admin panels and internal tools for Windows, macOS, and Linux — quick to open, quick to use, and dependable all day long.",
    icon: Monitor,
    capabilities: ["Windows & macOS", "Linux", "Admin panels"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative z-10 bg-secondary/40 px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[22rem_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/60">
            End-to-end digital services — strategy, design, engineering, and
            growth — under one roof.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Start a project
            <ArrowRight className="size-4" />
          </a>

          {/* featured service card */}
          <SpotlightCard className="mt-8 overflow-hidden rounded-2xl bg-foreground p-6 text-background transition-transform duration-300 hover:-translate-y-1">
            <div
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--primary)" }}
            />
            <div className="relative flex size-11 items-center justify-center rounded-xl bg-primary/20">
              <Globe className="size-5 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="relative mt-5 text-lg font-bold">
              Website Development
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-background/60">
              Fast, responsive, SEO-ready websites built on modern frameworks.
            </p>
            <a
              href="#contact"
              className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Learn more
              <ArrowUpRight className="size-3.5" />
            </a>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <TiltCard
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs text-foreground/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary/80">
                  {s.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {s.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/60"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* slides in only once the card is hovered */}
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Talk to us
                  <ArrowRight className="size-3.5" />
                </span>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
