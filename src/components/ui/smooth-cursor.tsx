"use client"

import { useEffect, useRef, useState, type FC } from "react"
import { motion, useSpring } from "framer-motion"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

// Mouse or trackpad only, and not for visitors who ask for reduced motion: they
// keep the system cursor.
const DESKTOP_POINTER_QUERY =
  "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)"

// Set on <html> while the cursor runs; globals.css hides the system cursor under it.
const ACTIVE_CLASS = "smooth-cursor-on"

// Any element can opt in to a cursor reaction by adding this attribute and
// dispatching the two events below on enter/leave (see useCursorHover).
const HOVER_TARGET_ATTR = "data-cursor-hover"
const HOVER_ENTER_EVENT = "cursor-hover-enter"
const HOVER_LEAVE_EVENT = "cursor-hover-leave"

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch"
}

/**
 * Opts an element into the smooth cursor's hover reaction: the pointer
 * grows into a soft ring while over it. Attach the returned ref to the
 * element that should trigger it.
 */
export function useCursorHover<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.setAttribute(HOVER_TARGET_ATTR, "")
    const enter = () => window.dispatchEvent(new CustomEvent(HOVER_ENTER_EVENT))
    const leave = () => window.dispatchEvent(new CustomEvent(HOVER_LEAVE_EVENT))

    el.addEventListener("pointerenter", enter)
    el.addEventListener("pointerleave", leave)

    return () => {
      el.removeEventListener("pointerenter", enter)
      el.removeEventListener("pointerleave", leave)
    }
  }, [])

  return ref
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })
  const ringScale = useSpring(0, { stiffness: 350, damping: 28, mass: 0.8 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    if (!isEnabled) return

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    window.addEventListener(HOVER_ENTER_EVENT, onEnter)
    window.addEventListener(HOVER_LEAVE_EVENT, onLeave)

    return () => {
      window.removeEventListener(HOVER_ENTER_EVENT, onEnter)
      window.removeEventListener(HOVER_LEAVE_EVENT, onLeave)
    }
  }, [isEnabled])

  useEffect(() => {
    isHoveringRef.current = isHovering
    ringScale.set(isHovering ? 1 : 0)
    scale.set(isHovering ? 0 : 1)
  }, [isHovering, ringScale, scale])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)

      if (!nextIsEnabled) {
        setIsVisible(false)
      }
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      setIsVisible(true)

      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        // the hover ring owns the arrow's scale while over a hoverable target
        if (!isHoveringRef.current) {
          scale.set(0.95)

          if (timeout !== null) {
            clearTimeout(timeout)
          }

          timeout = setTimeout(() => {
            if (!isHoveringRef.current) scale.set(1)
          }, 150)
        }
      }
    }

    let rafId = 0
    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e)
        rafId = 0
      })
    }

    document.documentElement.classList.add(ACTIVE_CLASS)
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove)
      document.documentElement.classList.remove(ACTIVE_CLASS)
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          // Moved with a transform, not left/top: a transform is handled by the compositor,
          // while left/top would lay the page out again on every frame the pointer moves.
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          scale: scale,
          zIndex: 100,
          pointerEvents: "none",
          willChange: "transform",
          opacity: isVisible ? 1 : 0,
        }}
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.15,
        }}
      >
        {cursor}
      </motion.div>
      {/* a soft ring that grows in place of the arrow over cursor-hover targets */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          zIndex: 100,
          pointerEvents: "none",
          willChange: "transform",
          opacity: isVisible ? 1 : 0,
          width: 56,
          height: 56,
          borderRadius: "9999px",
          border: "1.5px solid var(--primary)",
          backgroundColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
          backdropFilter: "blur(2px)",
        }}
        initial={false}
      />
    </>
  )
}
