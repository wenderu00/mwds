# lib

## Overview
Utilitários compartilhados pelos componentes de [`../ui`](../ui/EGM.md) e pelos blocos. Cada arquivo vira um item `registry:lib` separado em `scripts/build-registry.ts:buildRegistry` (`utils`, `br`, `mw-tokens`). Os `*.test.ts` desta pasta não fazem parte do contrato.

## Interface
- `utils.ts`: `cn(...inputs)` — junta classes com `clsx` e resolve conflitos com um `tailwind-merge` estendido para os tokens do design system (`twMerge` é privado do módulo).
- `br.ts`: `onlyDigits`, `formatDateInput`, `parseDateBR`, `formatCpf`, `formatCnpj`, `formatCep`, `formatPhone`, `formatBRL`, `isValidCpf`, `isValidCnpj` — máscaras, parsing e validação de dados brasileiros.
- `mw-tokens.ts` (`"use client"`): `tokenColors`, tipos `TokenColor`, `Bezier`, `MwTokens`; `prefersReducedMotion`, `useReducedMotionPreference`, `parseTime`, `parseBezier`, `toPixiColor`, `readMwTokens`, `watchMwTokens`, `useMwTokens` — leitura dos CSS vars `--mw-*` para Motion, GSAP e Pixi.

## Invariants
- `utils.ts:twMerge`: todo token customizado de `../tokens.css` que gere utilitário Tailwind precisa estar registrado no `extendTailwindMerge`; sem isso, `cn` não reconhece o conflito e o último utilitário não vence (ex.: antes da 0.20.1, `cn("text-display-2xl", "text-sm")` mantinha as duas classes). Hoje o código estende o tema em `radius` (`mark`, `control`, `card`), `spacing` (`control`, `cell-y`), `container` (`content`, `measure`), `ease` (`standard`, `enter`, `exit`) e `animate` (16 nomes `mw-*` listados um a um, sem curinga: `mw-blink`, `mw-drift`, `mw-glitch`, `mw-fade-in`, `mw-pop-in`, `mw-slide-in`, `mw-pulse`, `mw-sheet-right`, `mw-sheet-left`, `mw-sheet-top`, `mw-sheet-bottom`, `mw-indeterminate`, `mw-collapse-down`, `mw-collapse-up`, `mw-flash`, `mw-shift`), e os grupos `font-size` (`text-lead`, `text-display-2xl|xl|lg|md|sm`, `text-mono-sm|xs`), `tracking` (`kicker`, `display`), `z` (`behind`, `base`, `sticky`, `sheet`, `dialog`, `popover`, `toast`, `tooltip`) e `duration` (`fast`, `base`, `slow`). Na 0.20.1 a lista cobre todos os tokens customizados de `tokens.css`; ao criar token novo, acrescente-o aqui.
- `br.ts:formatCpf`/`formatCnpj`/`formatCep`/`formatPhone`/`formatDateInput` truncam os dígitos em 11/14/8/11/8; `formatPhone` usa máscara de celular só com 11 dígitos.
- `br.ts:parseDateBR` só aceita `dd/mm/aaaa` completo e retorna `null` para datas inexistentes (ex.: 31/02); o `Date` resultante é em hora local.
- `br.ts:formatBRL` recebe centavos inteiros e troca o espaço não separável do `Intl` por espaço normal.
- `br.ts:isValidCpf`/`isValidCnpj` exigem 11/14 dígitos, recusam dígitos todos iguais e conferem os dois dígitos verificadores.
- `mw-tokens.ts:readMwTokens` usa fallbacks quando o CSS var falta (durações 0.1/0.2/0.3 s, distâncias 4/12/24 px, stagger 0.04 s, ease `[0.2, 0.7, 0.2, 1]`); cores não têm fallback (string vazia).
- `mw-tokens.ts:useMwTokens` retorna `null` no servidor e no primeiro render; `mw-tokens.ts:useReducedMotionPreference` retorna `false` no servidor.
- `mw-tokens.ts:toPixiColor` retorna `0` para valor vazio ou não resolvível.

## Side Effects
- `mw-tokens.ts:readMwTokens` chama `getComputedStyle` no elemento (padrão `document.documentElement`).
- `mw-tokens.ts:watchMwTokens` cria um MutationObserver em `document.documentElement` (`data-theme`, `class`, `style`) e listeners de `matchMedia` para `prefers-color-scheme` e `prefers-reduced-motion`; a função retornada remove tudo.
- `mw-tokens.ts:useReducedMotionPreference` assina `matchMedia("(prefers-reduced-motion: reduce)")`.
- `mw-tokens.ts:toPixiColor` cria uma única vez um canvas 2D de sonda (`probe`, estado de módulo) para normalizar cores não hexadecimais.
- `utils.ts` e `br.ts`: None (funções puras).

## Verification
- Run: `npm test`
