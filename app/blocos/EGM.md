# Blocos

## Overview
Rota `/blocos`: lista dos blocos do registry (telas prontas) com o comando de instalação, os arquivos de destino, a nota de configuração e, quando o bloco tem rota no site, uma prévia em `iframe` e um link para tela cheia. Os dados vêm de `app/_docs/blocks.ts:blocks`.

## Interface
- `app/blocos/page.tsx:default` (`BlocksIndex`) - `PageHeader` e uma `section` por bloco, com `id={block.slug}`.
- `app/blocos/page.tsx:metadata` - título "Blocos · @mw/ui".

## Invariants
- A prévia usa `block.route ?? block.previewPath`; blocos sem nenhum dos dois (como `admin-shell`) não têm `iframe` nem botão "Abrir em tela cheia".
- O `src` do `iframe` leva o prefixo `process.env.NEXT_PUBLIC_BASE_PATH` e a barra final, porque o `iframe` não recebe o `basePath` sozinho e o site usa `trailingSlash: true` (`next.config.ts:nextConfig`).
- O comando exibido é sempre `npx shadcn@latest add @marcio/{block.slug}`; os `Badge` mostram `Object.values(block.targets)`.
- A numeração de cada seção segue a ordem de `blocks`.

## Side Effects
- None

## Verification
- Run: `npm test`
