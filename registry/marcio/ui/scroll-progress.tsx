"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionPreference } from "@/registry/marcio/lib/mw-tokens";
import { cn } from "@/registry/marcio/lib/utils";

export type ScrollProgressProps = { className?: string };

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });
  const reduce = useReducedMotionPreference();

  return (
    <motion.div
      aria-hidden="true"
      data-slot="scroll-progress"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      className={cn("pointer-events-none h-0.5 w-full origin-left bg-accent", className)}
    />
  );
}
