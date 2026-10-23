# 0005. Estados com sólido, suave e texto

Status: aceito

## Contexto

O portfólio tem `danger` e `success`. Sistemas precisam também de `warning` e `info`, cada um com três variações nos dois temas.

## Decisão

- Quatro tokens por estado: `{estado}` (sólido), `on-{estado}`, `{estado}-soft` e `{estado}-text`.
- Sólidos iguais nos dois temas e sempre com texto preto, a mesma lógica do amarelo. `danger` e `success` mantêm os valores do portfólio.
- `warning` = `#fb923c` (laranja) e `info` = `#60a5fa` (azul). Warning não usa amarelo para não competir com o accent.
- `-soft` e `-text` são derivados em OKLCH do matiz do sólido: soft escuro com L 0,25 e texto escuro com L 0,78; soft claro com L 0,955 e texto claro com L 0,48.
- Estado nunca depende só de cor: Badge, Toast e mensagens de erro levam ícone ou texto.

## Consequências

Pior caso medido de `-text` sobre ground, band, surface e soft: 7,7:1 no escuro e 5,5:1 no claro. Tabela completa em `docs/tokens.md`.
