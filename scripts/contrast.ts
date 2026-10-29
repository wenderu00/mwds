import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { minimum, pairs } from "./contrast-pairs";
import { contrast } from "./lib/color";
import { loadTokens, type Theme } from "./lib/tokens";

const tokens = loadTokens();
const themes: Theme[] = ["dark", "light"];

const results = themes.flatMap((theme) =>
  pairs.map((pair) => {
    const fgValue = tokens[theme][pair.fg];
    const bgValue = tokens[theme][pair.bg];
    if (!fgValue || !bgValue) throw new Error(`Par com token inexistente: ${pair.fg} sobre ${pair.bg}`);
    const ratio = contrast(fgValue, bgValue);
    const required = minimum[pair.kind];
    return { theme, ...pair, fgValue, bgValue, ratio: Math.round(ratio * 100) / 100, required, pass: ratio >= required };
  }),
);

const pad = (value: string, size: number) => value.padEnd(size);
for (const theme of themes) {
  console.log(`\nTema ${theme === "dark" ? "escuro" : "claro"}`);
  console.log(`${pad("frente", 16)}${pad("fundo", 16)}${pad("razão", 8)}${pad("mín.", 6)}resultado`);
  for (const r of results.filter((x) => x.theme === theme)) {
    console.log(`${pad(r.fg, 16)}${pad(r.bg, 16)}${pad(r.ratio.toFixed(2), 8)}${pad(String(r.required), 6)}${r.pass ? "ok" : "FALHOU"}`);
  }
}

const outDir = resolve(process.cwd(), "app/_data");
const outputs = {
  "contrast.json": JSON.stringify(results, null, 2) + "\n",
  "tokens.json": JSON.stringify(tokens, null, 2) + "\n",
};

if (process.argv.includes("--write")) {
  mkdirSync(outDir, { recursive: true });
  for (const [file, content] of Object.entries(outputs)) writeFileSync(resolve(outDir, file), content);
}

const stale = Object.entries(outputs)
  .filter(([file, content]) => {
    const path = resolve(outDir, file);
    return !existsSync(path) || readFileSync(path, "utf8").replace(/\r\n/g, "\n") !== content;
  })
  .map(([file]) => file);

const failures = results.filter((r) => !r.pass);
console.log(`\n${results.length} pares verificados, ${failures.length} falhas.`);
for (const f of failures) console.error(`FALHOU [${f.theme}] ${f.fg} sobre ${f.bg}: ${f.ratio} < ${f.required}`);
for (const file of stale) console.error(`app/_data/${file} desatualizado: rode npm run contrast`);
if (failures.length || stale.length) process.exit(1);
