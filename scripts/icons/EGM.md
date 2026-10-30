# scripts/icons

## Overview
Pipeline dos ícones autorais. Lê os pacotes em `icons/<pacote>/` (cada um com `pack.json` e arquivos `.svg`), gera um componente React por ícone em `registry/marcio/icons/` e o índice do site em `app/_docs/icons.generated.ts`. A validação dos SVGs contra a grade do lucide fica em `validate.ts`, separada da geração. `scripts/build-registry.ts` reutiliza `loadPacks` e `componentName` para criar os itens `icon-*` e `icons-*` do registry.

## Interface
- `packs.ts:Icon`: `{ name, svg, tags, similar }`.
- `packs.ts:Pack`: `{ name, description, dependsOn, aliases, icons }`.
- `packs.ts:iconsDir`: `"icons"`, caminho relativo ao diretório de trabalho.
- `packs.ts:loadPacks(dir?)`: lê cada subdiretório de `dir` como um pacote (`pack.json` + `.svg`) e ordena pacotes e ícones por nome.
- `packs.ts:componentName(name)`: converte kebab-case em PascalCase (`crossed-swords` vira `CrossedSwords`).
- `validate.ts:validateSvg(source)`: devolve a lista de erros de um SVG (lista vazia significa SVG válido).
- `validate.ts:validatePacks(packs)`: devolve os erros de todos os pacotes (SVG, `dependsOn`, `similar`, aliases e nomes duplicados entre pacotes).
- `validate.ts` (execução direta, `tsx scripts/icons/validate.ts`): valida `loadPacks()` e sai com código 1 se houver erro. Nenhum script de `package.json` chama este arquivo, e `generate.ts` não o importa. A validação só roda de forma automática dentro de `npm test`, pelo teste `scripts/icons/icons.test.ts`, que chama `validatePacks(loadPacks())`.
- `generate.ts:generatedDir`: `"registry/marcio/icons"`.
- `generate.ts:siteIndex`: `"app/_docs/icons.generated.ts"`.
- `generate.ts:generateFiles(packs)`: devolve um mapa de caminho para código-fonte, com um `.tsx` por ícone, um `.tsx` por alias e o índice do site. O índice exporta `iconPacks`, `authoredIcons` e o tipo `AuthoredIcon`, e importa do `lucide-react` só os ícones listados em `similar`.
- `generate.ts` (execução direta, `npm run icons:build`, que também é o primeiro passo de `npm run registry:build`): apaga `generatedDir` e grava os arquivos gerados.

## Saída gerada (`registry/marcio/icons/`)
- A pasta inteira é gerada por `generate.ts:generateFiles` e apagada a cada `npm run icons:build` (`rmSync(generatedDir, { recursive: true, force: true })`). Nenhum arquivo escrito à mão pode morar ali, nem um contrato `EGM.md`: este arquivo é o contrato da saída.
- Pacote `base` (`icons/base/pack.json`, `dependsOn: []`, `aliases: {}`): `coin.tsx` (`Coin`), `crossed-swords.tsx` (`CrossedSwords`) e `shield.tsx` (`Shield`).
- Pacote `medieval` (`icons/medieval/pack.json`, `dependsOn: ["base"]`, `aliases: {}`): `archer.tsx` (`Archer`), `barracks.tsx` (`Barracks`), `castle.tsx` (`Castle`), `farm.tsx` (`Farm`), `food.tsx` (`Food`), `iron.tsx` (`Iron`), `spearman.tsx` (`Spearman`), `stone.tsx` (`Stone`) e `wood.tsx` (`Wood`).
- Nenhum pacote declara aliases hoje, então não há arquivos de alias gerados.
- Cada `.tsx` começa com o comentário `Gerado por scripts/icons/generate.ts ... Não edite à mão.` e exporta um componente criado por `createLucideIcon` do `lucide-react`. Para mudar um ícone, altere o SVG ou o `pack.json` em `icons/<pacote>/` e rode `npm run icons:build`.
- Itens do registry (`scripts/build-registry.ts:buildRegistry`): cada ícone vira `icon-<pacote>-<nome>` (`registry:component`, categoria `icones`, `target` `components/icons/<pacote>/<nome>.tsx`, `dependencies` vindas dos imports do arquivo gerado). Cada pacote vira `icons-<pacote>` (`registry:item`), cujas `registryDependencies` são os ícones do pacote mais os `icons-<dependência>` de `pack.dependsOn`. Um alias, se existir, vira `icon-<pacote>-<alias>`, descrito como descontinuado e dependente do ícone alvo.
- No repositório, `eslint.config.mjs` trata `@/registry/marcio/icons/` como origem de ícones para a regra `mw/icon-size`.

## Invariants
- `packs.ts:loadPacks` lança erro se houver um `.svg` sem entrada no `pack.json`, ou uma entrada do `pack.json` sem o `.svg` correspondente.
- `validate.ts:rootAttributes`: a raiz precisa ser `<svg>` com exatamente `xmlns`, `width="24"`, `height="24"`, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"` e `stroke-linejoin="round"`. Qualquer outro atributo na raiz é erro.
- `validate.ts:geometry`: os filhos só podem ser `path`, `circle`, `rect`, `line` e `polyline`, sem elementos aninhados e apenas com atributos de geometria. Por isso cor fixa e preenchimento ficam proibidos nos filhos.
- `validate.ts:validatePacks`: todo `dependsOn` precisa apontar para um pacote existente, e todo `similar` precisa existir no `icons` do `lucide-react`. Um alias precisa apontar para um ícone do mesmo pacote e não pode ter o nome de um ícone. Um nome de ícone só pode aparecer em um pacote.
- `generate.ts:generateFiles` só gera código e não valida nada; `npm run icons:build` grava SVGs inválidos sem reclamar. Quem barra SVG fora da grade é `validatePacks`, via `npm test`.
- `generate.ts:aliasModule`: aliases são reexportações marcadas com `@deprecated`.
- Os caminhos `iconsDir`, `generatedDir` e `siteIndex` são relativos ao `cwd`, então os scripts precisam rodar a partir da raiz do repositório.

## Side Effects
- `packs.ts:loadPacks` lê `icons/*/pack.json` e `icons/*/*.svg` do disco.
- `generate.ts` (execução direta): faz `rmSync(generatedDir, { recursive: true, force: true })` e depois grava `registry/marcio/icons/<pacote>/*.tsx` e `app/_docs/icons.generated.ts`.
- `validate.ts` (execução direta): escreve os erros em stderr e termina com `process.exit(1)` se houver falha.

## Verification
- Run: `npm test`
- Geração: `npm run icons:build`
