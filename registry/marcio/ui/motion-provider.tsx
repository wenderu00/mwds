"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useMwTokens } from "@/registry/marcio/lib/mw-tokens";

export type MotionProviderProps = { children: ReactNode };

export function MotionProvider({ children }: MotionProviderProps) {
  const tokens = useMwTokens();
  return (
    <MotionConfig reducedMotion="user" transition={tokens ? { duration: tokens.duration.slow, ease: tokens.ease.standard } : undefined}>
      {children}
    </MotionConfig>
  );
}
