"use client";

import { useEffect, type RefObject } from "react";

/**
 * Tells `onChange` when an element may animate: `true` while it is on screen (or
 * within `rootMargin` of it) and the page has finished opening, `false` otherwise.
 * Returns a function that stops watching.
 *
 * The first `true` waits until the page has loaded and the browser has a free
 * moment, so an animation does not compete with the page opening.
 */
export function watchOnScreen(
  el: Element,
  onChange: (active: boolean) => void,
  rootMargin = "100px",
) {
  let visible = false;
  let settled = false;
  let active = false;
  const update = () => {
    if ((visible && settled) === active) return;
    active = !active;
    onChange(active);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      update();
    },
    { rootMargin },
  );
  observer.observe(el);

  const idle = "requestIdleCallback" in window;
  let handle = 0;
  const begin = () => {
    settled = true;
    update();
  };
  const whenFree = () => {
    handle = idle ? requestIdleCallback(begin, { timeout: 4000 }) : window.setTimeout(begin, 300);
  };
  if (document.readyState === "complete") whenFree();
  else window.addEventListener("load", whenFree, { once: true });

  return () => {
    observer.disconnect();
    window.removeEventListener("load", whenFree);
    if (idle) cancelIdleCallback(handle);
    else clearTimeout(handle);
  };
}

/**
 * Lets an element's CSS animations run only while it is on screen.
 *
 * Some animations cannot be handed to the compositor: an SVG dash, a blinking
 * caret. While one of those runs, the browser produces a full frame on the main
 * thread sixty times a second, redoing style work for every running animation on
 * the page, even when the animated element is scrolled far out of view. On this
 * site that was most of the main-thread time on every section where nothing
 * appeared to be moving. Compositor animations (a marquee) are paused the same
 * way, because each of them adds to the cost of every such frame.
 *
 * The element is rendered with `data-anim="paused"`, which globals.css turns into
 * `animation-play-state: paused` for it and everything inside it. This hook sets
 * it to `running` while the element is on screen. An animation that loops looks
 * the same wherever it resumes.
 */
export function usePauseOffscreen<T extends Element>(ref: RefObject<T | null>, rootMargin?: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return watchOnScreen(
      el,
      (active) => el.setAttribute("data-anim", active ? "running" : "paused"),
      rootMargin,
    );
  }, [ref, rootMargin]);
}
