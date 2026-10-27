import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { parseBezier, parseTime, readMwTokens, toPixiColor, useMwTokens } from "@/registry/marcio/lib/mw-tokens";

afterEach(() => document.documentElement.removeAttribute("style"));

describe("mw-tokens", () => {
  it("converte hex curto e longo para número do Pixi", () => {
    expect(toPixiColor("#ece41f")).toBe(0xece41f);
    expect(toPixiColor(" #fff ")).toBe(0xffffff);
    expect(toPixiColor("")).toBe(0);
  });

  it("lê tempos em ms e s, e curvas cubic-bezier", () => {
    expect(parseTime("200ms")).toBe(0.2);
    expect(parseTime("0.01ms")).toBeCloseTo(0.00001);
    expect(parseTime("1.5s")).toBe(1.5);
    expect(parseTime("abc", 0.3)).toBe(0.3);
    expect(parseBezier("cubic-bezier(0, 0, 0.2, 1)")).toEqual([0, 0, 0.2, 1]);
    expect(parseBezier("ease")).toEqual([0.2, 0.7, 0.2, 1]);
  });

  it("lê cores, durações e distâncias dos CSS vars", () => {
    const root = document.documentElement;
    root.style.setProperty("--mw-accent", "#ece41f");
    root.style.setProperty("--mw-duration-slow", "300ms");
    root.style.setProperty("--mw-distance-lg", "24px");
    root.style.setProperty("--mw-stagger", "40ms");
    const tokens = readMwTokens();
    expect(tokens.color.accent).toBe("#ece41f");
    expect(tokens.pixi.accent).toBe(0xece41f);
    expect(tokens.duration.slow).toBe(0.3);
    expect(tokens.distance.lg).toBe(24);
    expect(tokens.stagger).toBe(0.04);
    expect(tokens.reduced).toBe(false);
  });

  it("useMwTokens atualiza quando o tema muda", async () => {
    const root = document.documentElement;
    root.style.setProperty("--mw-accent", "#111111");
    const { result } = renderHook(() => useMwTokens());
    expect(result.current?.pixi.accent).toBe(0x111111);
    await act(async () => {
      root.style.setProperty("--mw-accent", "#222222");
      root.setAttribute("data-theme", "light");
      await Promise.resolve();
    });
    expect(result.current?.pixi.accent).toBe(0x222222);
  });
});
