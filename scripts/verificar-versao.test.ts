import { describe, expect, it } from "vitest";
import { avaliarVersao, textoDaIssue } from "./verificar-versao";

const release = (versao: string, body = "### Novo\n\n- Algo novo.") => ({ tagName: `v${versao}`, body });
const releases = [
  release("0.23.0"),
  release("0.22.0", "### Quebra compatibilidade\n\n- Button perde `variant`."),
  release("0.21.1"),
  release("0.21.0"),
];
const fixada = (versao: string) =>
  JSON.stringify({ registries: { "@marcio": `https://github.com/wenderu00/mwds/releases/download/v${versao}/{name}.json` } });

describe("avaliarVersao", () => {
  it("considera em dia o sistema fixado na última versão", () => {
    expect(avaliarVersao(fixada("0.23.0"), releases)).toEqual({ estado: "em-dia", instalada: "v0.23.0", ultima: "v0.23.0" });
  });

  it("lista as versões que faltam, da mais antiga para a mais nova", () => {
    const avaliacao = avaliarVersao(fixada("0.21.0"), releases);
    expect(avaliacao).toMatchObject({ estado: "desatualizado", instalada: "v0.21.0", ultima: "v0.23.0", pendentes: ["v0.21.1", "v0.22.0", "v0.23.0"] });
  });

  it("marca as versões pendentes que quebram compatibilidade", () => {
    expect(avaliarVersao(fixada("0.21.0"), releases)).toMatchObject({ quebras: ["v0.22.0"] });
    expect(avaliarVersao(fixada("0.22.0"), releases)).toMatchObject({ estado: "desatualizado", quebras: [] });
  });

  it("reconhece a URL do Pages como sem versão fixa", () => {
    const config = JSON.stringify({ registries: { "@marcio": "https://wenderu00.github.io/mwds/r/{name}.json" } });
    expect(avaliarVersao(config, releases)).toEqual({ estado: "sem-versao", ultima: "v0.23.0" });
  });

  it("lê a entrada do registry escrita como objeto", () => {
    const config = JSON.stringify({ registries: { "@marcio": { url: "https://github.com/wenderu00/mwds/releases/download/v0.23.0/{name}.json" } } });
    expect(avaliarVersao(config, releases)).toMatchObject({ estado: "em-dia" });
  });

  it("não esconde uma versão que não existe nos releases", () => {
    expect(avaliarVersao(fixada("0.9.9"), releases)).toEqual({ estado: "desconhecida", instalada: "v0.9.9", ultima: "v0.23.0" });
  });

  it("identifica o projeto sem o registry do DS", () => {
    expect(avaliarVersao(JSON.stringify({ registries: {} }), releases)).toEqual({ estado: "sem-ds", ultima: "v0.23.0" });
    expect(avaliarVersao("{}", releases)).toEqual({ estado: "sem-ds", ultima: "v0.23.0" });
  });
});

describe("textoDaIssue", () => {
  it("não pede issue para o sistema em dia", () => {
    expect(textoDaIssue(avaliarVersao(fixada("0.23.0"), releases))).toBeNull();
  });

  it("mostra a versão atual, a nova, as pendentes e como atualizar", () => {
    const issue = textoDaIssue(avaliarVersao(fixada("0.22.0"), releases))!;
    expect(issue.titulo).toBe("@mw/ui: atualizar de v0.22.0 para v0.23.0");
    expect(issue.corpo).toContain("https://github.com/wenderu00/mwds/releases/tag/v0.23.0");
    expect(issue.corpo).toContain("releases/download/v0.23.0/{name}.json");
    expect(issue.corpo).toContain("add @marcio/button --diff");
    expect(issue.corpo).not.toContain("Quebra compatibilidade");
  });

  it("avisa quando alguma versão pendente quebra compatibilidade", () => {
    const issue = textoDaIssue(avaliarVersao(fixada("0.21.0"), releases))!;
    expect(issue.titulo).toBe("@mw/ui: atualizar de v0.21.0 para v0.23.0 (quebra compatibilidade)");
    expect(issue.corpo).toMatch(/Quebra compatibilidade.*v0\.22\.0/);
  });

  it("explica como fixar a versão no sistema sem versão fixa", () => {
    const issue = textoDaIssue(avaliarVersao(JSON.stringify({ registries: { "@marcio": "https://wenderu00.github.io/mwds/r/{name}.json" } }), releases))!;
    expect(issue.titulo).toBe("@mw/ui: fixar a versão (última: v0.23.0)");
    expect(issue.corpo).toContain("releases/download/v0.23.0/{name}.json");
    expect(issue.corpo).toContain("components.json");
  });

  it("pede conferência da versão que não existe e do projeto sem o DS", () => {
    expect(textoDaIssue(avaliarVersao(fixada("0.9.9"), releases))!.titulo).toBe("@mw/ui: a versão v0.9.9 não existe nos releases");
    expect(textoDaIssue(avaliarVersao("{}", releases))!.titulo).toBe("@mw/ui: components.json sem a entrada @marcio");
  });
});
