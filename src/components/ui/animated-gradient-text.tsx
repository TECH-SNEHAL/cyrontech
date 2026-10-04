"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

import { watchOnScreen } from "@/lib/use-pause-offscreen"
import { cn } from "@/lib/utils"

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"div"> {
  speed?: number
  colorFrom?: string
  colorTo?: string
}

// One pass of the gradient across the text, in milliseconds.
const PERIOD = 8000
// The gradient moves twenty times a second. It is so gradual that each step changes a
// pixel's colour by about one part in 255, which is the same picture as sixty steps a second.
const TICK = 50

// The gradient slides across the text. This used to be a CSS animation of
// background-position, which the browser cannot hand to the compositor: it made a full frame
// on the main thread sixty times a second for as long as the page was open, wherever the page
// was scrolled to. Now the position is set from a timer, a third as often, and only while the
// text is on screen.
export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}: AnimatedGradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    // visitors who ask for less motion keep the still gradient
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let timer = 0
    let last = 0
    // time spent moving, so the gradient carries on from where it stopped
    let elapsed = 0
    const step = () => {
      const now = performance.now()
      elapsed += now - last
      last = now
      const pass = (elapsed % PERIOD) / PERIOD
      el.style.backgroundPosition = `${(pass * speed * 300).toFixed(2)}% 0`
    }

    const stop = watchOnScreen(el, (active) => {
      clearInterval(timer)
      if (!active) return
      last = performance.now()
      timer = window.setInterval(step, TICK)
    })
    return () => {
      stop()
      clearInterval(timer)
    }
  }, [speed])

  return (
    <span
      ref={ref}
      style={
        {
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        `inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
