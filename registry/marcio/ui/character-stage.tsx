"use client";

import type { gsap as Gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { readMwTokens, type MwTokens } from "@/registry/marcio/lib/mw-tokens";
import { cn } from "@/registry/marcio/lib/utils";

/** Partes com nome padronizado (ADR 0026). Partes próprias de um personagem também valem. */
export type CharacterPart = "corpo" | "olhos" | "braco-esq" | "braco-dir" | "perna-esq" | "perna-dir" | (string & {});

export type CharacterPlugin = "drawSVG" | "morphSVG";

export type CharacterContext = {
  gsap: typeof Gsap;
  root: SVGSVGElement;
  /** Seletor de uma parte. Com character, só a do personagem com aquele data-personagem. */
  part: (name: CharacterPart, character?: string | number) => string;
  tokens: MwTokens;
  /** true com prefers-reduced-motion: reduce. Anime só opacidade e cor. */
  reduced: boolean;
};

export type CharacterAnimate = (context: CharacterContext) => void | (() => void);

export type CharacterStageProps = {
  width: number;
  height: number;
  /** Roda dentro de gsap.matchMedia: tudo que criar é revertido ao desmontar, ao trocar replay e ao mudar a preferência de movimento. */
  animate: CharacterAnimate;
  /** Muda para rodar animate de novo, como o id de uma rodada. */
  replay?: string | number;
  plugins?: CharacterPlugin[];
  /** Nome da cena para o leitor de tela. Sem label, o palco é decorativo. */
  label?: string;
  className?: string;
  children: ReactNode;
};

export function part(name: CharacterPart, character?: string | number) {
  const selector = `[data-parte="${name}"]`;
  return character === undefined ? selector : `[data-personagem="${character}"] ${selector}`;
}

const loaders: Record<CharacterPlugin, () => Promise<object>> = {
  drawSVG: () => import("gsap/DrawSVGPlugin").then((module) => module.DrawSVGPlugin),
  morphSVG: () => import("gsap/MorphSVGPlugin").then((module) => module.MorphSVGPlugin),
};

export function CharacterStage({ width, height, animate, replay, plugins = [], label, className, children }: CharacterStageProps) {
  const ref = useRef<SVGSVGElement>(null);
  const latest = useRef({ animate, plugins });

  useEffect(() => {
    latest.current = { animate, plugins };
  });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cancelled = false;
    let revert = () => {};

    (async () => {
      const { animate, plugins } = latest.current;
      const [{ gsap }, ...loaded] = await Promise.all([import("gsap"), ...plugins.map((plugin) => loaders[plugin]())]);
      if (cancelled) return;
      if (loaded.length) gsap.registerPlugin(...loaded);
      const mm = gsap.matchMedia(root);
      mm.add({ reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" }, (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        return animate({ gsap, root, part, tokens: readMwTokens(root), reduced });
      });
      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, [replay]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      data-slot="character-stage"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      {children}
    </svg>
  );
}
