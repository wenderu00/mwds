# 0011. Medidas e estados dos primitivos

Status: aceito

## Contexto

O portfólio não tem formulários, botão ghost nem controles de marcação. Estas decisões foram tomadas com o Márcio antes da Fase 3.

## Decisão

- **Alturas do Button:** sm 36px, md 44px, lg 48px. md e lg vêm do portfólio (`min-h-11` e `min-h-12`). Input, Textarea de uma linha e Select usam a altura md.
- **Ghost:** sem borda e sem fundo em repouso; no hover ganha fundo `surface` e texto `ink`.
- **Checkbox e Switch marcados:** preenchimento `accent` com marca ou bolinha em `on-accent`, nos dois temas.
- **Input e Textarea:** fundo `ground`, borda `line-control`, erro com borda `danger-text`.
- **Disabled:** opacidade 50% e cursor `not-allowed`. A WCAG não exige contraste de controles desabilitados.
- **Link:** sublinhado sempre visível no modo `inline` (dentro de texto), porque a cor sozinha não distingue o link do texto ao redor. O modo `standalone` (navegação, rodapé) sublinha só no hover, como no portfólio.
- **Badge:** combina `tone` (neutral, accent, danger, success, warning, info) com `appearance` (soft, solid, outline). Usa mono 13px e `rounded-md`.

## Consequências

Todos os controles interativos têm no mínimo 36px de altura e a borda de 3:1 do ADR 0006.
