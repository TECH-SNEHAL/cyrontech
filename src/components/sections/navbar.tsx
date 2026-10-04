"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  { name: "Work", link: "#work" },
  { name: "Services", link: "#services" },
  { name: "Process", link: "#process" },
  { name: "Reviews", link: "#testimonials" },
  { name: "Developers", link: "/developers" },
  { name: "Contact", link: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // only the threshold crossing changes anything — setting state on every
  // scroll frame would re-render the whole bar while the page moves
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 40;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <>
      {/* drops in with a CSS animation, so it is there with the first paint */}
      <header className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit max-w-[95vw] animate-enter-down items-center justify-center px-4">
        <nav
          className={`flex items-center gap-1 rounded-full border border-foreground/10 px-2 py-1.5 backdrop-blur-md transition-colors ${
            scrolled ? "bg-background/80 shadow-lg shadow-black/5" : "bg-background/50"
          }`}
        >
          <Link
            href="#top"
            className="mr-2 flex items-center gap-2 whitespace-nowrap px-2 text-sm font-bold tracking-tight"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/cyron-mark.png"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-md"
            />
            <span className="bg-gradient-to-r from-primary to-brand-blue bg-clip-text text-transparent">
              Cyrontech
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-foreground/10 md:block" />

          <a
            href="#contact"
            className="hidden whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-block"
          >
            Get Started
          </a>

          <ThemeToggle className="ml-1" />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="ml-1 flex size-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-foreground/10 bg-background/95 p-4 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
