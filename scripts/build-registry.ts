import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import postcss, { type ChildNode, type Container } from "postcss";
import { blocks } from "../app/_docs/blocks";
import { docs } from "../app/_docs/catalog";

type CssTree = { [key: string]: string | CssTree };

type RegistryItem = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; type: string; target?: string }[];
  css?: CssTree;
  cssVars?: { theme: Record<string, string> };
  font?: Record<string, unknown>;
  extends?: string;
  config?: Record<string, unknown>;
  docs?: string;
  categories?: string[];
};

const root = resolve(String(process.cwd()));
const baseUrl = (process.env.REGISTRY_URL ?? "http://localhost:3000").replace(/\/$/, "");
const itemUrl = (name: string) => `${baseUrl}/r/${name}.json`;
const ignoredPackages = new Set(["react", "react-dom", "next"]);

function toTree(container: Container<ChildNode>): CssTree {
  const tree: CssTree = {};
  container.each((node) => {
    if (node.type === "decl") tree[node.prop] = node.value;
    if (node.type === "rule") tree[node.selector.replace(/\s*\n\s*/g, " ")] = toTree(node);
    if (node.type === "atrule") tree[`@${node.name} ${node.params}`.trim()] = node.nodes ? toTree(node) : {};
  });
  return tree;
}

const paletteReset = new Set(["--color-*", "--color-transparent", "--color-current"]);

export function tokensCss(): { theme: Record<string, string>; css: CssTree } {
  const css = readFileSync(join(root, "registry/marcio/tokens.css"), "utf8");
  const parsed = toTree(postcss.parse(css));
  const { "@theme inline": themeBlock, ...tree } = parsed;
  if (typeof themeBlock !== "object") throw new Error("tokens.css precisa de @theme inline");
  const theme: Record<string, string> = {};
  for (const [prop, value] of Object.entries(themeBlock)) {
    if (typeof value !== "string") throw new Error(`@theme inline só pode ter declarações: ${prop}`);
    if (!paletteReset.has(prop) && !prop.endsWith("-*")) theme[prop.replace(/^--/, "")] = value;
  }
  const base = tree["@layer base"];
  if (typeof base !== "object") throw new Error("tokens.css precisa de @layer base");
  const { html, body, ...layered } = base;
  if (typeof html !== "object" || typeof body !== "object") throw new Error("@layer base precisa de html e body");
  const rest = Object.fromEntries(Object.entries(tree).filter(([key]) => key !== "@layer base"));
  return { theme, css: { ...rest, html, body, "@layer base": layered } };
}

export function importsOf(file: string) {
  const source = readFileSync(join(root, file), "utf8");
  return [...source.matchAll(/^import[^"]*"([^"]+)";?$/gm)].map((match) => match[1]!);
}

function packageName(specifier: string) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]!;
}

export function dependenciesOf(file: string | string[], { withTokens = true, self }: { withTokens?: boolean; self?: string } = {}) {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>(withTokens ? [itemUrl("marcio-tokens")] : []);
  for (const specifier of (Array.isArray(file) ? file : [file]).flatMap(importsOf)) {
    const local = specifier.match(/^@\/registry\/marcio\/(ui|lib)\/([\w-]+)$/);
    const block = specifier.match(/^@\/registry\/marcio\/blocks\/([\w-]+)\//);
    if (local) registryDependencies.add(itemUrl(local[2]!));
    else if (block) {
      if (block[1] !== self) registryDependencies.add(itemUrl(block[1]!));
    } else if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
      const name = packageName(specifier);
      if (!ignoredPackages.has(name)) dependencies.add(name);
    }
  }
  return { dependencies: [...dependencies].sort(), registryDependencies: [...registryDependencies].sort() };
}

const fonts = [
  { name: "font-bricolage", family: "Bricolage Grotesque", import: "Bricolage_Grotesque", variable: "--font-bricolage", weight: ["500", "700", "800"] },
  { name: "font-plex-sans", family: "IBM Plex Sans", import: "IBM_Plex_Sans", variable: "--font-plex-sans", weight: ["400", "500", "600"] },
  { name: "font-plex-mono", family: "IBM Plex Mono", import: "IBM_Plex_Mono", variable: "--font-plex-mono", weight: ["400", "500"] },
];

const setupNotes: Record<string, string> = {
  toast: "Coloque <Toaster /> uma vez no layout raiz.",
  tooltip: "Envolva a aplicação com <TooltipProvider> no layout raiz.",
  "theme-toggle": "Coloque <ThemeScript /> dentro do <head> do layout raiz e adicione suppressHydrationWarning no <html>.",
};

export function buildRegistry() {
  const uiFiles = readdirSync(join(root, "registry/marcio/ui"))
    .filter((file) => file.endsWith(".tsx"))
    .sort();

  const fontItems: RegistryItem[] = fonts.map((font) => ({
    name: font.name,
    type: "registry:font",
    title: font.family,
    description: `Fonte ${font.family} via next/font, exposta em ${font.variable}.`,
    font: {
      family: font.family,
      provider: "google",
      import: font.import,
      variable: font.variable,
      weight: font.weight,
      subsets: ["latin"],
    },
  }));

  const tokens: RegistryItem = {
    name: "marcio-tokens",
    type: "registry:base",
    extends: "none",
    config: {
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: { config: "", css: "app/globals.css", baseColor: "neutral", cssVariables: true },
      aliases: {
        components: "@/components",
        ui: "@/components/ui",
        lib: "@/lib",
        utils: "@/lib/utils",
        hooks: "@/hooks",
      },
      registries: { "@marcio": `${baseUrl}/r/{name}.json` },
    },
    title: "Tokens do @mw/ui",
    description: "Cores, tipografia, foco, seleção e utilitários de identidade, nos temas escuro e claro.",
    registryDependencies: [...fonts.map((font) => itemUrl(font.name)), itemUrl("utils")],
    cssVars: { theme: tokensCss().theme },
    css: tokensCss().css,
  };

  const utils: RegistryItem = {
    name: "utils",
    type: "registry:lib",
    title: "cn",
    description: "Helper cn com clsx e tailwind-merge ciente dos tamanhos de texto do @mw/ui.",
    ...dependenciesOf("registry/marcio/lib/utils.ts", { withTokens: false }),
    files: [{ path: "registry/marcio/lib/utils.ts", type: "registry:lib" }],
  };

  const uiItems: RegistryItem[] = uiFiles.map((file) => {
    const name = basename(file, ".tsx");
    const doc = docs.find((entry) => entry.slug === name);
    if (!doc) throw new Error(`Componente sem documentação em app/_docs/catalog.tsx: ${name}`);
    const path = `registry/marcio/ui/${file}`;
    return {
      name,
      type: "registry:ui",
      title: doc.name,
      description: doc.summary,
      ...dependenciesOf(path),
      files: [{ path, type: "registry:ui" }],
      categories: [doc.group],
      ...(setupNotes[name] ? { docs: setupNotes[name] } : {}),
    };
  });

  const blockDirs = readdirSync(join(root, "registry/marcio/blocks")).sort();
  const blockItems: RegistryItem[] = blockDirs.map((name) => {
    const doc = blocks.find((entry) => entry.slug === name);
    if (!doc) throw new Error(`Bloco sem documentação em app/_docs/blocks.ts: ${name}`);
    const sources = readdirSync(join(root, "registry/marcio/blocks", name))
      .filter((file) => /\.tsx?$/.test(file))
      .sort();
    for (const target of Object.keys(doc.targets)) {
      if (!sources.includes(target)) throw new Error(`Bloco ${name}: arquivo ${target} não existe`);
    }
    const files = sources.map((file) => {
      const path = `registry/marcio/blocks/${name}/${file}`;
      const pageTarget = doc.targets[file];
      return pageTarget
        ? { path, type: "registry:page", target: pageTarget }
        : { path, type: "registry:component", target: `components/blocks/${name}/${file}` };
    });
    return {
      name,
      type: "registry:block",
      title: doc.name,
      description: doc.summary,
      ...dependenciesOf(
        files.map((file) => file.path),
        { self: name },
      ),
      files,
      categories: ["blocos"],
      ...(doc.setup ? { docs: doc.setup } : {}),
    };
  });

  const all: RegistryItem = {
    name: "marcio-ui",
    type: "registry:item",
    title: "@mw/ui completo",
    description: "Instala tokens, fontes e todos os componentes.",
    registryDependencies: uiItems.map((item) => itemUrl(item.name)),
  };

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "marcio",
    homepage: baseUrl,
    items: [tokens, ...fontItems, utils, ...uiItems, ...blockItems, all],
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const registry = buildRegistry();
  writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
  console.log(`registry.json: ${registry.items.length} itens para ${baseUrl}`);
}
