import registry from "@/registry.json";

export type InstallInfo = { command: string; dependencies: string[]; registryDependencies: string[] };

const itemName = (url: string) => url.replace(/^.*\/r\//, "").replace(/\.json$/, "");
// Tokens e utils entram em todo item; listar os dois em cada página só faz ruído.
const implicit = new Set(["marcio-tokens", "utils"]);

// Lê o registry.json versionado, que o build-registry mantém em sincronia com os imports.
export function installInfo(name: string): InstallInfo | undefined {
  const item = registry.items.find((entry) => entry.name === name);
  if (!item) return undefined;
  return {
    command: `npx shadcn@latest add @marcio/${name}`,
    dependencies: "dependencies" in item ? [...(item.dependencies ?? [])] : [],
    registryDependencies: ("registryDependencies" in item ? (item.registryDependencies ?? []) : [])
      .map(itemName)
      .filter((dep) => !implicit.has(dep)),
  };
}
