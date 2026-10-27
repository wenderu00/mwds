"use client";

import { motion, useSpring } from "motion/react";
import { useReducedMotionPreference } from "@/registry/marcio/lib/mw-tokens";
import type { ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type MagneticProps = {
  /** Fração da distância ao centro que o filho acompanha. */
  strength?: number;
  className?: string;
  children: ReactNode;
};

const spring = { stiffness: 260, damping: 18 };

export function Magnetic({ strength = 0.3, className, children }: MagneticProps) {
  const reduce = useReducedMotionPreference();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  return (
    <motion.span
      data-slot="magnetic"
      style={reduce ? undefined : { x, y }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
