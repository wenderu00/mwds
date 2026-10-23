import { pathToFileURL } from "node:url";
import { contrast, hexToOklch, maxChroma, oklchToHex } from "./lib/color";

const base = "#ece41f";
const pinned: Record<number, string> = { 200: "#f5ee6b", 300: base, 700: "#6e6600" };
const lightness: Record<number, number> = {
  50: 0.985,
  100: 0.97,
  200: 0.94,
  300: 0.897,
  400: 0.82,
  500: 0.73,
  600: 0.62,
  700: 0.52,
  800: 0.44,
  900: 0.37,
  950: 0.27,
};
const chromaFactor: Record<number, number> = { 50: 0.25, 100: 0.45, 200: 0.75, 800: 0.95, 900: 0.85, 950: 0.75 };

const [L0, C0, H] = hexToOklch(base);
const ratio = C0 / maxChroma(L0, H);

export const accentScale: Record<number, string> = Object.fromEntries(
  Object.entries(lightness).map(([step, L]) => {
    const key = Number(step);
    const generated = oklchToHex([L, maxChroma(L, H) * ratio * (chromaFactor[key] ?? 1), H]);
    return [key, pinned[key] ?? generated];
  }),
);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const [step, hex] of Object.entries(accentScale)) {
    const origin = pinned[Number(step)] ? "fixo" : "gerado";
    console.log(
      `accent-${step.padEnd(4)} ${hex}  ${origin.padEnd(7)} preto ${contrast(hex, "#000000").toFixed(2)}  branco ${contrast(hex, "#ffffff").toFixed(2)}`,
    );
  }
}
