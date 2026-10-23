# 0003. Regra do amarelo nos dois temas

Status: aceito

## Contexto

`#ece41f` dá 15,7:1 sobre preto e 1,3:1 sobre branco. No claro ele não pode ser texto, borda nem outline.

## Decisão

- `accent` é sempre preenchimento, com `on-accent` (#000000) por cima, nos dois temas.
- Todo uso de accent como texto ou linha passa por tokens próprios: `accent-text`, `accent-line` e `focus`. No escuro valem `#ece41f`; no claro valem accent-700 (`#6e6600`, 5,9:1 sobre branco).
- `accent-soft` (accent-950 no escuro, accent-100 no claro) serve para fundos de seleção e badges suaves.
- Seleção de texto: fundo `accent`, texto `on-accent`, nos dois temas.
- LogoBlock: fundo `accent`, texto `on-accent`, nos dois temas.
- DotGrid e cursor do terminal usam `accent-line`, então ficam oliva no claro.

## Consequências

No claro, o amarelo vivo aparece só em áreas preenchidas (botão primário, logo, seleção). Kicker, links e números de seção ficam oliva. O preenchimento amarelo sobre branco tem baixo contraste de contorno; isso é aceito porque o rótulo em preto identifica o botão (WCAG 1.4.11 não exige contorno quando o texto já identifica o controle).
