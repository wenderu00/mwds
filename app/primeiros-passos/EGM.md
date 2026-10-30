# Primeiros passos

## Overview
Rota `/primeiros-passos`: guia de instalação do `@mw/ui` num projeto Next.js. Página estática com nove seções em `FoundationSection` (requisitos, criar o projeto, tokens, modo estrito, tema, primeiro componente, primeiro bloco, atualizar, sem o CLI), com os comandos e arquivos em `CodeBlock` copiável.

## Interface
- `app/primeiros-passos/page.tsx:default` (`GettingStartedPage`) - `PageHeader`, navegação por âncoras (`steps`) e as nove seções.
- `app/primeiros-passos/page.tsx:metadata` - título "Primeiros passos · @mw/ui".

## Invariants
- As âncoras de `steps` (`#requisitos`, `#criar-projeto`, `#tokens`, `#modo-estrito`, `#tema`, `#primeiro-componente`, `#primeiro-bloco`, `#atualizar`, `#sem-cli`) correspondem aos `id` das `FoundationSection` da página.
- Toda URL do registry publicado vem de `app/_docs/registry-url.ts:publishedRegistryUrl`; a página monta `{publishedRegistryUrl}/r/{name}.json` (`registriesCode`) e `{publishedRegistryUrl}/r/marcio-tokens.json` a partir dela, sem URL fixa no texto.
- Os comandos de instalação de itens passam por `add(items)` (`npx shadcn@latest add ...`).
- Os requisitos declarados em `requirements` (Node.js 20.9+, Next.js 16 com App Router, React 19, Tailwind CSS v4) precisam acompanhar o `package.json` do repositório.
- `layoutCode` reproduz para o projeto de quem instala a mesma estrutura de `app/layout.tsx` (fontes, `ThemeScript`, `TooltipProvider`, `Toaster`), com imports em `@/components/ui/...`.

## Side Effects
- None na página; a cópia para a área de transferência é feita por `app/_docs/code-block.tsx:CodeBlock`.

## Verification
- Run: `npm test`
