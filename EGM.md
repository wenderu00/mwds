# @mw/ui Blueprint

## System Overview
Design system `@mw/ui` (v0.20.1), distribuído como registry do shadcn (namespace `@marcio`) e documentado por um site Next.js 16 exportado estaticamente para o GitHub Pages. O código publicado vive em `registry/marcio/`. `scripts/` valida os tokens e monta o `registry.json`. `eslint-rules/` impõe o uso dos tokens a quem consome o DS. `app/` é o site de documentação, que só consome o registry. A visão de produto, a instalação e as decisões ficam no [README.md](./README.md) e nas ADRs em `docs/adr/`; o histórico fica no `CHANGELOG.md`.

Scripts (`package.json:scripts`):
- `dev`: `next dev`.
- `build`: `registry:build` + `next build`.
- `registry:build`: `icons:build` + `tsx scripts/build-registry.ts` (grava `registry.json`) + `shadcn build` (grava `public/r/`, ignorado no git).
- `icons:build`: `tsx scripts/icons/generate.ts`, que lê `icons/<pacote>/` e gera `registry/marcio/icons/` e `app/_docs/icons.generated.ts`.
- `test`: `tsx scripts/contrast.ts` (só verifica) + `vitest run`.
- `contrast`: `tsx scripts/contrast.ts --write`, o único que regrava `app/_data/contrast.json` e `app/_data/tokens.json`.
- `lint`: `eslint` + `tsx scripts/check-colors.ts`.
- `typecheck`: `tsc --noEmit`.
- `coverage`: `vitest run --coverage`.
- `accent-scale`: `tsx scripts/accent-scale.ts` (só imprime).
- `e2e` / `e2e:update`: `playwright test`, este último com `--update-snapshots`.

## Local Interface & Invariants
- `eslint.mw.mjs:mwPlugin`: registra as regras de `eslint-rules/` como `no-raw-color`, `no-raw-token`, `icon-size` e `no-scene-lib`.
- `eslint.mw.mjs:default` (`mw`): config do modo estrito para o projeto consumidor.
  - Vale para `**/*.{js,jsx,ts,tsx}`, ignorando `**/*.test.*` e `eslint-rules/**`.
  - `mw/icon-size` usa `sources: ["lucide-react", "@/components/icons/"]`.
  - `mw/no-scene-lib` fica desligado só em `components/ui/scene-canvas.tsx` e `components/ui/character-stage.tsx`.
  - Este arquivo e `eslint-rules/*.js` são publicados para o consumidor no item `marcio-strict` (`scripts/build-registry.ts:lintFiles`).
- `eslint.config.mjs:default`:
  - Estende `eslint-config-next` (`core-web-vitals` e `typescript`).
  - Aplica `mw/*` como `error` em `app/**/*.{ts,tsx}` e `registry/**/*.{ts,tsx}`, exceto `*.test.*`.
  - `mw/icon-size` usa `sources: ["lucide-react", "@/registry/marcio/icons/"]`.
  - `mw/no-scene-lib` fica desligado só em `registry/marcio/ui/scene-canvas.tsx` e `registry/marcio/ui/character-stage.tsx`.
  - `checkbox.tsx` também aceita `size-3.5`.
  - `globalIgnores`: `.next/**`, `out/**`, `coverage/**`, `public/r/**`, `next-env.d.ts`, `.claude/**`.
- `next.config.ts:nextConfig`: `output: "export"`, `trailingSlash: true` e `basePath` vindo de `BASE_PATH` (vazio localmente). O `basePath` é repassado como `NEXT_PUBLIC_BASE_PATH` para os `src` de `<iframe>`.
- `vitest.config.ts`:
  - Usa `@vitejs/plugin-react` e `globals: true`. O alias `@` aponta para a raiz do repositório e é resolvido por `import.meta.url`.
  - Projeto `node`: `scripts/**/*.test.ts` e `eslint-rules/**/*.test.ts`.
  - Projeto `dom` (jsdom, `testTimeout` de 15 s, `vitest.setup.ts`): `registry/**` e `app/**`.
  - `coverage` (v8): cobre `registry/`, `scripts/`, `eslint-rules/` e `app/`, sem os testes; relatórios `text-summary` e `html`.
- `vitest.setup.ts`:
  - Importa `@testing-library/jest-dom/vitest` e estende `expect` com `vitest-axe/matchers`.
  - Cria stubs de `scrollIntoView`, pointer capture, `HTMLCanvasElement.getContext` (retorna `null`), `IntersectionObserver` e `ResizeObserver`.
  - No `afterEach`, roda `cleanup()` e remove `data-theme` e `data-density` de `<html>`.
- `playwright.config.ts`:
  - Roda contra `out/`, servido por `scripts/serve-out.ts` na porta 4400.
  - Projetos: `escuro`, `claro` e `movel` (só `movel.spec.ts`, 390x844).
  - Usa `reducedMotion: "reduce"` e `maxDiffPixelRatio: 0.01`.
- `postcss.config.mjs`: só `@tailwindcss/postcss`.

## Subdirectories & System Boundaries
- registry: [./registry/EGM.md](./registry/EGM.md) - fonte do registry shadcn:
  - tokens CSS;
  - cerca de 80 componentes `ui`;
  - `lib` (`cn`, formatos pt-BR, `mw-tokens`);
  - pacotes de ícones gerados;
  - sete blocos de página.
- scripts: [./scripts/EGM.md](./scripts/EGM.md) - contraste dos tokens, lint de cores fora de `tokens.css`, escala de acento, `build-registry.ts`, pipeline de ícones e `serve-out.ts`.
- eslint-rules: [./eslint-rules/EGM.md](./eslint-rules/EGM.md) - regras `mw/no-raw-color`, `mw/no-raw-token`, `mw/icon-size` e `mw/no-scene-lib`.
- app: [./app/EGM.md](./app/EGM.md) - site de documentação (App Router, export estático): fundação, catálogo com uma rota por componente, blocos, ícones, exemplos, escrita, primeiros passos e novidades.
- `icons/` (sem contrato, só `pack.json` e `.svg`) - fonte dos ícones autorais, lida por `scripts/icons/packs.ts:loadPacks`.
- `test/` (sem contrato) - apoio aos testes, fora do `include` do Vitest: helpers `a11y.tsx` e `motion.ts`, importados pelos testes de `registry/marcio/ui/__tests__/`, e a declaração de tipos `vitest-axe.d.ts`.
- `e2e/` e `registry/marcio/ui/__tests__/` (só testes, sem contrato):
  - `e2e/`: Playwright (regressão visual e axe);
  - `__tests__/`: testes Vitest.
- `.github/workflows/` (sem contrato):
  - `pages.yml` roda `npm ci`, `lint`, `typecheck`, `test` e `build` com `BASE_PATH=/mwds` e `REGISTRY_URL=https://wenderu00.github.io/mwds`.
  - `atualizar-capturas.yml` atualiza as capturas de regressão visual.

## Global Invariants
- Cor só existe em `registry/marcio/tokens.css`. Isso é garantido por `scripts/check-colors.ts:allowed` (CSS) e por `mw/no-raw-color` / `mw/no-raw-token` (TS/TSX).
- Todo par de `scripts/contrast-pairs.ts:pairs` precisa atingir `minimum[kind]` nos temas escuro e claro.
- `app/_data/contrast.json` e `app/_data/tokens.json` são versionados. `scripts/contrast.ts` sai com código 1 se algum dos dois estiver desatualizado em relação a `tokens.css`, então `npm test` falha até alguém rodar `npm run contrast`.
- Cada `registry/marcio/ui/*.tsx` precisa de uma entrada em `app/_docs/catalog-meta.ts:componentMeta`, e cada bloco precisa de uma entrada em `app/_docs/blocks.ts:blocks`. Caso contrário, `scripts/build-registry.ts:buildRegistry` lança erro.
- Todo import `@/...` de um item publicado precisa corresponder a um item do registry. Caso contrário, `scripts/build-registry.ts:dependenciesOf` lança erro.
- `BASE_PATH` sem `REGISTRY_URL` faz `scripts/build-registry.ts:registryBaseUrl` lançar erro, para o registry publicado não apontar para localhost.
- `pixi.js` e `gsap` só são importados em tempo de execução por `scene-canvas.tsx` e `character-stage.tsx` (`mw/no-scene-lib`). Os itens do grupo `movimento` ficam fora de `marcio-ui` (`scripts/build-registry.ts:optionalGroups`).
- Pastas sem contrato próprio, porque um `EGM.md` ali quebraria o build ou seria apagado:
  - `registry/marcio/icons/` e `app/_docs/icons.generated.ts` são gerados, e `icons:build` apaga `registry/marcio/icons/` inteira antes de regenerar. Os ícones estão documentados em [scripts/icons/EGM.md](./scripts/icons/EGM.md).
  - `registry/marcio/blocks/` aceita só pastas de bloco: `scripts/build-registry.ts:buildRegistry` e `scripts/build-registry.test.ts` tratam cada entrada como um bloco. O índice dos blocos está em [registry/marcio/EGM.md](./registry/marcio/EGM.md).
- `app/` não implementa UI. As rotas de bloco reexportam `default` e `metadata` de `registry/marcio/blocks/*`.
- O site é estático: cada componente tem a sua rota em `app/componentes/<slug>/page.tsx`, e nenhuma página depende de dados de requisição.
- Rode scripts e testes a partir da raiz do repositório. A maioria dos caminhos (as saídas de `scripts/`, `icons/`, `CHANGELOG.md`, `registry.json`) é resolvida por `process.cwd()`. As exceções usam `import.meta.url`: `scripts/lib/tokens.ts:tokensPath` e o alias do `vitest.config.ts`.
- A versão do `package.json` e a primeira versão do `CHANGELOG.md` precisam concordar ([ADR 0016](./docs/adr/0016-versionamento.md)).

## Global Side Effects
- Arquivos gerados:
  - Por `npm run build`: `registry.json`, `public/r/`, `registry/marcio/icons/`, `app/_docs/icons.generated.ts` e `out/`.
  - Por `npm run contrast`: `app/_data/contrast.json` e `app/_data/tokens.json`.
  - Por `npm run coverage`: `coverage/`.
- O build lê `CHANGELOG.md` (`app/novidades/changelog.ts:readChangelog`) e baixa fontes por `next/font/google` (`app/layout.tsx`).
- Variáveis de ambiente:
  - `BASE_PATH` (`next.config.ts` e `scripts/build-registry.ts:registryBaseUrl`), que vira `NEXT_PUBLIC_BASE_PATH` (`app/blocos/page.tsx`);
  - `REGISTRY_URL` (`scripts/build-registry.ts:registryBaseUrl`);
  - `PORT` (`scripts/serve-out.ts`);
  - `CI` (`playwright.config.ts`);
  - `NODE_ENV` (`registry/marcio/ui/app-shell.tsx`, aviso só fora de produção).
- No navegador: `localStorage` (`mw-theme`, `mw-sidebar`), `data-theme` e `data-density` em `<html>`, área de transferência (`CodeBlock`) e canvas WebGL (`SceneCanvas`).

## System Verification
- Run: `npm test`
- Lint: `npm run lint`
- Tipos: `npm run typecheck`
- Build e registry: `npm run build`
- E2E (depois de `npm run build`): `npm run e2e`
