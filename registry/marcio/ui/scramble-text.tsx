"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/registry/marcio/lib/mw-tokens";
import { cn } from "@/registry/marcio/lib/utils";

export type ScrambleTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** mount embaralha ao montar e no hover; hover só no hover. */
  trigger?: "mount" | "hover";
  /** Duração em ms até o texto assentar. */
  duration?: number;
  glyphs?: string;
  className?: string;
};

export function ScrambleText({ text, as: Tag = "span", trigger = "mount", duration = 900, glyphs = "01<>/{}[]#$*+=_", className }: ScrambleTextProps) {
  const [scrambled, setScrambled] = useState({ of: text, value: text });
  const shown = scrambled.of === text ? scrambled.value : text;
  const frame = useRef(0);

  const scramble = () => {
    if (prefersReducedMotion()) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const step = (now: number) => {
      const done = Math.min(1, (now - start) / duration);
      const settled = Math.floor(done * text.length);
      setScrambled({ of: text, value: [...text].map((char, i) => (i < settled || char === " " ? char : glyphs[Math.floor(Math.random() * glyphs.length)])).join("") });
      if (done < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const timer = trigger === "mount" ? setTimeout(scramble, 250) : undefined;
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return (
    <Tag data-slot="scramble-text" onPointerEnter={(event) => event.pointerType === "mouse" && scramble()} className={cn("font-mono", className)}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
