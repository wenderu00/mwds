import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Icon = { name: string; svg: string; tags: string[]; similar: string[] };

export type Pack = {
  name: string;
  description: string;
  dependsOn: string[];
  aliases: Record<string, string>;
  icons: Icon[];
};

type Manifest = {
  description: string;
  dependsOn: string[];
  aliases: Record<string, string>;
  icons: Record<string, { tags: string[]; similar: string[] }>;
};

export const iconsDir = "icons";

export function loadPacks(dir = iconsDir): Pack[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((name) => {
      const manifest = JSON.parse(readFileSync(join(dir, name, "pack.json"), "utf8")) as Manifest;
      const files = readdirSync(join(dir, name)).filter((file) => file.endsWith(".svg"));
      const listed = Object.keys(manifest.icons);
      const unlisted = files.map((file) => file.replace(/\.svg$/, "")).filter((icon) => !listed.includes(icon));
      if (unlisted.length) throw new Error(`Pacote ${name}: SVG sem entrada no pack.json: ${unlisted.join(", ")}`);
      return {
        name,
        description: manifest.description,
        dependsOn: manifest.dependsOn,
        aliases: manifest.aliases,
        icons: listed.sort().map((icon) => {
          const file = join(dir, name, `${icon}.svg`);
          if (!files.includes(`${icon}.svg`)) throw new Error(`Pacote ${name}: ${icon} está no pack.json mas ${file} não existe`);
          return { name: icon, svg: readFileSync(file, "utf8"), ...manifest.icons[icon]! };
        }),
      };
    });
}

export function componentName(name: string) {
  return name.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase());
}
