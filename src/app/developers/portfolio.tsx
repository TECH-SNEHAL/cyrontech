"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Copy, Moon, Sun } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { DustText } from "@/components/ui/dust-text";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { MorphingText } from "@/components/ui/morphing-text";
import { ParticleImage } from "@/components/ui/particle-image";
import { TextAnimate } from "@/components/ui/text-animate";
import VaporizeTextCycle from "@/components/ui/vapour-text-effect";
import { usePauseOffscreen } from "@/lib/use-pause-offscreen";
import { VIDEO_REVIEW, VIDEO_REVIEW_HEADER } from "@/lib/video-review";
import "./portfolio.css";

type LogTag = "work" | "education" | "leadership";

// One line of the career log.
type LogEntry = {
  tag: LogTag;
  when: string;
  title: string;
  org: string;
  points: string[];
  chips?: string[];
};

type Work = {
  label: string;
  meta: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  // A phrase to pick out in blue wherever it appears in the title or the three text blocks.
  highlight?: string;
  // Real app screenshots: one phone, two phones side by side, or one wide screen
  // (a TV or desktop shot).
  // `size` is a wide screenshot's pixel size, so its frame takes the same shape and nothing is
  // cropped. Without it a wide frame is 16:9.
  shots: { src: string; alt: string; wide?: boolean; size?: [number, number] }[];
};

const logFilters: { key: LogTag | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "education", label: "Education" },
];

const career: LogEntry[] = [
  {
    tag: "education",
    when: "2023 → 2027",
    title: "B.Tech, Computer Science and Engineering",
    org: "Indian Institute of Information Technology, Kottayam",
    points: ["Expected to graduate in 2027."],
  },
  {
    tag: "education",
    when: "2021 → 2023",
    title: "Sri Chaitanya Junior College",
    org: "Schooling before university",
    points: ["Studied here from 2021 to 2023, before joining IIIT Kottayam."],
  },
];

const work: Work[] = [
  {
    label: "Product build",
    meta: "Trust Project Management · 2026",
    title: "A project system built for a trust, not a template.",
    problem:
      "The team needed a central place to create, organize and monitor construction and charity projects without relying on scattered files.",
    solution:
      "A Flutter admin application with dynamic project forms, Material 3 components, Supabase authentication, relational data and role-aware workflows.",
    impact:
      "A focused internal tool that turns project information into a structured, searchable operational system.",
    tags: ["Flutter", "Supabase", "PostgreSQL", "Material 3", "RLS"],
    shots: [
      {
        src: "/portfolio/synthesis-trust-mobile.jpg",
        alt: "Synthesis Trust mobile app home screen showing ongoing projects",
      },
      {
        src: "/portfolio/synthesis-trust-project-budget.png",
        alt: "Synthesis Trust app project screen comparing budget with actual spend, with amounts blurred",
      },
    ],
  },
  {
    label: "Mobile app",
    meta: "OHM Global Opportunities · 2026",
    title: "A recruitment agency's leads and placements, in one app.",
    problem:
      "The agency needed one place to track candidates, follow-up calls and placements, and to see what was overdue.",
    solution:
      "A mobile CRM with a home dashboard for total, pending and placed records, candidates grouped by category, and a call list that flags overdue follow-ups.",
    impact:
      "Leads, calls and placement status are visible at a glance from the phone.",
    tags: ["Mobile app", "Recruitment CRM", "Leads", "Placements"],
    shots: [
      {
        src: "/portfolio/ohm-global-opportunities.jpg",
        alt: "OHM Global Opportunities mobile app dashboard with record counts by category",
      },
      {
        src: "/portfolio/ohm-global-lead-details-full.png",
        alt: "OHM Global Opportunities mobile app lead details screen, with personal details partly blurred",
      },
    ],
  },
  {
    label: "Mobile app",
    meta: "Synthesis Trust Admin Panel · 2026",
    title: "The trust's projects and funds, managed from a phone.",
    problem:
      "Trust staff needed to manage projects and check funds from a phone, not only from the desktop dashboard.",
    solution:
      "An admin app with a project overview by status, recent projects, new-project and upload screens, an activity log, and a stats screen showing funds collected, used and remaining with a monthly donation chart.",
    impact:
      "Project status and the fund position are each visible on a single screen.",
    tags: ["Mobile app", "Admin panel", "Projects", "Funds", "Donors"],
    shots: [
      {
        src: "/portfolio/synthesis-trust-admin-home.jpg",
        alt: "Synthesis Trust Admin Panel home screen with the project overview and recent projects",
      },
      {
        src: "/portfolio/synthesis-trust-admin-stats.png",
        alt: "Synthesis Trust Admin Panel stats screen with the fund overview and monthly donation chart",
      },
    ],
  },
  {
    label: "Android TV app",
    meta: "Acuity Vision Chart · 2026",
    title: "A digital vision chart built for eye doctors and optical shops.",
    problem:
      "Eye doctors and optical shops often depend on printed charts or improvised computer setups.",
    solution:
      "An interactive chart app covering the full range of optical tests, from Snellen, Landolt C and Tumbling E to Ishihara, Amsler and Duo, with a settable test distance and regional-language charts. It runs on Android TVs, Android boxes and Android emulators.",
    impact:
      "In use by many doctors today. Sign-in is subscription based, and a separate admin app controls the subscriptions.",
    tags: ["Capacitor", "JavaScript", "Android TV", "Subscriptions", "Admin app"],
    shots: [
      {
        src: "/portfolio/acuity-vision-chart-tv.png",
        alt: "Acuity Vision Chart on a TV, showing its grid of vision tests",
        wide: true,
      },
    ],
  },
  {
    label: "Desktop CRM",
    meta: "OHM Global CRM · 2026",
    title: "The control room for an overseas recruitment agency.",
    problem:
      "OHM Global Opportunities recruits healthcare and other workers for jobs abroad, and its leads arrive from the website, WhatsApp and Meta ads. Staff needed one place to see every lead and know who to call next.",
    solution:
      "A Flutter desktop app for Windows with staff sign-in. It gathers leads from every source into one call list, flags overdue and never-called leads, keeps each candidate's contact, profile and destination details, and logs every call.",
    impact:
      "It is the heart of the organization: all CRM data and the website's backend are managed from this one dashboard.",
    tags: ["Flutter", "Windows desktop", "Authentication", "CRM", "Website backend"],
    shots: [
      {
        src: "/portfolio/ohm-global-crm-desktop.png",
        alt: "OHM Global CRM on a desktop monitor, showing the call list and a lead's details",
        wide: true,
      },
    ],
  },
  {
    label: "Booking website",
    meta: "Luxury Farmstay · 2026",
    title: "A farmstay you can check and book from the first screen.",
    problem:
      "A luxury farmstay near Hyderabad hosts weddings, family gatherings and events, and guests needed a quick way to see whether their dates were free.",
    solution:
      "A booking website with an availability checker built into the hero: guests enter dates and guest count, pick day event, overnight stay, full weekend or wedding, and filter by occasion.",
    impact:
      "Availability is checked straight from the hero, by event type.",
    tags: ["Next.js", "Booking widget", "Website"],
    shots: [
      {
        src: "/portfolio/ira-luxury-farmstay.png",
        alt: "Luxury farmstay home page with the availability checker in the hero",
        wide: true,
        size: [1897, 889],
      },
    ],
  },
  {
    label: "Reservations website",
    meta: "Restaurant Booking · 2026",
    title: "Book a table in a few taps.",
    problem:
      "A restaurant needed online reservations for guests and a simple way for staff to manage them.",
    solution:
      "A reservation site where guests book a table in a few steps, with an admin page where staff manage the bookings.",
    impact:
      "Guests book in a few taps, and the floor is managed from one admin page.",
    tags: ["Next.js", "Reservations", "Admin page"],
    shots: [
      {
        src: "/portfolio/restaurant-booking-website.png",
        alt: "Restaurant reservations page with a link to the admin page",
        wide: true,
        size: [1918, 885],
      },
    ],
  },
  {
    label: "Program website",
    meta: "World Academy for the Future of Women · 2026",
    title: "A leadership program's home on the web.",
    problem:
      "An organization based in Arizona, USA runs a leadership program for women and needed a site that presents the program and the people who deliver it.",
    solution:
      "A website with pages for the program, its facilitators and ways to get involved, opening on a hero that leads straight to both.",
    impact:
      "The program and its facilitators are one click from the home page.",
    tags: ["Website", "Leadership program", "Arizona, USA"],
    highlight: "Arizona, USA",
    shots: [
      {
        src: "/portfolio/world-academy-future-of-women.png",
        alt: "World Academy for the Future of Women home page, with the program headline over a grid of portraits",
        wide: true,
        size: [1856, 898],
      },
    ],
  },
];

const modules: [string, string, string[]][] = [
  [
    "app",
    "Application shell. Navigation, dependency wiring and product-level orchestration.",
    ["Flutter", "GoRouter", "Riverpod"],
  ],
  [
    "feature:projects",
    "Project workflows, forms, validation and state.",
    ["Flutter", "Material 3", "Riverpod"],
  ],
  [
    "feature:media",
    "Playback, timeline state and synchronized content.",
    ["just_audio", "audio_service", "Media3"],
  ],
  [
    "feature:ai",
    "Retrieval, prompting and grounded conversational flows.",
    ["RAG", "Embeddings", "LLM APIs"],
  ],
  [
    "core:ui",
    "Reusable tokens, components, motion and responsive layouts.",
    ["Material 3", "Animations", "Responsive"],
  ],
  [
    "core:domain",
    "Pure business rules and use cases separated from infrastructure.",
    ["Dart", "Clean Architecture", "Use Cases"],
  ],
  [
    "core:data",
    "Repositories, mapping, persistence and remote contracts.",
    ["Supabase", "PostgreSQL", "JSON"],
  ],
  [
    "core:network",
    "HTTP, authentication and service integrations.",
    ["REST", "OAuth", "Edge Functions"],
  ],
  [
    "tooling",
    "Quality gates and release automation.",
    ["Git", "GitHub Actions", "Testing"],
  ],
  [
    "web",
    "Marketing and client-facing web surfaces.",
    ["React", "Vite", "TypeScript"],
  ],
];

// Module map: node centres in SVG units, in the same order as `modules`.
const MAP_W = 880;
const MAP_H = 300;
const NODE_W = 170;
const NODE_H = 50;
const nodePos: [number, number][] = [
  [440, 40],
  [220, 150],
  [440, 150],
  [660, 150],
  [110, 260],
  [330, 260],
  [550, 260],
  [770, 260],
  [220, 40],
  [660, 40],
];
// Links between modules as [from, to]; the arrow points at `to`.
const stackEdges: [number, number][] = [
  [8, 0],
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7],
  [6, 5], [6, 7],
  [9, 7],
];

function linkPath(a: number, b: number): string {
  const [ax, ay] = nodePos[a];
  const [bx, by] = nodePos[b];
  const side = Math.sign(bx - ax);
  if (ay === by) {
    // Same row: straight line between the facing edges.
    return `M ${ax + (side * NODE_W) / 2} ${ay} L ${bx - (side * NODE_W) / 2} ${by}`;
  }
  const y2 = by - NODE_H / 2;
  if (by - ay > 130) {
    // Skips a row: leave from the side so the line clears the row between.
    const dir = side || 1;
    const x1 = ax + (dir * NODE_W) / 2;
    const x2 = bx + dir * 22;
    return `M ${x1} ${ay} C ${x1 + dir * 70} ${ay}, ${x2} ${ay + 70}, ${x2} ${y2}`;
  }
  // Next row down: spread the end points so links into one node don't stack.
  const x1 = ax + side * 22;
  const x2 = bx - side * 22;
  const y1 = ay + NODE_H / 2;
  const mid = (y2 - y1) / 2;
  return `M ${x1} ${y1} C ${x1} ${y1 + mid}, ${x2} ${y2 - mid}, ${x2} ${y2}`;
}

// Skills as grouped on the resume, plus the web and AI groups. Each group prints as one
// terminal command and its output.
const skills: [string, string[]][] = [
  [
    "cross-platform",
    [
      "Flutter",
      "Dart",
      "Android",
      "iOS",
      "Windows",
      "Linux",
      "Responsive UI",
      "Accessibility",
      "State management",
      "Offline-first architecture",
      "Battery & performance optimization",
      "App Store deployment",
    ],
  ],
  [
    "web",
    [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Vite",
      "Real-time data",
      "Cloud services",
    ],
  ],
  ["ai", ["Hugging Face", "NumPy", "RAG", "Embeddings", "LLM APIs", "Machine learning"]],
  [
    "dotnet",
    ["C#", ".NET fundamentals", "Xamarin.Forms (foundational)", "XAML", "MVVM", "Visual Studio"],
  ],
  [
    "databases",
    [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
      "MongoDB",
      "SQL query optimization",
      "Relational schema design",
      "Indexing",
    ],
  ],
  [
    "backend",
    [
      "Node.js",
      "Express.js",
      "JSON",
      "REST API design & integration",
      "JWT authentication",
      "MVC architecture",
      "Third-party library integration",
    ],
  ],
  ["languages", ["Dart", "Java", "Python", "C#", "C", "C++", "JavaScript", "TypeScript", "SQL"]],
  [
    "tools",
    [
      "Git",
      "GitHub",
      "Postman",
      "Android Studio",
      "Visual Studio",
      "Agile / Scrum",
      "OOP",
      "RBAC",
      "API security",
      "Debugging",
      "Testing & deployment",
    ],
  ],
];

// Logo file in /public/skills for each skill that is a named technology. The rest show as text.
const skillIcons: Record<string, string> = {
  Flutter: "flutter",
  Dart: "dart",
  Android: "android",
  iOS: "apple",
  Windows: "windows11",
  Linux: "linux",
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  Vite: "vitejs",
  "Hugging Face": "huggingface",
  NumPy: "numpy",
  "C#": "csharp",
  ".NET fundamentals": "dotnetcore",
  "Xamarin.Forms (foundational)": "xamarin",
  "Visual Studio": "visualstudio",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  SQLite: "sqlite",
  Supabase: "supabase",
  MongoDB: "mongodb",
  "Node.js": "nodejs",
  "Express.js": "express",
  JSON: "json",
  Java: "java",
  Python: "python",
  C: "c",
  "C++": "cplusplus",
  JavaScript: "javascript",
  Git: "git",
  GitHub: "github",
  Postman: "postman",
  "Android Studio": "androidstudio",
};

// Contact: the copy button copies the email, "Start a conversation" opens a WhatsApp chat.
const EMAIL = "vijaysnehal1234@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/919491990628?text=" +
  encodeURIComponent("Hi Vijay, I'd like to talk about a project.");

// The disciplines under the product count, each with one line on what was built.
const disciplines: [string, string][] = [
  ["Mobile products", "Apps for Android, iOS and Android TV."],
  ["Business systems", "CRMs, admin panels and internal dashboards."],
  ["AI experiments", "Retrieval, embeddings and LLM-backed prototypes."],
  ["Web experiences", "Booking, reservation and program websites."],
];
// The last word of the hero headline, which melts from one of these to the next.
const headlineWords = ["products.", "applications.", "solutions."];
// How thick the dust is that "ideas", "apps" and the section headers form out of: 1 is the
// light dust of the contact line, each step up adds as much again.
const HEADLINE_DUST = 3;
// The contact heading asks "Have …?" and the rest melts from one of these to the next. Each
// carries its own article, so every question reads correctly. The first is the widest, which
// keeps the line the same width before and after the morphing starts.
const contactPhrases = ["an average app?", "an idea?", "a requirement?"];
// The names on their own, for the line under the count that shows them one at a time.
const disciplineNames = disciplines.map(([name]) => name);

// Logos drawn in black: the dark theme turns these white so they stay visible.
const monoLogos = new Set(["apple", "github", "express", "linux", "nextjs", "json"]);

const sections = [
  ["identity", "Identity"],
  ["experience", "Experience"],
  ["work", "Work"],
  ["stack", "Stack"],
  ["contact", "Contact"],
] as const;

export default function Portfolio() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const hold = hovering || focused;
  const [live, setLive] = useState(false);
  const [logFilter, setLogFilter] = useState<LogTag | "all">("all");
  const [logOpen, setLogOpen] = useState<number | null>(0);
  // The page keeps its own theme. It opens light on every visit, whatever the main site is set to.
  const [dark, setDark] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const picked = useRef(false);

  // The map's marching dashes and the terminal's blinking caret are repainted by the browser
  // on every frame, so each runs only while it is on screen.
  usePauseOffscreen(mapRef);
  usePauseOffscreen(caretRef);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // While nobody is pointing at the map, step through the modules on a timer.
  useEffect(() => {
    if (hold || !live) return;
    const id = setTimeout(
      () => {
        picked.current = false;
        setSel((s) => (s + 1) % modules.length);
      },
      picked.current ? 6000 : 2400,
    );
    return () => clearTimeout(id);
  }, [hold, live, sel]);

  // On narrow screens the map scrolls sideways: keep the auto-selected module in view.
  useEffect(() => {
    const box = scrollRef.current;
    if (!box || picked.current || box.scrollWidth <= box.clientWidth) return;
    const x = (nodePos[sel][0] / MAP_W) * box.scrollWidth;
    box.scrollTo({
      left: x - box.clientWidth / 2,
      behavior: live ? "smooth" : "auto",
    });
  }, [sel, live]);

  const pick = (i: number) => {
    picked.current = true;
    setSel(i);
  };

  // Touching the map (to tap or drag it) pauses the auto-play for a moment.
  const touchStart = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    picked.current = true;
    setHovering(true);
  };
  const touchEnd = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") setHovering(false);
  };

  const linked = stackEdges.flatMap(([a, b]) =>
    a === sel ? [b] : b === sel ? [a] : [],
  );

  useEffect(() => {
    const ids = sections.map(([id]) => id);
    const onScroll = () => {
      let best = 0;
      let dist = Infinity;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const d = Math.abs(el.getBoundingClientRect().top - 130);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const copy = async () => {
    await navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={dark ? "pf-root dark" : "pf-root"}>
      <div className="site">
        <header>
          <button className="brand" onClick={() => go("top")}>
            vijay<span>.snehal</span>
          </button>
          <nav>
            {sections.map(([id, label], i) => (
              <button
                className={active === i ? "on" : ""}
                onClick={() => go(id)}
                key={id}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="headend">
            <span className="status">
              <span className="dot"></span>open_to_remote ↗
            </span>
            <button
              type="button"
              className="theme"
              aria-label="Toggle dark mode"
              aria-pressed={dark}
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            </button>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="portrait">
              <Image
                ref={portraitRef}
                src="/team/vijay-snehal-blue-polo.png"
                alt="Vijay Snehal"
                fill
                // About twice the frame width, so the photo stays sharp on standard screens too.
                sizes="(max-width: 800px) 320px, 860px"
                quality={95}
                loading="eager"
                fetchPriority="high"
              />
              {/* The photo stays a sharp image. Near the pointer it breaks into dots that scatter
                  and drift back, like the name beside it. */}
              <ParticleImage imageRef={portraitRef} holeColor="--soft" particleDensity={3} />
            </div>
            {/* The name in dots that scatter away from the pointer. Its colours are read from the
                theme once, so it is rebuilt when the theme changes. */}
            <ParticleTextEffect
              key={dark ? "dark" : "light"}
              text="VIJAY SNEHAL"
              colors={["--accent", "--accent-2"]}
              align="left"
              particleDensity={3}
              textHeight={1}
              className="nameparticles"
            />
            <h1>
              <BlurIn>I turn</BlurIn>{" "}
              {/* "ideas" and "apps" gather out of a heavy cloud of dust, one after the other */}
              <DustText text="ideas" speed={1.4} delay={0.2} density={HEADLINE_DUST} />{" "}
              <BlurIn delay={0.1}>and ordinary</BlurIn>{" "}
              <DustText text="apps" speed={1.4} delay={0.6} density={HEADLINE_DUST} />{" "}
              <BlurIn delay={0.2}>into</BlurIn>{" "}
              <em>
                <AnimatedGradientText
                  colorFrom="var(--accent)"
                  colorTo="var(--accent-2)"
                  // italic letters lean past their box: the padding, repeated on every line, keeps them from being cut off
                  className="box-decoration-clone pr-[0.14em]"
                >
                  useful
                </AnimatedGradientText>{" "}
                {/* in the headline's own font and colour, and as wide as the widest word */}
                <MorphingText inline texts={headlineWords} morphTime={0.9} cooldownTime={1.2} />
              </em>
            </h1>
            <div className="metrics">
              <div>
                <b>2+</b>
                <span>
                  years building
                  <br />
                  software
                </span>
              </div>
              <div>
                <b>10+</b>
                <span>
                  products &amp;
                  <br />
                  experiments
                </span>
              </div>
              <div>
                <b>∞</b>
                <span>
                  things left
                  <br />
                  to build
                </span>
              </div>
            </div>
            <div className="scroll">
              <span>scrollBy(dy = ↓)</span>
              <ChevronDown size={14} />
            </div>
          </section>

          <div className="skills">
            <div className="codecard">
              <div className="codehead">
                <span className="codedots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                ~/skills
              </div>
              <div className="term">
                <dl>
                  {skills.map(([group, items]) => (
                    <div key={group}>
                      <dt>
                        <span aria-hidden="true">&gt;&gt;</span> ls skills/<b>{group}</b>
                      </dt>
                      <dd>
                        {items.map((s) => (
                          <span key={s}>
                            {skillIcons[s] && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                className={monoLogos.has(skillIcons[s]) ? "mono" : undefined}
                                src={`/skills/${skillIcons[s]}.svg`}
                                alt=""
                                width={18}
                                height={18}
                                decoding="async"
                              />
                            )}
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="term-caret" aria-hidden="true" ref={caretRef} data-anim="paused">
                  &gt;&gt;
                </div>
              </div>
            </div>
          </div>

          <section id="identity" className="section identity">
            <SectionHead num="01" title="identity" />
            <div className="identity-grid">
              <div>
                <p className="lead">
                  I&apos;m <strong>Vijay Snehal</strong>, a software engineer and
                  CSE student from India. I build mobile and web products where
                  the interface, architecture and real-world requirement all
                  have to work together.
                </p>
                <p>
                  I enjoy taking an idea from a rough requirement to a deployed
                  product — Flutter on the client, Supabase and PostgreSQL
                  behind it, and whatever engineering is needed in between.
                </p>
                <p>
                  My work spans business applications, media products, AI
                  experiments, dashboards and practical software for small
                  organizations.
                </p>
              </div>
              <div className="codecard">
                <div className="codehead">
                  <span className="codedots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  WhyICode.dart
                </div>
                <pre>
                  {`/**
I build to make ideas tangible.
Not for the framework itself,
but for the moment a rough idea
becomes something people can use.

`}
                  <span className="code-tag">@author</span>{" "}
                  <span className="code-name">Vijay Snehal</span>
                  {`
*/`}
                </pre>
              </div>
            </div>
            <div className="three">
              <Info title="What I do">
                Mobile products, web systems, backend integration, UI
                engineering and product prototypes that are designed to survive
                beyond the demo.
              </Info>
              <Info title="How I work">
                Product-minded and detail-oriented. I care about clean
                interfaces, maintainable code, reliable data and shipping
                something that actually solves the requirement.
              </Info>
              <Info title="Beyond the IDE">
                Computer science, product ideas, design, AI, music and
                experimenting with software that can become a real business.
              </Info>
            </div>
          </section>

          <section id="experience" className="section">
            <SectionHead num="02" title="experience" />
            <div className="logtitle">
              <h2>
                <SlideUp>Career, as a</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>Logcat stream.</SlideUp>
                </i>
              </h2>
            </div>
            <div className="logview">
              <div className="loghead">
                <span className="codedots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>career.log</span>
                <span className="logcount">
                  {logFilter === "all"
                    ? `${career.length} lines`
                    : `${career.filter((e) => e.tag === logFilter).length} of ${career.length} lines`}
                </span>
              </div>
              <div className="logfilters" role="group" aria-label="Filter the career log">
                {logFilters.map((f) => (
                  <button
                    type="button"
                    className={logFilter === f.key ? "on" : ""}
                    aria-pressed={logFilter === f.key}
                    onClick={() => {
                      setLogFilter(f.key);
                      // Open the first line that the new filter shows.
                      const first = career.findIndex((e) => f.key === "all" || e.tag === f.key);
                      setLogOpen(first === -1 ? null : first);
                    }}
                    key={f.key}
                  >
                    {f.label}
                    <b>
                      {f.key === "all"
                        ? career.length
                        : career.filter((e) => e.tag === f.key).length}
                    </b>
                  </button>
                ))}
              </div>
              <div className="loglines">
                {career.map((e, i) => {
                  if (logFilter !== "all" && e.tag !== logFilter) return null;
                  const open = logOpen === i;
                  return (
                    <div className={open ? "logitem open" : "logitem"} key={e.title}>
                      <button
                        type="button"
                        className="logrow"
                        aria-expanded={open}
                        aria-controls={`career-line-${i}`}
                        onClick={() => setLogOpen(open ? null : i)}
                      >
                        <span className="logn">{String(i + 1).padStart(2, "0")}</span>
                        <span className="logwhen">{e.when}</span>
                        <span className={`logtag ${e.tag}`}>I/{e.tag}</span>
                        <span className="logmain">
                          <strong>{e.title}</strong>
                          <em>{e.org}</em>
                        </span>
                        <ChevronDown className="logchev" size={18} aria-hidden="true" />
                      </button>
                      <div className="logbody" id={`career-line-${i}`} aria-hidden={!open}>
                        <div>
                          <ul>
                            {e.points.map((pt) => (
                              <li key={pt}>{pt}</li>
                            ))}
                          </ul>
                          {e.chips && (
                            <div className="chips">
                              {e.chips.map((c) => (
                                <span key={c}>{c}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="work" className="section">
            <SectionHead num="03" title="selected work" />
            <div className="workintro">
              <h2>
                <SlideUp>Case studies,</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>not screenshots.</SlideUp>
                </i>
              </h2>
              <p>
                Projects are where the stack becomes useful: a requirement, a
                constraint, a technical decision and something shipped.
              </p>
            </div>
            <div className="cases">
              {work.map((w, idx) => (
                <article className={idx % 2 ? "case flip" : "case"} key={w.title}>
                  <div className={w.shots.length > 1 ? "caseart pair" : "caseart"}>
                    {w.shots.map((shot) =>
                      shot.wide ? (
                        <div
                          className="screen-shot"
                          style={
                            shot.size
                              ? { aspectRatio: `${shot.size[0]} / ${shot.size[1]}` }
                              : undefined
                          }
                          key={shot.src}
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(max-width: 800px) 100vw, 1200px"
                            quality={95}
                            // Fetched up front with the other screenshots, behind the hero photo.
                            loading="eager"
                            fetchPriority="low"
                          />
                        </div>
                      ) : (
                        <div className="phone small shot" key={shot.src}>
                          <div className="phone-shot">
                            <Image
                              src={shot.src}
                              alt={shot.alt}
                              fill
                              // About twice the frame width, so small app text stays readable.
                              sizes="640px"
                              quality={95}
                              loading="eager"
                              fetchPriority="low"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="casetext">
                  <div className="case-top">
                    <span>{w.label}</span>
                    <span>{w.meta}</span>
                  </div>
                  <h3>
                    <Hl text={w.title} phrase={w.highlight} />
                  </h3>
                  <div className="casegrid">
                    <Block title="Problem">
                      <Hl text={w.problem} phrase={w.highlight} />
                    </Block>
                    <Block title="Solution">
                      <Hl text={w.solution} phrase={w.highlight} />
                    </Block>
                    <Block title="Impact">
                      <Hl text={w.impact} phrase={w.highlight} />
                    </Block>
                  </div>
                  <div className="tags">
                    {w.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  </div>
                </article>
              ))}
              {/* The client's video review, as one more case: a tweet-style card where the
                  screenshots go. It is a file of ours, not a post on X, so it carries no X logo. */}
              <article className="case">
                <div className="caseart">
                  <figure className="reviewcard">
                    <figcaption>
                      <Image src={VIDEO_REVIEW.avatar!} alt="" width={48} height={48} />
                      <div>
                        <b>{VIDEO_REVIEW_HEADER[0]}</b>
                        <span>{VIDEO_REVIEW_HEADER[1]}</span>
                      </div>
                    </figcaption>
                    <p>{VIDEO_REVIEW.background}</p>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={VIDEO_REVIEW.poster}
                      width={VIDEO_REVIEW.width}
                      height={VIDEO_REVIEW.height}
                      aria-label={`Video review from the ${VIDEO_REVIEW.role} of ${VIDEO_REVIEW.org}`}
                      style={{ aspectRatio: `${VIDEO_REVIEW.width} / ${VIDEO_REVIEW.height}` }}
                    >
                      <source src={VIDEO_REVIEW.video!} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </figure>
                </div>
                <div className="casetext">
                  <div className="case-top">
                    <span>Client review</span>
                    <span>Synthesis Trust · 2026</span>
                  </div>
                  <h3>Straight from the client.</h3>
                  <div className="casegrid">
                    <Block title="The review">A one-minute video from the trust&apos;s founder.</Block>
                    <Block title="The work">
                      The project system and the admin app built for Synthesis Trust: the first
                      and third case studies above.
                    </Block>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="scale">
            <div className="mono">{"// scale, in production"}</div>
            <strong>
              <CountUp target={10} duration={1.2} />
              <i>+</i>
            </strong>
            {/* The four disciplines, one at a time: each turns to dust before the next fades in.
                Its colour is read from the theme once, so it is rebuilt when the theme changes. */}
            <VaporizeTextCycle
              key={dark ? "dark" : "light"}
              texts={disciplineNames}
              animation={{ vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 1.5 }}
              className="disciplinecycle"
            />
            <p>
              products and experiments across the disciplines I build. Not a vanity metric:
              every project is a chance to make the next one faster.
            </p>
            <div className="disciplines">
              {disciplines.map(([name, desc], i) => (
                <div key={name}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h4>{name}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="stack" className="section stack">
            <SectionHead num="04" title="stack" />
            <div className="stackintro">
              <h2>
                <SlideUp>Building for</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>the long run.</SlideUp>
                </i>
              </h2>
              <p>
                Structure is a feature. It is what keeps a product fast to
                change after month twenty-four, not just month one.
              </p>
            </div>
            <div className="modmap">
              <div className="mapbox" ref={mapRef} data-anim="paused">
                <div className="maphint">
                  {"// hover or tap a module to trace its links"}
                </div>
                <div
                  className="mapscroll"
                  ref={scrollRef}
                  onPointerDown={touchStart}
                  onPointerUp={touchEnd}
                  onPointerCancel={touchEnd}
                >
                  <svg
                    className="mapsvg"
                    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                    role="group"
                    aria-label="Module map"
                  >
                    <defs>
                      <marker
                        id="pf-arrow"
                        viewBox="0 0 10 10"
                        refX="10"
                        refY="5"
                        markerWidth="9"
                        markerHeight="9"
                        markerUnits="userSpaceOnUse"
                        orient="auto"
                      >
                        <path className="mapmark" d="M0 1 L10 5 L0 9 z" />
                      </marker>
                      <marker
                        id="pf-arrow-on"
                        viewBox="0 0 10 10"
                        refX="10"
                        refY="5"
                        markerWidth="10"
                        markerHeight="10"
                        markerUnits="userSpaceOnUse"
                        orient="auto"
                      >
                        <path className="mapmark on" d="M0 1 L10 5 L0 9 z" />
                      </marker>
                    </defs>
                    <g>
                      {stackEdges.map(([a, b]) => (
                        <path
                          className="maplink"
                          d={linkPath(a, b)}
                          markerEnd="url(#pf-arrow)"
                          key={`${a}-${b}`}
                        />
                      ))}
                    </g>
                    <g>
                      {stackEdges
                        .filter(([a, b]) => a === sel || b === sel)
                        .map(([a, b]) => (
                          <path
                            className="maplink on"
                            d={linkPath(a, b)}
                            markerEnd="url(#pf-arrow-on)"
                            key={`${a}-${b}`}
                          />
                        ))}
                    </g>
                    {modules.map(([name, desc], i) => {
                      const [x, y] = nodePos[i];
                      const state =
                        i === sel ? " sel" : linked.includes(i) ? " near" : "";
                      return (
                        <g
                          className={`mapnode${state}`}
                          transform={`translate(${x - NODE_W / 2} ${y - NODE_H / 2})`}
                          tabIndex={0}
                          role="button"
                          aria-label={`${name}: ${desc}`}
                          aria-pressed={i === sel}
                          onPointerEnter={() => {
                            pick(i);
                            setHovering(true);
                          }}
                          onPointerLeave={() => setHovering(false)}
                          onFocus={(e) => {
                            // Keyboard focus only: a tap or click is handled by the pointer events.
                            if (!e.currentTarget.matches(":focus-visible")) return;
                            pick(i);
                            setFocused(true);
                          }}
                          onBlur={() => setFocused(false)}
                          key={name}
                        >
                          <rect width={NODE_W} height={NODE_H} rx="12" />
                          <text x={NODE_W / 2} y={NODE_H / 2}>{`:${name}`}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
              <aside
                className="mapinfo"
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
              >
                <div className="mapinfo-top">
                  <span>module</span>
                  <span>
                    {String(sel + 1).padStart(2, "0")} / {modules.length}
                  </span>
                </div>
                <div className="mapinfo-body" key={sel}>
                  <div className="moduletitle">:{modules[sel][0]}</div>
                  <p>{modules[sel][1]}</p>
                  <div className="chips">
                    {modules[sel][2].map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                  <div className="maplinked">
                    <span>linked modules</span>
                    <div>
                      {linked.map((j) => (
                        <b key={j}>:{modules[j][0]}</b>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section id="contact" className="section contact">
            <SectionHead num="05" title="contact" />
            <div className="availability">
              remote · UTC+5:30 · flexible overlap
            </div>
            <h2>
              <ContactLead />
              <br />
              <i>
                {/* scattered dust gathers to form the line, once, when it scrolls into view */}
                <DustText text="Let's make it useful." />
              </i>
            </h2>
            <div className="contactrow">
              <button onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
                {copied ? "copied()" : "copy(email)"}
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Start a conversation <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="socials">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href="https://medium.com/" target="_blank" rel="noopener noreferrer">
                Medium ↗
              </a>
            </div>
          </section>
        </main>

        <footer>
          © 2026 Vijay Snehal · From idea to useful product, one commit at a time. ·{" "}
          <a href="/developers/sharon">Sharon Sunaina Mohan ↗</a>
        </footer>
      </div>
    </div>
  );
}

// A section's header: its number, then its name, each gathering out of dust as the header
// scrolls into view.
function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="sectionhead">
      <DustText text={num} speed={1.4} density={HEADLINE_DUST} />
      <b>
        <DustText text={title} speed={1.4} delay={0.25} density={HEADLINE_DUST} />
      </b>
    </div>
  );
}

// The first line of the contact heading. A band of the accent colours sweeps across
// "Have an average app?" and the line settles on the text colour; after that the question
// itself melts from one to the next: an average app, an idea, a requirement.
// The question is one box in both states (it wraps as a piece, and is as wide as the widest
// question), so nothing moves when the morphing takes over from the sweep.
function ContactLead() {
  const [swept, setSwept] = useState(false);

  if (swept) {
    return (
      <span className="align-bottom leading-[100%]">
        Have{" "}
        <MorphingText
          inline
          // the heading is centred: the line closes up around a shorter question
          fit
          texts={contactPhrases}
          morphTime={0.9}
          cooldownTime={1.6}
          className={QUESTION_WRAP}
        />
      </span>
    );
  }
  return (
    <DiaTextReveal
      text={`Have ${contactPhrases[0]}`}
      textColor="var(--fg)"
      colors={["var(--accent)", "var(--accent-2)", "var(--frame)", "var(--accent)"]}
      duration={2.4}
      delay={0.35}
      onSwept={() => setSwept(true)}
    >
      Have <span className={`inline-grid whitespace-nowrap ${QUESTION_WRAP}`}>{contactPhrases[0]}</span>
    </DiaTextReveal>
  );
}

// The question stays on one line. Only a screen under 350px wide is too narrow for the
// longest one; there it may wrap, so the page never scrolls sideways.
const QUESTION_WRAP = "max-[349px]:whitespace-normal";

// Part of the hero headline: its words sharpen out of a blur, once.
function BlurIn({ children, delay }: { children: string; delay?: number }) {
  return (
    <TextAnimate as="span" animation="blurIn" by="word" once accessible={false} delay={delay}>
      {children}
    </TextAnimate>
  );
}

// One line of a heading: its words slide up into place, once, as it scrolls into view.
function SlideUp({ children, delay }: { children: string; delay?: number }) {
  return (
    <TextAnimate as="span" animation="slideUp" by="word" once accessible={false} delay={delay}>
      {children}
    </TextAnimate>
  );
}

function Info({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

function Hl({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase || !text.includes(phrase)) return <>{text}</>;
  const [before, ...rest] = text.split(phrase);
  return (
    <>
      {before}
      <strong className="hl">{phrase}</strong>
      {rest.join(phrase)}
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5>{title}</h5>
      <p>{children}</p>
    </div>
  );
}
