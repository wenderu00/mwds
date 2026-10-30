# Fundação

## Overview
As 13 seções da página inicial (`/`), que documentam a fundação de tokens do `@mw/ui` nos temas escuro e claro: paleta, tokens semânticos, tipografia, espaçamento, raio, elevação, movimento, camadas, layout, ícones, densidade, gráficos e contraste. Pasta privada (prefixo `_`, fora do roteamento). Cada seção é um componente de servidor sobre `FoundationSection` de `app/_docs/section.tsx`; só as demos de camadas e movimento são componentes cliente.

## Interface
- Seções (cada uma exportada do arquivo homônimo), com `id` e `index`:
  - `palette.tsx:PaletteSection` - `paleta`, "01"; lê `tokens.primitives` de `app/_data/tokens.json`.
  - `semantic.tsx:SemanticSection` - `tokens`, "02"; lê `app/_data/tokens.json`.
  - `typography.tsx:TypographySection` - `tipografia`, "03".
  - `spacing.tsx:SpacingSection` - `espacamento`, "04".
  - `radius.tsx:RadiusSection` - `raio`, "05".
  - `elevation.tsx:ElevationSection` - `elevacao`, "06".
  - `motion.tsx:MotionSection` - `movimento`, "07".
  - `layers.tsx:LayersSection` - `camadas`, "08".
  - `layout.tsx:LayoutSection` - `layout`, "09".
  - `icons.tsx:IconsSection` - `icones`, "10".
  - `density.tsx:DensitySection` - `densidade`, "11".
  - `charts.tsx:ChartsSection` - `graficos`, "12"; lê `app/_data/tokens.json`.
  - `contrast.tsx:ContrastSection` - `contraste`, "13"; lê `app/_data/contrast.json`.
- `layers-demo.tsx:LayersDemo` - demo cliente (`"use client"`) com `Combobox` e `Select` dentro de `Sheet` e `Dialog`, para mostrar a ordem das camadas.
- `motion-demo.tsx:MotionDemo` e `MotionPrimitivesDemo` - demos cliente (`"use client"`) de transição e das primitivas de movimento.

## Invariants
- Todas as seções usam `FoundationSection` de `app/_docs/section.tsx`, e o `id` de cada uma precisa bater com as âncoras de `sections` em `app/page.tsx` (`#paleta`, `#tokens`, `#tipografia`, ...).
- O `index` de cada seção ("01" a "13") segue a ordem em que `app/page.tsx:Home` as renderiza.
- `app/_data/tokens.json` e `app/_data/contrast.json` são gerados por `scripts/contrast.ts --write` (`npm run contrast`); o `npm test` roda `scripts/contrast.ts` sem `--write` e falha se os arquivos estiverem desatualizados. As seções só leem esses JSON e não são a fonte dos valores.
- `contrast.tsx:contrastRows` agrupa os resultados por par `fg|bg` e mostra o resultado de cada tema na mesma linha; `Ratio` exibe a razão com duas casas e vírgula decimal, seguida de "ok" ou "falhou" conforme `result.pass`.

## Side Effects
- None em tempo de execução além do estado React local das demos cliente (`useState` em `MotionDemo` e `MotionPrimitivesDemo`). No build, importa `app/_data/tokens.json` e `app/_data/contrast.json`.

## Verification
- Run: `npm test`
