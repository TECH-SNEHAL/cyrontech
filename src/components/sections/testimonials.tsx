"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

// Reviews from real projects we've shipped — see PROJECTS in portfolio.tsx.
const REVIEWS = [
  { name: "Rohan Nair", role: "CEO, OHM Global Opportunities", body: "The platform took our hiring from scattered spreadsheets to tracking every lead and placement in one place. Understood our workflow from day one.", color: "bg-primary" },
  { name: "Krishna Prasad", role: "Project Manager, Synthesis Trust", body: "Between the admin panel and the mobile view, our whole team can track project deadlines without a single spreadsheet anymore.", color: "bg-emerald-500" },
  { name: "Jerrie", role: "CEO, World Academy for the Future of Women (USA)", body: "The site captures exactly who we are — powerful and easy for participants across the world to navigate.", color: "bg-rose-400" },
  { name: "Ananya Iyer", role: "Resort Manager, Luxury Farmstay", body: "Guests can check availability and book in seconds now. Reservations have never been this smooth for us.", color: "bg-teal-500" },
  { name: "Raja Naidu", role: "Restaurant Manager", body: "The booking site paid for itself in the first month. Simple for guests, even simpler for us to manage.", color: "bg-orange-500" },
  { name: "Bennie Joseph", role: "SaaS Project Manager", body: "Our CRM finally matches how our team actually sells — no more forcing our process to fit someone else's software.", color: "bg-violet-500" },
  { name: "Meera Krishnan", role: "Operations Lead", body: "The automation they built cut hours of manual work every week. Focused, no bloat, and it just works.", color: "bg-sky-500" },
  { name: "Aditya Rao", role: "IT Manager", body: "They took security and data privacy seriously from day one, and it shows in how everything's built.", color: "bg-pink-500" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <Card className="w-72 border-border bg-card">
      <CardContent>
        <blockquote className="text-sm leading-relaxed text-foreground/70">
          &ldquo;{review.body}&rdquo;
        </blockquote>
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${review.color}`}
          >
            {initials(review.name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const col1 = REVIEWS.slice(0, 2);
  const col2 = REVIEWS.slice(2, 4);
  const col3 = REVIEWS.slice(4, 6);
  const col4 = REVIEWS.slice(6, 8);

  return (
    <section id="testimonials" className="relative z-10 border-t border-border px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
          Client reviews
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Don&apos;t just take our word for it
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/50">
          See what our clients say about working with us and what it's like
          to have Cyron Tech build for you.
        </p>
      </motion.div>

      {/* mobile: single horizontal row */}
      <div className="relative mx-auto max-w-[100rem] overflow-hidden sm:hidden">
        <Marquee pauseOnHover className="[--duration:32s]">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
      </div>

      {/* desktop: 4 vertical columns */}
      <div className="relative mx-auto hidden h-[34rem] max-w-[100rem] gap-4 overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <Marquee vertical pauseOnHover className="h-full [--duration:28s]">
          {col1.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="h-full [--duration:28s]">
          {col2.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        <Marquee vertical pauseOnHover className="hidden h-full [--duration:28s] lg:flex">
          {col3.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="hidden h-full [--duration:28s] lg:flex">
          {col4.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background" />
      </div>
    </section>
  );
}
