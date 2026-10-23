# 0006. Token `line-control` para bordas de componentes interativos

Status: aceito

## Contexto

O critério de aceite exige 3:1 para bordas de componentes interativos. No portfólio, botões secundários usam `line-strong` (#3a3a3a), que dá 1,85:1 sobre preto. O prompt também pede para manter os valores do escuro.

## Decisão

- `line` e `line-strong` mantêm os valores e ficam restritos a divisores e bordas decorativas (cards, tabela, cabeçalho).
- Novo token `line-control` = `#737373` nos dois temas, para Input, Textarea, Select, Checkbox, Switch desligado e Button secondary.
- Medido: 4,43 / 4,18 / 3,98 sobre ground, band e surface no escuro; 4,74 / 4,54 / 4,35 no claro.

## Consequências

O botão secundário fica com borda um pouco mais clara que no portfólio. O hover continua acendendo em `accent-line`.
