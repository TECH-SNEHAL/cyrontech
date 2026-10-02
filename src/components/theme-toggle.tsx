"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  // The icon swap is driven by the `dark` class that next-themes already puts on
  // <html>, so the button renders the same on the server and the client. That
  // removes the mounted-flag effect this used to need to avoid a mismatch.
  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("dark") ? "light" : "dark"
        )
      }
      aria-label="Toggle dark mode"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 transition hover:border-foreground/25 hover:text-foreground",
        className
      )}
    >
      <Moon className="size-4 dark:hidden" strokeWidth={1.75} />
      <Sun className="hidden size-4 dark:block" strokeWidth={1.75} />
    </button>
  );
}
