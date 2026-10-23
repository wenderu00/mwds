import { classRule } from "./class-context.js";

const side = "(-(t|r|b|l|s|e|tl|tr|br|bl|ss|se|es|ee))?";
const length = "\\[[\\d.]+(px|rem)\\]";

const allowed = [
  new RegExp(`^rounded${side}-(none|full|mark|control|card)$`),
  /^duration-(fast|base|slow)$/,
  /^ease-(standard|enter|exit)$/,
  /^z-(behind|base|sticky|sheet|dialog|popover|toast|tooltip)$/,
];

const forbidden = [
  new RegExp(`^rounded${side}(-.+)?$`),
  /^duration-/,
  /^ease-/,
  /^-?z-/,
  /^(drop-|inset-)?shadow(-|$)/,
  new RegExp(`^-?(p[xytrblse]?|m[xytrblse]?|gap(-[xy])?|space-[xy])-${length}$`),
  new RegExp(`^(max-w|size)-${length}$`),
];

function utilityOf(className) {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < className.length; i++) {
    if (className[i] === "[") depth++;
    if (className[i] === "]") depth--;
    if (className[i] === ":" && depth === 0) start = i + 1;
  }
  return className.slice(start).replace(/^!|!$/g, "");
}

const noRawToken = classRule({
  description: "Proíbe raio, duração, easing, camada, sombra e medidas soltas fora dos tokens de fundação",
  message:
    "Valor fora dos tokens de fundação ({{ value }}). Use rounded-control, duration-base, ease-standard, z-dialog, h-control ou max-w-content.",
  attributes: new Set(["className"]),
  inspect(text) {
    for (const className of text.split(/\s+/)) {
      const utility = utilityOf(className);
      if (!utility || allowed.some((pattern) => pattern.test(utility))) continue;
      if (forbidden.some((pattern) => pattern.test(utility))) return className;
    }
    return null;
  },
});

export default noRawToken;
