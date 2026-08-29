"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function CountUp({
  target,
  duration = 1,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}
      {suffix}
    </span>
  );
}
