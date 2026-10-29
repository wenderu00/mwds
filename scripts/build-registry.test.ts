import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildRegistry, importSpecifiers, importsOf, registryBaseUrl, tokensCss } from "./build-registry";

const registry = buildRegistry();
const byName = new Map(registry.items.map((item) => [item.name, item]));
const nameFromUrl = (url: string) => url.split("/").pop()!.replace(/\.json$/, "");

describe("registry", () => {
  it("has one registry:ui item per component file", () => {
    const files = readdirSync("registry/marcio/ui").filter((file) => file.endsWith(".tsx"));
    const uiItems = registry.items.filter((item) => item.type === "registry:ui");
    expect(uiItems.map((item) => `${item.name}.tsx`).sort()).toEqual(files.sort());
  });

  it("resolves every registry dependency to an item of this registry", () => {
    for (const item of registry.items) {
      for (const dependency of item.registryDependencies ?? []) {
        expect(byName.has(nameFromUrl(dependency)), `${item.name} -> ${dependency}`).toBe(true);
      }
    }
  });

  it("declares the npm packages each component imports", () => {
    for (const item of registry.items.filter((entry) => entry.files?.length)) {
      const imports = importsOf(item.files![0]!.path);
      if (imports.some((specifier) => specifier.startsWith("radix-ui"))) expect(item.dependencies).toContain("radix-ui");
      if (imports.includes("class-variance-authority")) expect(item.dependencies).toContain("class-variance-authority");
      expect(item.dependencies ?? []).not.toContain("react");
    }
  });

  it("has one registry:block item per block folder, with page targets and component paths matching the rewritten imports", () => {
    const folders = readdirSync("registry/marcio/blocks");
    const blockItems = registry.items.filter((item) => item.type === "registry:block");
    expect(blockItems.map((item) => item.name).sort()).toEqual(folders.sort());
    for (const item of blockItems) {
      for (const file of item.files ?? []) {
        expect(file.target, file.path).toBeTruthy();
        if (file.type === "registry:page") expect(file.target).toMatch(/^app\//);
        else expect(file.target).toBe(file.path.replace("registry/marcio/blocks/", "components/blocks/"));
      }
    }
    expect(byName.get("dashboard")?.registryDependencies?.map(nameFromUrl)).toContain("admin-shell");
    expect(byName.get("settings")?.registryDependencies?.map(nameFromUrl)).toContain("admin-shell");
    expect(byName.get("login")?.dependencies).toContain("react-hook-form");
  });

  it("finds static, re-exported, single-quoted and dynamic imports", () => {
    const source = [
      'import { a } from "pkg-a";',
      "import b from 'pkg-b';",
      'import "pkg-c";',
      "import {\n  d,\n  e,\n} from \"pkg-d\";",
      'import type { F } from "pkg-f";',
      'export { g } from "pkg-g";',
      'export * from "./local";',
      'const h = await import("pkg-h");',
      'const items = Array.from(list);',
      'const label = "from here";',
    ].join("\n");
    expect(importSpecifiers(source)).toEqual(["pkg-a", "pkg-b", "pkg-c", "pkg-d", "pkg-f", "pkg-g", "./local", "pkg-h"]);
  });

  it("declares the packages loaded on demand", () => {
    expect(byName.get("character-stage")?.dependencies).toContain("gsap");
    expect(byName.get("scene-canvas")?.dependencies).toContain("pixi.js");
  });

  it("refuses a deploy base path without the registry URL", () => {
    expect(() => registryBaseUrl({ BASE_PATH: "/mwds" })).toThrow(/REGISTRY_URL/);
    expect(registryBaseUrl({ BASE_PATH: "/mwds", REGISTRY_URL: "https://example.com/mwds/" })).toBe("https://example.com/mwds");
    expect(registryBaseUrl({})).toBe("http://localhost:3000");
  });

  it("makes every component pull the tokens", () => {
    for (const item of registry.items.filter((entry) => entry.type === "registry:ui")) {
      expect(item.registryDependencies?.map(nameFromUrl)).toContain("marcio-tokens");
    }
  });

  it("splits tokens.css into theme variables and css the shadcn CLI can merge", () => {
    const { theme, css } = tokensCss();
    expect(theme["color-ground"]).toBe("var(--mw-ground)");
    expect(theme["font-display"]).toContain("--font-bricolage");
    expect(theme).not.toHaveProperty("color-*");
    expect(css[":root, [data-theme=\"dark\"]"]).toMatchObject({ "--mw-ground": "#000000" });
    expect(css["[data-theme=\"light\"]"]).toMatchObject({ "--mw-ground": "#ffffff" });
    expect(css).toHaveProperty("@media (prefers-color-scheme: light)");
    expect(css).toHaveProperty("@utility mw-caret");
    expect(css).toHaveProperty("@keyframes mw-glitch");
    expect(css.body).toMatchObject({ "font-family": "var(--font-sans)" });
    expect(css["@layer base"]).toHaveProperty(":focus-visible");
    expect(css["@layer base"]).not.toHaveProperty("body");
  });

  it("keeps the committed registry.json in sync with the components", () => {
    const committed = JSON.parse(readFileSync("registry.json", "utf8")) as typeof registry;
    const strip = (r: typeof registry) => r.items.map((item) => ({ ...item, registryDependencies: item.registryDependencies?.map(nameFromUrl) }));
    expect(strip(committed).map((item) => ({ ...item, config: undefined }))).toEqual(
      strip(registry).map((item) => ({ ...item, config: undefined })),
    );
  });
});
