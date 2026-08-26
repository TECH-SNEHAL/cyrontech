"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { Process } from "@/components/sections/process";
import { cn } from "@/lib/utils";

const DEMO_SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire this up to your mailing-list provider (Resend, Mailchimp,
    // ConvertKit, a simple API route, etc). For now it just confirms locally.
    setSubmitted(true);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-white">
      {/* hero region — spotlight & grid backdrop are scoped here so they
          don't stretch across the sections below on scroll */}
      <div className="relative flex flex-col overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        {/* subtle grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* hero */}
        <div className="relative z-10 flex flex-1 flex-col-reverse items-center md:flex-row">
        {/* left: copy */}
        <div className="flex w-full flex-1 flex-col justify-center px-6 pb-16 pt-8 md:px-12 md:pb-0 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-xl md:mx-0"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Launching soon
            </span>

            <h1 className="mt-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl">
              Cyrontech
            </h1>
            <p className="mt-3 text-lg font-medium text-white/70 md:text-xl">
              Something new is taking shape.
            </p>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
              We&apos;re under construction and building something worth the
              wait — leave your email and be the first to know when we go
              live.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <Check className="size-4 shrink-0" />
                You&apos;re on the list — we&apos;ll email you at{" "}
                <span className="font-medium">{email}</span>.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-white/15 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 outline-none ring-white/20 backdrop-blur-sm transition focus:border-white/30 focus:ring-2"
                  />
                </div>
                <button
                  type="submit"
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.98]"
                  )}
                >
                  Notify me
                  <ArrowRight className="size-3.5" />
                </button>
              </form>
            )}

            <p className="mt-6 text-xs text-white/30">
              cyrontech.in &middot; no spam, just a heads-up on launch day
            </p>
          </motion.div>
        </div>

        {/* right: 3D scene */}
        <div className="relative h-[45vh] w-full flex-1 md:h-screen">
          <SplineScene
            scene={DEMO_SPLINE_SCENE}
            className="h-full w-full"
          />
        </div>
      </div>
      </div>

      <WhatWeBuild />
      <Process />

      <footer className="relative z-10 border-t border-white/10 px-6 py-5 text-center text-xs text-white/30 md:px-12 md:text-left">
        © {new Date().getFullYear()} Cyrontech. All rights reserved.
      </footer>
    </main>
  );
}
