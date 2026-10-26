import { icons as lucideIcons } from "lucide-react";
import { parseSync, type INode } from "svgson";
import { pathToFileURL } from "node:url";
import { loadPacks, type Pack } from "./packs";

const rootAttributes: Record<string, string> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};

const geometry: Record<string, string[]> = {
  path: ["d"],
  circle: ["cx", "cy", "r"],
  rect: ["x", "y", "width", "height", "rx", "ry"],
  line: ["x1", "y1", "x2", "y2"],
  polyline: ["points"],
};

function problemWith(attribute: string, value: string, expected?: string) {
  if (attribute === "fill") return `preenchimento proibido (fill="${value}"); use fill="none" só na raiz`;
  if (attribute === "stroke") return `cor fixa proibida (stroke="${value}"); a cor vem de currentColor na raiz`;
  if (attribute === "stroke-width") return `traço diferente de 2 (stroke-width="${value}")`;
  if (attribute === "stroke-linecap" || attribute === "stroke-linejoin") return `${attribute}="${value}": pontas e junções precisam ser arredondadas (round)`;
  if (attribute === "viewBox") return `viewBox="${value}"; a grade é 0 0 24 24`;
  return expected === undefined ? `atributo ${attribute} não é permitido` : `${attribute}="${value}"; esperado "${expected}"`;
}

export function validateSvg(source: string): string[] {
  const errors: string[] = [];
  let root: INode;
  try {
    root = parseSync(source);
  } catch (error) {
    return [`SVG inválido: ${(error as Error).message}`];
  }
  if (root.name !== "svg") return [`a raiz precisa ser <svg>, e não <${root.name}>`];
  for (const [attribute, expected] of Object.entries(rootAttributes)) {
    const value = root.attributes[attribute];
    if (value !== expected) errors.push(value === undefined ? `a raiz precisa de ${attribute}="${expected}"` : problemWith(attribute, value, expected));
  }
  for (const attribute of Object.keys(root.attributes)) {
    if (!(attribute in rootAttributes)) errors.push(`raiz: ${problemWith(attribute, root.attributes[attribute]!)}`);
  }
  for (const child of root.children) {
    if (child.type !== "element") continue;
    const allowed = geometry[child.name];
    if (!allowed) {
      errors.push(`elemento <${child.name}> proibido; use path, circle, rect, line ou polyline`);
      continue;
    }
    if (child.children.some((node) => node.type === "element")) errors.push(`<${child.name}> não pode ter elementos dentro`);
    for (const [attribute, value] of Object.entries(child.attributes)) {
      if (!allowed.includes(attribute)) errors.push(`<${child.name}>: ${problemWith(attribute, value)}`);
    }
  }
  return errors;
}

export function validatePacks(packs: Pack[]): string[] {
  const errors: string[] = [];
  const owners = new Map<string, string[]>();
  const packNames = new Set(packs.map((pack) => pack.name));
  for (const pack of packs) {
    for (const dependency of pack.dependsOn) {
      if (!packNames.has(dependency)) errors.push(`${pack.name}: depende do pacote ${dependency}, que não existe`);
    }
    const names = new Set(pack.icons.map((icon) => icon.name));
    for (const icon of pack.icons) {
      owners.set(icon.name, [...(owners.get(icon.name) ?? []), pack.name]);
      for (const error of validateSvg(icon.svg)) errors.push(`${pack.name}/${icon.name}: ${error}`);
      for (const similar of icon.similar) {
        if (!(similar in lucideIcons)) errors.push(`${pack.name}/${icon.name}: o ícone parecido ${similar} não existe no lucide`);
      }
    }
    for (const [alias, target] of Object.entries(pack.aliases)) {
      if (!names.has(target)) errors.push(`${pack.name}: o alias ${alias} aponta para ${target}, que não existe no pacote`);
      if (names.has(alias)) errors.push(`${pack.name}: o alias ${alias} tem o mesmo nome de um ícone`);
    }
  }
  for (const [name, packsWithIcon] of owners) {
    if (packsWithIcon.length > 1) errors.push(`o ícone ${name} aparece em mais de um pacote: ${packsWithIcon.join(", ")}`);
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const errors = validatePacks(loadPacks());
  for (const error of errors) console.error(error);
  if (errors.length) process.exit(1);
  console.log("Ícones válidos.");
}
