# 0023. Pacotes de ícones autorais

Status: aceito. Complementa a parte de ícones do [ADR 0015](0015-tokens-de-fundacao.md).

## Contexto

O lucide não tem ícones de domínio: madeira, castelo, lanceiro. O Galadur usava emoji (🪙, 💡) no lugar, o que foge da identidade e não segue a escala de tamanho nem `currentColor`. Desenhar os ícones em cada projeto espalharia variações do mesmo desenho e deixaria cada um seguindo regras diferentes.

## Decisão

- **Os ícones autorais moram no DS.** Seguem a especificação do lucide para se misturarem a ele: grade 24 (`viewBox="0 0 24 24"`), traço 2, pontas e junções arredondadas, sem preenchimento e `currentColor`.
- **Fonte:** `icons/<pacote>/<nome>.svg`, com um `icons/<pacote>/pack.json` que traz descrição, dependências, aliases e, por ícone, tags e ícones parecidos do lucide.
- **Validador** (`scripts/icons/validate.ts`, roda no `npm test`). Recusa:
  - `viewBox` diferente de `0 0 24 24`;
  - qualquer `fill`, ou uma cor fixa em `stroke`;
  - traço diferente de 2;
  - pontas ou junções que não sejam `round`;
  - elementos fora de `path`, `circle`, `rect`, `line` e `polyline`;
  - o mesmo nome em dois pacotes.
- **Geração:** `scripts/icons/generate.ts` converte cada SVG num componente feito com `createLucideIcon` do `lucide-react`. O componente tem a mesma API dos ícones do lucide e por isso passa pela regra `mw/icon-size`. Os arquivos gerados ficam versionados em `registry/marcio/icons/`, e um teste falha se estiverem desatualizados.
- **Registry:** um item `icon-<pacote>-<nome>` por ícone e um item `icons-<pacote>` que depende de todos os ícones do pacote e dos pacotes dos quais ele depende. O projeto consumidor recebe um arquivo por ícone em `components/icons/<pacote>/`.
- **Pacotes:** cada ícone pertence a um pacote só. Ícones genéricos (escudo, moeda) ficam no pacote `base`, e os pacotes de domínio dependem dele.
- **O nome é contrato.** Renomear exige um alias em `pack.json`, que gera um re-export marcado `@deprecated` e vive por uma versão.
- **Revisão visual:** a página `/icones` mostra cada ícone ao lado dos parecidos do lucide, nos três tamanhos e nos dois temas, e entra na regressão visual.
- **Lint:** `mw/icon-size` aceita a opção `sources` com as origens dos componentes de ícone. A config publicada inclui `@/components/icons/`, então os autorais ficam presos à mesma escala.
- **Geração assistida:** como as regras são verificáveis por máquina, um ícone pode ser desenhado a partir de uma descrição, passar pelo validador e ser aprovado na página de comparação. Isso é um processo, não uma ferramenta do DS.

## Consequências

- `svgson` entra como dependência de desenvolvimento para ler os SVGs.
- `npm run icons:build` precisa rodar antes de `registry:build` sempre que um SVG mudar.
- Ícone de destaque usa o `IconTile`, e não um tamanho maior: a escala continua com `size-4`, `size-5` e `size-6`.
