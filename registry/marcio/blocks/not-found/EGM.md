# not-found

## Overview
Página 404 no estilo terminal, que mostra a rota atual e oferece voltar à página anterior ou ao início. `not-found.tsx` é publicado como `registry:page` com destino `app/not-found.tsx`; `not-found-terminal.tsx` vai para `components/blocks/not-found/`.

## Interface
- `not-found.tsx`: default `NotFound`, `metadata` — compõe `DotGrid`, `LogoBlock`, `GlitchText` e `NotFoundTerminal`.
- `not-found-terminal.tsx` (`"use client"`): `NotFoundTerminal` (sem props) — janela de terminal com `cd {pathname}` e botões; compõe `Button` e `CodeComment` de [`../../ui`](../../ui/EGM.md).

## Invariants
- `not-found-terminal.tsx:NotFoundTerminal` usa `usePathname()` com fallback `"/"`.
- `not-found-terminal.tsx:NotFoundTerminal` gera o prefixo `// ` com `CodeComment`, que o esconde do leitor de tela; por isso o bloco instala o item `code-comment`.
- `not-found.tsx:NotFound` usa `GlitchText` com `trigger="mount"`.

## Side Effects
- `not-found-terminal.tsx:NotFoundTerminal` chama `router.back()` no botão "Página anterior"; os dois arquivos linkam para `/`.

## Verification
- Run: `npm test`
