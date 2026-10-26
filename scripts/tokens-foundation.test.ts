import { describe, expect, it } from "vitest";
import { tokensCss } from "./build-registry";
import { hexToOklch } from "./lib/color";
import { loadTokens } from "./lib/tokens";

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
  it("tem as paletas de gráfico nos dois temas, com valores próprios no claro", () => {
    const dark = block(css, ':root, [data-theme="dark"]');
    const light = block(css, '[data-theme="light"]');
    const names = [...Array.from({ length: 8 }, (_, i) => `chart-${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `seq-${i + 1}`)];
    for (const name of names) {
      expect(theme[`color-${name}`], name).toBe(`var(--mw-${name})`);
      expect(dark[`--mw-${name}`], `${name} escuro`).toBeTruthy();
      expect(light[`--mw-${name}`], `${name} claro`).toBeTruthy();
    }
    expect(new Set(names.slice(0, 8).map((name) => dark[`--mw-${name}`])).size).toBe(8);
  });

  it("faz cada série de gráfico usar a linha da categoria de mesmo número nos dois temas", () => {
    const tokens = loadTokens();
    for (const mode of ["dark", "light"] as const) {
      for (let n = 1; n <= 8; n++) {
        expect(tokens[mode][`category-${n}-line`], `category-${n}-line ${mode}`).toMatch(/^#[0-9a-f]{6}$/);
        expect(tokens[mode][`chart-${n}`], `chart-${n} ${mode}`).toBe(tokens[mode][`category-${n}-line`]);
      }
    }
  });

  it("deixa por último as categorias que colidem com accent e perigo", () => {
    const tokens = loadTokens();
    const hue = (hex: string) => hexToOklch(hex)[2];
    const distance = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
    const nearest = (target: string) =>
      Array.from({ length: 8 }, (_, i) => i + 1).reduce((best, n) =>
        distance(hue(tokens.dark[`category-${n}-line`]!), hue(target)) < distance(hue(tokens.dark[`category-${best}-line`]!), hue(target)) ? n : best,
      );
    expect(nearest(tokens.dark["accent"]!)).toBe(7);
    expect(nearest(tokens.dark["danger"]!)).toBe(8);
  });

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

  it("tem keyframes para toda animação mw exposta ao Tailwind", () => {
    for (const [key, value] of Object.entries(theme).filter(([key]) => key.startsWith("animate-mw-"))) {
      const name = value.split(/\s+/)[0]!;
      expect(css[`@keyframes ${name}`], key).toBeTruthy();
    }
  });

  it("faz o destaque voltar do accent-soft uma vez só, sem piscar repetido", () => {
    const flash = theme["animate-mw-flash"];
    expect(flash).toMatch(/var\(--mw-duration-base\)/);
    expect(flash).toBe("mw-flash var(--mw-duration-base) var(--mw-ease-standard)");
    expect(JSON.stringify(css["@keyframes mw-flash"])).toMatch(/var\(--color-accent-soft\)/);
  });

  it("aumenta as distâncias de movimento de sm para lg e usa o token no deslocamento", () => {
    const values = (["sm", "md", "lg"] as const).map((name) => px(root[`--mw-distance-${name}`] as string));
    expect(values[0]).toBeLessThan(values[1]!);
    expect(values[1]).toBeLessThan(values[2]!);
    expect(JSON.stringify(css["@keyframes mw-slide-in"])).toMatch(/var\(--mw-distance-md\)/);
    expect(theme["animate-mw-shift"]).toMatch(/var\(--mw-duration-(fast|base|slow)\)/);
    expect(JSON.stringify(css["@keyframes mw-shift"])).toMatch(/var\(--mw-distance-sm\)/);
  });

  it("atrasa cada item do stagger pelo índice vezes o passo", () => {
    expect(ms(root["--mw-stagger"] as string)).toBeGreaterThan(0);
    expect(JSON.stringify(css["@utility mw-stagger"])).toMatch(/var\(--mw-i, 0\) \* var\(--mw-stagger\)/);
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
