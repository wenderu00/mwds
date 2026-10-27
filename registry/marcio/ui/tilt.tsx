"use client";

import { motion, useSpring } from "motion/react";
import { useReducedMotionPreference } from "@/registry/marcio/lib/mw-tokens";
import type { PointerEvent, ReactNode } from "react";

export type TiltProps = {
  /** Inclinação máxima em graus. */
  max?: number;
  className?: string;
  children: ReactNode;
};

const spring = { stiffness: 200, damping: 20 };

export function Tilt({ max = 6, className, children }: TiltProps) {
  const reduce = useReducedMotionPreference();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * max);
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -max);
  };
  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      data-slot="tilt"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={reduce ? undefined : onPointerMove}
      onPointerLeave={reduce ? undefined : onPointerLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
