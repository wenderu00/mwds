# Componentes

## Overview
Catálogo `/componentes`: o índice dos componentes documentados, agrupados por `groups` de `app/_docs/catalog-meta.ts`, e uma rota estática por componente em `app/componentes/<slug>/page.tsx`. Não há rota dinâmica `[slug]`: cada um dos 85 subdiretórios é uma página de 8 linhas que liga o documento do catálogo ao template `ComponentPage`. Esses subdiretórios não têm contrato próprio; o padrão está descrito aqui.

## Interface
- `app/componentes/page.tsx:default` (`ComponentsIndex`) - uma seção por grupo (`id="grupo-{group.id}"`) e um card por item de `componentMeta` do grupo, com link para `/componentes/{slug}`.
- `app/componentes/page.tsx:metadata` - título "Componentes · @mw/ui".
- `app/componentes/<slug>/page.tsx` (85 diretórios, um por slug de `componentMeta`), todos com a mesma forma:

  ```tsx
  import { doc } from "@/app/_docs/catalog/<slug>";
  import { ComponentPage, componentMetadata } from "@/app/_docs/component-page";

  export const metadata = componentMetadata(doc);

  export default function Page() {
    return <ComponentPage doc={doc} />;
  }
  ```

## Invariants
- O conjunto de diretórios em `app/componentes/` que têm `page.tsx` é exatamente o conjunto de slugs de `componentMeta`, e cada `page.tsx` contém `@/app/_docs/catalog/<slug>"` com o próprio nome do diretório (teste "cada página do catálogo tem a sua rota estática, e só ela" em `app/componentes/cobertura.test.tsx`). O teste lista a pasta com `readdirSync(..., { withFileTypes: true })` e filtra `isDirectory()`, então arquivos soltos como este `EGM.md` não contam.
- Para adicionar um componente: entrada em `app/_docs/catalog-meta.ts:componentMeta`, arquivo `app/_docs/catalog/<slug>.tsx` exportando `doc`, entrada em `app/_docs/catalog/index.ts:bySlug` e o diretório `app/componentes/<slug>/page.tsx` copiado do padrão acima trocando o slug. O mesmo teste também exige que todo item `registry:ui` de `registry.json` tenha documento com `file` `<nome>.tsx`.
- As rotas são estáticas (o site usa `output: "export"`); não há `generateStaticParams` nem leitura de dados de requisição.
- O índice filtra `componentMeta` por `group === group.id`; um item com grupo fora de `groups` não aparece no índice nem na sidebar de `ComponentPage`.
- O `StatusBadge` do índice só aparece para itens com `status` diferente de `"estavel"`; na página do componente ele aparece sempre.

## Side Effects
- None

## Verification
- Run: `npm test`
