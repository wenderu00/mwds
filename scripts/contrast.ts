import { mkdirSync, writeFileSync } from "node:fs";
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
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "contrast.json"), JSON.stringify(results, null, 2) + "\n");
writeFileSync(resolve(outDir, "tokens.json"), JSON.stringify(tokens, null, 2) + "\n");

const failures = results.filter((r) => !r.pass);
console.log(`\n${results.length} pares verificados, ${failures.length} falhas.`);
if (failures.length) {
  for (const f of failures) console.error(`FALHOU [${f.theme}] ${f.fg} sobre ${f.bg}: ${f.ratio} < ${f.required}`);
  process.exit(1);
}
