"use client";

import { motion } from "framer-motion";
import {
  Users,
  CalendarCheck,
  ShoppingBag,
  GraduationCap,
  BarChart3,
  Workflow,
  TreePalm,
} from "lucide-react";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
  ContainerStagger,
  ContainerAnimated,
} from "@/components/ui/container-scroll";

const PROJECTS = [
  {
    name: "CRM Dashboard",
    tag: "CRM",
    description: "Custom CRM built around a real sales workflow.",
    icon: Users,
    type: "web" as const,
    tech: ["React", "Node.js", "PostgreSQL"],
    from: "#7C3AED",
    to: "#3B82F6",
  },
  {
    name: "Restaurant Booking Website",
    tag: "Hospitality",
    description: "Elegant reservation site for a restaurant — book a table in a few taps, manage bookings from an admin page.",
    icon: CalendarCheck,
    type: "web" as const,
    tech: ["Next.js", "Reservations"],
    from: "#3B82F6",
    to: "#22D3EE",
    image: "/portfolio/restaurant-booking-website.png",
  },
  {
    name: "OHM Global Opportunities",
    tag: "Mobile App",
    description: "Lead and placement tracking app for a recruitment agency — calls, categories, and status at a glance.",
    icon: ShoppingBag,
    type: "app" as const,
    tech: ["Recruitment CRM"],
    from: "#F97316",
    to: "#EAB308",
    image: "/portfolio/ohm-global-opportunities.jpg",
  },
  {
    name: "World Academy for the Future of Women",
    tag: "Nonprofit",
    description: "Leadership program website for a women's empowerment nonprofit based in Arizona, USA.",
    icon: GraduationCap,
    type: "web" as const,
    tech: ["Web", "Nonprofit"],
    from: "#EC4899",
    to: "#7C3AED",
    image: "/portfolio/world-academy-future-of-women.png",
  },
  {
    name: "Synthesis Trust — Admin Panel",
    tag: "Desktop Application",
    description: "Project management dashboard for an NGO — tracking, uploads, and status at a glance.",
    icon: BarChart3,
    type: "web" as const,
    tech: ["Web", "Admin Dashboard"],
    from: "#10B981",
    to: "#22D3EE",
    image: "/portfolio/synthesis-trust-admin.png",
  },
  {
    name: "Synthesis Trust — Mobile",
    tag: "Mobile App",
    description: "Same NGO platform, built for the phone — browse and verify ongoing projects right from the home feed.",
    icon: Workflow,
    type: "app" as const,
    tech: ["Mobile", "Admin Dashboard"],
    from: "#A78BFA",
    to: "#3B82F6",
    image: "/portfolio/synthesis-trust-mobile.jpg",
  },
  {
    name: "Luxury Farmstay",
    tag: "Resort Booking",
    description: "Booking website for a luxury farmstay resort near Hyderabad — check availability by event type, right from the hero.",
    icon: TreePalm,
    type: "web" as const,
    tech: ["Next.js", "Booking Widget"],
    from: "#22C55E",
    to: "#3B82F6",
    image: "/portfolio/ira-luxury-farmstay.png",
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const Icon = project.icon;
  return (
    <ContainerAnimated className="overflow-hidden rounded-2xl border border-border bg-card">
      {project.type === "web" ? (
        <div className="relative">
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-3 py-2.5">
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
          </div>
          {project.image ? (
            <div className="relative h-40 overflow-hidden">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {project.tag}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ) : (
            <div
              className="relative flex h-40 items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.from}, ${project.to})` }}
            >
              <span className="absolute left-3 top-3 rounded-md bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {project.tag}
              </span>
              <Icon className="size-10 text-white/90" strokeWidth={1.5} />
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex h-96 items-center justify-center bg-secondary/30 py-6">
          <span className="absolute left-3 top-3 z-10 rounded-md bg-foreground/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/60">
            {project.tag}
          </span>
          {project.image ? (
            <div className="relative h-full aspect-[9/19] overflow-hidden rounded-[1.75rem] border-[3px] border-foreground/15 bg-background shadow-xl">
              <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/80" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ) : (
            <div
              className="relative flex h-full aspect-[9/19] flex-col items-center justify-center gap-2 rounded-[1.75rem] border-[3px] border-foreground/15 shadow-xl"
              style={{ background: `linear-gradient(160deg, ${project.from}, ${project.to})` }}
            >
              <Icon className="size-8 text-white/90" strokeWidth={1.5} />
            </div>
          )}
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
    </ContainerAnimated>
  );
}

export function Portfolio() {
  const apps = PROJECTS.filter((p) => p.type === "app");
  const sites = PROJECTS.filter((p) => p.type === "web");

  return (
    <section id="work" className="relative z-10">
      <div className="px-6 pt-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            Our work
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The kind of products we ship
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/50">
            Real project screenshots are on the way — here&apos;s the type of
            work we build.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Apps we&apos;ve built
        </p>
      </div>

      {/* mobile: plain stacked cards, no scroll-jacked animation */}
      <div className="grid grid-cols-1 gap-6 px-6 sm:hidden">
        {apps.map((p) => (
          <ContainerStagger key={p.name}>
            <ProjectCard project={p} />
          </ContainerStagger>
        ))}
      </div>

      <ContainerScroll className="hidden min-h-[140vh] sm:block">
        <ContainerSticky className="flex items-center justify-center px-6 py-24 md:px-12">
          <GalleryContainer className="mx-auto max-w-3xl grid-cols-2 gap-6">
            {apps.map((p) => (
              <GalleryCol key={p.name} yRange={["0%", "-6%"]}>
                <ContainerStagger>
                  <ProjectCard project={p} />
                </ContainerStagger>
              </GalleryCol>
            ))}
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>

      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12 sm:pt-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Websites &amp; desktop tools
        </p>
      </div>

      {/* mobile: plain stacked cards, no scroll-jacked animation */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-24 sm:hidden">
        {sites.map((p) => (
          <ContainerStagger key={p.name}>
            <ProjectCard project={p} />
          </ContainerStagger>
        ))}
      </div>

      <ContainerScroll className="hidden min-h-[170vh] sm:block">
        <ContainerSticky className="flex items-center justify-center px-6 py-24 md:px-12">
          <GalleryContainer className="mx-auto max-w-7xl gap-6">
            {sites.map((p) => (
              <GalleryCol key={p.name} yRange={["0%", "-6%"]}>
                <ContainerStagger>
                  <ProjectCard project={p} />
                </ContainerStagger>
              </GalleryCol>
            ))}
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
