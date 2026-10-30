# Estrutura do repositório

```
mwds/                              # equivale ao marcio-ui/ do prompt
├── app/
│   ├── layout.tsx                 # fontes, script anti-piscar do tema
│   ├── globals.css                # importa tokens.css e tailwindcss
│   ├── page.tsx                   # fundação: monta as seções de _fundacao/
│   ├── fundacao.test.tsx          # cada seção da fundação existe e mostra os dois temas
│   ├── _fundacao/                 # uma seção por arquivo: paleta, tokens, tipografia, espaçamento,
│   │                              # raio, elevação, movimento, camadas, layout, ícones, densidade,
│   │                              # gráficos e contraste
│   ├── _data/                     # tokens.json e contrast.json, gerados por npm run contrast
│   ├── componentes/
│   │   ├── page.tsx               # catálogo
│   │   ├── <slug>/page.tsx        # uma rota por componente, para cada página carregar só o JS dela
│   │   └── cobertura.test.tsx     # todo item do registry.json aparece no site
│   ├── exemplos/
│   │   ├── page.tsx
│   │   ├── listagem/              # filtros, DataTable, paginação, estado vazio
│   │   ├── cadastro/              # formulário com validação e toast
│   │   ├── wizard/                # formulário em etapas com o Stepper
│   │   └── detalhe/page.tsx       # reexporta o bloco record-detail
│   ├── blocos/                    # lista dos blocos do registry e blocos.test.tsx
│   ├── login/, dashboard/, configuracoes/, landing/, not-found.tsx
│   │                              # reexportam os blocos de mesmo nome
│   ├── primeiros-passos/          # instalação do zero; o teste confere cada comando contra o registry
│   ├── escrita/                   # tom, rótulos, mensagens de erro e formatos pt-BR
│   ├── novidades/                 # gerada a partir do CHANGELOG.md
│   ├── icones/                    # pacotes autorais ao lado dos parecidos do lucide
│   └── _docs/                     # componentes internos do site: preview, catálogo (catalog-meta.ts,
│                                  # leve, com nome, grupo e status; catalog/<slug>.tsx, com os exemplos;
│                                  # demos/<demo>.tsx; component-page.tsx), cabeçalho, menu, rodapé, busca (site-command),
│                                  # code-block (com copiar), section (seção numerada, SpecTable,
│                                  # ThemePair), registry-url (URL publicada) e icons.generated.ts
├── registry/
│   └── marcio/
│       ├── tokens.css
│       ├── tema.css               # item marcio-tema: app/tema.css vazio para personalizar tokens
│       ├── versao.yml             # item marcio-versao: workflow do aviso de versão nova (ADR 0029)
│       ├── mw-strict.css          # resets do modo estrito (ADR 0021)
│       ├── icons/<pacote>/        # componentes gerados a partir de icons/ (não editar)
│       ├── lib/
│       │   ├── utils.ts           # cn
│       │   ├── br.ts              # máscaras, formatos e validação de CPF e CNPJ
│       │   └── mw-tokens.ts       # useMwTokens, readMwTokens e useReducedMotionPreference (ADR 0026)
│       ├── blocks/                # ver Blocos abaixo
│       └── ui/
│           ├── kicker.tsx ...     # um arquivo por componente, ver Lista de componentes
│           └── __tests__/         # testes de comportamento e axe, agrupados por fase ou família
├── scripts/
│   ├── contrast.ts
│   ├── contrast-pairs.ts          # pares de token validados em 4,5:1 e 3:1 (ADR 0007)
│   ├── accent-scale.ts            # gera a escala do ADR 0004
│   ├── build-registry.ts          # gera o registry.json (ADR 0013)
│   ├── check-colors.ts            # cores em CSS fora de tokens.css
│   ├── serve-out.ts               # servidor estático do out/ para o Playwright
│   ├── lib/                       # color.ts (hex, OKLCH, contraste) e tokens.ts (leitura do tokens.css)
│   └── icons/                     # packs, validate e generate dos ícones autorais (ADR 0023)
├── icons/<pacote>/                # SVGs autorais e pack.json (base e medieval)
├── eslint.mw.mjs                  # config das regras mw/*, usada pelo repo e publicada no marcio-strict
├── eslint-rules/
│   ├── class-context.js           # detecta strings de classe (className, cn, cva, variáveis *class*)
│   ├── icon-size.js               # ícones do lucide-react e das origens em sources fora de size-4, size-5 e size-6 (ADR 0015)
│   ├── no-raw-color.js
│   ├── no-raw-token.js            # raio, duração, easing, camada, sombra e medidas soltas (ADR 0015)
│   └── no-scene-lib.js            # pixi.js, gsap e @gsap/* só dentro do SceneCanvas e do CharacterStage (ADR 0026)
├── test/
│   ├── a11y.tsx                   # render nos dois temas com axe
│   └── motion.ts                  # mockReducedMotion para o jsdom
├── e2e/                           # Playwright: axe com contraste real e regressão visual
│   └── __screenshots__/           # capturas claro, escuro e móvel, geradas no CI
├── docs/
│   ├── tokens.md
│   ├── estrutura.md
│   └── adr/
├── .github/workflows/
│   ├── pages.yml                  # lint, typecheck, testes, build, e2e e deploy no main
│   └── atualizar-capturas.yml     # regrava as capturas pelo rótulo atualizar-capturas
├── public/r/                      # saída do shadcn build
├── registry.json                  # gerado por build-registry.ts
├── components.json
├── playwright.config.ts
├── vitest.config.ts               # projetos node (scripts, eslint-rules) e dom (registry, app)
├── vitest.setup.ts
├── CHANGELOG.md
└── README.md
```

## Scripts npm

| Script | Faz |
|---|---|
| `dev` | Site de documentação em `http://localhost:3000`, que também serve o registry em `/r` |
| `build` | `registry:build` e depois `next build`, que exporta o site estático para `out/` |
| `registry:build` | `icons:build`, `build-registry.ts` (gera o registry.json) e `shadcn build` |
| `icons:build` | Gera os componentes de `registry/marcio/icons/` e o `app/_docs/icons.generated.ts` a partir de `icons/`; a validação dos SVGs roda no `test` |
| `lint` | ESLint com as regras `no-raw-color`, `no-raw-token`, `icon-size` e `no-scene-lib`, e `check-colors` |
| `typecheck` | TypeScript sem emitir arquivos |
| `test` | `contrast` e depois `vitest run` |
| `contrast` | Valida os pares de contraste nos dois temas |
| `accent-scale` | Mostra a escala do accent gerada em OKLCH |
| `e2e` | Playwright sobre o `out/` do `build` |
| `e2e:update` | Regrava as capturas localmente, só para conferir; as de referência vêm do CI |

## Blocos

```
registry/marcio/blocks/
├── login/          # page.tsx -> app/login/page.tsx, login-form.tsx
├── not-found/      # not-found.tsx -> app/not-found.tsx, not-found-terminal.tsx
├── admin-shell/    # admin-shell.tsx, usado por dashboard, settings e record-detail
├── dashboard/      # page.tsx -> app/dashboard/page.tsx, data.ts, recent-activity.tsx (as métricas usam o StatCard)
├── settings/       # page.tsx -> app/configuracoes/page.tsx, settings-tabs.tsx
├── landing/        # page.tsx -> app/page.tsx, data.ts
└── record-detail/  # page.tsx -> app/projeto/page.tsx, data.ts, record-actions.tsx
```

Cada pasta vira um item `registry:block`. Os componentes de um bloco são instalados em `components/blocks/<bloco>/`. O site usa os blocos em `app/login`, `app/dashboard`, `app/configuracoes`, `app/landing`, `app/exemplos/detalhe` e `app/not-found.tsx`, e lista todos em `/blocos`. Os testes dos blocos ficam em `app/blocos/blocos.test.tsx`, porque qualquer pasta dentro de `registry/marcio/blocks/` é lida como bloco.

## Lista de componentes

Os grupos e os metadados de cada página ficam em `app/_docs/catalog-meta.ts`; exemplos, props e acessibilidade ficam em `app/_docs/catalog/<slug>.tsx`, e a rota em `app/componentes/<slug>/page.tsx`. Página nova entra nos três, e um teste confere que as listas batem.

- Identidade: Kicker, SectionTitle, CodeComment, LogoBlock, DotGrid, TypingText, GlitchText, Heading e Text (em `typography.tsx`)
- Primitivos: Button, IconButton, Input, MaskedInput, CurrencyInput, NumberInput, Textarea, Label, Checkbox, Switch, Badge, Spinner, Link, RadioGroup, Avatar, Skeleton, Separator, ToggleGroup, Slider, Kbd, PasswordInput, SearchInput, ScrollArea
- Compostos: Pagination, Popover, Command, Combobox, DropdownMenu, Breadcrumb, Alert, Sheet, Progress, FormField, Card, Select, Dialog, Accordion, Collapsible, Calendar, DatePicker, DateRangePicker, FileUpload, AlertDialog, Toast, Tabs, Table, DataTable, StatCard, Meter, IconTile, Stepper, FeatureGrid, Tooltip, MultiSelect, ContextMenu, DescriptionList, Timeline, Chart, Tour
- Padrões: CommandPalette, AppShell, Navbar, Hero, Footer, PageHeader, EmptyState, ThemeToggle
- Movimento: MotionProvider, Reveal, Tilt, Magnetic, ScrollProgress, ScrambleText, SceneCanvas, DotField, CharacterStage, CharacterSentinel

Os itens de Movimento ficam fora do `marcio-ui` e só entram por `add` ([ADR 0026](adr/0026-bibliotecas-de-movimento.md)).

Seleção de texto, foco e o cursor piscando como classe utilitária (`mw-caret`) ficam em `tokens.css` como estilos base, sem componente.
