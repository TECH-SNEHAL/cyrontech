import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/ui/marquee";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const DEV = {
  name: "Vijay Snehal",
  role: "Full-stack developer",
  location: "Hyderabad, India",
  since: 2021,
  email: "contact@cyrontech.in",
  whatsapp: "919491990628",
  linkedin:
    "https://www.linkedin.com/in/sharon7103?utm_source=share_via&utm_content=profile&utm_medium=member_android",
};

const DISCIPLINES = [
  "Web",
  "Mobile",
  "CRM",
  "Automation",
  "Desktop",
  "Cloud",
  "UI/UX",
  "Integrations",
];

const WORK = [
  {
    year: "2025",
    name: "Luxury Farmstay",
    kind: "Booking website",
    note: "Availability by event type, checked straight from the hero.",
    image: "/portfolio/ira-luxury-farmstay.png",
  },
  {
    year: "2025",
    name: "Synthesis Trust",
    kind: "Admin panel + mobile",
    note: "Project tracking, uploads, and verification for an NGO.",
    image: "/portfolio/synthesis-trust-admin.png",
  },
  {
    year: "2024",
    name: "OHM Global Opportunities",
    kind: "Recruitment CRM",
    note: "Leads, calls, and placements for a recruitment agency.",
    image: "/portfolio/ohm-global-opportunities.jpg",
  },
  {
    year: "2024",
    name: "World Academy for the Future of Women",
    kind: "Nonprofit website",
    note: "Leadership program site for an Arizona-based nonprofit.",
    image: "/portfolio/world-academy-future-of-women.png",
  },
  {
    year: "2024",
    name: "Restaurant Booking",
    kind: "Reservations",
    note: "Book a table in a few taps; manage the floor from an admin page.",
    image: "/portfolio/restaurant-booking-website.png",
  },
];

const APPROACH = [
  {
    title: "Understand the job",
    body: "Before anything gets designed, I sit with how the work actually happens today — the spreadsheet, the WhatsApp group, the thing everyone works around.",
  },
  {
    title: "Build the smallest real thing",
    body: "Not a prototype. A working slice that someone can use on Monday, shipped early enough that the feedback still changes the outcome.",
  },
  {
    title: "Stay after launch",
    body: "Software earns trust in month three, not week one. I stay in the loop for the unglamorous part where it gets fast and boring and reliable.",
  },
];

const STACK = [
  { group: "Front end", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Back end", items: ["Node.js", "PostgreSQL", "REST & webhooks", "Auth"] },
  { group: "Mobile", items: ["Android", "iOS", "Offline-first sync"] },
  { group: "Ops", items: ["Docker", "AWS", "CI/CD", "Monitoring"] },
];

export const metadata: Metadata = {
  title: "Developers",
  description: `${DEV.name} — ${DEV.role} at Cyron Tech. Websites, mobile apps, CRMs, and automation built around how a business actually works.`,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
      {children}
    </h2>
  );
}

export default function DevelopersPage() {
  const years = new Date().getFullYear() - DEV.since;

  return (
    <main
      className={`${display.variable} relative min-h-screen bg-background text-foreground`}
    >
      {/* ---------- top bar ---------- */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Cyron Tech
        </Link>
        <a
          href={`mailto:${DEV.email}`}
          className="text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          {DEV.email}
        </a>
      </header>

      {/* ---------- hero ---------- */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10 md:pt-16">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
            {DEV.role} · {DEV.location}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            className="mt-7 text-balance text-[3.4rem] leading-[0.92] tracking-[-0.02em] sm:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {DEV.name}
          </h1>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-end gap-12 md:grid-cols-[1fr_22rem]">
          <Reveal delay={0.1}>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-foreground/60">
              I build the software behind Cyron Tech — websites, mobile apps,
              CRMs, and the automation that quietly removes the repetitive parts
              of a working day.
            </p>

            <dl className="mt-10 flex gap-10 border-t border-border pt-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-foreground/40">
                  Building since
                </dt>
                <dd
                  className="mt-1.5 text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {DEV.since}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-foreground/40">
                  Projects shipped
                </dt>
                <dd
                  className="mt-1.5 text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {WORK.length}+
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href={DEV.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-foreground/20 pb-0.5 transition-colors hover:border-foreground"
              >
                LinkedIn
                <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href={`https://wa.me/${DEV.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-foreground/20 pb-0.5 transition-colors hover:border-foreground"
              >
                WhatsApp
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-secondary">
              <Image
                src="/team/lead-developer.png"
                alt={`${DEV.name}, ${DEV.role} at Cyron Tech`}
                fill
                preload
                sizes="(min-width: 768px) 22rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- discipline strip ---------- */}
      <section
        aria-label="Disciplines"
        className="overflow-hidden border-y border-border py-5"
      >
        <Marquee pauseOnHover repeat={3} className="[--duration:45s] [--gap:3rem]">
          {DISCIPLINES.map((d) => (
            <span
              key={d}
              className="whitespace-nowrap text-2xl tracking-tight text-foreground/25 sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {d}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- about ---------- */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[10rem_1fr]">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/70">
              <p>
                Most of my work starts the same way: someone is running a real
                business on spreadsheets and goodwill, and needs a system shaped
                around how they already work rather than one they have to bend
                to. I like that problem.
              </p>
              <p>
                {years} years in, almost all of it with small teams where the
                software has to earn its place on day one — no committee, no
                six-month discovery phase. Just something that works, and keeps
                working.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- selected work ---------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
          </Reveal>

          <ul className="mt-12">
            {WORK.map((w, i) => (
              <li key={w.name}>
                <Reveal delay={Math.min(i, 3) * 0.04}>
                  <div className="group relative border-t border-border">
                    <div className="flex flex-col gap-2 py-8 transition-[padding] duration-300 ease-out sm:flex-row sm:items-baseline sm:gap-8 sm:group-hover:pl-5">
                      <span className="font-mono text-xs text-foreground/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="text-2xl tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-4xl"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {w.name}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-foreground/50">
                          {w.note}
                        </p>
                      </div>
                      <span className="text-sm text-foreground/40 sm:w-44 sm:text-right">
                        {w.kind}
                      </span>
                      <span className="font-mono text-xs text-foreground/30 sm:w-12 sm:text-right">
                        {w.year}
                      </span>
                    </div>

                    {/* desktop hover preview — opacity + transform only, no JS */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute right-[16%] top-1/2 z-10 hidden h-48 w-80 -translate-y-1/2 rotate-[-3deg] scale-95 overflow-hidden rounded-sm opacity-0 shadow-2xl shadow-black/25 transition-[opacity,transform] duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 lg:block"
                    >
                      <Image
                        src={w.image}
                        alt=""
                        fill
                        sizes="20rem"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="border-t border-border" />

          <Reveal delay={0.1}>
            <Link
              href="/#work"
              className="mt-10 inline-flex items-center gap-1.5 border-b border-foreground/20 pb-0.5 text-sm transition-colors hover:border-foreground"
            >
              See the full portfolio
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- approach ---------- */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[10rem_1fr]">
          <Reveal>
            <SectionLabel>How I work</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {APPROACH.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <span className="font-mono text-xs text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-3 text-xl tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                  {a.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- stack ---------- */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[10rem_1fr]">
          <Reveal>
            <SectionLabel>Stack</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.05}>
                <h3 className="text-sm font-semibold text-foreground">
                  {s.group}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/55">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-28">
          <Reveal>
            <SectionLabel>Get in touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href={`mailto:${DEV.email}`}
              className="mt-8 block text-balance text-[2.5rem] leading-[1.05] tracking-[-0.02em] transition-colors hover:text-primary sm:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {DEV.email}
            </a>
            <p className="mt-10 max-w-md text-base leading-relaxed text-foreground/50">
              Tell me what you&apos;re trying to build. If it&apos;s a fit,
              you&apos;ll hear back within a business day.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 text-sm text-foreground/40">
            <span>© {new Date().getFullYear()} Cyron Tech</span>
            <div className="flex gap-6">
              <a
                href={DEV.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/${DEV.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                WhatsApp
              </a>
              <Link href="/" className="transition-colors hover:text-foreground">
                Main site
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
