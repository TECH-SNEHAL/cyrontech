"use client"

import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

// One word blurs and melts into the next. From Magic UI (credit @luis-code),
// changed for this site: an `inline` mode that sits in a line of text in the
// surrounding font and colour; a first word that is in the server-rendered page
// and is held before the first morph; timings as props; the melting filter only
// while two words overlap; and it stops while off screen and for visitors who
// ask for reduced motion.

const MAX_BLUR = 40
// The filter that makes two blurred words melt into each other. It goes on the
// container only while a morph is running: a word on its own needs no melting,
// and without the filter it is as sharp as the text around it. So the word is
// also sharp before the script runs and for visitors who never see a morph.
const MELT = "url(#threshold) blur(0.6px)"

const useMorphingText = (
  texts: string[],
  morphTime: number,
  cooldownTime: number
) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  // starts in the hold, so the first word is read before it changes
  const cooldownRef = useRef(cooldownTime)
  const timeRef = useRef(0)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  // `fit` only. Sets the box to the width of word `index`, or part-way (`toward`, 0 to 1)
  // to the width of the word after it. The words are measured each time, so a change of
  // font size (the window being resized) is picked up.
  const setWidth = useCallback(
    (index: number, toward: number) => {
      // the box whose width follows the word on show; there is none unless `fit` is set
      const grid = text2Ref.current?.parentElement
      const box = grid?.closest<HTMLElement>("[data-fit]")
      if (!grid || !box?.parentElement) return

      // Does the box share its line with the text before it? If it has wrapped to a line
      // of its own, closing it up would let it jump back up beside that text, and every
      // line below would move with each morph. There it keeps the width of the widest word
      // and the alignment of the text around it.
      const before = document.createRange()
      before.selectNodeContents(box.parentElement)
      before.setEndBefore(box)
      const rects = before.getClientRects()
      const last = rects[rects.length - 1]
      const own = box.getBoundingClientRect()
      const middle = own.top + own.height / 2
      if (!last || !last.width || last.top > middle || last.bottom < middle) {
        box.style.width = ""
        grid.style.justifyItems = ""
        grid.style.textAlign = ""
        return
      }

      // each word as wide as itself and starting at the left of the cell, so it can be
      // measured and the box can close up to it
      grid.style.justifyItems = "start"
      grid.style.textAlign = "left"
      const widths = [...grid.querySelectorAll<HTMLElement>("[data-text]")].map(
        (el) => el.getBoundingClientRect().width
      )
      if (!widths.length) return
      const from = widths[index % widths.length]
      const to = widths[(index + 1) % widths.length]
      // eased, so the line glides to its new width instead of starting and stopping abruptly
      const eased = toward * toward * (3 - 2 * toward)
      box.style.width = `${from + (to - from) * eased}px`
    },
    []
  )

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      setWidth(textIndexRef.current, fraction)

      // Past this radius the word is too faint to survive the threshold, so a wider
      // blur (the original goes to 100px) costs frame time and shows nothing.
      current2.style.filter = `blur(${Math.min(8 / fraction - 8, MAX_BLUR)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        MAX_BLUR
      )}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]

      if (current1.parentElement) current1.parentElement.style.filter = MELT
    },
    [texts, setWidth]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles, morphTime, cooldownTime])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
      if (current1.parentElement) current1.parentElement.style.filter = ""
    }
    setWidth(textIndexRef.current, 0)
  }, [setWidth])

  useEffect(() => {
    const target = text2Ref.current
    // still text for visitors who ask for less motion
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

    let animationFrameId: number | null = null
    let holdTimer: ReturnType<typeof setTimeout> | null = null
    let visible = false

    function start() {
      if (!visible || animationFrameId != null || holdTimer != null) return
      timeRef.current = performance.now()
      animationFrameId = requestAnimationFrame(animate)
    }

    function animate(now: number) {
      animationFrameId = null

      // a long gap (a hidden tab) counts as one frame, not a jump through the words
      const dt = Math.min((now - timeRef.current) / 1000, 0.1)
      timeRef.current = now

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) {
        doMorph()
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      // The word is held still now, and nothing changes until the hold ends: the frame loop
      // stops, and a timer starts it again for the next morph. Running the loop through the
      // hold made a frame sixty times a second to draw the same word.
      doCooldown()
      holdTimer = setTimeout(() => {
        holdTimer = null
        cooldownRef.current = 0
        start()
      }, cooldownRef.current * 1000)
    }

    // runs only while the text is on screen
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        start()
        return
      }
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId)
      if (holdTimer != null) clearTimeout(holdTimer)
      animationFrameId = null
      holdTimer = null
    })
    visibility.observe(target)

    return () => {
      visibility.disconnect()
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId)
      if (holdTimer != null) clearTimeout(holdTimer)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
  /**
   * Sits in a line of text, in the surrounding font and colour, and is as wide
   * as its widest word so the line never shifts.
   */
  inline?: boolean
  /**
   * With `inline`: the box is as wide as the word on show, and its width follows each
   * morph, so the line closes up around a shorter word. For centred text, where a box as
   * wide as the widest word would leave a gap beside the shorter ones.
   */
  fit?: boolean
  /** Seconds one word takes to melt into the next. */
  morphTime?: number
  /** Seconds each word is held still. */
  cooldownTime?: number
}

type TextsProps = Required<
  Pick<MorphingTextProps, "texts" | "inline" | "morphTime" | "cooldownTime">
>

// The second span holds the word on show, so it is the one rendered on the
// server and the one screen readers get. The first only carries the outgoing
// word during a morph.
const Texts: React.FC<TextsProps> = ({
  texts,
  inline,
  morphTime,
  cooldownTime,
}) => {
  const { text1Ref, text2Ref } = useMorphingText(texts, morphTime, cooldownTime)
  const layer = inline
    ? "[grid-area:1/1]"
    : "absolute inset-x-0 top-0 m-auto inline-block w-full"
  return (
    <>
      <span
        aria-hidden="true"
        className={layer}
        style={{ opacity: 0 }}
        ref={text1Ref}
      />
      <span className={layer} ref={text2Ref}>
        {texts[0]}
      </span>
    </>
  )
}

// The filter's region is larger than the default, so tall letters, descenders
// and italic overhang beyond a tight line box are not cut off.
const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    aria-hidden="true"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold" x="-10%" y="-40%" width="120%" height="180%">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
)

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  inline = false,
  fit = false,
  morphTime = 1.5,
  cooldownTime = 0.5,
}) => {
  const layers = (
    <Texts
      texts={texts}
      inline={inline}
      morphTime={morphTime}
      cooldownTime={cooldownTime}
    />
  )

  if (inline) {
    const grid = (
      <span
        className={cn("relative inline-grid whitespace-nowrap", className)}
      >
        {/* Every word, unseen, in the one grid cell the visible layers share: the
            cell is as wide as the widest. The words are generated content, so
            they add no text to the page. */}
        {texts.map((text) => (
          <span
            key={text}
            aria-hidden="true"
            data-text={text}
            className="invisible [grid-area:1/1] after:content-[attr(data-text)]"
          />
        ))}
        {layers}
        <SvgFilters />
      </span>
    )
    // The grid stays as wide as the widest word, so the melting filter never cuts a word
    // off. This box around it is what the line sees: its width is set to the word on show,
    // and the grid runs past its edge unseen. (The page must clip what runs past its own
    // edge, or on a narrow screen that would let it scroll sideways.)
    return fit ? (
      <span data-fit className="inline-block">
        {grid}
      </span>
    ) : (
      grid
    )
  }

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        className
      )}
    >
      {layers}
      <SvgFilters />
    </div>
  )
}
