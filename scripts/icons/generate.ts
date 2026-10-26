import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseSync } from "svgson";
import { componentName, loadPacks, type Pack } from "./packs";

export const generatedDir = "registry/marcio/icons";

function iconModule(name: string, svg: string) {
  const nodes = parseSync(svg)
    .children.filter((node) => node.type === "element")
    .map((node, index) => {
      const attributes = Object.entries({ ...node.attributes, key: String(index) }).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
      return `  ["${node.name}", { ${attributes.join(", ")} }],`;
    });
  return `// Gerado por scripts/icons/generate.ts a partir de icons/${name}.svg. Não edite à mão.
import { createLucideIcon, type IconNode } from "lucide-react";

const iconNode: IconNode = [
${nodes.join("\n")}
];

export const ${componentName(name.split("/")[1]!)} = createLucideIcon("${name.split("/")[1]}", iconNode);
`;
}

function aliasModule(pack: string, alias: string, target: string) {
  return `// Gerado por scripts/icons/generate.ts a partir de icons/${pack}/pack.json. Não edite à mão.
/** @deprecated Use ${componentName(target)}. O nome ${componentName(alias)} sai na próxima versão. */
export { ${componentName(target)} as ${componentName(alias)} } from "./${target}";
`;
}

export const siteIndex = "app/_docs/icons.generated.ts";

// Índice do site: importa só os ícones autorais e os parecidos do lucide, sem trazer o lucide inteiro.
function siteModule(packs: Pack[]) {
  const local = (pack: string, name: string) => `${componentName(pack)}${componentName(name)}`;
  const similar = [...new Set(packs.flatMap((pack) => pack.icons.flatMap((icon) => icon.similar)))].sort();
  const imports = packs.flatMap((pack) =>
    pack.icons.map((icon) => `import { ${componentName(icon.name)} as ${local(pack.name, icon.name)} } from "@/${generatedDir}/${pack.name}/${icon.name}";`),
  );
  const entries = packs.flatMap((pack) =>
    pack.icons.map(
      (icon) =>
        `  { pack: "${pack.name}", name: "${icon.name}", Icon: ${local(pack.name, icon.name)}, tags: ${JSON.stringify(icon.tags)}, similar: [${icon.similar.map((name) => `{ name: "${name}", Icon: Lucide${name} }`).join(", ")}] },`,
    ),
  );
  const packList = packs.map((pack) => `  { name: "${pack.name}", description: ${JSON.stringify(pack.description)}, dependsOn: ${JSON.stringify(pack.dependsOn)}, aliases: ${JSON.stringify(Object.keys(pack.aliases))} },`);
  return `// Gerado por scripts/icons/generate.ts. Não edite à mão.
import { ${similar.map((name) => `${name} as Lucide${name}`).join(", ")}, type LucideIcon } from "lucide-react";
${imports.join("\n")}

export type AuthoredIcon = { pack: string; name: string; Icon: LucideIcon; tags: string[]; similar: { name: string; Icon: LucideIcon }[] };

export const iconPacks = [
${packList.join("\n")}
];

export const authoredIcons: AuthoredIcon[] = [
${entries.join("\n")}
];
`;
}

export function generateFiles(packs: Pack[]): Record<string, string> {
  const files: Record<string, string> = {};
  for (const pack of packs) {
    for (const icon of pack.icons) files[join(generatedDir, pack.name, `${icon.name}.tsx`).replace(/\\/g, "/")] = iconModule(`${pack.name}/${icon.name}`, icon.svg);
    for (const [alias, target] of Object.entries(pack.aliases)) files[`${generatedDir}/${pack.name}/${alias}.tsx`] = aliasModule(pack.name, alias, target);
  }
  files[siteIndex] = siteModule(packs);
  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = generateFiles(loadPacks());
  rmSync(generatedDir, { recursive: true, force: true });
  for (const [path, source] of Object.entries(files)) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, source);
  }
  console.log(`${Object.keys(files).length - 1} arquivos de ícone gerados em ${generatedDir} e o índice em ${siteIndex}`);
}
