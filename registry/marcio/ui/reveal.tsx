"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMwTokens, useReducedMotionPreference } from "@/registry/marcio/lib/mw-tokens";

const tags = { div: motion.div, section: motion.section, article: motion.article, li: motion.li };

export type RevealProps = {
  as?: keyof typeof tags;
  /** Posição na lista: atrasa a entrada em index × --mw-stagger. */
  index?: number;
  distance?: "sm" | "md" | "lg";
  /** Anima só na primeira vez que entra na tela. */
  once?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Reveal({ as = "div", index = 0, distance = "lg", once = true, id, className, children }: RevealProps) {
  const Tag = tags[as];
  const reduce = useReducedMotionPreference();
  const tokens = useMwTokens();
  const offset = tokens?.distance[distance] ?? { sm: 4, md: 12, lg: 24 }[distance];

  return (
    <Tag
      data-slot="reveal"
      id={id}
      initial={reduce ? false : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: tokens?.duration.slow ?? 0.3, ease: tokens?.ease.standard ?? [0.2, 0.7, 0.2, 1], delay: index * (tokens?.stagger ?? 0.04) }}
      className={className}
    >
      {children}
    </Tag>
  );
}
