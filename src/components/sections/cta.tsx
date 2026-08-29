"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";

const SERVICES = ["Website", "App", "CRM", "Automation", "Desktop Application", "Other"];

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to your CRM/email provider or a simple API route.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-border shadow-xl shadow-black/5 lg:grid-cols-2"
      >
        {/* left panel */}
        <div className="relative flex flex-col justify-center bg-foreground p-10 text-background sm:p-12">
          <div
            className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--primary)" }}
          />
          <span className="relative text-xs font-semibold uppercase tracking-widest text-primary">
            Get in touch
          </span>
          <h2 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something great together
          </h2>
          <p className="relative mt-4 text-sm leading-relaxed text-background/60">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>

          <div className="relative mt-8 flex items-center gap-3 rounded-xl bg-background/[0.06] p-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
              <Mail className="size-4 text-primary" />
            </span>
            <div>
              <p className="text-xs text-background/40">Email us</p>
              <a
                href="mailto:contact@cyrontech.in"
                className="text-sm font-medium transition hover:text-primary"
              >
                contact@cyrontech.in
              </a>
            </div>
          </div>
        </div>

        {/* right panel */}
        <div className="bg-card p-10 sm:p-12">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="size-6 text-emerald-500" />
              </div>
              <p className="mt-4 text-lg font-semibold text-foreground">
                Thanks{name ? `, ${name}` : ""} — message sent.
              </p>
              <p className="mt-1 text-sm text-foreground/50">
                We&apos;ll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-foreground">
                    Name <span className="text-primary">*</span>
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-foreground">
                    Email <span className="text-primary">*</span>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-foreground">
                    Phone <span className="text-foreground/40">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-foreground">
                    Service <span className="text-foreground/40">(optional)</span>
                  </span>
                  <select
                    defaultValue=""
                    className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Message <span className="text-primary">*</span>
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
              >
                Send Message
                <Send className="size-4" />
              </button>
              <p className="text-center text-xs text-foreground/40">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
