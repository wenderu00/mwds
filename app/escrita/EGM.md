# Escrita

## Overview
Rota `/escrita`: guia de voz, tom e formatos pt-BR do `@mw/ui`. Página estática (sem `"use client"`) com oito seções em `FoundationSection`: kicker, comentário, botões, erros, estados vazios, confirmações, formatos e pontuação. As regras ficam em tabelas (`SpecTable`) e os exemplos vivos usam componentes do registry dentro de `Preview`.

## Interface
- `app/escrita/page.tsx:default` (`WritingPage`) - `PageHeader`, navegação por âncoras (`sections`) e as oito seções.
- `app/escrita/page.tsx:metadata` - título "Escrita · @mw/ui".

## Invariants
- As âncoras de `sections` (`#kicker`, `#comentario`, `#botoes`, `#erros`, `#vazio`, `#confirmacoes`, `#formatos`, `#pontuacao`) correspondem aos `id` das `FoundationSection` da página.
- As datas de exemplo são fixas (`sample`, `rangeStart`, `rangeEnd`), para que a página renderize igual em todo build.
- `formatDate` e `formatMegabytes` repetem os formatos de `formatDate` (date-picker) e `formatBytes` (file-upload) do registry, que são módulos de cliente; se esses formatos mudarem no registry, esta página precisa acompanhar (comentário em `app/escrita/page.tsx`).
- Os formatos usam `Intl` com locale `pt-BR`; moeda usa `formatBRL` de `registry/marcio/lib/br`.

## Side Effects
- None

## Verification
- Run: `npm test`
