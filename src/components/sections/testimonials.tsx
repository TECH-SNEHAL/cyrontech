"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { TextAnimate } from "@/components/ui/text-animate";
import { VIDEO_REVIEW, VIDEO_REVIEW_HEADER } from "@/lib/video-review";

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
    <Card className="w-72 shrink-0 border-border bg-card">
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

// The video review, laid out like a tweet card: who it is from, a line about
// them, then the clip. It is a file of ours rather than a post on X, so there
// is no X logo or link.
function VideoReviewCard({ className = "" }: { className?: string }) {
  const [who, from] = VIDEO_REVIEW_HEADER;

  return (
    <figure
      className={`w-full min-w-0 max-w-[19rem] flex-col gap-4 rounded-xl border border-border bg-card p-5 ${className}`}
    >
      <figcaption className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={VIDEO_REVIEW.avatar}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full border border-border/50 object-cover"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium leading-tight text-foreground">{who}</span>
            <span className="text-sm text-muted-foreground">{from}</span>
          </div>
        </div>
        <Quote aria-hidden className="size-5 shrink-0 text-muted-foreground" />
      </figcaption>

      <p className="text-[15px] leading-relaxed text-foreground">
        {VIDEO_REVIEW.background}
      </p>

      <video
        controls
        playsInline
        preload="none"
        poster={VIDEO_REVIEW.poster}
        width={VIDEO_REVIEW.width}
        height={VIDEO_REVIEW.height}
        aria-label={`Video review from the ${VIDEO_REVIEW.role} of ${VIDEO_REVIEW.org}`}
        className="h-auto w-full rounded-xl border border-border bg-muted object-cover shadow-sm"
        style={{ aspectRatio: `${VIDEO_REVIEW.width} / ${VIDEO_REVIEW.height}` }}
      >
        <source src={VIDEO_REVIEW.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </figure>
  );
}

export function Testimonials() {
  // two tall columns: each copy is already longer than the track, so two
  // copies are enough to loop without a visible gap
  const col1 = REVIEWS.slice(0, 4);
  const col2 = REVIEWS.slice(4, 8);

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
          <TextAnimate as="span" animation="slideLeft" by="character" once>
            Client reviews
          </TextAnimate>
        </span>
        <TextAnimate
          as="h2"
          animation="slideUp"
          by="word"
          once
          accessible={false}
          className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {"Don't just take our word for it"}
        </TextAnimate>
        <p className="mt-4 text-base leading-relaxed text-foreground/50">
          See what our clients say about working with us, and what it&apos;s like
          to have Cyron Tech build for you.
        </p>
      </motion.div>

      {/* phones and tablets: the video review sits above the wall */}
      <VideoReviewCard className="mx-auto mb-10 flex lg:hidden" />

      {/* mobile: single horizontal row */}
      <div className="relative mx-auto max-w-[100rem] overflow-hidden sm:hidden">
        <Marquee pauseOnHover repeat={2} className="[--duration:40s]">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
      </div>

      {/* sm and up: two vertical columns; from lg the video review stands between them */}
      <div className="relative mx-auto hidden h-[34rem] max-w-7xl gap-4 overflow-hidden sm:grid sm:grid-cols-2 lg:flex lg:h-[42rem] lg:justify-center">
        <Marquee vertical pauseOnHover repeat={2} className="h-full [--duration:36s] lg:shrink-0">
          {col1.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>
        {/* z-10 keeps it clear of the fades at the top and bottom of the wall */}
        <VideoReviewCard className="relative z-10 hidden self-center lg:flex" />
        <Marquee vertical reverse pauseOnHover repeat={2} className="h-full [--duration:36s] lg:shrink-0">
          {col2.map((r) => (
            <ReviewCard key={r.name + r.role} review={r} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background" />
      </div>
    </section>
  );
}
