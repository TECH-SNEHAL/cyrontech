import { KineticText } from "@/components/ui/kinetic-text";

const LINKS = {
  Company: [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
  ],
  Contact: [
    { name: "Get in touch", href: "#contact" },
    { name: "contact@cyrontech.in", href: "mailto:contact@cyrontech.in" },
    { name: "cyrontech.in", href: "https://cyrontech.in" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-foreground/[0.02] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <span className="bg-gradient-to-r from-primary to-brand-blue bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Cyrontech
          </span>
          <p className="mt-3 text-sm leading-relaxed text-foreground/50">
            IT solutions and software, built end to end — websites, apps,
            CRMs, and automation.
          </p>
        </div>

        <div className="flex gap-16">
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
                {section}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/60 transition hover:text-foreground"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* oversized wordmark — letters swell under the cursor; the brand name is
          already read out above, so this one is decorative */}
      <div className="mx-auto mt-14 max-w-7xl overflow-x-clip">
        <KineticText
          as="p"
          aria-hidden="true"
          text="Cyrontech"
          className="select-none flex-nowrap justify-center text-[clamp(3rem,15vw,14rem)] leading-none tracking-tight text-foreground"
        />
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-xs text-foreground/30">
        © {new Date().getFullYear()} Cyrontech. All rights reserved.
      </div>
    </footer>
  );
}
