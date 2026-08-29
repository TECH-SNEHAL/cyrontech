"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";

const NAV_ITEMS = ["Overview", "Projects", "Analytics", "Team", "Settings"];
const BARS = [30, 42, 26, 55, 38, 62, 82, 95];

export function DashboardMockup() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % NAV_ITEMS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl border border-border bg-card/80 p-2 shadow-2xl shadow-black/10 backdrop-blur-sm"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-yellow-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 rounded-md bg-foreground/5 px-3 py-1 text-xs text-foreground/40">
          app.cyrontech.in/analytics
        </span>
      </div>

      <div className="grid grid-cols-[8rem_1fr] gap-3 rounded-xl bg-background/60 p-4">
        {/* sidebar */}
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((label, i) => (
            <div key={label} className="relative rounded-lg px-2.5 py-2 text-xs font-medium">
              {active === i && (
                <motion.div
                  layoutId="dashboard-nav-active"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span
                className={`relative flex items-center gap-2 ${
                  active === i ? "text-primary" : "text-foreground/50"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${active === i ? "bg-primary" : "bg-foreground/20"}`}
                />
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* content */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-foreground/40">Revenue</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                $<CountUp target={48.2} duration={1.6} decimals={1} suffix="k" />
              </p>
              <p className="text-xs font-medium text-emerald-500">+18%</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-foreground/40">Active users</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                <CountUp target={12840} duration={1.6} />
              </p>
              <p className="text-xs font-medium text-emerald-500">+9%</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-foreground/40">Performance</p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                +128%
              </span>
            </div>
            <div className="flex h-16 items-end gap-1.5">
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                  className={`flex-1 rounded-sm ${
                    i >= BARS.length - 2 ? "bg-primary" : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs font-medium text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Deploy ready
            </span>
            <span className="text-xs text-primary/70">99.9% uptime</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
