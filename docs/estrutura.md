# Estrutura do repositório

```
mwds/                              # equivale ao marcio-ui/ do prompt
├── app/
│   ├── layout.tsx                 # fontes, script anti-piscar do tema
│   ├── globals.css                # importa tokens.css e tailwindcss
│   ├── page.tsx                   # visão geral: paleta, tipografia, componentes
│   ├── componentes/[slug]/page.tsx
│   ├── exemplos/
│   │   ├── listagem/page.tsx      # filtros, tabela, paginação, estado vazio
│   │   └── cadastro/page.tsx      # formulário com validação e toast
│   └── _docs/                     # componentes internos do site (preview, tabela de props)
├── registry/
│   └── marcio/
│       ├── tokens.css
│       ├── lib/utils.ts
│       └── ui/
│           ├── kicker.tsx
│           ├── section-title.tsx
│           ├── code-comment.tsx
│           ├── logo-block.tsx
│           ├── dot-grid.tsx
│           ├── typing-text.tsx
│           ├── glitch-text.tsx
│           ├── button.tsx ...     # primitivos, compostos e padrões
│           └── __tests__/         # um arquivo de teste por componente
├── scripts/
│   ├── contrast.ts
│   ├── contrast-pairs.ts
│   ├── accent-scale.ts            # gera a escala do ADR 0004
│   ├── build-registry.ts          # gera o registry.json (ADR 0013)
│   └── check-colors.ts
├── eslint-rules/no-raw-color.js
├── docs/
│   ├── tokens.md
│   ├── estrutura.md
│   └── adr/
├── public/r/                      # saída do shadcn build
├── registry.json
├── components.json
├── vitest.config.ts
├── vitest.setup.ts
└── README.md
```

## Scripts npm previstos

| Script | Faz |
|---|---|
| `dev` / `build` | Site de documentação. `build` gera o registry.json e roda `shadcn build` antes do `next build` |
| `lint` | ESLint com a regra `no-raw-color` e `check-colors` |
| `test` | `contrast` e depois `vitest run` |
| `contrast` | Valida os pares de contraste nos dois temas |
| `registry:build` | `shadcn build` |

## Blocos (Fase 6)

```
registry/marcio/blocks/
├── login/          # page.tsx -> app/login/page.tsx, login-form.tsx
├── not-found/      # not-found.tsx -> app/not-found.tsx, not-found-terminal.tsx
├── admin-shell/    # admin-shell.tsx, usado por dashboard e settings
├── dashboard/      # page.tsx -> app/dashboard/page.tsx, data.ts, metric-card.tsx, recent-activity.tsx
└── settings/       # page.tsx -> app/configuracoes/page.tsx, settings-tabs.tsx
```

Cada pasta vira um item `registry:block`. Os componentes de um bloco são instalados em `components/blocks/<bloco>/`. O site usa os blocos nas mesmas rotas (`app/login`, `app/dashboard`, `app/configuracoes`, `app/not-found.tsx`) e lista todos em `/blocos`. Os testes dos blocos ficam em `app/blocos/blocos.test.tsx`, porque qualquer pasta dentro de `registry/marcio/blocks/` é lida como bloco.

## Lista de componentes

Fase 6 acrescentou: RadioGroup, Avatar, Skeleton (primitivos); Pagination, Popover, Command, Combobox, DropdownMenu, Breadcrumb, Alert, Sheet, Progress (compostos); CommandPalette e AppShell (padrões).

- Identidade: Kicker, SectionTitle, CodeComment, LogoBlock, DotGrid, TypingText, GlitchText
- Primitivos: Button, Input, Textarea, Label, Checkbox, Switch, Badge, Spinner, Link
- Compostos: FormField, Card, Select, Dialog, Toast, Tabs, Table, Tooltip
- Padrões: PageHeader, EmptyState, ThemeToggle

Seleção de texto, foco e o cursor piscando como classe utilitária (`mw-caret`) ficam em `tokens.css` como estilos base, sem componente.
