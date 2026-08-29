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

          <div className="relative mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-background/[0.06] p-3.5">
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

            <a
              href="https://wa.me/919491990628?text=Hi%20Cyron%20Tech%2C%20I%27d%20like%20to%20enquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-background/[0.06] p-3.5 transition hover:bg-background/[0.1]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#25D366]" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.86 13.73c-.25.69-1.43 1.32-2 1.41-.51.07-1.16.1-1.87-.12-.43-.14-.98-.33-1.69-.63-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.22-1.61-1.22-3.08s.77-2.18 1.04-2.48c.27-.3.59-.37.79-.37h.57c.19.01.43-.07.67.51.25.59.84 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.14-.3.3-.13.6.17.3.77 1.27 1.65 2.06 1.13 1.01 2.08 1.32 2.38 1.47.29.14.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.72-.17 1.41z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-background/40">WhatsApp us</p>
                <p className="text-sm font-medium">+91 94919 90628</p>
              </div>
            </a>
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
