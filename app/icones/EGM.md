# Ícones

## Overview
Rota `/icones`: catálogo dos pacotes de ícones autorais do `@mw/ui`, com busca por nome ou tag, cada ícone nos três tamanhos da escala e os ícones parecidos do lucide ao lado, para conferir se combinam. Os dados vêm da lista gerada em `app/_docs/icons.generated.ts`.

## Interface
- `app/icones/page.tsx:default` (`IconsPage`) - `SiteHeader`, `PageHeader` ("pacotes autorais") e `IconCatalog`.
- `app/icones/page.tsx:metadata` - título "Ícones · @mw/ui".
- `app/icones/icon-catalog.tsx:IconCatalog` - componente cliente (`"use client"`) com campo de busca (`Input type="search"`) e uma `Table` por pacote de `iconPacks`.

## Invariants
- O filtro compara o termo (aparado e em minúsculas) com `icon.name` e com cada item de `icon.tags` (`IconCatalog`); pacotes sem ícone correspondente não são renderizados.
- Cada pacote mostra `npx shadcn@latest add @marcio/icons-{pack.name}` e, se `pack.dependsOn` não estiver vazio, a nota "Depende de ..." com os pacotes listados.
- Uma busca sem nenhum resultado mostra "Nenhum ícone com esse nome ou tag.".
- Cada ícone aparece nas classes `size-4`, `size-5` e `size-6` (`sizes` em `icon-catalog.tsx`), e as linhas da tabela têm `data-icon={name}`.
- Os dados vêm de `app/_docs/icons.generated.ts` (`authoredIcons`, `iconPacks`), gerado por `scripts/icons/generate.ts`; o catálogo não mantém lista própria de ícones.

## Side Effects
- None além do estado local da busca (`useState` em `IconCatalog`).

## Verification
- Run: `npm test`
