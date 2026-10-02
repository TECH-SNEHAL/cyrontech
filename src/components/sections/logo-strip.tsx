import { Marquee } from "@/components/ui/marquee";

// served from /public so the strip never waits on a third-party CDN.
// NOTE: the AWS icon used to be requested as "amazonaws", a slug simple-icons
// does not publish — it rendered as a broken image.
const TECH = [
  { name: "Next.js", file: "nextdotjs" },
  { name: "React", file: "react" },
  { name: "TypeScript", file: "typescript" },
  { name: "Node.js", file: "nodedotjs" },
  { name: "Tailwind CSS", file: "tailwindcss" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "Docker", file: "docker" },
  { name: "Amazon Web Services", file: "amazonwebservices" },
];

export function LogoStrip() {
  return (
    <section className="relative z-10 border-y border-border bg-background py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-foreground/40">
        Built with the tools you already trust
      </p>
      <Marquee pauseOnHover className="[--duration:40s]">
        {TECH.map((t) => (
          <div
            key={t.file}
            className="flex items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-5 py-2.5 opacity-70 transition-opacity hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${t.file}.svg`}
              alt=""
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
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
