"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Mail,
  Mic,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { TextAnimate } from "@/components/ui/text-animate";
import { useCursorHover } from "@/components/ui/smooth-cursor";

const EMAIL = "sharonsunaina7@gmail.com";
const LINKEDIN = "https://linkedin.com/in/sharon7103";
const GITHUB = "https://github.com/Sharonsunaina7";

// What Sharon actually contributed on the OHM Global Opportunities CRM/app
// build — the project this page exists to credit her on.
const CONTRIBUTION = {
  project: "OHM Global Opportunities — CRM & App",
  points: [
    "Gathered and clarified client requirements directly with the agency, translating how their recruitment team actually works into product decisions.",
    "Ran feasibility checks on proposed features against the agency's real workflow, data and timeline before engineering time went into them.",
    "Bridged the gap between what the client asked for and what the build needed to prioritize first.",
  ],
};

const EXPERIENCE = [
  {
    role: "CRM Operations Intern",
    org: "WE Hub — Government of Telangana (T-Hub, Hyderabad)",
    when: "Aug – Nov 2025",
    points: [
      "Worked in Zoho CRM across Leads, Contacts, Accounts and Deals.",
      "Configured custom fields, layouts and basic workflow automation.",
      "Managed and organized CRM data for 1,500+ students, entrepreneurs, stakeholders and investors.",
    ],
  },
  {
    role: "WAFW India Alumni Representative",
    org: "World Academy for the Future of Women",
    when: "Jun 2025 – Present",
    points: [
      "Manages and verifies alumni records in a global database for accuracy and security.",
      "Point of contact between Indian alumni and the international leadership team.",
    ],
  },
  {
    role: "Student Co-Director, India",
    org: "World Academy for the Future of Women",
    when: "Dec 2023 – Feb 2025",
    points: [
      "Selected among 150 students worldwide for a leadership programme aligned with the UN Sustainable Development Goals.",
      "Official liaison between global leadership and 200+ Indian students across a 10+ country cohort.",
      "Managed participant data, attendance and logistics for international facilitators.",
    ],
  },
  {
    role: "LinkedIn Campus Ambassador",
    org: "LinkedIn, via WE Hub (Govt. of Telangana)",
    when: "Sep 2025 – Present",
    points: [
      "1 of 5 campus ambassadors selected as top performer in the WE Enable programme.",
      "Grew a LinkedIn presence to 2,500+ followers with 4,000–5,000 impressions per post.",
      "Invited to LinkedIn HQ, Bengaluru for the Campus Ambassador induction.",
    ],
  },
];

const LEADERSHIP = [
  {
    role: "Vice President, Women Empowerment Cell",
    org: "Govt. Degree College for Women, Osmania University",
    when: "Jun 2024 – May 2025",
  },
  {
    role: "General Secretary, Student Union",
    org: "Govt. Degree College for Women, Osmania University",
    when: "Jun 2023 – May 2024",
    detail: "Led a team of 20 reps for a student body of 4,000+.",
  },
  {
    role: "Project Lead, 'Blooming Flowers'",
    org: "World Academy for the Future of Women (India Chapter)",
    when: "2024",
    detail: "Life-skills education sessions reaching 200+ students in government schools.",
  },
];

const AWARDS = [
  { title: "1st Place — International Student Consultancy Challenge", org: "University of Leicester / Student Circus / Career Hub", when: "Mar 2026" },
  { title: "1st Place — Women in STEM × PHAT Buns UK Ideathon", org: "University of Leicester", when: "Mar 2026" },
  { title: "Winner, Case Study Competition", org: "LinkedIn Campus Connect, LinkedIn HQ Bangalore", when: "Sep 2025" },
  { title: "Ambassador Leadership Award", org: "WE Enable Programme, WE Hub — 1 of 30 from 600+ students", when: "Dec 2025" },
];

const SPEAKING = [
  { title: "Panelist, Youth & Entrepreneurship", org: "Telangana Rising Global Summit 2025" },
  { title: "Alumna Panelist", org: "OFSI Sangam 2025, Omega Healthcare Management Services" },
  { title: "“Leveraging LinkedIn for Career Growth and Personal Branding”", org: "WAFW Alumni Workshop (international session)" },
];

const SKILLS = [
  { group: "AI & Machine Learning", items: ["Supervised & unsupervised learning", "Image classification (CNN)", "NLP", "Neural networks (foundational)"] },
  { group: "CRM & Business Systems", items: ["Zoho CRM", "Workflow automation", "Requirements gathering", "Feasibility analysis"] },
  { group: "Data", items: ["Python (data science libraries)", "Data cleaning & structuring", "Statistical modelling"] },
  { group: "Communication", items: ["Public speaking", "Stakeholder liaison", "LinkedIn content & branding"] },
];

const EDUCATION = [
  {
    degree: "MSc Artificial Intelligence for Business Intelligence",
    org: "University of Leicester, UK",
    when: "Jan 2026 – May 2028",
  },
  {
    degree: "B.Sc. Data Science, Computer Science & Mathematics",
    org: "Govt. Degree College for Women, Osmania University, Hyderabad",
    when: "Jul 2022 – Jul 2025 · First Class, 93%",
  },
];

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent">
        <Icon className="size-[18px] text-primary" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      </div>
    </div>
  );
}

function TimelineCard({
  title,
  org,
  when,
  points,
  detail,
}: {
  title: string;
  org: string;
  when: string;
  points?: string[];
  detail?: string;
}) {
  const hoverRef = useCursorHover<HTMLDivElement>();
  return (
    <div
      ref={hoverRef}
      className="rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/30"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="shrink-0 font-mono text-xs text-foreground/40">{when}</span>
      </div>
      <p className="mt-1 text-sm text-primary/70">{org}</p>
      {points && (
        <ul className="mt-4 space-y-2">
          {points.map((p) => (
            <li key={p} className="flex gap-2 text-sm leading-relaxed text-foreground/60">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {detail && <p className="mt-3 text-sm leading-relaxed text-foreground/60">{detail}</p>}
    </div>
  );
}

export function Profile() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight text-foreground">
            Cyron<span className="text-primary">Tech</span>
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 pb-24 pt-20 md:px-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Link
            href="/developers"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" />
            Developers
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            <TextAnimate as="span" animation="slideLeft" by="character" once>
              Business &amp; CRM
            </TextAnimate>
          </span>
          <TextAnimate
            as="h1"
            animation="slideUp"
            by="word"
            once
            accessible={false}
            className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Sharon Sunaina Mohan
          </TextAnimate>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/60">
            Client requirements, feasibility and CRM operations for Cyron Tech —
            and an MSc student in AI for Business Intelligence at the University
            of Leicester, UK.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition hover:border-primary/40 hover:text-primary"
            >
              <ExternalLink className="size-4" />
              LinkedIn
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition hover:border-primary/40 hover:text-primary"
            >
              <ExternalLink className="size-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Her contribution to the OHM CRM build — the reason this page exists */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="At Cyron Tech" title="Her role on the OHM Global CRM build" icon={Target} />
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7">
            <p className="text-sm font-semibold text-foreground">{CONTRIBUTION.project}</p>
            <ul className="mt-4 space-y-3">
              {CONTRIBUTION.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary/70" strokeWidth={1.75} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Education" title="Studying AI for Business Intelligence" icon={GraduationCap} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EDUCATION.map((e) => (
              <TimelineCard key={e.degree} title={e.degree} org={e.org} when={e.when} />
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Experience" title="CRM operations & leadership roles" icon={Briefcase} />
          <div className="grid grid-cols-1 gap-4">
            {EXPERIENCE.map((e) => (
              <TimelineCard key={e.role} title={e.role} org={e.org} when={e.when} points={e.points} />
            ))}
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Student leadership" title="Running organizations, not just joining them" icon={Users} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {LEADERSHIP.map((l) => (
              <TimelineCard key={l.role} title={l.role} org={l.org} when={l.when} detail={l.detail} />
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Recognition" title="Awards & competitions" icon={Award} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AWARDS.map((a) => (
              <TimelineCard key={a.title} title={a.title} org={a.org} when={a.when} />
            ))}
          </div>
        </motion.div>

        {/* Speaking */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Speaking" title="On stage and in panels" icon={Mic} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SPEAKING.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-sm font-semibold leading-snug text-foreground">{s.title}</p>
                <p className="mt-2 text-xs text-foreground/50">{s.org}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <SectionHeading eyebrow="Skills" title="What she brings to a build" icon={Sparkles} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SKILLS.map((group) => (
              <div key={group.group} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground">{group.group}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center"
        >
          <h2 className="text-xl font-bold text-foreground">Let&apos;s talk</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/60">
            Reach Sharon directly, or get in touch with Cyron Tech below.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="size-4" />
              {EMAIL}
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition hover:text-primary"
            >
              Contact Cyron Tech
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
