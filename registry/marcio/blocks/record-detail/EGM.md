# record-detail

## Overview
Página de detalhe de um projeto com dados descritivos, histórico em timeline e ações de arquivar e editar, dentro do [admin-shell](../admin-shell/EGM.md). Dados mock estáticos. `page.tsx` é publicado como `registry:page` com destino `app/projeto/page.tsx`; `data.ts` e `record-actions.tsx` vão para `components/blocks/record-detail/`.

## Interface
- `page.tsx`: default `RecordDetailPage`, `metadata` — página de servidor; compõe `AdminShell` (`active="projetos"`), `PageHeader`, `SectionTitle`, `Card`, `DescriptionList`, `Badge`, `Timeline` e `RecordActions`.
- `data.ts`: tipo `RecordStatus`; constantes `record` e `history`.
- `record-actions.tsx` (`"use client"`): `RecordActions({ name })` — botões Arquivar (com `AlertDialog`) e Editar.

## Invariants
- `data.ts:RecordStatus` é `{ label: string; tone: "neutral" | "accent" | "success" | "warning" | "danger" | "info" }`, e `record.status` usa `satisfies RecordStatus`.
- `data.ts:history` é tipado como `TimelineItem[]` de `ui/timeline.tsx`.
- `record-actions.tsx:RecordActions` exige `name: string`; o `AlertDialogAction` de Arquivar usa `variant="primary"` no lugar do padrão `danger`.
- `page.tsx:RecordDetailPage` passa `size="md"` explicitamente aos `SectionTitle`.

## Side Effects
- `record-actions.tsx:RecordActions` só dispara `toast` informativo ao confirmar "Arquivar" no diálogo e ao clicar em "Editar"; nada é persistido.

## Verification
- Run: `npm test`
