import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buildRegistry } from "../build-registry";
import { generateFiles } from "./generate";
import { loadPacks, type Pack } from "./packs";
import { validatePacks, validateSvg } from "./validate";

const open = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
const svg = (body: string, root = open) => `${root}${body}</svg>`;

describe("validador de ícones", () => {
  it("aceita um ícone fiel à especificação do lucide", () => {
    expect(validateSvg(svg(`<path d="M2 21h20" /><circle cx="12" cy="12" r="4" /><rect x="4" y="4" width="6" height="6" rx="1" /><line x1="1" y1="1" x2="3" y2="3" /><polyline points="1 2 3 4" />`))).toEqual([]);
  });

  it.each([
    ["viewBox", svg(`<path d="M2 21h20" />`, open.replace('viewBox="0 0 24 24"', 'viewBox="0 0 32 32"')), /viewBox/],
    ["preenchimento na raiz", svg(`<path d="M2 21h20" />`, open.replace('fill="none"', 'fill="currentColor"')), /preenchimento/],
    ["preenchimento num elemento", svg(`<path d="M2 21h20" fill="red" />`), /preenchimento/],
    ["cor fixa", svg(`<path d="M2 21h20" />`, open.replace('stroke="currentColor"', 'stroke="#000"')), /cor fixa/],
    ["cor fixa num elemento", svg(`<path d="M2 21h20" stroke="#ff0000" />`), /cor fixa/],
    ["traço", svg(`<path d="M2 21h20" />`, open.replace('stroke-width="2"', 'stroke-width="1.5"')), /traço/],
    ["traço num elemento", svg(`<path d="M2 21h20" stroke-width="3" />`), /traço/],
    ["ponta", svg(`<path d="M2 21h20" />`, open.replace('stroke-linecap="round"', 'stroke-linecap="square"')), /arredondad/],
    ["junção", svg(`<path d="M2 21h20" stroke-linejoin="miter" />`), /arredondad/],
    ["elipse", svg(`<ellipse cx="12" cy="12" rx="4" ry="2" />`), /ellipse/],
    ["grupo", svg(`<g><path d="M2 21h20" /></g>`), /\bg\b/],
    ["transformação", svg(`<path d="M2 21h20" transform="rotate(45)" />`), /transform/],
  ])("recusa %s", (_, source, message) => {
    const errors = validateSvg(source);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.join("\n")).toMatch(message);
  });

  it("aprova os pacotes do repositório", () => {
    expect(validatePacks(loadPacks())).toEqual([]);
  });

  const pack = (overrides: Partial<Pack> = {}): Pack => ({
    name: "teste",
    description: "",
    dependsOn: [],
    aliases: {},
    icons: [{ name: "torre", svg: svg(`<path d="M2 21h20" />`), tags: ["torre"], similar: ["Castle"] }],
    ...overrides,
  });

  it("recusa o mesmo nome em dois pacotes", () => {
    expect(validatePacks([pack(), pack({ name: "outro" })]).join("\n")).toMatch(/torre.*teste.*outro|torre.*outro.*teste/);
  });

  it("recusa dependência de pacote que não existe", () => {
    expect(validatePacks([pack({ dependsOn: ["fantasma"] })]).join("\n")).toMatch(/fantasma/);
  });

  it("recusa alias que aponta para ícone inexistente", () => {
    expect(validatePacks([pack({ aliases: { velha: "sumida" } })]).join("\n")).toMatch(/sumida/);
  });

  it("recusa ícone parecido que não existe no lucide", () => {
    expect(validatePacks([pack({ icons: [{ ...pack().icons[0]!, similar: ["NaoExiste"] }] })]).join("\n")).toMatch(/NaoExiste/);
  });
});

describe("gerador de ícones", () => {
  it("mantém os componentes gerados em dia com os SVGs", () => {
    for (const [path, source] of Object.entries(generateFiles(loadPacks()))) {
      expect(readFileSync(path, "utf8").replace(/\r\n/g, "\n"), `${path} desatualizado: rode npm run icons:build`).toBe(source);
    }
  });

  it("gera um componente com a API do lucide", async () => {
    const { Castle } = await import("@/registry/marcio/icons/medieval/castle");
    const markup = renderToStaticMarkup(createElement(Castle, { className: "size-5", "aria-hidden": true }));
    expect(markup).toContain('stroke="currentColor"');
    expect(markup).toContain('stroke-width="2"');
    expect(markup).toMatch(/class="lucide lucide-castle[^"]*size-5"/);
    expect(markup).toContain('d="M10 21v-4a2 2 0 0 1 4 0v4"');
  });

  it("gera alias como reexportação marcada como descontinuada", () => {
    const files = generateFiles([
      {
        name: "teste",
        description: "",
        dependsOn: [],
        aliases: { fortaleza: "torre" },
        icons: [{ name: "torre", svg: svg(`<path d="M2 21h20" />`), tags: [], similar: [] }],
      },
    ]);
    const alias = files["registry/marcio/icons/teste/fortaleza.tsx"]!;
    expect(alias).toContain("@deprecated");
    expect(alias).toContain('export { Torre as Fortaleza } from "./torre";');
  });
});

describe("ícones no registry", () => {
  const registry = buildRegistry();
  const byName = new Map(registry.items.map((item) => [item.name, item]));
  const names = (urls: string[] = []) => urls.map((url) => url.split("/").pop()!.replace(/\.json$/, "")).sort();

  it("publica um item por ícone, num arquivo próprio do projeto consumidor", () => {
    const castle = byName.get("icon-medieval-castle")!;
    expect(castle.files).toEqual([{ path: "registry/marcio/icons/medieval/castle.tsx", type: "registry:component", target: "components/icons/medieval/castle.tsx" }]);
    expect(castle.dependencies).toEqual([expect.stringMatching(/^lucide-react@/)]);
  });

  it("publica um item por pacote que traz todos os ícones e os pacotes dos quais depende", () => {
    const medieval = byName.get("icons-medieval")!;
    const icons = loadPacks().find((pack) => pack.name === "medieval")!.icons.map((icon) => `icon-medieval-${icon.name}`);
    expect(names(medieval.registryDependencies)).toEqual([...icons, "icons-base"].sort());
  });
});
