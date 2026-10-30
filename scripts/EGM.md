# scripts

## Overview
Scripts de build e de verificação do design system, executados com `tsx` a partir da raiz do repositório. Eles verificam o contraste dos pares de tokens e mantêm `app/_data/` em sincronia, procuram cores fora de `tokens.css`, geram a escala de acento, montam o `registry.json` do shadcn e servem o `out/` estático para o Playwright. A matemática de cor e a leitura dos tokens ficam em `lib/`, e o pipeline de ícones fica em `icons/`.

## Interface
- `contrast-pairs.ts:PairKind`: `"text" | "large-text" | "ui" | "ramp"`.
- `contrast-pairs.ts:Pair`: `{ fg, bg, kind, usage }`, com nomes de token sem `--mw-`.
- `contrast-pairs.ts:minimum`: razão mínima por tipo de par (`text` 4.5, `large-text` 3, `ui` 3, `ramp` 2).
- `contrast-pairs.ts:pairs`: pares frente/fundo verificados (tinta e acento sobre `ground`, `band` e `surface`, pares sobre `accent-soft`, bordas e foco, `category-1` a `category-8` com `-line` e `-text` (este também sobre `-soft`), `seq-1` a `seq-5` e os estados `danger`, `success`, `warning` e `info`).
- `contrast.ts` (primeiro passo de `npm test`, sem flag; `npm run contrast`, com `--write`): calcula cada par de `pairs` nos temas `dark` e `light` com `lib/tokens.ts:loadTokens` e `lib/color.ts:contrast`, imprime as tabelas e compara `app/_data/contrast.json` e `app/_data/tokens.json` com o resultado.
- `check-colors.ts` (segundo passo de `npm run lint`, depois do `eslint`): procura hex e funções de cor nos `.css` de `app/` e `registry/`, com exceção de `registry/marcio/tokens.css`.
- `accent-scale.ts:accentScale`: escala `accent-50` a `accent-950` gerada em OKLCH a partir de `#ece41f`. Os passos 200, 300 e 700 são fixos (`pinned`). Com `npm run accent-scale`, imprime a escala com o contraste contra preto e branco.
- `build-registry.ts:registryBaseUrl(env?)`: devolve `REGISTRY_URL` sem a barra final, ou `http://localhost:3000`; lança erro quando `BASE_PATH` está definido sem `REGISTRY_URL`.
- `build-registry.ts:registryItemsUrl(env?)`: pasta onde ficam os itens, usada em `registryDependencies` e em `config.registries`. Devolve `REGISTRY_ITEMS_URL` sem a barra final, ou `${registryBaseUrl(env)}/r`.
- `build-registry.ts:packageWithRange(name, path)`: devolve `nome@faixa` com a faixa de `dependencies` do `package.json`; lança erro se o pacote não estiver lá.
- `build-registry.ts:tokensCss()`: converte `registry/marcio/tokens.css` em `{ theme, css }` para o item `marcio-tokens`.
- `build-registry.ts:importSpecifiers(source)`: lista sem repetição os especificadores de `import ... from`, `export ... from`, `import "x"` (só efeito) e `import("x")`, com aspas simples ou duplas. `import type` também entra.
- `build-registry.ts:importsOf(file)`: `importSpecifiers` aplicado ao arquivo lido a partir da raiz.
- `build-registry.ts:dependenciesOf(file | files, { withTokens, self })`: separa dependências npm (`nome@faixa`, com escopo quando houver) de `registryDependencies` (`@/registry/marcio/ui/<x>`, `@/registry/marcio/lib/<x>` e `@/registry/marcio/blocks/<x>/...`). `withTokens` vale `true` por padrão e acrescenta `marcio-tokens`; `self` impede que um bloco dependa de si mesmo. Devolve as duas listas ordenadas.
- `build-registry.ts:buildRegistry()`: monta o registry `marcio` (`homepage` igual à URL base) com `marcio-tokens`, `marcio-tema`, `marcio-strict`, as fontes (`font-bricolage`, `font-plex-sans`, `font-plex-mono`), `utils`, `br`, `mw-tokens`, os itens de `registry/marcio/ui/*.tsx`, os blocos, os ícones (`icon-*`), os pacotes (`icons-*`) e `marcio-ui`. Detalhes:
  - Item de `ui/` usa `name` e `summary` de `app/_docs/catalog-meta.ts:componentMeta` (casado por `slug`) e `categories: [group]`.
  - Arquivo de bloco vira `registry:page` com o `target` de `doc.targets` quando listado ali; senão, `registry:component` com `target` `components/blocks/<bloco>/<arquivo>`.
  - `setupNotes` vira o `docs` dos itens `toast`, `tooltip`, `theme-toggle` e `motion-provider`.
  - `marcio-tokens` leva em `config.registries` a entrada `@marcio` apontando para `${itemsUrl}/{name}.json`.
  - `marcio-strict` publica `registry/marcio/mw-strict.css` (`target` `app/mw-strict.css`) e também `eslint.mw.mjs` e todos os `eslint-rules/*.js` (`lintFiles`), estes com `target` igual ao caminho de origem.
- `build-registry.ts` (execução direta, segundo passo de `npm run registry:build`): grava `registry.json`.
- `serve-out.ts` (`webServer` em `playwright.config.ts`): servidor HTTP estático para `out/`, ou para a pasta de `SERVE_ROOT`.
- `smoke-consumidor.ts` (`npm run smoke`): recebe a URL dos itens, por padrão `http://localhost:4400/r`, e numa pasta temporária cria um app com `create-next-app`, roda `init` e `add` de `marcio-ui`, `marcio-strict` e dos blocos, grava o layout do guia e uma página com `Calendar`, liga `...mw` no ESLint e roda `eslint`, `tsc` e `next build`. Usa as versões de `next` e `shadcn` do repositório. Em falha, mantém a pasta e diz onde ela está.
- `lib/`: [./lib/EGM.md](./lib/EGM.md), com cor (`contrast`, `hexToOklch`, `oklchToHex`, `maxChroma`) e tokens (`loadTokens`, `tokensPath`).
- `icons/`: [./icons/EGM.md](./icons/EGM.md), com `loadPacks`, `componentName`, `validateSvg`, `validatePacks` e `generateFiles`.

## Invariants
- `contrast.ts`: todo `fg` e `bg` de `pairs` precisa existir nos dois temas (`Par com token inexistente`), e todo par precisa atingir `minimum[kind]`.
- `contrast.ts`: sem `--write`, o script não grava nada e falha quando `app/_data/contrast.json` ou `app/_data/tokens.json` não existem ou diferem do resultado (comparação com CRLF normalizado), pedindo `npm run contrast`. Por isso `npm test` falha se os tokens mudarem sem regravar `app/_data/`. Com `--write`, os arquivos são gravados antes da comparação e só os pares reprovados derrubam o script.
- `check-colors.ts:allowed`: o único `.css` de `app/` e `registry/` que pode ter literais de cor (hex, `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `oklch`, `oklab`, `lab`, `lch`) é `registry/marcio/tokens.css`.
- `build-registry.ts:baseUrl` é calculado ao carregar o módulo (`registryBaseUrl()`), então importar `build-registry.ts` com `BASE_PATH` definido e sem `REGISTRY_URL` já lança erro. As URLs dos itens seguem `${baseUrl}/r/<nome>.json` (`itemUrl`).
- `build-registry.ts:dependenciesOf`: todo especificador iniciado em `@/` precisa casar `@/registry/marcio/(ui|lib)/<nome>` ou `@/registry/marcio/blocks/<bloco>/...`; qualquer outro (inclusive `@/registry/marcio/icons/...`) lança `não corresponde a nenhum item do registry`. Imports relativos (`.`) são ignorados.
- `build-registry.ts:ignoredPackages`: `react`, `react-dom` e `next` nunca entram em `dependencies`.
- `build-registry.ts:buildRegistry`: cada `registry/marcio/ui/*.tsx` precisa de uma entrada com o mesmo `slug` em `app/_docs/catalog-meta.ts:componentMeta` (`Componente sem metadados`). Cada diretório de `registry/marcio/blocks/` precisa de uma entrada em `app/_docs/blocks.ts:blocks`, e cada chave de `targets` precisa existir no bloco.
- `build-registry.ts:tokensCss`: `tokens.css` precisa ter `@theme inline`, só com declarações, e `@layer base` com as regras `html` e `body`. Os resets de paleta (`paletteReset` e props terminadas em `-*`) ficam fora de `cssVars.theme`.
- `build-registry.ts:optionalGroups`: os componentes do grupo `movimento` ficam fora de `marcio-ui` e só entram por `add`.
- `build-registry.ts:buildRegistry` lê os arquivos gerados em `registry/marcio/icons/`, por isso `npm run registry:build` roda `icons:build` antes. Ícones só levam `dependencies`; `registryDependencies` de ícone vem apenas de alias.
- `serve-out.ts`: lança erro se `out/` não existir (é preciso rodar `npm run build` antes). Remove os prefixos `../` do caminho pedido e tenta `index.html` e a extensão `.html` antes de responder com `out/404.html`.
- Os scripts resolvem os caminhos a partir de `process.cwd()` (`build-registry.ts:root`, `check-colors.ts:root`, `serve-out.ts:root`, `app/_data` em `contrast.ts` e os caminhos de `icons/`) e precisam rodar na raiz do repositório. Exceção: o `tokens.css` lido por `contrast.ts` vem de `lib/tokens.ts:tokensPath`, resolvido por `import.meta.url`.

## Side Effects
- `contrast.ts`: com `--write`, cria `app/_data/` se preciso e grava `contrast.json` e `tokens.json`. Em qualquer modo, lê esses arquivos e termina com `process.exit(1)` se houver par reprovado ou arquivo desatualizado.
- `check-colors.ts`: lê recursivamente os `.css` de `app/` e `registry/` e termina com `process.exit(1)` se encontrar alguma cor.
- `build-registry.ts`: lê `registry/marcio/tokens.css`, lista `registry/marcio/ui`, `registry/marcio/blocks` e `eslint-rules/` (só os nomes), lê os arquivos de `ui/`, dos blocos, de `registry/marcio/icons/` e `registry/marcio/lib/utils.ts`, `br.ts` e `mw-tokens.ts` (via `importsOf`) e lê `icons/` (via `loadPacks`). Importa `app/_docs/blocks.ts` e `app/_docs/catalog-meta.ts`. Usa as variáveis de ambiente `REGISTRY_URL` e `BASE_PATH`. Na execução direta, grava `registry.json` na raiz.
- `serve-out.ts`: abre um servidor HTTP na porta `PORT` (padrão 4400) servindo `out/`.
- `accent-scale.ts`: só imprime no stdout quando executado diretamente.
- Os efeitos de `lib/` e `icons/` estão descritos nos EGM.md deles.

## Verification
- Run: `npm test`
- Lint de cores: `npm run lint`
- Registry: `npm run registry:build`
- Cobertura: `npm run coverage`
