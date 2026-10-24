import { describe, expect, it } from "vitest";
import { tokensCss } from "./build-registry";

type Tree = { [key: string]: string | Tree };

const { theme, css } = tokensCss();

function block(tree: Tree, key: string): Tree {
  const value = tree[key];
  if (typeof value !== "object") throw new Error(`Bloco ausente: ${key}`);
  return value;
}

function ms(value: string | undefined) {
  const match = value?.match(/^([\d.]+)(ms|s)$/);
  if (!match) throw new Error(`Duração inválida: ${value}`);
  return Number(match[1]) * (match[2] === "s" ? 1000 : 1);
}

function px(value: string | undefined) {
  const match = value?.match(/^([\d.]+)px$/);
  if (!match) throw new Error(`Medida inválida: ${value}`);
  return Number(match[1]);
}

const root = block(css, ":root");
const durations = ["fast", "base", "slow"] as const;

describe("tokens de fundação", () => {
  it("empilha as camadas com flutuantes acima de modais", () => {
    const order = ["behind", "base", "sticky", "sheet", "dialog", "popover", "toast", "tooltip"];
    const values = order.map((layer) => Number(theme[`z-index-${layer}`]));
    expect(values.every(Number.isFinite), values.join(",")).toBe(true);
    for (let i = 1; i < values.length; i++) expect(values[i], order[i]).toBeGreaterThan(values[i - 1]!);
  });

  it("expõe as durações ao Tailwind por variáveis que o tema pode trocar", () => {
    for (const name of durations) expect(theme[`transition-duration-${name}`]).toBe(`var(--mw-duration-${name})`);
    const values = durations.map((name) => ms(root[`--mw-duration-${name}`] as string));
    expect(values[0]).toBeLessThan(values[1]!);
    expect(values[1]).toBeLessThan(values[2]!);
  });

  it("deixa toda duração instantânea com prefers-reduced-motion", () => {
    const reduced = block(block(css, "@media (prefers-reduced-motion: reduce)"), ":root");
    for (const name of durations) expect(ms(reduced[`--mw-duration-${name}`] as string)).toBeLessThanOrEqual(0.01);
  });

  it("faz as animações de interface usarem os tokens de duração", () => {
    const ambient = new Set(["blink", "drift", "glitch", "pulse", "indeterminate"]);
    const ui = Object.entries(theme).filter(([key]) => key.startsWith("animate-mw-") && !ambient.has(key.slice("animate-mw-".length)));
    expect(ui.length).toBeGreaterThan(0);
    for (const [key, value] of ui) {
      expect(value, key).toMatch(/var\(--mw-duration-(fast|base|slow)\)/);
      expect(value, key).not.toMatch(/(^|[\s(,])[\d.]+m?s\b/);
    }
  });

  it("aumenta controles e células da densidade compacta para a ampla", () => {
    expect(theme["spacing-control"]).toBe("var(--mw-control-h)");
    expect(theme["spacing-cell-y"]).toBe("var(--mw-cell-y)");
    const levels = [block(css, '[data-density="compacta"]'), root, block(css, '[data-density="ampla"]')];
    for (const token of ["--mw-control-h", "--mw-cell-y"]) {
      const [compact, normal, wide] = levels.map((level) => px(level[token] as string));
      expect(compact, token).toBeLessThan(normal!);
      expect(normal, token).toBeLessThan(wide!);
    }
  });

  it("define a escala de raio semântica e a largura de conteúdo", () => {
    const radii = ["mark", "control", "card"].map((name) => px(theme[`radius-${name}`]));
    expect(radii[0]).toBeLessThan(radii[1]!);
    expect(radii[1]).toBeLessThan(radii[2]!);
    expect(px(theme["container-content"])).toBeGreaterThan(0);
  });

  it("só referencia variáveis que existem em tempo de execução no projeto que instala", () => {
    for (const [key, value] of Object.entries(theme)) {
      for (const [, name] of value.matchAll(/var\((--[\w-]+)/g)) expect(name, key).toMatch(/^--(mw|font)-/);
    }
  });

  it("não envia resets de namespace para o projeto que instala", () => {
    expect(Object.keys(theme).filter((key) => key.endsWith("*"))).toEqual([]);
  });
});
