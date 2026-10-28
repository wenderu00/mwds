"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export const tokenColors = [
  "ground", "surface", "line", "line-strong", "ink", "ink-muted", "accent", "danger", "success",
  "category-1-line", "category-2-line", "category-3-line", "category-4-line",
  "category-5-line", "category-6-line", "category-7-line", "category-8-line",
] as const;

export type TokenColor = (typeof tokenColors)[number];
export type Bezier = [number, number, number, number];

export type MwTokens = {
  /** Cores como string CSS, para Motion e GSAP. */
  color: Record<TokenColor, string>;
  /** As mesmas cores como número 0xRRGGBB, para o tint do Pixi. */
  pixi: Record<TokenColor, number>;
  /** Durações em segundos. Caem para quase 0 com movimento reduzido. */
  duration: { fast: number; base: number; slow: number };
  ease: { standard: Bezier; enter: Bezier; exit: Bezier };
  /** Distâncias em px. */
  distance: { sm: number; md: number; lg: number };
  /** Atraso entre itens em segundos. */
  stagger: number;
  reduced: boolean;
};

const fallbackEase: Bezier = [0.2, 0.7, 0.2, 1];

export function prefersReducedMotion() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(onChange: () => void) {
  if (typeof matchMedia !== "function") return () => {};
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener?.("change", onChange);
  return () => query.removeEventListener?.("change", onChange);
}

/** Preferência de movimento reduzido, atualizada quando muda. É false no servidor. */
export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}

export function parseTime(value: string, fallback = 0) {
  const match = value.trim().match(/^(-?[\d.]+)(ms|s)$/);
  if (!match) return fallback;
  const amount = Number(match[1]);
  return match[2] === "ms" ? amount / 1000 : amount;
}

export function parseBezier(value: string): Bezier {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  const points = match?.[1]!.split(",").map(Number);
  return points?.length === 4 && points.every(Number.isFinite) ? (points as Bezier) : fallbackEase;
}

let probe: CanvasRenderingContext2D | null | undefined;

export function toPixiColor(css: string) {
  const value = css.trim();
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
  if (hex) return parseInt(hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex, 16);
  // Outros formatos (oklch, rgb) passam pelo canvas, que normaliza para #rrggbb.
  if (probe === undefined) {
    try {
      probe = document.createElement("canvas").getContext("2d");
    } catch {
      probe = null;
    }
  }
  if (!probe || !value) return 0;
  probe.fillStyle = "#000000";
  probe.fillStyle = value;
  const normalized = String(probe.fillStyle);
  return normalized.startsWith("#") ? parseInt(normalized.slice(1, 7), 16) : 0;
}

export function readMwTokens(element?: Element): MwTokens {
  const style = getComputedStyle(element ?? document.documentElement);
  const read = (name: string) => style.getPropertyValue(`--mw-${name}`).trim();
  const color = Object.fromEntries(tokenColors.map((name) => [name, read(name)])) as Record<TokenColor, string>;
  const pixi = Object.fromEntries(tokenColors.map((name) => [name, toPixiColor(color[name])])) as Record<TokenColor, number>;
  const px = (name: string, fallback: number) => parseFloat(read(name)) || fallback;
  return {
    color,
    pixi,
    duration: { fast: parseTime(read("duration-fast"), 0.1), base: parseTime(read("duration-base"), 0.2), slow: parseTime(read("duration-slow"), 0.3) },
    ease: { standard: parseBezier(read("ease-standard")), enter: parseBezier(read("ease-enter")), exit: parseBezier(read("ease-exit")) },
    distance: { sm: px("distance-sm", 4), md: px("distance-md", 12), lg: px("distance-lg", 24) },
    stagger: parseTime(read("stagger"), 0.04),
    reduced: prefersReducedMotion(),
  };
}

/** Chama onChange quando o tema, a preferência de cor ou a de movimento mudam. */
export function watchMwTokens(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
  const queries = typeof matchMedia === "function" ? ["(prefers-color-scheme: light)", "(prefers-reduced-motion: reduce)"].map((query) => matchMedia(query)) : [];
  for (const query of queries) query.addEventListener?.("change", onChange);
  return () => {
    observer.disconnect();
    for (const query of queries) query.removeEventListener?.("change", onChange);
  };
}

/** Tokens do tema atual, atualizados quando o tema muda. Retorna null no servidor e no primeiro render. */
export function useMwTokens() {
  const [tokens, setTokens] = useState<MwTokens | null>(null);
  useEffect(() => {
    const update = () => setTokens(readMwTokens());
    update();
    return watchMwTokens(update);
  }, []);
  return tokens;
}
