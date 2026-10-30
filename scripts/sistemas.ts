import { spawnSync } from "node:child_process";
import { avaliarVersao, lerReleases, type Avaliacao } from "./verificar-versao";

// Lista a versão do @mw/ui em cada repositório da conta, com o login do gh de quem roda.
function gh(...args: string[]) {
  const resultado = spawnSync("gh", args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (resultado.status !== 0) throw new Error(`gh ${args.join(" ")} falhou: ${resultado.stderr}`);
  return resultado.stdout;
}

const dono = "wenderu00";
const encontrados = JSON.parse(
  gh("search", "code", "@marcio", "--owner", dono, "--filename", "components.json", "--json", "repository,path", "--limit", "100"),
) as { repository: { nameWithOwner: string }; path: string }[];

const releases = lerReleases();
const versao = (avaliacao: Avaliacao) => ("instalada" in avaliacao ? avaliacao.instalada : "-");

const linhas = encontrados
  .filter(({ repository }) => repository.nameWithOwner !== `${dono}/mwds`)
  .map(({ repository, path }) => {
    const conteudo = gh("api", `repos/${repository.nameWithOwner}/contents/${path}`, "-H", "Accept: application/vnd.github.raw+json");
    const avaliacao = avaliarVersao(conteudo, releases);
    return { repositorio: path === "components.json" ? repository.nameWithOwner : `${repository.nameWithOwner}/${path}`, versao: versao(avaliacao), estado: avaliacao.estado };
  })
  .sort((a, b) => a.repositorio.localeCompare(b.repositorio));

console.log(`Última versão: ${releases[0]!.tagName}\n`);
console.table(linhas);
