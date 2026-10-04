"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";
import {
  Users,
  CalendarCheck,
  ShoppingBag,
  GraduationCap,
  BarChart3,
  Workflow,
  TreePalm,
  type LucideIcon,
} from "lucide-react";

type Project = {
  name: string;
  tag: string;
  description: string;
  icon: LucideIcon;
  type: "web" | "app";
  tech: string[];
  from: string;
  to: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    name: "CRM Dashboard",
    tag: "CRM",
    description: "Custom CRM built around a real sales workflow.",
    icon: Users,
    type: "web",
    tech: ["React", "Node.js", "PostgreSQL"],
    from: "#7C3AED",
    to: "#3B82F6",
  },
  {
    name: "Restaurant Booking Website",
    tag: "Hospitality",
    description:
      "Elegant reservation site for a restaurant — book a table in a few taps, manage bookings from an admin page.",
    icon: CalendarCheck,
    type: "web",
    tech: ["Next.js", "Reservations"],
    from: "#3B82F6",
    to: "#22D3EE",
    image: "/portfolio/restaurant-booking-website.png",
  },
  {
    name: "OHM Global Opportunities",
    tag: "Mobile App",
    description:
      "Lead and placement tracking app for a recruitment agency — calls, categories, and status at a glance.",
    icon: ShoppingBag,
    type: "app",
    tech: ["Recruitment CRM"],
    from: "#F97316",
    to: "#EAB308",
    image: "/portfolio/ohm-global-opportunities.jpg",
  },
  {
    name: "World Academy for the Future of Women",
    tag: "Nonprofit",
    description:
      "Leadership program website for a women's empowerment nonprofit based in Arizona, USA.",
    icon: GraduationCap,
    type: "web",
    tech: ["Web", "Nonprofit"],
    from: "#EC4899",
    to: "#7C3AED",
    image: "/portfolio/world-academy-future-of-women.png",
  },
  {
    name: "Synthesis Trust — Admin Panel",
    tag: "Desktop Application",
    description:
      "Project management dashboard for an NGO — tracking, uploads, and status at a glance.",
    icon: BarChart3,
    type: "web",
    tech: ["Web", "Admin Dashboard"],
    from: "#10B981",
    to: "#22D3EE",
    image: "/portfolio/synthesis-trust-admin.png",
  },
  {
    name: "Synthesis Trust — Mobile",
    tag: "Mobile App",
    description:
      "Same NGO platform, built for the phone — browse and verify ongoing projects right from the home feed.",
    icon: Workflow,
    type: "app",
    tech: ["Mobile", "Admin Dashboard"],
    from: "#A78BFA",
    to: "#3B82F6",
    image: "/portfolio/synthesis-trust-mobile.jpg",
  },
  {
    name: "Luxury Farmstay",
    tag: "Resort Booking",
    description:
      "Booking website for a luxury farmstay resort near Hyderabad — check availability by event type, right from the hero.",
    icon: TreePalm,
    type: "web",
    tech: ["Next.js", "Booking Widget"],
    from: "#22C55E",
    to: "#3B82F6",
    image: "/portfolio/ira-luxury-farmstay.png",
  },
];

// a card is a third of the 80rem grid on desktop, and near full width on phones
const CARD_SIZES = "(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
    >
      {project.type === "web" ? (
        <div>
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-3 py-2.5">
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
          </div>
          {project.image ? (
            <div className="relative h-48 overflow-hidden">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {project.tag}
              </span>
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes={CARD_SIZES}
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div
              className="relative flex h-48 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.from}, ${project.to})`,
              }}
            >
              <span className="absolute left-3 top-3 rounded-md bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {project.tag}
              </span>
              <Icon className="size-10 text-white/90" strokeWidth={1.5} />
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex h-80 items-center justify-center bg-secondary/30 py-6">
          <span className="absolute left-3 top-3 z-10 rounded-md bg-foreground/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/60">
            {project.tag}
          </span>
          <div className="relative aspect-[9/19] h-full overflow-hidden rounded-[1.75rem] border-[3px] border-foreground/15 bg-background shadow-xl">
            <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/80" />
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 640px) 14rem, 60vw"
                className="object-cover object-top"
              />
            ) : (
              <div
                className="flex h-full items-center justify-center"
                style={{
                  background: `linear-gradient(160deg, ${project.from}, ${project.to})`,
                }}
              >
                <Icon className="size-8 text-white/90" strokeWidth={1.5} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-base font-bold text-foreground">{project.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/55">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGroup({
  label,
  projects,
}: {
  label: string;
  projects: Project[];
}) {
  return (
    <div className="mx-auto mt-14 max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {label}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

export function Portfolio() {
  const apps = PROJECTS.filter((p) => p.type === "app");
  const sites = PROJECTS.filter((p) => p.type === "web");

  return (
    <section id="work" className="relative z-10 px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
          <TextAnimate as="span" animation="slideLeft" by="character" once>
            Our work
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
          The kind of products we ship
        </TextAnimate>
        <p className="mt-4 text-base leading-relaxed text-foreground/50">
          A selection of recent builds — apps, websites, and internal tools.
        </p>
      </motion.div>

      <ProjectGroup label="Apps we've built" projects={apps} />
      <ProjectGroup label="Websites & desktop tools" projects={sites} />
    </section>
  );
}
