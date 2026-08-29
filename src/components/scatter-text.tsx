"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

function ScatterChar({
  char,
  index,
  centerIndex,
  progress,
}: {
  char: string;
  index: number;
  centerIndex: number;
  progress: MotionValue<number>;
}) {
  const distance = index - centerIndex;
  const x = useTransform(progress, [0, 1], [0, distance * 26]);
  const y = useTransform(progress, [0, 1], [0, Math.abs(distance) * 14]);
  const rotate = useTransform(progress, [0, 1], [0, distance * 8]);
  const opacity = useTransform(progress, [0, 0.85], [1, 0]);

  return (
    <motion.span style={{ x, y, rotate, opacity, display: "inline-block" }}>
      {char === " " ? " " : char}
    </motion.span>
  );
}

export function ScatterText({
  text,
  progress,
  className,
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
}) {
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div className={className}>
      {characters.map((char, i) => (
        <ScatterChar
          key={i}
          char={char}
          index={i}
          centerIndex={centerIndex}
          progress={progress}
        />
      ))}
    </div>
  );
}
