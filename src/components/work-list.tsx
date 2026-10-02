"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type WorkItem = {
  year: string;
  name: string;
  kind: string;
  note: string;
  image: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function WorkList({ items }: { items: WorkItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className="mt-12"
      initial={reduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={listVariants}
    >
      {items.map((w, i) => (
        <motion.li
          key={w.name}
          variants={itemVariants}
          className="group relative border-t border-border last:border-b"
        >
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
        </motion.li>
      ))}
    </motion.ul>
  );
}
