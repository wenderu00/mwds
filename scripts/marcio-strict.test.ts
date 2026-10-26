import { readFileSync } from "node:fs";
import { ESLint, type Linter } from "eslint";
import postcss from "postcss";
import { describe, expect, it } from "vitest";
import mw from "../eslint.mw.mjs";
import { buildRegistry, importsOf } from "./build-registry";

const strict = buildRegistry().items.find((item) => item.name === "marcio-strict")!;

function themeResets(css: string) {
  const resets: string[] = [];
  postcss.parse(css).walkAtRules("theme", (rule) => {
    rule.walkDecls((decl) => {
      if (decl.prop.endsWith("-*") || ["--color-transparent", "--color-current"].includes(decl.prop)) resets.push(`${decl.prop}: ${decl.value}`);
    });
  });
  return resets;
}

describe("marcio-strict", () => {
  it("depende dos tokens e importa os resets logo depois do tailwindcss", () => {
    expect(strict.registryDependencies?.some((url) => url.endsWith("/r/marcio-tokens.json"))).toBe(true);
    expect(strict.css).toEqual({ '@import "./mw-strict.css"': {} });
    expect(strict.files).toContainEqual({ path: "registry/marcio/mw-strict.css", type: "registry:file", target: "app/mw-strict.css" });
  });

  it("zera os mesmos namespaces que o site do DS zera", () => {
    const published = themeResets(readFileSync("registry/marcio/mw-strict.css", "utf8"));
    expect(published).toEqual(themeResets(readFileSync("registry/marcio/tokens.css", "utf8")));
    expect(published).toEqual(expect.arrayContaining(["--color-*: initial", "--radius-*: initial", "--shadow-*: initial", "--inset-shadow-*: initial", "--drop-shadow-*: initial", "--ease-*: initial"]));
  });

  it("publica a config de lint com todos os arquivos que ela importa", () => {
    const pending = ["eslint.mw.mjs"];
    const needed = new Set<string>();
    while (pending.length) {
      const file = pending.pop()!;
      if (needed.has(file)) continue;
      needed.add(file);
      for (const specifier of importsOf(file).filter((spec) => spec.startsWith("."))) {
        pending.push(new URL(specifier, `file:///${file}`).pathname.slice(1));
      }
    }
    for (const file of needed) expect(strict.files, file).toContainEqual({ path: file, type: "registry:file", target: file });
  });

  it("reprova cor, raio e texto fora dos tokens e ícone fora da escala no projeto consumidor", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [...(mw as unknown as Linter.Config[]), { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }],
    });
    const code = `import { Castle } from "@/components/icons/medieval/castle";
export const A = () => <div className="bg-red-500 rounded-md text-[11px]"><Castle className="size-12" /></div>;
export const B = () => <div className="bg-accent rounded-control text-mono-xs"><Castle className="size-5" /></div>;`;
    const [result] = await eslint.lintText(code, { filePath: "app/page.jsx" });
    const byRule = result!.messages.map((message) => `${message.line}:${message.ruleId}`).sort();
    expect(byRule).toEqual(["2:mw/icon-size", "2:mw/no-raw-color", "2:mw/no-raw-token"]);
  });
});
