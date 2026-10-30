# Catálogo de componentes

## Overview
Conteúdo das páginas `/componentes/<slug>`: um arquivo por componente documentado, cada um exportando um `ComponentDoc` (uso, certo e errado, props, exemplos renderizados nos dois temas, acessibilidade e teclado). Os metadados leves (nome, grupo, resumo, arquivo, status) não ficam aqui, e sim em `app/_docs/catalog-meta.ts`; cada documento os puxa com `metaOf(slug)`. `index.ts` junta tudo em `docs`, na ordem de `componentMeta`. Os arquivos são módulos de servidor (sem `"use client"`); exemplos interativos usam as demos de `app/_docs/demos/`.

## Interface
- `index.ts:docs` - `ComponentDoc[]` montado como `componentMeta.map((meta) => bySlug[meta.slug])`.
- `index.ts:getDoc(slug)` - primeiro documento com o `slug` pedido, ou `undefined`.
- `index.ts` reexporta `groups`, `statusLabel` e `DocStatus` de `../catalog-meta` e os tipos de `./shared`.
- `shared.ts:ComponentDoc` - `ComponentMeta & { usage: DocUsage; dosDonts?: DocDoDont[]; props: DocProp[]; examples: DocExample[]; a11y: string[]; keyboard?: DocKey[] }`.
- `shared.ts:DocProp` (`name`, `type`, `default?`, `description`), `DocExample` (`title`, `description?`, `code`, `render(theme: PreviewTheme)`, `className?`, `stacked?`), `DocKey` (`keys`, `action`), `DocUsage` (`use`, `avoid`), `DocSample` (`render()`, `caption`), `DocDoDont` (`do`, `dont`).
- `shared.ts:classNameProp` e `asChildProp` - linhas de prop reutilizadas nas tabelas.
- Documentos (`<slug>.tsx`, cada um com `export const doc: ComponentDoc = { ...metaOf("<slug>"), ... }`), 85 arquivos:
  accordion, alert, alert-dialog, app-shell, avatar, badge, breadcrumb, button, calendar, card, character-sentinel, character-stage, chart, checkbox, code-comment, collapsible, combobox, command, command-palette, context-menu, currency-input, data-table, date-picker, date-range-picker, description-list, dialog, dot-field, dot-grid, dropdown-menu, empty-state, feature-grid, file-upload, footer, form-field, glitch-text, hero, icon-button, icon-tile, input, kbd, kicker, label, link, logo-block, magnetic, masked-input, meter, motion-provider, multi-select, navbar, number-input, page-header, pagination, password-input, popover, progress, radio-group, reveal, scene-canvas, scramble-text, scroll-area, scroll-progress, search-input, section-title, select, separator, sheet, skeleton, slider, spinner, stat-card, stepper, switch, table, tabs, textarea, theme-toggle, tilt, timeline, toast, toggle-group, tooltip, tour, typing-text, typography.

## Invariants
- O nome do arquivo é o slug: `<slug>.tsx` chama `metaOf("<slug>")`, e `metaOf` (`app/_docs/catalog-meta.ts`) lança `Error` ao importar se o slug não existir em `componentMeta`.
- Um componente novo exige três coisas juntas: a entrada em `componentMeta`, o arquivo `<slug>.tsx` aqui e a entrada `"<slug>": <x>Doc` em `index.ts:bySlug`; sem a última, `docs` ganha um `undefined` na posição do slug.
- `docs` segue a ordem de `componentMeta`; o índice, a sidebar e a paleta de comandos usam essa mesma ordem.
- `render` de cada exemplo recebe o tema e é chamado uma vez por tema por `app/_docs/preview.tsx:Preview`; o que precisar de `id` único ou de estado vai para uma demo em `app/_docs/demos/`, recebendo o tema quando necessário.
- `code` é texto exibido, não executado: deve mostrar o uso real do componente, mas pode diferir do `render` (por exemplo, `href` fictícios).
- Os documentos só importam de `@/registry/marcio/...`, `lucide-react`, `next/link`, `../catalog-meta`, `./shared` e `../demos/...`.

## Side Effects
- None. Os arquivos só declaram dados e funções de render; os efeitos interativos estão nas demos de `app/_docs/demos/`.

## Verification
- Run: `npm test`
