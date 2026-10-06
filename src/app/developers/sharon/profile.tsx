"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Copy, Moon, Sun } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { DustText } from "@/components/ui/dust-text";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { MorphingText } from "@/components/ui/morphing-text";
import { ParticleImage } from "@/components/ui/particle-image";
import { TextAnimate } from "@/components/ui/text-animate";
import { usePauseOffscreen } from "@/lib/use-pause-offscreen";
import "../portfolio.css";
import "./sharon.css";

type LogTag = "work" | "education" | "leadership";

type LogEntry = {
  tag: LogTag;
  when: string;
  title: string;
  org: string;
  points: string[];
  chips?: string[];
};

const logFilters: { key: LogTag | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "leadership", label: "Leadership" },
  { key: "education", label: "Education" },
];

// Career log — her roles, newest first, no pay/contract/manager detail (none of that
// belongs on a public page).
const career: LogEntry[] = [
  {
    tag: "work",
    when: "2026 →",
    title: "Technical requirements, business development & business analysis",
    org: "Cyron Tech",
    points: [
      "Works client-side across Cyron Tech's builds: gathering and clarifying technical requirements, translating how a client's team actually works into product decisions.",
      "Runs feasibility and business analysis on proposed features against the client's real workflow, data and timeline before engineering time goes into them.",
      "For OHM Global Opportunities' CRM and app — a Cyron Tech build for the recruitment agency client — bridged the gap between what the client asked for and what the build needed to prioritize first.",
    ],
    chips: ["Technical requirements", "Business development", "Business analysis"],
  },
  {
    tag: "education",
    when: "2026 → 2028",
    title: "MSc Artificial Intelligence for Business Intelligence",
    org: "University of Leicester, UK",
    points: [
      "Modules: Fundamentals & Statistics of Data Science, Computational Intelligence & Software Engineering, Data Mining & Neural Networks, International Business, Generalised Linear Models & Functional Data Analysis.",
    ],
  },
  {
    tag: "leadership",
    when: "2026 →",
    title: "PGT College Academic Representative, CSE",
    org: "University of Leicester Students' Union",
    points: [
      "Elected college-level representative in the three-tier student representation system.",
      "Chairs termly College Academic Representation Meetings across PGT School and Course Reps.",
    ],
  },
  {
    tag: "work",
    when: "Aug – Nov 2025",
    title: "CRM Operations Intern",
    org: "WE Hub — Government of Telangana (T-Hub, Hyderabad)",
    points: [
      "Worked in Zoho CRM across Leads, Contacts, Accounts and Deals.",
      "Configured custom fields, layouts and basic workflow automation.",
      "Managed and organized CRM data for 1,500+ students, entrepreneurs, stakeholders and investors.",
    ],
    chips: ["Zoho CRM", "Workflow automation"],
  },
  {
    tag: "work",
    when: "Jun 2025 →",
    title: "WAFW India Alumni Representative",
    org: "World Academy for the Future of Women",
    points: [
      "Manages and verifies alumni records in a global database for accuracy and security.",
      "Point of contact between Indian alumni and the international leadership team.",
    ],
  },
  {
    tag: "leadership",
    when: "Dec 2023 – Feb 2025",
    title: "Student Co-Director, India",
    org: "World Academy for the Future of Women (WAFW)",
    points: [
      "Selected among 150 students worldwide for a leadership programme aligned with the UN Sustainable Development Goals.",
      "Official liaison between global leadership and 200+ Indian students across a 10+ country cohort.",
      "Managed participant data, attendance and logistics for international facilitators.",
    ],
  },
  {
    tag: "work",
    when: "Sep 2025 →",
    title: "LinkedIn Campus Ambassador",
    org: "LinkedIn, via WE Hub (Govt. of Telangana)",
    points: [
      "1 of 5 campus ambassadors selected as top performer in the WE Enable programme.",
      "Grew a LinkedIn presence to 2,500+ followers with 4,000–5,000 impressions per post.",
      "Invited to LinkedIn HQ, Bengaluru for the Campus Ambassador induction.",
    ],
  },
  {
    tag: "leadership",
    when: "Jun 2024 – May 2025",
    title: "Vice President, Women Empowerment Cell",
    org: "Govt. Degree College for Women, Osmania University",
    points: ["Served a student body of 4,000+ women, alongside an 8-member committee."],
  },
  {
    tag: "leadership",
    when: "Jun 2023 – May 2024",
    title: "General Secretary, Student Union",
    org: "Govt. Degree College for Women, Osmania University",
    points: ["Led a team of 20 student representatives for a student body of 4,000+."],
  },
  {
    tag: "work",
    when: "Jan – Dec 2025",
    title: "Student Ambassador, WE Enable Program",
    org: "WE Hub — Government of Telangana",
    points: [
      "Selected among 120 students for a competitive entrepreneurship development programme.",
      "Supported outreach reaching 600+ students across 20+ institutions in Hyderabad.",
      "Awarded the Ambassador Leadership Award — 1 of 30 students from 600+ across 20+ universities.",
    ],
    chips: ["Outreach", "Award"],
  },
  {
    tag: "leadership",
    when: "2024",
    title: "Project Lead, 'Blooming Flowers'",
    org: "World Academy for the Future of Women (India Chapter)",
    points: [
      "Led a team of volunteers delivering life-skills education sessions in government schools.",
      "Reached 200+ students from underserved communities across Hyderabad.",
    ],
  },
  {
    tag: "work",
    when: "Oct 2024 – Jan 2025",
    title: "UMEED Apprenticeship / Career Readiness Program",
    org: "UMEED, Hyderabad",
    points: [
      "Personal and professional development: CV building, public speaking, digital literacy, negotiation.",
      "Later invited back as a beneficiary speaker at OFSI Sangam 2025.",
    ],
  },
  {
    tag: "leadership",
    when: "2026 →",
    title: "Peer Mentor",
    org: "University of Leicester Students' Union",
    points: ["Supports new postgraduate students in settling into university life."],
  },
  {
    tag: "education",
    when: "2022 → 2025",
    title: "B.Sc. Data Science, Computer Science & Mathematics",
    org: "Govt. Degree College for Women, Osmania University, Hyderabad",
    points: ["First Class — 93%."],
  },
];

// Awards & recognition — shown as a strip under the career log.
const awards: { title: string; org: string; when: string }[] = [
  { title: "1st Place — International Student Consultancy Challenge", org: "University of Leicester / Student Circus / Career Hub", when: "Mar 2026" },
  { title: "1st Place — Women in STEM × PHAT Buns UK Ideathon", org: "University of Leicester", when: "Mar 2026" },
  { title: "Winner, Case Study Competition", org: "LinkedIn Campus Connect, LinkedIn HQ Bangalore", when: "Sep 2025" },
  { title: "Ambassador Leadership Award", org: "WE Enable Programme, WE Hub — 1 of 30 from 600+ students", when: "Dec 2025" },
];

// Speaking engagements — panels and sessions.
const speaking: { title: string; org: string }[] = [
  { title: "Panelist, Youth & Entrepreneurship", org: "Telangana Rising Global Summit 2025" },
  { title: "Alumna Panelist", org: "OFSI Sangam 2025, Omega Healthcare Management Services" },
  { title: "“Leveraging LinkedIn for Career Growth and Personal Branding”", org: "WAFW Alumni Workshop (international session)" },
];

// Cyron Tech's projects (the same builds as Vijay's /developers portfolio),
// each with her business-side contribution: client-facing technical
// requirements, business development and business analysis — not the
// engineering, which is his case studies to tell.
type ProjectCase = {
  label: string;
  meta: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  shots: { src: string; alt: string; wide?: boolean; size?: [number, number] }[];
};

const work: ProjectCase[] = [
  {
    label: "Mobile app",
    meta: "OHM Global Opportunities · 2026",
    title: "The client conversation behind a recruitment agency's app.",
    problem:
      "OHM Global Opportunities needed their lead and placement tracking rebuilt, but nobody had mapped how their recruiters actually worked day to day.",
    solution:
      "Gathered technical requirements directly with OHM, then ran feasibility and business analysis on each proposed feature against their real workflow before it reached Cyron Tech's engineering team.",
    impact: "The build matched how OHM actually sells and recruits, instead of forcing their process around someone else's tool.",
    tags: ["Technical requirements", "Business analysis", "Client liaison"],
    shots: [{ src: "/portfolio/ohm-global-opportunities.jpg", alt: "OHM Global Opportunities mobile app dashboard" }],
  },
  {
    label: "Desktop CRM",
    meta: "OHM Global CRM · 2026",
    title: "Scoping the control room for an overseas recruitment agency.",
    problem:
      "OHM's leads arrived from the website, WhatsApp and Meta ads with no single place to see them, and staff needed to know who to call next.",
    solution:
      "Business analysis on the client's call-list and lead-flow requirements, feeding directly into what the desktop CRM needed to prioritize first.",
    impact: "All of OHM's CRM data and website backend are now managed from one dashboard.",
    tags: ["Business analysis", "Requirements gathering"],
    shots: [{ src: "/portfolio/ohm-global-crm-desktop.png", alt: "OHM Global CRM on a desktop monitor", wide: true }],
  },
  {
    label: "Product build",
    meta: "Trust Project Management · 2026",
    title: "Translating a trust's needs into a project system.",
    problem:
      "Synthesis Trust needed a central place to create, organize and monitor construction and charity projects, and had no clear spec for what that needed to do.",
    solution:
      "Client liaison and technical requirements gathering with the trust, turning loose asks into a scoped feature set for the build team.",
    impact: "A focused internal tool that turns project information into a structured, searchable system.",
    tags: ["Client liaison", "Technical requirements"],
    shots: [{ src: "/portfolio/synthesis-trust-mobile.jpg", alt: "Synthesis Trust mobile app home screen" }],
  },
  {
    label: "Mobile app",
    meta: "Synthesis Trust Admin Panel · 2026",
    title: "Scoping the trust's funds and projects, for a phone.",
    problem: "Trust staff needed to manage projects and check funds from a phone, not only the desktop dashboard.",
    solution: "Business analysis on which screens staff actually needed on mobile, and in what priority.",
    impact: "Project status and the fund position are each visible on a single screen.",
    tags: ["Business analysis", "Requirements"],
    shots: [{ src: "/portfolio/synthesis-trust-admin-home.jpg", alt: "Synthesis Trust Admin Panel home screen" }],
  },
  {
    label: "Android TV app",
    meta: "Acuity Vision Chart · 2026",
    title: "Requirements for a digital vision chart.",
    problem: "Eye doctors and optical shops often depend on printed charts or improvised computer setups.",
    solution: "Client requirements and feasibility study across the full range of optical tests the chart needed to cover.",
    impact: "In use by many doctors today, running on Android TVs, boxes and emulators.",
    tags: ["Client requirements", "Feasibility study"],
    shots: [{ src: "/portfolio/acuity-vision-chart-tv.png", alt: "Acuity Vision Chart on a TV", wide: true }],
  },
  {
    label: "Booking website",
    meta: "Luxury Farmstay · 2026",
    title: "Scoping an availability checker, by event type.",
    problem: "A luxury farmstay near Hyderabad hosts weddings, family gatherings and events, and guests needed a quick way to see whether their dates were free.",
    solution: "Business analysis on how guests actually search for dates, which shaped the availability checker built into the hero.",
    impact: "Availability is checked straight from the hero, by event type.",
    tags: ["Business analysis", "Requirements"],
    shots: [{ src: "/portfolio/ira-luxury-farmstay.png", alt: "Luxury farmstay home page with the availability checker", wide: true, size: [1897, 889] }],
  },
  {
    label: "Reservations website",
    meta: "Restaurant Booking · 2026",
    title: "Requirements for guest and staff-side booking.",
    problem: "A restaurant needed online reservations for guests and a simple way for staff to manage them.",
    solution: "Requirements analysis across both sides of the booking flow — the guest-facing form and the admin page.",
    impact: "Guests book in a few taps, and the floor is managed from one admin page.",
    tags: ["Requirements analysis"],
    shots: [{ src: "/portfolio/restaurant-booking-website.png", alt: "Restaurant reservations page", wide: true, size: [1918, 885] }],
  },
  {
    label: "Program website",
    meta: "World Academy for the Future of Women · 2026",
    title: "Client-side requirements for a leadership program's site.",
    problem: "An organization based in Arizona, USA runs a leadership program for women and needed a site that presents the program and the people who deliver it.",
    solution: "Client-side requirements gathering on what the program and its facilitators needed the site to communicate.",
    impact: "The program and its facilitators are one click from the home page.",
    tags: ["Client-side requirements"],
    shots: [{ src: "/portfolio/world-academy-future-of-women.png", alt: "World Academy for the Future of Women home page", wide: true, size: [1856, 898] }],
  },
];

// Org map: the organizations and programs she's worked across, drawn as the same kind
// of node graph his stack section uses for code modules.
const orgs: [string, string, string[]][] = [
  ["Cyron Tech", "Technical requirements, business development and business analysis across client builds, including OHM Global Opportunities' CRM.", ["Requirements", "Business analysis"]],
  ["WE Hub", "CRM Operations Intern, Govt. of Telangana — T-Hub, Hyderabad.", ["Zoho CRM", "Data ops"]],
  ["WAFW", "Student Co-Director, then India Alumni Representative.", ["Leadership", "Alumni data"]],
  ["LinkedIn", "Campus Ambassador — 1 of 5 selected, WE Enable top performer.", ["Branding", "Content"]],
  ["U. of Leicester", "MSc AI for Business Intelligence, College Academic Rep.", ["AI", "BI"]],
  ["Osmania Univ.", "B.Sc. Data Science, CS & Mathematics — First Class, 93%.", ["Data Science"]],
  ["Student Union", "General Secretary, then VP of the Women Empowerment Cell.", ["4,000+ students"]],
  ["UMEED", "Career readiness apprenticeship; later a beneficiary speaker.", ["CV & comms"]],
];
const MAP_W = 880;
const MAP_H = 260;
const NODE_W = 170;
const NODE_H = 50;
// Two rows of four, each node at least NODE_W + 40px from its row neighbours so
// nothing overlaps: row 1 at x = 115, 335, 555, 775; row 2 the same, offset down.
const nodePos: [number, number][] = [
  [115, 60],  // 0 Cyron Tech
  [335, 60],  // 1 WE Hub
  [555, 60],  // 2 WAFW
  [775, 60],  // 3 LinkedIn
  [115, 200], // 4 U. of Leicester
  [335, 200], // 5 Osmania University
  [555, 200], // 6 Student Union
  [775, 200], // 7 UMEED
];
const orgEdges: [number, number][] = [
  [1, 0],
  [2, 1], [2, 3], [2, 0],
  [4, 2], [4, 6],
  [5, 3],
  [6, 2],
  [7, 2],
];

function linkPath(a: number, b: number): string {
  const [ax, ay] = nodePos[a];
  const [bx, by] = nodePos[b];
  const side = Math.sign(bx - ax);
  if (ay === by) {
    // Same row: if another node sits between them, bow the line above the row
    // so it never passes through that node; otherwise a straight line is fine.
    const lo = Math.min(ax, bx);
    const hi = Math.max(ax, bx);
    const passesThrough = nodePos.some(
      ([x, y], i) => y === ay && i !== a && i !== b && x > lo && x < hi,
    );
    if (!passesThrough) {
      return `M ${ax + (side * NODE_W) / 2} ${ay} L ${bx - (side * NODE_W) / 2} ${by}`;
    }
    const x1 = ax + (side * NODE_W) / 2;
    const x2 = bx - (side * NODE_W) / 2;
    const bow = ay - NODE_H * 0.9;
    return `M ${x1} ${ay} C ${x1} ${bow}, ${x2} ${bow}, ${x2} ${by}`;
  }
  const y2 = by - NODE_H / 2;
  const x1 = ax + side * 22;
  const x2 = bx - side * 22;
  const y1 = ay + NODE_H / 2;
  const mid = (y2 - y1) / 2;
  return `M ${x1} ${y1} C ${x1} ${y1 + mid}, ${x2} ${y2 - mid}, ${x2} ${y2}`;
}

const skills: [string, string[]][] = [
  ["technical-requirements", ["Requirements gathering", "Feasibility studies", "Scoping & planning", "Client-to-engineering translation"]],
  ["business-analysis", ["Business development", "Stakeholder liaison", "Client relationship management", "Zoho CRM"]],
  [
    "ai-ml",
    ["Supervised & unsupervised learning", "Image classification (CNN)", "Natural language processing", "Neural networks (foundational)"],
  ],
  ["data", ["Python", "Data cleaning & structuring", "Statistical modelling", "Functional data analysis"]],
  ["communication", ["Public speaking", "Panel discussions", "LinkedIn content & branding", "Workshop facilitation"]],
  ["productivity", ["Excel", "PowerPoint", "Word", "Teams & Outlook"]],
];

const EMAIL = "sharonsunaina7@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/sharon7103";
const GITHUB_URL = "https://github.com/Sharonsunaina7";

const headlineWords = ["workable projects.", "client relationships.", "business outcomes."];
const HEADLINE_DUST = 3;
const contactPhrases = ["a CRM to untangle?", "a requirement?", "a project to plan?"];
// Vijay's page tunes this for phrases under ~16 characters; these run longer,
// so the line needs to wrap on more phones, not just the narrowest ones.
const QUESTION_WRAP = "max-[480px]:whitespace-normal";

const sections = [
  ["identity", "Identity"],
  ["experience", "Experience"],
  ["work", "Work"],
  ["recognition", "Recognition"],
  ["network", "Network"],
  ["contact", "Contact"],
] as const;

function BlurIn({ children, delay }: { children: string; delay?: number }) {
  return (
    <TextAnimate as="span" animation="blurIn" by="word" once accessible={false} delay={delay}>
      {children}
    </TextAnimate>
  );
}

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

function ContactLead() {
  const [swept, setSwept] = useState(false);

  if (swept) {
    return (
      <span className="align-bottom leading-[100%]">
        Have{" "}
        <MorphingText
          inline
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

export default function SharonProfile() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const hold = hovering || focused;
  const [live, setLive] = useState(false);
  const [logFilter, setLogFilter] = useState<LogTag | "all">("all");
  const [logOpen, setLogOpen] = useState<number | null>(0);
  const [dark, setDark] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const picked = useRef(false);

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

  useEffect(() => {
    if (hold || !live) return;
    const id = setTimeout(
      () => {
        picked.current = false;
        setSel((s) => (s + 1) % orgs.length);
      },
      picked.current ? 6000 : 2400,
    );
    return () => clearTimeout(id);
  }, [hold, live, sel]);

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

  const touchStart = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    picked.current = true;
    setHovering(true);
  };
  const touchEnd = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") setHovering(false);
  };

  const linked = orgEdges.flatMap(([a, b]) => (a === sel ? [b] : b === sel ? [a] : []));

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

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={dark ? "pf-root dark" : "pf-root"}>
      <div className="site">
        <header>
          <button className="brand" onClick={() => go("top")}>
            sharon<span>.sunaina</span>
          </button>
          <nav>
            {sections.map(([id, label], i) => (
              <button className={active === i ? "on" : ""} onClick={() => go(id)} key={id}>
                {label}
              </button>
            ))}
            <Link href="/developers">Vijay ↗</Link>
          </nav>
          <div className="headend">
            <span className="status">
              <span className="dot"></span>placement_year_2027 ↗
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
                src="/team/sharon-sunaina-blue-blazer.png"
                alt="Sharon Sunaina Mohan"
                fill
                sizes="(max-width: 800px) 320px, 860px"
                quality={95}
                loading="eager"
                fetchPriority="high"
              />
              {/* The photo stays a sharp image. Near the pointer it breaks into dots that
                  scatter and drift back, like the name beside it. */}
              <ParticleImage imageRef={portraitRef} holeColor="--soft" particleDensity={3} />
            </div>
            <ParticleTextEffect
              key={dark ? "dark" : "light"}
              text="SHARON SUNAINA"
              colors={["--accent", "--accent-2"]}
              align="left"
              particleDensity={3}
              textHeight={1}
              className="nameparticles"
            />
            <h1>
              <BlurIn>I turn</BlurIn>{" "}
              <DustText text="requirements" speed={1.4} delay={0.2} density={HEADLINE_DUST} />{" "}
              <BlurIn delay={0.1}>into</BlurIn>{" "}
              <em>
                <MorphingText inline texts={headlineWords} morphTime={0.9} cooldownTime={1.2} />
              </em>
            </h1>
            <div className="metrics">
              <div>
                <b>1,500+</b>
                <span>
                  CRM records
                  <br />
                  managed
                </span>
              </div>
              <div>
                <b>4</b>
                <span>
                  first-place
                  <br />
                  competitions
                </span>
              </div>
              <div>
                <b>4,000+</b>
                <span>
                  students
                  <br />
                  represented
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
                          <span key={s}>{s}</span>
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
                  I&apos;m <strong>Sharon Sunaina Mohan</strong>, handling
                  technical requirements, business development and business
                  analysis for Cyron Tech, and an MSc student in AI for Business
                  Intelligence at the University of Leicester. I turn a
                  client&apos;s loose idea of what they want into something a
                  build team can actually scope and deliver.
                </p>
                <p>
                  On OHM Global Opportunities&apos; CRM and app — a Cyron Tech
                  build for the recruitment agency client — that meant sitting
                  with OHM, understanding how their recruiters actually work day
                  to day, and checking what was feasible before engineering time
                  went into it.
                </p>
                <p>
                  Outside of that, my background is student leadership, client
                  relationship management and public speaking — representing
                  thousands of students, running CRM operations for an incubator,
                  and coordinating international cohorts.
                </p>
              </div>
              <div className="codecard">
                <div className="codehead">
                  <span className="codedots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  WhySharon.md
                </div>
                <pre>
                  {`/**
I bring structure to a requirement
before it becomes a build.
Not for the process itself,
but so the right thing gets built
the first time.

`}
                  <span className="code-tag">@contact</span>{" "}
                  <span className="code-name">Sharon Sunaina Mohan</span>
                  {`
*/`}
                </pre>
              </div>
            </div>
            <div className="three">
              <Info title="What I do">
                Project management, client relationship management and business
                operations — turning a loose ask into something a build team can
                scope and ship.
              </Info>
              <Info title="How I work">
                Straight-to-the-point — I don&apos;t over-complicate, and I answer
                the question that was actually asked, not the one that sounds
                impressive.
              </Info>
              <Info title="Beyond the brief">
                AI for business, data analysis, public speaking, and women&apos;s
                leadership — currently an MSc student building on all of it.
              </Info>
            </div>
          </section>

          <section id="experience" className="section">
            <SectionHead num="02" title="experience" />
            <div className="logtitle">
              <h2>
                <SlideUp>A record, as a</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>career log.</SlideUp>
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
                      const first = career.findIndex((e) => f.key === "all" || e.tag === f.key);
                      setLogOpen(first === -1 ? null : first);
                    }}
                    key={f.key}
                  >
                    {f.label}
                    <b>{f.key === "all" ? career.length : career.filter((e) => e.tag === f.key).length}</b>
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
                <SlideUp>Requirements,</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>scoped right.</SlideUp>
                </i>
              </h2>
              <p>
                Where the requirement meets the build — a client&apos;s real
                workflow, checked for feasibility, before a line of code goes
                in. The same role across Cyron Tech&apos;s client builds.
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
                          style={shot.size ? { aspectRatio: `${shot.size[0]} / ${shot.size[1]}` } : undefined}
                          key={shot.src}
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(max-width: 800px) 100vw, 1200px"
                            quality={95}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="phone small shot" key={shot.src}>
                          <div className="phone-shot">
                            <Image
                              src={shot.src}
                              alt={shot.alt}
                              fill
                              sizes="640px"
                              quality={95}
                              loading="lazy"
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
                    <h3>{w.title}</h3>
                    <div className="casegrid">
                      <Block title="Problem">{w.problem}</Block>
                      <Block title="Solution">{w.solution}</Block>
                      <Block title="Impact">{w.impact}</Block>
                    </div>
                    <div className="tags">
                      {w.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="recognition" className="section">
            <SectionHead num="04" title="recognition" />
            <div className="workintro">
              <h2>
                <SlideUp>Wins, panels</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>and sessions.</SlideUp>
                </i>
              </h2>
              <p>Competitions placed in, and rooms spoken in, along the way.</p>
            </div>
            <div className="recognition-grid">
              <div className="recognition-col">
                <h4>Awards &amp; competitions</h4>
                <ul className="recognition-list">
                  {awards.map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}</strong>
                      <span>{a.org}</span>
                      <em>{a.when}</em>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="recognition-col">
                <h4>Speaking</h4>
                <ul className="recognition-list">
                  {speaking.map((s) => (
                    <li key={s.title}>
                      <strong>{s.title}</strong>
                      <span>{s.org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="network" className="section stack">
            <SectionHead num="05" title="network" />
            <div className="stackintro">
              <h2>
                <SlideUp>Built across</SlideUp>
                <br />
                <i>
                  <SlideUp delay={0.15}>many rooms.</SlideUp>
                </i>
              </h2>
              <p>
                The organizations and programs behind the experience above — hover
                or tap one to trace how it connects.
              </p>
            </div>
            <div className="modmap">
              <div className="mapbox" ref={mapRef} data-anim="paused">
                <div className="maphint">{"// hover or tap an org to trace its links"}</div>
                <div
                  className="mapscroll"
                  ref={scrollRef}
                  onPointerDown={touchStart}
                  onPointerUp={touchEnd}
                  onPointerCancel={touchEnd}
                >
                  <svg className="mapsvg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="group" aria-label="Organization map">
                    <defs>
                      <marker
                        id="pf-arrow-sharon"
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
                        id="pf-arrow-on-sharon"
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
                      {orgEdges.map(([a, b]) => (
                        <path
                          className="maplink"
                          d={linkPath(a, b)}
                          markerEnd="url(#pf-arrow-sharon)"
                          key={`${a}-${b}`}
                        />
                      ))}
                    </g>
                    <g>
                      {orgEdges
                        .filter(([a, b]) => a === sel || b === sel)
                        .map(([a, b]) => (
                          <path
                            className="maplink on"
                            d={linkPath(a, b)}
                            markerEnd="url(#pf-arrow-on-sharon)"
                            key={`${a}-${b}`}
                          />
                        ))}
                    </g>
                    {orgs.map(([name, desc], i) => {
                      const [x, y] = nodePos[i];
                      const state = i === sel ? " sel" : linked.includes(i) ? " near" : "";
                      return (
                        <g
                          className={`mapnode orgnode${state}`}
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
                            if (!e.currentTarget.matches(":focus-visible")) return;
                            pick(i);
                            setFocused(true);
                          }}
                          onBlur={() => setFocused(false)}
                          key={name}
                        >
                          <rect width={NODE_W} height={NODE_H} rx="12" />
                          <text x={NODE_W / 2} y={NODE_H / 2}>
                            {name}
                          </text>
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
                  <span>organization</span>
                  <span>
                    {String(sel + 1).padStart(2, "0")} / {orgs.length}
                  </span>
                </div>
                <div className="mapinfo-body" key={sel}>
                  <div className="moduletitle">{orgs[sel][0]}</div>
                  <p>{orgs[sel][1]}</p>
                  <div className="chips">
                    {orgs[sel][2].map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                  <div className="maplinked">
                    <span>connected to</span>
                    <div>
                      {linked.map((j) => (
                        <b key={j}>{orgs[j][0]}</b>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section id="contact" className="section contact">
            <SectionHead num="06" title="contact" />
            <div className="availability">
              leicester, uk · open to placement roles · from feb 2027
            </div>
            <h2>
              <ContactLead />
              <br />
              <i>
                <DustText text="Let's scope it right." />
              </i>
            </h2>
            <div className="contactrow">
              <button onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "copied()" : "copy(email)"}
              </button>
              <a href={`mailto:${EMAIL}`}>
                Send an email <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="socials">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>
          </section>
        </main>

        <footer>
          © 2026 Sharon Sunaina Mohan · Requirements, scoped right, before a line of code. ·{" "}
          <Link href="/developers">Vijay Snehal ↗</Link>
        </footer>
      </div>
    </div>
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
