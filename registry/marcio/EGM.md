# marcio

## Overview
Fonte do registry `@marcio` (design system `@mw/ui`, versão 0.22.x). `scripts/build-registry.ts:buildRegistry` lê esta pasta e gera o `registry.json` da raiz; `shadcn build` publica os itens em `public/r` (os dois rodam em `npm run registry:build`, depois de `npm run icons:build`). Além das subpastas de código, a pasta tem três arquivos CSS e um workflow publicados como itens próprios:
- `tokens.css`: cores, tipografia, foco, seleção e utilitários nos temas escuro e claro. Vira o item `marcio-tokens` (`registry:base`) por `scripts/build-registry.ts:tokensCss`, que exige um bloco `@theme inline` só com declarações e um `@layer base` com `html` e `body`. Todo token novo que gere utilitário Tailwind precisa entrar também no `twMerge` de [`./lib/utils.ts`](./lib/EGM.md) (na 0.20.1 entraram `text-display-2xl`, `tracking-display` e as animações `animate-mw-*`).
- `mw-strict.css`: remove a paleta, raios, sombras e curvas padrão do Tailwind; precisa vir logo depois de `@import "tailwindcss"` e antes dos tokens. Vira o item `marcio-strict` junto com `eslint.mw.mjs` e as regras de `eslint-rules/`.
- `tema.css`: arquivo de personalização do projeto consumidor, item `marcio-tema` (`registry:file`) instalado em `app/tema.css`.
- `versao.yml`: item `marcio-versao` (`registry:file`) instalado em `.github/workflows/mw-versao.yml`. Chama `.github/workflows/verificar-versao.yml@main` deste repositório toda semana.

## Subdirectories & Boundaries
- ui: [./ui/EGM.md](./ui/EGM.md) - 83 componentes `registry:ui` (primitivas Radix, formulários pt-BR, layout, toast, tema e a camada de movimento com motion, GSAP e pixi.js); o grupo `movimento` fica fora do pacote `marcio-ui`.
- lib: [./lib/EGM.md](./lib/EGM.md) - `cn` com `tailwind-merge` estendido, máscaras e validação de CPF/CNPJ/telefone/CEP/datas/BRL, e leitura dos tokens `--mw-*` (`readMwTokens`, `watchMwTokens`, `useMwTokens`).
- icons - pasta gerada por `scripts/icons/generate.ts` (`generatedDir`, pacotes `base` e `medieval`) e apagada a cada `npm run icons:build`, por isso não tem `EGM.md` próprio: um arquivo ali seria apagado na próxima geração. `scripts/build-registry.ts:buildRegistry` publica cada ícone como `registry:component` em `components/icons/<pacote>/` e cada pacote como item `icons-<pacote>`. O contrato da saída está em [`../../scripts/icons/EGM.md`](../../scripts/icons/EGM.md).
- blocks - blocos de página prontos, com dados mock e sem acesso a rede. A pasta não tem `EGM.md` próprio porque `scripts/build-registry.ts:buildRegistry` trata toda entrada de `blocks/` como bloco (`blockDirs`) e `scripts/build-registry.test.ts` compara essa lista com os itens `registry:block`: um arquivo solto ali quebra o `registry:build` e os testes. Cada subpasta vira um item `registry:block` e precisa ter entrada em `app/_docs/blocks.ts`. Dentro de cada bloco só os `.ts`/`.tsx` são publicados (o `EGM.md` do bloco não entra); os arquivos listados em `targets` precisam existir e viram `registry:page`, e os demais vão para `components/blocks/<bloco>/`.
  - admin-shell: [./blocks/admin-shell/EGM.md](./blocks/admin-shell/EGM.md) - casca de painel (`AdminShell`) com sidebar, paleta de comandos, troca de tema e menu do usuário; usada por dashboard, record-detail e settings.
  - dashboard: [./blocks/dashboard/EGM.md](./blocks/dashboard/EGM.md) - painel com métricas, gráfico de horas, atividade recente e prazos.
  - landing: [./blocks/landing/EGM.md](./blocks/landing/EGM.md) - landing page de portfólio com conteúdo de exemplo em `data.ts`, instalada em `app/page.tsx`.
  - login: [./blocks/login/EGM.md](./blocks/login/EGM.md) - formulário de login validado com login de demonstração (`mw-demo-123`).
  - not-found: [./blocks/not-found/EGM.md](./blocks/not-found/EGM.md) - página 404 estilo terminal com a rota atual.
  - record-detail: [./blocks/record-detail/EGM.md](./blocks/record-detail/EGM.md) - detalhe de projeto com timeline e ações de demonstração.
  - settings: [./blocks/settings/EGM.md](./blocks/settings/EGM.md) - abas de perfil, preferências (tema, densidade) e conta.
