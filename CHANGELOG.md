# Changelog

Todas as mudanças do @mw/ui, da mais nova para a mais antiga. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e a versão segue a [semver](https://semver.org/lang/pt-BR/), com a regra de antes do 1.0 descrita em [docs/adr/0016-versionamento.md](docs/adr/0016-versionamento.md): mudança que quebra compatibilidade sobe a versão do meio e sempre traz como migrar.

Este arquivo também gera a página [Novidades](https://wenderu00.github.io/mwds/novidades/).

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
