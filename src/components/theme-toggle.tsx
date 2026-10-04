"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Switches off every CSS transition for the moment the theme changes, so all the colours
// change together instead of fading at their own speeds. next-themes can do this itself
// (disableTransitionOnChange), but it then also does it as every page opens, which
// re-styles the whole document twice while the page is loading.
function withoutTransitions(change: () => void) {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  );
  document.head.appendChild(style);
  change();
  // the new theme is applied and painted within two frames; transitions come back after that
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  // The icon swap is driven by the `dark` class that next-themes already puts on
  // <html>, so the button renders the same on the server and the client. That
  // removes the mounted-flag effect this used to need to avoid a mismatch.
  return (
    <button
      type="button"
      onClick={() =>
        withoutTransitions(() =>
          setTheme(
            document.documentElement.classList.contains("dark") ? "light" : "dark"
          )
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
