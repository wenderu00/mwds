# 0004. Escala do accent gerada em OKLCH com degraus fixos

Status: aceito

## Contexto

O prompt pede a escala 50 a 950 a partir de `#ece41f`. Gerar em HSL produz saltos irregulares de luminosidade, e amarelos escuros tendem a ficar marrons.

## Decisão

- Matiz fixo do `#ece41f` em OKLCH (H ≈ 107).
- Luminosidade por degrau: 0,985 / 0,97 / 0,94 / 0,897 / 0,82 / 0,73 / 0,62 / 0,52 / 0,44 / 0,37 / 0,27.
- Croma: a mesma fração do limite do gamut sRGB que o `#ece41f` usa (97%), reduzida nos extremos (25% no 50 e 75% no 950) para não saturar demais.
- Três degraus fixados em valores já existentes: 200 = `#f5ee6b` (accent-hover do portfólio), 300 = `#ece41f`, 700 = `#6e6600` (ponto de partida do prompt para `accent-text`).

## Consequências

O accent corresponde ao degrau 300, como os amarelos do Tailwind. Os valores finais ficam em `tokens.css` como hex, e o script de geração fica em `scripts/` para reproduzir a escala se o accent mudar.
