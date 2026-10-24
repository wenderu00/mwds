import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { componentsOf, entriesOf, inline, parseChangelog, readChangelog } from "../app/novidades/changelog";

const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { version: string };
const releases = readChangelog();

const compare = (a: string, b: string) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if (x![i] !== y![i]) return x![i]! - y![i]!;
  return 0;
};

describe("CHANGELOG.md", () => {
  it("começa pela versão do package.json", () => {
    expect(releases[0]!.version).toBe(pkg.version);
  });

  it("lista as versões da mais nova para a mais antiga, sem repetir, com datas que não voltam no tempo", () => {
    for (let i = 1; i < releases.length; i++) {
      expect(compare(releases[i - 1]!.version, releases[i]!.version), releases[i]!.version).toBeGreaterThan(0);
      expect(releases[i - 1]!.date >= releases[i]!.date, releases[i]!.version).toBe(true);
    }
  });

  it("toda quebra de compatibilidade traz como migrar e um comando ou código", () => {
    for (const release of releases) {
      const breaking = release.sections.find((section) => section.title === "Quebra compatibilidade");
      if (!breaking) continue;
      expect(breaking.blocks.some((block) => block.type === "paragraph" && block.text === "**Como migrar**"), release.version).toBe(true);
      expect(breaking.blocks.some((block) => block.type === "code"), release.version).toBe(true);
    }
  });

  it("não usa travessão", () => {
    expect(readFileSync("CHANGELOG.md", "utf8")).not.toMatch(/—/);
  });
});

describe("parser do CHANGELOG", () => {
  it("lê versões, seções, listas, parágrafos e código", () => {
    const [release] = parseChangelog("# Changelog\n\nIntro.\n\n## [1.2.3] - 2026-01-02\n\n### Novo\n\n- Um `x`.\n- Dois.\n\n**Como migrar**\n\n```bash\nnpm i\n```\n");
    expect(release).toEqual({
      version: "1.2.3",
      date: "2026-01-02",
      sections: [
        {
          title: "Novo",
          blocks: [
            { type: "list", items: ["Um `x`.", "Dois."] },
            { type: "paragraph", text: "**Como migrar**" },
            { type: "code", lang: "bash", code: "npm i" },
          ],
        },
      ],
    });
  });

  it("quebra com título de versão ou seção fora do formato", () => {
    expect(() => parseChangelog("## 1.0.0\n")).toThrow(/linha 1/);
    expect(() => parseChangelog("## [1.0.0] - 2026-01-01\n\n### Adicionado\n")).toThrow(/seção desconhecida/);
    expect(() => parseChangelog("## [1.0.0] - 2026-01-01\n\n- solto\n")).toThrow(/fora de uma seção/);
  });

  it("acha os componentes citados em cada item, na ordem do texto", () => {
    const names = ["Table", "DataTable", "Select", "CommandPalette", "Kbd"];
    expect(componentsOf("O gatilho do CommandPalette usa o Kbd.", names)).toEqual(["CommandPalette", "Kbd"]);
    expect(componentsOf("A listagem usa o DataTable; o select saiu.", names)).toEqual(["DataTable"]);
    expect(componentsOf("Bloco `login`: o painel vira aside.", names)).toEqual(["bloco login"]);
    expect(componentsOf("O CI roda nos PRs.", names)).toEqual([]);
  });

  it("transforma os itens de lista em linhas com o tipo da seção", () => {
    const [release] = parseChangelog("## [1.0.0] - 2026-01-01\n\n### Novo\n\n- Select: busca.\n\n### Quebra compatibilidade\n\n- Table muda.\n\n**Como migrar**\n");
    expect(entriesOf(release!, ["Select", "Table"])).toEqual([
      { section: "Novo", components: ["Select"], text: "Select: busca." },
      { section: "Quebra compatibilidade", components: ["Table"], text: "Table muda." },
    ]);
  });

  it("separa código, negrito e link no texto", () => {
    expect(inline("use `a` e **b** em [c](https://x)")).toEqual([
      { kind: "text", value: "use " },
      { kind: "code", value: "a" },
      { kind: "text", value: " e " },
      { kind: "strong", value: "b" },
      { kind: "text", value: " em " },
      { kind: "link", value: "c", href: "https://x" },
    ]);
  });
});
