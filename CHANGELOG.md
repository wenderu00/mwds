# Changelog

Todas as mudanças do @mw/ui, da mais nova para a mais antiga. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e a versão segue a [semver](https://semver.org/lang/pt-BR/), com a regra de antes do 1.0 descrita em [docs/adr/0016-versionamento.md](docs/adr/0016-versionamento.md): mudança que quebra compatibilidade sobe a versão do meio e sempre traz como migrar.

Este arquivo também gera a página [Novidades](https://wenderu00.github.io/mwds/novidades/).

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
