# Changelog

Todas as mudanças do @mw/ui, da mais nova para a mais antiga. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e a versão segue a [semver](https://semver.org/lang/pt-BR/), com a regra de antes do 1.0 descrita em [docs/adr/0016-versionamento.md](docs/adr/0016-versionamento.md): mudança que quebra compatibilidade sobe a versão do meio e sempre traz como migrar.

Este arquivo também gera a página [Novidades](https://wenderu00.github.io/mwds/novidades/).

## [0.21.0] - 2026-10-30

### Novo

- Versões fixas: cada versão vira um GitHub Release com os itens do registry, e `init` pela URL do release grava a versão no `components.json` ([ADR 0028](docs/adr/0028-versoes-publicadas.md)).
- DataTable aceita dados do servidor: `rowCount` faz de `data` só a página atual, `loading` marca `aria-busy` e adia o estado vazio, e `column.sortable` mostra o botão de ordenar sem `sortValue`.
- DataTable aceita `paginationLabel`, para dar nomes diferentes à paginação de duas tabelas na mesma página.
- Combobox aceita busca no servidor: `onSearchChange` desliga o filtro local, `loading` e `loadingText` anunciam o carregamento, e a escolha mantém o rótulo quando a lista muda.
- `npm run smoke` instala o registry num app Next novo com o modo estrito e exige lint, tipos e build limpos. Agora roda no CI antes de qualquer deploy.

### Mudou

- Os itens do registry declaram a faixa do `package.json`, como `react-day-picker@^9.14.0`, em vez de só o nome do pacote. Um consumidor novo deixa de receber uma major que o DS não testou.

### Corrigido

- Calendar deixa de quebrar o `next build` em projetos com `cacheComponents`, que o template do Next 16.4 liga por padrão, e deixa de divergir na hidratação quando o dia da visita é outro que o do build. A grade passa a aparecer só no cliente.
- O modo estrito deixa de reprovar o `checkbox.tsx` publicado pelo próprio DS em `mw/icon-size`.
- `npm run dev` volta a compilar. O Tailwind lia os arquivos Markdown e gerava CSS inválido a partir de uma classe citada em `eslint-rules/EGM.md`; agora os `.md` ficam fora da varredura do site.
- O bloco `landing` deixa de quebrar o `next build` em projetos com `cacheComponents`. O ano do rodapé agora vem de `profile.copyright` em `data.ts`, junto com o resto do conteúdo; atualize esse texto quando o ano virar.

## [0.20.1] - 2026-10-29

### Corrigido

- O `cn` passa a reconhecer `text-display-2xl` como tamanho de fonte. Antes, `cn("text-ink", "text-display-2xl")` descartava a cor, e `cn("text-display-2xl", "text-sm")` mantinha as duas classes.
- O `cn` passa a reconhecer `tracking-display` como espaçamento entre letras, e o último valor vence: `cn("tracking-display", "tracking-kicker")` resulta em `tracking-kicker`.
- O `cn` passa a reconhecer as animações `animate-mw-*`, e a última animação vence: `cn("animate-mw-pulse", "animate-none")` resulta em `animate-none`.

## [0.20.0] - 2026-10-29

### Novo

- Token `tracking-display` (-0.02em), usado pelo LogoBlock no lugar de `tracking-[-0.02em]`.
- DataTable aceita `defaultPage` e `defaultSelected` para escolher a página e a seleção iniciais sem controlar.
- Tour aceita `defaultOpen` e funciona sem `open`; `onOpenChange` passa a ser opcional.
- Tipos exportados `BreadcrumbLinkProps`, `BreadcrumbTrailProps` e `ToggleGroupSize`.
- `npm run contrast` verifica mais 20 pares: `ink-soft` sobre `accent-soft` (linha selecionada da Table), `ink` sobre `line` (remover do MultiSelect em hover) e o texto de cada categoria sobre `band`.
- A leitura dos tokens falha quando um token existe só no tema claro, além do caso inverso que já era verificado.

### Mudou

- ScrollProgress usa `accent-line`, como Progress e Meter: oliva no tema claro, onde o amarelo ficava com 1,3:1.
- Navbar, LogoBlock md e o item da AppShell seguem a densidade com `h-control` (o item da AppShell passa de 40px para 44px na densidade normal). As linhas da DescriptionList horizontal usam `py-cell-y`.
- Stepper concluído e o polegar do Slider contornam o amarelo com `accent-edge`, como pede o [ADR 0017](docs/adr/0017-contorno-do-accent.md). Hoje os valores são iguais aos de `accent-line`.
- Spinner lg usa `border-3` no lugar de `border-[3px]`.
- `docs/tokens.md` documenta `text-display-2xl`, o tracking do `display-sm`, `--mw-distance-*` e `--mw-stagger`.

### Quebra compatibilidade

- SectionTitle segue a escala `sm | md | lg` com padrão `md` ([ADR 0018](docs/adr/0018-api-congelada.md)). Sem `size`, o título passa de `display-lg` para `display-md`. O novo `sm` usa `display-sm`.
- Pagination passa o padrão de `sm` para `md` (botões de 44px na densidade normal) e ganha `lg`. A do DataTable continua `sm`.
- Meter troca `size="compact"` por `size="sm"`. `compact` continua aceito até a 0.21.
- Itens de DropdownMenu e ContextMenu ganham `tone="danger"`, e `data-tone` no item. `variant="danger"` continua aceito até a 0.21.
- O modo estrito ficou mais rígido.
  - `mw/no-raw-color` reprova as classes da escala primitiva do accent, como `bg-accent-500`.
  - `mw/no-raw-token` reprova `min-w`, `min-h` e `max-h` com medida em px ou rem entre colchetes, `border-[3px]` e `tracking-[...]`.
  - As duas regras passam a ler também os mapas de classes cujo nome termina em `Sizes`, `Heights` ou `Tones`, além de `Classes`.

**Como migrar**

Rode o lint e troque cada valor solto por um token ou pela escala do Tailwind, que não usa colchetes:

```tsx
<Table className="min-w-160" />
<span className="border-3 tracking-display" />
<div className="bg-accent-soft text-accent-text" />
```

Para manter o visual de antes, passe o tamanho que era o padrão e troque os nomes descontinuados:

```tsx
<SectionTitle size="lg" index="01">Quem sou eu?</SectionTitle>
<Pagination size="sm" page={page} pageCount={pageCount} onPageChange={setPage} />
<Meter size="sm" label="Ouro" value={1234} max={5000} icon={<Coins />} />
<DropdownMenuItem tone="danger">Excluir</DropdownMenuItem>
```

## [0.19.3] - 2026-10-29

### Corrigido

- Tour: fechado, não escuta mais rolagem e redimensionamento da página. Aberto, os listeners são passivos.

### Mudou

- Site de documentação carrega cerca de metade do JavaScript por página (de 1,5 MB para 730 KB sem compressão na maioria delas).
  - Cabeçalho, rodapé, índice de componentes e Novidades leem os metadados de `app/_docs/catalog-meta.ts`, sem importar os exemplos.
  - O catálogo virou um arquivo por componente em `app/_docs/catalog/`, e as demos, um arquivo por demo em `app/_docs/demos/`.
  - Cada componente tem a sua rota em `app/componentes/<slug>/page.tsx`, no lugar da rota `[slug]`, para a página carregar só o JavaScript dos próprios exemplos. A do Chart continua levando o Recharts.

## [0.19.2] - 2026-10-29

### Corrigido

- Bloco `login`: o leitor de tela não lê mais o `// ` do texto digitado. A animação continua igual e o texto acessível fica num trecho só para leitor de tela.
- O `registry.json` passa a declarar as dependências de imports com aspas simples, `export ... from` e `import()`. Antes, `gsap` e `pixi.js` só entravam por causa das linhas `import type`.

### Mudou

- EmptyState e o bloco `not-found` usam o CodeComment para o prefixo `// `. O `empty-state` e o `not-found` passam a instalar o `code-comment`.
- Tour usa `prefersReducedMotion` da `mw-tokens` para decidir a rolagem suave e passa a instalar a `mw-tokens`.
- O build do registry falha quando um import `@/` não corresponde a nenhum item e quando `BASE_PATH` está definido sem `REGISTRY_URL`.
- `npm test` só verifica se `app/_data/contrast.json` e `tokens.json` estão em dia; `npm run contrast` regrava os dois.
- Novo `npm run coverage`, com o relatório de cobertura do Vitest em `coverage/`.
- Testes de unidade dos blocos `admin-shell` e `record-detail`, e teste e2e da página 404.
- No CI, o job de qualidade fixa o Node 22 com cache, e a atualização de capturas roda lint e typecheck antes.
- README lista todos os itens do registry, o bloco `record-detail` e mais ADRs entre as decisões principais.
- Dependências atualizadas dentro das faixas: `lucide-react` 1.64. `postcss` entrou nas devDependencies, já que o build do registry o importa.

## [0.19.1] - 2026-10-28

### Mudou

- Comentários no código seguem o [ADR 0027](docs/adr/0027-comentarios-no-codigo.md): só JSDoc na API pública. `matchesAccept`, `FileUploadStatus`, `parseNumber`, `controlHeights`, `triggerClasses`, as funções de `br`, a prop `as` do AppShellMain e as props do Navbar ganharam JSDoc, que aparece no editor. Os comentários internos saíram dos componentes, sem mudar comportamento.
- Dependências atualizadas dentro das faixas: `lucide-react` 1.63, `react-hook-form` 7.91, `shadcn` 4.23 e `@axe-core/playwright` 4.14.

### Corrigido

- O link do LogoBlock nos blocos landing, login, not-found e admin-shell tem nome acessível que começa pelo texto visível ("MW, página inicial"), como pede o critério 2.5.3 da WCAG. O axe-core 4.14 passou a apontar a diferença.

## [0.19.0] - 2026-10-27

### Novo

- Camada 3b do sistema de movimento, com GSAP ([ADR 0026](docs/adr/0026-bibliotecas-de-movimento.md)).
- CharacterStage: palco SVG para personagens.
  - Carrega o `gsap` e os plugins pedidos (`drawSVG`, `morphSVG`) por `import()`.
  - Roda a animação dentro de `gsap.matchMedia`, passando `gsap`, `part`, `tokens` e `reduced`.
  - Reverte tudo ao desmontar e ao trocar `replay`.
- Sentinel: personagem de exemplo com as partes padronizadas (`corpo`, `olhos`, `braco-esq`, `braco-dir`, `perna-esq`, `perna-dir`) e as poses `idle`, `celebrar` e `duvida`. Com movimento reduzido, só troca cor e opacidade.
- Regra `mw/no-scene-lib`, no modo estrito: reprova import em runtime de `pixi.js`, `gsap` e `@gsap/*` fora do SceneCanvas e do CharacterStage. `import type` continua liberado.
- Primeiros passos e README explicam como instalar os itens de movimento.

### Mudou

- As páginas dos componentes de movimento não dizem mais que repassam as props nativas e a ref: a API deles é fechada.

## [0.18.0] - 2026-10-27

### Novo

- Camada 3a do sistema de movimento, com PixiJS ([ADR 0026](docs/adr/0026-bibliotecas-de-movimento.md)).
- SceneCanvas: palco de cenas em canvas.
  - Carrega o `pixi.js` por `import()` quando a página fica ociosa.
  - Limita o DPR a 2 e pausa fora da tela e com a aba oculta.
  - Entrega `tokens` à cena e chama `theme()` quando o tema muda.
  - Mostra o `fallback` até ficar pronto, sem WebGL, com movimento reduzido e quando outra cena já ocupa a página. Só uma cena por página roda.
- DotField: grade de pontos que foge do mouse e ondula no clique, na cor `accent` ou de uma categoria. Mostra o DotGrid como fallback.

## [0.17.0] - 2026-10-27

### Novo

- Grupo Movimento no catálogo, com a camada 2 do sistema de movimento sobre o Motion ([ADR 0026](docs/adr/0026-bibliotecas-de-movimento.md)). Os itens ficam fora do `marcio-ui` e entram só por `add`, para quem não usa não baixar o `motion`.
- `mw-tokens`: `useMwTokens` e `readMwTokens` entregam as cores (como string e como número para o Pixi), durações, curvas, distâncias e stagger do tema atual, e atualizam na troca de tema. `useReducedMotionPreference` acompanha a preferência de movimento.
- MotionProvider: `MotionConfig` com `reducedMotion="user"` e a transição padrão dos tokens, para os `motion.*` do projeto.
- Reveal: sobe e aparece ao entrar na tela, uma vez, com stagger por `index`.
- Tilt: inclinação 3D que segue o mouse, até 6 graus.
- Magnetic: puxa o filho na direção do mouse.
- ScrollProgress: barra em accent que cresce com a rolagem.
- ScrambleText: texto que embaralha em glifos e assenta letra a letra, com o texto final sempre disponível para o leitor de tela.

Todos respeitam o movimento reduzido sozinhos, mesmo sem o MotionProvider.

## [0.16.0] - 2026-10-26

### Novo

- Modo estrito, item `marcio-strict`: cria `app/mw-strict.css`, que zera as cores, raios, sombras e curvas padrão do Tailwind e é importado logo depois do tailwindcss, e copia as regras `mw/*` com a config pronta em `eslint.mw.mjs`. Projeto novo roda logo depois do init; projeto existente, no fim da migração ([ADR 0021](docs/adr/0021-modo-estrito.md)).
- Tokens de categoria `category-1` a `category-8`, cada um com `-line` (barra, borda e ícone, 3:1), `-soft` (fundo) e `-text` (texto, 4.5:1 sobre as superfícies e o próprio fundo), validados nos dois temas ([ADR 0022](docs/adr/0022-tokens-de-categoria.md)).
- Meter: medidor compacto de recurso com ícone, valor e máximo em pt-BR, taxa em linha e barra fina. `highlightKey` faz o valor piscar uma vez em accent-soft quando um evento muda o valor.
- IconTile: ícone de destaque em size-10 ou size-12, sobre `category-N-soft` ou surface, com o ícone em size-6.
- CardAction: o link ou botão no título do card que estica a área clicável sobre o card inteiro.
- AppShell: `mobileNav="bottom"` mostra os mesmos itens da sidebar como abas no rodapé do celular (de 3 a 5 itens; fora disso volta para o Sheet e avisa no console), `sidebarBreakpoint` escolhe entre md e lg, e `AppShellAside` é um painel à direita a partir de lg que vai para baixo do conteúdo no celular.
- Progress: `valueText` mostra e anuncia um texto, como um tempo restante, no lugar da porcentagem.
- Camada 1 do sistema de movimento: `animate-mw-flash` (destaque de evento), `animate-mw-shift` (deslocamento), `--mw-distance-sm/md/lg`, `--mw-stagger` e a utility `mw-stagger` ([ADR 0024](docs/adr/0024-sistema-de-movimento.md)).
- Pacotes de ícones autorais `icons-base` e `icons-medieval`, na especificação do lucide, com validador, gerador, um item por ícone e a página Ícones para comparar com o lucide ([ADR 0023](docs/adr/0023-pacotes-de-icones.md)).
- Token `text-display-2xl` para o número da página 404.
- `mw/icon-size` aceita a opção `sources` com outras origens de ícone além do `lucide-react`.

### Mudou

- O cabeçalho do AppShell passa de `h-16` para `min-h-16` e cresce com o conteúdo em vez de cortar.
- Avatar `sm`: as iniciais passam de 11px para `text-mono-xs` (13px).
- Card passa a ter `position: relative`, para o CardAction.
- Primeiros passos: o init não apaga mais a paleta do Tailwind, como a página dizia. A nova seção Modo estrito explica quando apagar. Os requisitos dizem que Next com App Router e React 19 são obrigatórios ([ADR 0025](docs/adr/0025-requisitos-do-consumidor.md)).

### Quebra compatibilidade

- A paleta de gráficos muda de ordem: `chart-N` passa a ser `category-N-line`, na ordem azul, verde, magenta, laranja, turquesa, violeta, amarelo e vermelho. A série 1 deixa de ser amarela e passa a ser azul.
- `mw/no-raw-token` passa a reprovar `text-[...]` e `w-[...]` ou `h-[...]` com medida em px ou rem.

**Como migrar**

```bash
npx shadcn@latest add @marcio/chart --overwrite
```

O `add` também reescreve os tokens no `globals.css`. Se um gráfico dependia da cor de uma série, troque pela categoria nova da mesma cor:

```tsx
// antes: a série 1 era amarela
<div className="bg-chart-1" />
// depois: amarelo é a categoria 7
<div className="bg-category-7-line" />
```

Para o lint, troque o valor solto por um token da escala:

```tsx
// antes
<span className="h-[560px] text-[11px]" />
// depois
<span className="h-140 text-mono-xs" />
```

## [0.15.0] - 2026-10-25

### Novo

- Regra de lint `mw/icon-size`: um ícone do `lucide-react` só aceita `size-4`, `size-5` ou `size-6`. Ela reprova `size-12`, `size-3.5`, `w-8 h-8` e as props `size`, `width` e `height`. A única exceção é a marca do Checkbox, com 14px ([ADR 0015](docs/adr/0015-tokens-de-fundacao.md)).

### Mudou

- DataTable: o ícone de ordenação passa de 14 para 16px.
- FileUpload: o ícone de envio concluído passa de 14 para 16px.

### Corrigido

- MultiSelect: a marca da opção escolhida saía com 16px dentro de uma caixa de 16px com borda e vazava. A caixa passa a 20px, como a do Checkbox, e a marca fica em 16px.

## [0.14.0] - 2026-10-25

### Mudou

- Navbar: a prop `collapseBelow` (`"md"` ou `"lg"`, padrão `"md"`) escolhe abaixo de que largura os links vão para o painel. Com `"lg"`, cabeçalhos com links e várias ações não estouram no tablet.

## [0.13.0] - 2026-10-24

### Novo

- Tour: onboarding em passos com recorte em volta do alvo, balão ancorado sobre o Popover, contador e os botões Pular, Voltar e Avançar (Entendi no último passo). Diálogo modal com foco preso, Esc para pular, foco devolvido ao fechar e cada passo anunciado ([ADR 0020](docs/adr/0020-tour-sobre-o-popover.md)).

## [0.12.0] - 2026-10-24

### Novo

- Chart: barras, linha e área sobre o Recharts, nas paletas `chart-1` a `chart-8` e `seq-1` a `seq-5`, com legenda em texto e tabela dos dados ([ADR 0019](docs/adr/0019-grafico-sobre-recharts.md)).
- Bloco `record-detail`: tela de detalhe com DescriptionList, Timeline e arquivamento confirmado, com rota `/exemplos/detalhe` no site.
- Exemplo de cadastro em etapas, com Stepper, validação por etapa, foco no título da etapa nova e revisão antes de enviar.
- Testes em largura de celular (390px) para painel, listagem, detalhe e cadastro em etapas, com axe, sem rolagem horizontal e com o menu do AppShell aberto.

### Mudou

- O bloco `dashboard` ganha o gráfico de horas por semana, e as seções seguintes passam a 02 e 03.
- A seção Gráficos da fundação usa o Chart; o gráfico feito à mão saiu.

## [0.11.0] - 2026-10-24

### Novo

- PasswordInput: campo de senha com botão de mostrar e ocultar (`aria-pressed`), sobre o slot `end` do Input.
- SearchInput: busca com lupa, botão de limpar e Esc para limpar.
- MultiSelect: várias escolhas com busca, chips removíveis e Backspace para tirar a última, a partir do Combobox.
- DescriptionList: pares de rótulo e valor em pilha, colunas ou linhas, com `dl`, `dt` e `dd`.
- Timeline: histórico e trâmite de processos, com passo atual, tons e datas em `time`.
- ScrollArea: rolagem com barra nos tokens, focável pelo teclado.
- ContextMenu: menu do botão direito com os itens e estilos do DropdownMenu.

### Mudou

- O bloco `login` usa o PasswordInput, e a listagem de exemplo, o SearchInput.
- DropdownMenu exporta `menuContentClasses` e `menuItemClasses`, usadas também pelo ContextMenu.

## [0.10.0] - 2026-10-24

### Novo

- `size` (`sm`, `md`, `lg`) em Input, SelectTrigger, Combobox, DatePicker, DateRangePicker e NumberInput, com as mesmas alturas do Button. A densidade mostra campo e botão lado a lado.
- Input com slots `start` e `end`, dentro do contorno: ícone, prefixo ou botão. O `className` continua indo para o input.
- `size` em DialogContent e AlertDialogContent.
- Item `marcio-tema`, que cria `app/tema.css` para personalizar tokens sem perder as mudanças no próximo add.
- [ADR 0018](docs/adr/0018-api-congelada.md): convenções de size, variant, tone, erro e loading, e a lista de APIs congeladas até o 2.0.

### Mudou

- Switch e as opções do RadioGroup mostram a borda de erro com `aria-invalid`.
- O erro próprio do DatePicker é anunciado (`role="alert"`), e os botões dele ficam no slot de fim do Input.
- Select, Combobox e DateRangePicker usam as classes de gatilho exportadas pelo Input.
- Typography, Separator, Kbd, Accordion, Collapsible e Calendar passam a estáveis.
- O 1.0 sai com a API dos primitivos congelada e uso real em produção, não mais quando todos os componentes forem estáveis (ADR 0016 revisado).

### Quebra compatibilidade

- `size` em Input e NumberInput deixa de ser o atributo nativo de largura em caracteres e passa a ser a altura (`sm`, `md`, `lg`).
- CurrencyInput mostra o R$ no slot de início: o texto do campo passa de `R$ 1.234,56` para `1.234,56`. O valor entregue continua em centavos.

**Como migrar**

```bash
npx shadcn@latest add @marcio/input @marcio/masked-input @marcio/number-input --overwrite
```

```tsx
// antes: largura pelo atributo nativo
<Input size={20} />
// depois: largura por classe
<Input className="w-48" />
```

Testes que liam o texto do CurrencyInput passam a esperar o número sem o R$.

## [0.9.1] - 2026-10-24

### Novo

- CurrencyInput e DateRangePicker ganham página própria no catálogo e entrada na barra lateral. Continuam instalados por `@marcio/masked-input` e `@marcio/date-picker`.
- Teste no CI que percorre o site e falha se algum link interno não responder 200.
- Teste que confere se todo item do `registry.json` tem página no catálogo ou em Blocos, e se a barra lateral lista todas as páginas.

### Corrigido

- Os links para arquivos do repositório em Novidades, como o do ADR 0017, abrem o arquivo no GitHub em vez de dar 404.
- O rodapé conta componentes instaláveis, não páginas do catálogo.

## [0.9.0] - 2026-10-24

### Novo

- Cada página de componente mostra o comando `npx shadcn@latest add @marcio/<nome>` e as dependências, lidos do `registry.json`.
- Exemplos certo e errado lado a lado em Button, Link, RadioGroup, Switch, Alert e GlitchText.
- FileUpload: progresso, envio concluído e erro por arquivo, com `fileStatus`, `onRetry` e o botão Enviar de novo.
- Token `accent-edge` e o [ADR 0017](docs/adr/0017-contorno-do-accent.md): todo preenchimento amarelo que marca estado tem contorno de 1px, oliva no tema claro.
- `npm run contrast` verifica `accent-edge` sobre ground, band e surface, com mínimo de 3:1.
- Lib `br`: `formatDateInput` e `parseDateBR`, para datas em dd/mm/aaaa.
- Novidades em tabela: resumo das versões e, em cada versão, tipo, componente e mudança.
- Rodapé do site com a versão atual e o link para Novidades.
- Primeiros passos explica o `@theme inline` do Tailwind v4; Layout documenta os pontos de corte de AppShell e Navbar; Escrita ganha a regra de navegação e rótulos.

### Mudou

- Button primary, Checkbox, Radio e Switch marcados, a página atual da Pagination e o dia selecionado do Calendar ganham borda em `accent-edge`. No escuro nada muda na tela.
- Quando usar: os blocos passam a se chamar use quando e prefira outro quando.

### Quebra compatibilidade

- DatePicker: o campo deixa de ser um botão com `role="combobox"` e vira um campo de texto com máscara dd/mm/aaaa, ao lado de um botão Abrir calendário. A data digitada é validada: inexistente, incompleta ou fora de `fromDate` e `toDate` marca o campo como inválido e devolve `null`. As props passam a ser as de `input`, e `placeholder` aceita só texto. O DateRangePicker não muda.

**Como migrar**

```bash
npx shadcn@latest add @marcio/date-picker --overwrite
```

```tsx
// antes, nos testes
screen.getByRole("combobox", { name: "Vencimento" });
// depois
screen.getByRole("textbox", { name: "Vencimento" });
screen.getByRole("button", { name: "Abrir calendário" });
```

Se você passava um `ReactNode` em `placeholder`, troque por texto.

## [0.8.0] - 2026-10-24

### Novo

- Navbar: marca, links com `aria-current`, ações e painel lateral no celular.
- Hero: kicker, título em display-xl, descrição, linha digitando e ações, sobre a DotGrid.
- Footer: chamada de contato, grupos de links rotulados, copyright em CodeComment e voltar ao topo.
- FeatureGrid: grade de recursos em cards com ícone e índice em mono.
- Bloco `landing`, no estilo do portfólio, com rota `/landing` no site. Instala em `app/page.tsx`; o conteúdo fica em `components/blocks/landing/data.ts`.

## [0.7.0] - 2026-10-24

### Novo

- Axe com contraste real e regressão visual com Playwright em todas as páginas de componente e do site, nos dois temas, no job qualidade do CI. O deploy depende dele.
- Workflow Atualizar capturas, disparado pelo rótulo `atualizar-capturas` no PR ou pela aba Actions.
- `AppShellMain` aceita `as="div"` para quando o AppShell fica dentro de outro `main`.
- O `aria-label` do Calendar também nomeia a barra de navegação.

### Mudou

- O gatilho do DatePicker e do DateRangePicker passa a ter `role="combobox"`, como o Select, porque um botão não aceita `aria-required`. Testes que buscavam o gatilho por `getByRole("button")` passam a usar `getByRole("combobox")`.
- `Table`: o contêiner com rolagem horizontal entra no Tab, para quem usa teclado conseguir rolar a tabela.

### Corrigido

- `CommandSeparator` fica escondido do leitor de tela; antes era um `separator` dentro do `listbox`.
- Bloco `login`: o painel de marca vira `aside` rotulado, e nada fica fora de landmark.
- O CI roda também nos PRs, e os testes de axe de página inteira têm tempo próprio.

## [0.6.0] - 2026-10-24

### Novo

- `CHANGELOG.md` com o histórico desde a primeira versão, reconstruído a partir dos PRs.
- Página Novidades no site, gerada a partir deste arquivo.
- Política de versão no ADR 0016: o que sobe cada parte da versão e quando chega o 1.0.

### Mudou

- `package.json` passa de 0.1.0, que nunca tinha mudado, para 0.6.0.
- A versão atual aparece na página de fundação e no menu do site.

## [0.5.0] - 2026-10-24

### Novo

- Paleta categórica de gráficos `chart-1` a `chart-8`, em ordem fixa, validada para daltonismo nos dois temas.
- Paleta sequencial `seq-1` a `seq-5` sobre a escala do accent.
- Seção Gráficos na fundação, com exemplos de barras e linha, legenda, tooltip e tabela com os dados.
- Página Escrita: kicker, comentário, botões, erros, estados vazios, confirmações, formatos pt-BR e pontuação.

### Mudou

- `npm run contrast` ganha o tipo de par `ramp`, com mínimo de 2:1, para a rampa sequencial.

## [0.4.0] - 2026-10-24

### Novo

- Quando usar, tabela de teclado e selo de status (estável, beta, experimental) em todas as páginas de componente.
- Separator, ToggleGroup, Slider, Kbd, Accordion, Collapsible, Heading e Text.
- DataTable, StatCard, Stepper e NumberInput.

### Mudou

- A listagem de exemplo usa o DataTable e ordena clicando nos cabeçalhos; o select Ordenar por saiu.
- O gatilho do CommandPalette usa o Kbd.

### Quebra compatibilidade

- O bloco `dashboard` não tem mais `metric-card.tsx`. As métricas usam o componente `StatCard`, que recebe os campos da métrica como props.

**Como migrar**

```bash
npx shadcn@latest add @marcio/stat-card
```

```tsx
// antes
<MetricCard metric={metric} />
// depois
<StatCard {...metric} />
```

Depois apague `components/blocks/dashboard/metric-card.tsx`.

## [0.3.0] - 2026-10-23

### Novo

- Página Primeiros passos, do create-next-app ao primeiro bloco.
- AlertDialog e IconButton.
- Calendar, DatePicker e DateRangePicker em português, com semana começando no domingo.
- MaskedInput (CPF, CNPJ, telefone e CEP), CurrencyInput e a lib `br`, com validação de CPF e CNPJ.
- FileUpload com arrastar e soltar, limites de tipo, tamanho e quantidade.
- Tokens `--mw-duration-type`, `--mw-duration-glitch` e `--mw-duration-drift`.

### Mudou

- Os botões só de ícone de Dialog, Sheet, Alert, Toast e AppShell passam a usar o IconButton.
- O bloco `settings` confirma a exclusão de conta com AlertDialog.
- O TypingText só define `--mw-type-duration` quando recebe a prop `duration`.

**Como atualizar**

Os componentes que agora usam o IconButton dependem dele no registry, e o CLI o instala junto. Se você copiou os arquivos à mão, instale também:

```bash
npx shadcn@latest add @marcio/icon-button
```

### Corrigido

- As prévias de blocos no GitHub Pages davam 404.

## [0.2.0] - 2026-10-23

### Novo

- Tokens de fundação: espaçamento, raio (`rounded-mark`, `rounded-control`, `rounded-card`), elevação por borda com `bg-scrim`, movimento (`duration-fast`, `duration-base`, `duration-slow` e três curvas), camadas (`z-sticky` a `z-tooltip`), layout (`max-w-content`, `max-w-measure`), ícones e densidade (`data-density`).
- Seções de cada token na página de fundação.
- Regra de lint `mw/no-raw-token`, que barra raio, duração, camada e sombra fora dos tokens.

### Corrigido

- O cabeçalho do site rolava na horizontal em telas estreitas.

### Quebra compatibilidade

- Os componentes passam a usar classes que só existem com os tokens novos: `rounded-control`, `z-dialog`, `duration-base`, `h-control` e outras. Um componente atualizado num projeto com os tokens antigos perde raio, camada e altura.

**Como migrar**

Atualize os tokens antes de qualquer componente:

```bash
npx shadcn@latest add @marcio/marcio-tokens --overwrite
```

Se você personalizou o `globals.css`, repita as personalizações num arquivo próprio importado depois dele. Componentes de terceiros com `z-50` ficam acima do Dialog do @mw/ui (30): troque pela camada nomeada correspondente.

## [0.1.0] - 2026-10-23

### Novo

- Tokens em `tokens.css` nos temas escuro e claro, com accent em OKLCH a partir de #ece41f e contraste WCAG AA verificado por `npm run contrast`.
- 41 componentes em quatro grupos: identidade, primitivos, compostos e padrões.
- Blocos login, 404, dashboard, configurações e admin-shell.
- Registry do shadcn com o namespace `@marcio`.
- Site de documentação com fundação, componentes, exemplos e blocos, publicado no GitHub Pages.
