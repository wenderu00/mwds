import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

// Roda no CI do sistema consumidor só com o Node, sem instalar dependências.
export type Release = { tagName: string; body: string };

export type Avaliacao =
  | { estado: "em-dia"; instalada: string; ultima: string }
  | { estado: "desatualizado"; instalada: string; ultima: string; pendentes: string[]; quebras: string[] }
  | { estado: "sem-versao"; ultima: string }
  | { estado: "desconhecida"; instalada: string; ultima: string }
  | { estado: "sem-ds"; ultima: string };

const repositorio = "wenderu00/mwds";
const urlDoRelease = (tag: string) => `https://github.com/${repositorio}/releases/download/${tag}/{name}.json`;

function urlDoRegistry(componentsJson: string) {
  const config = JSON.parse(componentsJson) as { registries?: Record<string, string | { url?: string }> };
  const entrada = config.registries?.["@marcio"];
  return typeof entrada === "string" ? entrada : entrada?.url;
}

/** Compara o components.json com os releases, que a API do GitHub lista do mais novo para o mais antigo. */
export function avaliarVersao(componentsJson: string, releases: Release[]): Avaliacao {
  const ultima = releases[0]!.tagName;
  const url = urlDoRegistry(componentsJson);
  if (!url) return { estado: "sem-ds", ultima };
  const instalada = url.match(/\/releases\/download\/(v[^/]+)\//)?.[1];
  if (!instalada) return { estado: "sem-versao", ultima };
  const posicao = releases.findIndex((release) => release.tagName === instalada);
  if (posicao === -1) return { estado: "desconhecida", instalada, ultima };
  if (posicao === 0) return { estado: "em-dia", instalada, ultima };
  const pendentes = releases.slice(0, posicao).reverse();
  return {
    estado: "desatualizado",
    instalada,
    ultima,
    pendentes: pendentes.map((release) => release.tagName),
    quebras: pendentes.filter((release) => release.body.includes("### Quebra compatibilidade")).map((release) => release.tagName),
  };
}

const comoAtualizar = (ultima: string) => `No \`components.json\`, aponte a entrada \`@marcio\` para \`${urlDoRelease(ultima)}\`.

Depois, compare cada item instalado e sobrescreva o que quiser receber:

\`\`\`bash
npx shadcn@latest add @marcio/button --diff
npx shadcn@latest add @marcio/button --overwrite
\`\`\`

O \`--overwrite\` apaga as edições locais daquele arquivo.`;

/** Título e corpo da issue do sistema. Null quando o sistema está em dia e não precisa de issue. */
export function textoDaIssue(avaliacao: Avaliacao): { titulo: string; corpo: string } | null {
  switch (avaliacao.estado) {
    case "em-dia":
      return null;
    case "desatualizado": {
      const { instalada, ultima, pendentes, quebras } = avaliacao;
      const links = pendentes.map((tag) => `- [${tag}](https://github.com/${repositorio}/releases/tag/${tag})`).join("\n");
      const aviso = quebras.length ? `**Quebra compatibilidade:** ${quebras.join(", ")}. Leia como migrar nas notas dessas versões.\n\n` : "";
      return {
        titulo: `@mw/ui: atualizar de ${instalada} para ${ultima}${quebras.length ? " (quebra compatibilidade)" : ""}`,
        corpo: `${aviso}Versões pendentes:\n\n${links}\n\n${comoAtualizar(ultima)}`,
      };
    }
    case "sem-versao":
      return {
        titulo: `@mw/ui: fixar a versão (última: ${avaliacao.ultima})`,
        corpo: `O \`components.json\` usa a URL do Pages, que sempre entrega a versão mais nova. Duas instalações em dias diferentes podem receber códigos diferentes.\n\n${comoAtualizar(avaliacao.ultima)}`,
      };
    case "desconhecida":
      return {
        titulo: `@mw/ui: a versão ${avaliacao.instalada} não existe nos releases`,
        corpo: `Confira a entrada \`@marcio\` do \`components.json\`. A última versão é ${avaliacao.ultima}: \`${urlDoRelease(avaliacao.ultima)}\`.`,
      };
    case "sem-ds":
      return {
        titulo: "@mw/ui: components.json sem a entrada @marcio",
        corpo: `Este repositório tem o workflow \`mw-versao.yml\`, mas o \`components.json\` não usa o @mw/ui. Instale com \`npx shadcn@latest init https://github.com/${repositorio}/releases/download/${avaliacao.ultima}/marcio-tokens.json\` ou apague o workflow.`,
      };
  }
}

export function lerReleases(): Release[] {
  const resultado = spawnSync("gh", ["api", "--paginate", "--slurp", `repos/${repositorio}/releases`], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (resultado.status !== 0) throw new Error(`gh api falhou: ${resultado.stderr}`);
  const paginas = JSON.parse(resultado.stdout) as { tag_name: string; body: string | null }[][];
  return paginas.flat().map((release) => ({ tagName: release.tag_name, body: release.body ?? "" }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const caminho = process.argv[2] ?? "components.json";
  const avaliacao = avaliarVersao(existsSync(caminho) ? readFileSync(caminho, "utf8") : "{}", lerReleases());
  console.log(JSON.stringify({ estado: avaliacao.estado, ...textoDaIssue(avaliacao) }));
}
