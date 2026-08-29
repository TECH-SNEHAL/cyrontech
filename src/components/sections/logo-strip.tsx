"use client";

import { Marquee } from "@/components/ui/marquee";

const TECH = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "Amazon AWS", slug: "amazonaws" },
];

export function LogoStrip() {
  return (
    <section className="relative z-10 border-y border-border bg-background py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-foreground/40">
        Built with the tools you already trust
      </p>
      <Marquee pauseOnHover className="[--duration:30s]">
        {TECH.map((t) => (
          <div
            key={t.slug}
            className="flex items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-5 py-2.5 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          >
            <img
              src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${t.slug}.svg`}
              alt={t.name}
              className="size-5 dark:invert"
            />
            <span className="whitespace-nowrap text-sm font-medium text-foreground/70">
              {t.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
