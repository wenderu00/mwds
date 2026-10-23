import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type Theme = "dark" | "light";
export type TokenMap = Record<string, string>;

export const tokensPath = fileURLToPath(new URL("../../registry/marcio/tokens.css", import.meta.url));

function blockAfter(css: string, selector: string) {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Bloco não encontrado em tokens.css: ${selector}`);
  const open = css.indexOf("{", start + selector.length - 1);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`Bloco sem fechamento: ${selector}`);
}

function declarations(block: string): TokenMap {
  const map: TokenMap = {};
  for (const match of block.matchAll(/--mw-([\w-]+)\s*:\s*([^;]+);/g)) map[match[1]!] = match[2]!.trim();
  return map;
}

function resolve(map: TokenMap): TokenMap {
  const get = (name: string, seen: string[] = []): string => {
    const raw = map[name];
    if (raw === undefined) throw new Error(`Token indefinido: --mw-${name}`);
    if (seen.includes(name)) throw new Error(`Referência circular: ${[...seen, name].join(" > ")}`);
    const ref = raw.match(/^var\(--mw-([\w-]+)\)$/);
    return ref ? get(ref[1]!, [...seen, name]) : raw.toLowerCase();
  };
  return Object.fromEntries(Object.keys(map).map((name) => [name, get(name)]));
}

export function loadTokens(css = readFileSync(tokensPath, "utf8").replace(/\r\n/g, "\n")) {
  const primitives = declarations(blockAfter(css, ":root {"));
  const dark = declarations(blockAfter(css, ':root,\n[data-theme="dark"] {'));
  const systemLight = declarations(blockAfter(css, ':root:not([data-theme="dark"]) {'));
  const light = declarations(blockAfter(css, '\n[data-theme="light"] {'));

  const drift = Object.keys({ ...light, ...systemLight }).filter((k) => light[k] !== systemLight[k]);
  if (drift.length) throw new Error(`Tema claro do sistema difere de [data-theme="light"]: ${drift.join(", ")}`);
  const missing = Object.keys(dark).filter((k) => !(k in light));
  if (missing.length) throw new Error(`Tokens sem valor no tema claro: ${missing.join(", ")}`);

  return {
    primitives: resolve(primitives),
    dark: resolve({ ...primitives, ...dark }),
    light: resolve({ ...primitives, ...light }),
  };
}
