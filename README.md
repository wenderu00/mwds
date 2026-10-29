# @mw/ui

Design system pessoal de Márcio Wendell. Visual de terminal: fundo preto, um único amarelo elétrico (`#ece41f`) como destaque e muito texto monoespaçado. Tema escuro por padrão, tema claro acessível, componentes em React com Tailwind CSS v4 e Radix UI, distribuídos pelo registry do shadcn.

A fonte da verdade da identidade é o portfólio em [wenderu00.github.io](https://wenderu00.github.io).

## Sumário

- [Instalar num projeto novo](#instalar-num-projeto-novo)
- [Como os tokens funcionam](#como-os-tokens-funcionam)
- [Itens do registry](#itens-do-registry)
- [Desenvolver o DS](#desenvolver-o-ds)
- [Publicar o registry](#publicar-o-registry)
- [Versões](#versões)
- [Decisões](#decisões)

## Instalar num projeto novo

O passo a passo completo, testado num projeto criado do zero, está em [Primeiros passos](https://wenderu00.github.io/mwds/primeiros-passos/): requisitos, tokens, tema sem piscar, primeiro componente, primeiro bloco, como atualizar e como aplicar sem o CLI. O tom dos textos, os rótulos, as mensagens de erro e os formatos pt-BR estão em [Escrita](https://wenderu00.github.io/mwds/escrita/).

O essencial são dois comandos. Uma vez por projeto, para criar o `components.json` com o namespace `@marcio`, as fontes, o `cn` e os tokens:

```bash
npx shadcn@latest init https://wenderu00.github.io/mwds/r/marcio-tokens.json
```

Depois, um por componente ou bloco:

```bash
npx shadcn@latest add @marcio/button
```

Não rode `npx shadcn init` sem a URL: o init padrão instala o tema do shadcn, que conflita com os tokens. Todo `add` reescreve os tokens no `globals.css`; personalize num arquivo próprio importado depois dele.

Requisitos: Next.js com App Router, React 19 e Tailwind CSS v4. Projetos em Vite migram para Next antes ([ADR 0025](docs/adr/0025-requisitos-do-consumidor.md)).

### Modo estrito

O `init` não apaga a paleta padrão do Tailwind, para não quebrar projetos existentes. Para seguir o DS à risca, instale o modo estrito:

```bash
npx shadcn@latest add @marcio/marcio-strict
```

Ele cria `app/mw-strict.css`, que zera as cores, raios, sombras e curvas padrão (`bg-red-500` e `rounded-md` deixam de existir), e copia as regras de lint `mw/*` com a config pronta em `eslint.mw.mjs`. Acrescente `...mw` ao `eslint.config.mjs`. Projeto novo roda logo depois do `init`; projeto existente roda no fim da migração, e passar no lint marca a migração como concluída ([ADR 0021](docs/adr/0021-modo-estrito.md)).

### Movimento

Os componentes do grupo Movimento ficam fora do `marcio-ui` e só entram por `add`, porque trazem dependências pesadas ([ADR 0026](docs/adr/0026-bibliotecas-de-movimento.md)):

| Camada | Itens | Dependência |
|---|---|---|
| Interface | `motion-provider`, `reveal`, `tilt`, `magnetic`, `scroll-progress`, `scramble-text` | `motion` |
| Cenas em canvas | `scene-canvas`, `dot-field` | `pixi.js`, carregado sob demanda |
| Personagens | `character-stage`, `character-sentinel` | `gsap`, carregado sob demanda |

As três camadas leem cores e durações do tema pela `mw-tokens` e respeitam o movimento reduzido. Com o modo estrito, `mw/no-scene-lib` barra import de `pixi.js` e `gsap` fora dos palcos: cenas recebem `PIXI` do `SceneCanvas` e personagens recebem `gsap` do `CharacterStage`.

## Como os tokens funcionam

Os componentes só usam tokens semânticos. O valor de cada um muda com o tema:

| Situação | Tema |
|---|---|
| Sem atributo no `<html>` | Segue `prefers-color-scheme`; se o sistema não informar, fica escuro |
| `data-theme="dark"` | Escuro |
| `data-theme="light"` | Claro |

O atributo também funciona em qualquer elemento, para forçar um tema numa parte da página.

Principais classes:

| Grupo | Classes |
|---|---|
| Fundos | `bg-ground`, `bg-band`, `bg-surface` |
| Texto | `text-ink`, `text-ink-soft`, `text-ink-muted` |
| Bordas | `border-line`, `border-line-strong`, `border-line-control` (controles interativos) |
| Accent | `bg-accent` + `text-on-accent` (preenchimento), `text-accent-text` (texto e links), `border-accent-line` (borda acesa), `bg-accent-soft` (seleção) |
| Estados | `bg-{estado}` + `text-on-{estado}`, `bg-{estado}-soft`, `text-{estado}-text` para `danger`, `success`, `warning` e `info` |
| Escala | `bg-accent-50` até `bg-accent-950` |
| Categorias | `category-1` a `category-8`, cada uma com `-line`, `-soft` e `-text`, como `bg-category-2-soft` e `text-category-2-text` |
| Gráficos | `chart-1` a `chart-8` (alias de `category-N-line`, em ordem fixa) e `seq-1` a `seq-5` (sequencial), como `fill-chart-1` e `bg-seq-3` |
| Tipografia | `font-display`, `font-sans`, `font-mono`, `text-display-xl` a `text-display-sm`, `text-lead`, `text-mono-sm`, `text-mono-xs`, `tracking-kicker` |

A regra do amarelo: `#ece41f` é sempre preenchimento com texto preto. Quando precisa ser texto ou linha, use `accent-text` e `accent-line`, que no tema claro viram oliva (`#6e6600`), porque amarelo sobre branco dá 1,3:1.

Todos os pares usados passam WCAG AA nos dois temas. A tabela completa está em [docs/tokens.md](docs/tokens.md) e na página inicial do site de documentação.

## Itens do registry

| Item | Tipo | Conteúdo |
|---|---|---|
| `marcio-tokens` | base | Tokens, fontes e `cn`. Use com `init` |
| `marcio-strict` | item | Modo estrito: zera a paleta padrão do Tailwind e traz as regras de lint `mw/*` |
| `font-bricolage`, `font-plex-sans`, `font-plex-mono` | font | Fontes via `next/font` |
| `utils` | lib | Helper `cn` |
| `br` | lib | Máscaras de CPF, CNPJ, telefone, CEP e moeda; validação de CPF e CNPJ |
| `typography`, `kicker`, `section-title`, `code-comment`, `logo-block`, `dot-grid`, `typing-text`, `glitch-text` | ui | Identidade |
| `button`, `icon-button`, `input`, `masked-input`, `textarea`, `number-input`, `separator`, `toggle-group`, `slider`, `kbd`, `label`, `checkbox`, `switch`, `radio-group`, `badge`, `avatar`, `skeleton`, `spinner`, `link` | ui | Primitivos |
| `form-field`, `card`, `select`, `combobox`, `calendar`, `date-picker`, `file-upload`, `accordion`, `collapsible`, `data-table`, `stat-card`, `meter`, `icon-tile`, `stepper`, `feature-grid`, `command`, `popover`, `dropdown-menu`, `dialog`, `alert-dialog`, `sheet`, `toast`, `alert`, `tabs`, `table`, `pagination`, `breadcrumb`, `progress`, `tooltip`, `tour` | ui | Compostos |
| `page-header`, `empty-state`, `theme-toggle`, `navbar`, `hero`, `footer`, `command-palette`, `app-shell` | ui | Padrões |
| `login`, `not-found`, `dashboard`, `settings`, `landing` | block | Telas prontas (ver abaixo) |
| `admin-shell` | block | Casca de painel usada por `dashboard` e `settings` |
| `icons-base`, `icons-medieval`, `icon-<pacote>-<nome>` | item, component | Ícones autorais, um arquivo por ícone em `components/icons/` (ver [/icones](https://wenderu00.github.io/mwds/icones/)) |
| `marcio-ui` | item | Todos os componentes |

Cada página de componente traz quando usar e quando não usar, exemplos, props, teclado e notas de acessibilidade, além de um selo de status: **estável** (API firme), **beta** (pode mudar sem aviso de migração) ou **experimental** (pode sair). As páginas ficam em [https://wenderu00.github.io/mwds/componentes](https://wenderu00.github.io/mwds/componentes/). Telas completas de sistema estão em [/exemplos](https://wenderu00.github.io/mwds/exemplos/), e os blocos em [/blocos](https://wenderu00.github.io/mwds/blocos/).

### Blocos

Blocos são telas inteiras. Cada um instala a página, os componentes próprios em `components/blocks/<bloco>/` e todos os componentes do DS que usa.

```bash
npx shadcn@latest add @marcio/dashboard
```

| Bloco | Página criada | Observação |
|---|---|---|
| `login` | `app/login/page.tsx` | Passe `onLogin` para o `LoginForm` no lugar da função de demonstração |
| `not-found` | `app/not-found.tsx` | Substitui a página 404 do projeto |
| `dashboard` | `app/dashboard/page.tsx` | Dados de exemplo em `components/blocks/dashboard/data.ts` |
| `settings` | `app/configuracoes/page.tsx` | Perfil, preferências (tema, densidade, fuso, notificações) e conta |
| `landing` | `app/page.tsx` | Página no estilo do portfólio: Navbar, Hero, serviços, stack, projetos e rodapé. Conteúdo em `components/blocks/landing/data.ts` |

Dashboard e Configurações instalam também o `admin-shell`. Edite a lista `navigation` dele com as rotas do seu sistema. Os blocos usam toasts, então o `<Toaster />` precisa estar no layout raiz (ver [Primeiros passos](https://wenderu00.github.io/mwds/primeiros-passos/#tema)).

## Desenvolver o DS

```bash
npm install
```

```bash
npm run dev
```

| Script | Faz |
|---|---|
| `npm run dev` | Site de documentação em `http://localhost:3000`, que também serve o registry em `/r` |
| `npm run build` | Gera o `registry.json`, roda `shadcn build` (saída em `public/r`) e o `next build`, que exporta o site estático para `out/` |
| `npm run registry:build` | Só o registry |
| `npm run lint` | ESLint, com as regras que proíbem cores e valores de forma, movimento e camada fora dos tokens, e a checagem de cores em CSS |
| `npm run test` | Validação de contraste e testes (Vitest, Testing Library e vitest-axe) |
| `npm run contrast` | Tabela de contraste de todos os pares nos dois temas |
| `npm run accent-scale` | Mostra a escala do accent gerada em OKLCH |
| `npm run typecheck` | TypeScript sem emitir arquivos |
| `npm run e2e` | Axe com contraste real e regressão visual (Playwright) em todas as páginas, nos dois temas. Precisa do `out/` do `npm run build` |
| `npm run e2e:update` | Regrava as capturas localmente, só para conferir; as de referência vêm do CI |

Rode `npm run registry:build` em outro terminal depois de mudar algo em `registry/` com o `dev` rodando; o `dev` serve o que estiver em `public/r`.

### Regressão visual

As capturas de referência ficam em `e2e/__screenshots__/` e são geradas no container do Playwright do CI, para a renderização não depender da máquina de quem desenvolve. Quando uma mudança visual for intencional, aplique o rótulo `atualizar-capturas` no PR (ou rode o workflow Atualizar capturas na aba Actions): ele regrava as capturas e faz commit na branch. Se o job qualidade falhar, o relatório com os diffs fica nos artefatos da execução.

### Regras do repositório

- **Cores só em `tokens.css`.** A regra `mw/no-raw-color` reprova hex, `rgb()`, `oklch()`, valores arbitrários como `bg-[#fff]` e classes da paleta padrão como `bg-red-500`.
- **Contraste validado.** `scripts/contrast-pairs.ts` lista cada par de token usado. Um par novo num componente entra na lista; `npm run test` falha se algum ficar abaixo de 4,5:1 (texto) ou 3:1 (bordas de controle e foco).
- **Forma, movimento e camadas só por token.** A regra `mw/no-raw-token` reprova `rounded-xl`, `duration-200`, `ease-out`, `z-50`, `shadow-*` e medidas arbitrárias como `p-[13px]`. Use `rounded-control`, `duration-base`, `ease-standard`, `z-dialog`, `h-control` e `max-w-content` (ADR 0015).
- **Movimento opcional.** Toda animação usa `motion-safe:` ou fica dentro de `prefers-reduced-motion: no-preference`. As durações viram 0,01ms com `reduce`.
- **Ícones do lucide-react**, em `size-4`, `size-5` ou `size-6`, com `aria-hidden` quando são decorativos. A regra `mw/icon-size` reprova outro tamanho no ícone, como `size-12`, `size-3.5`, `w-8 h-8` ou a prop `size={48}`. A única exceção é a marca do Checkbox, liberada no `eslint.config.mjs` só para `checkbox.tsx`.
- **Acessibilidade testada.** Cada componente tem testes de comportamento e de axe nos dois temas.
- **Comentários só como JSDoc da API pública.** Props, tipos e funções exportados podem ter `/** ... */`, que aparece no editor de quem instala. Comentários de linha não entram em `registry/marcio` ([ADR 0027](docs/adr/0027-comentarios-no-codigo.md)).

### Adicionar um componente

1. Crie `registry/marcio/ui/<nome>.tsx` usando só tokens semânticos, aceitando `className` e repassando as props nativas.
2. Escreva os testes em `registry/marcio/ui/__tests__/`.
3. Documente em `app/_docs/catalog.tsx`; a página `/componentes/<nome>` é gerada a partir disso.
4. Rode `npm run registry:build`. O item entra no `registry.json` com as dependências lidas dos imports. O teste `scripts/build-registry.test.ts` falha se o passo 3 ou 4 for esquecido.

## Publicar o registry

O registry é o próprio site de documentação, exportado como site estático e publicado no GitHub Pages em `https://wenderu00.github.io/mwds`. Os itens ficam em `https://wenderu00.github.io/mwds/r/<item>.json`.

O workflow `.github/workflows/pages.yml` publica a cada push na `main` (ou manualmente, pela aba Actions). Ele roda lint, typecheck e testes e depois faz o build com duas variáveis:

- `BASE_PATH=/mwds`: o subcaminho do site no GitHub Pages;
- `REGISTRY_URL=https://wenderu00.github.io/mwds`: a URL final, que entra nas dependências entre itens.

Na primeira vez, ative o Pages em **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Para gerar o mesmo resultado localmente:

```bash
BASE_PATH=/mwds REGISTRY_URL=https://wenderu00.github.io/mwds npm run build
```

O site sai em `out/`. Para publicar em outro host estático, ajuste as duas variáveis (sem `BASE_PATH` se o site ficar na raiz do domínio) e publique a pasta `out/`.

O `registry.json` versionado usa `http://localhost:3000`. Isso não importa para quem instala: os arquivos servidos em `/r` são gerados no build com a `REGISTRY_URL` definida.

## Versões

O @mw/ui segue a semver, com uma versão para tokens, componentes e blocos juntos. Antes do 1.0, mudança que quebra compatibilidade sobe a versão do meio e sempre traz como migrar (ADR 0016). O histórico está no [CHANGELOG.md](CHANGELOG.md) e na página [Novidades](https://wenderu00.github.io/mwds/novidades/).

Todo PR que muda o registry acrescenta a sua entrada no topo do CHANGELOG e sobe a versão no `package.json`; um teste garante que os dois concordam.

## Decisões

As decisões de design e arquitetura estão registradas em [docs/adr/](docs/adr/). As principais:

- [0003](docs/adr/0003-regra-do-amarelo.md): regra do amarelo nos dois temas
- [0006](docs/adr/0006-borda-de-controles.md): token `line-control` para bordas de 3:1
- [0007](docs/adr/0007-validacao-de-contraste.md): contraste validado por script
- [0013](docs/adr/0013-formato-do-registry.md): formato do registry e fluxo de instalação
