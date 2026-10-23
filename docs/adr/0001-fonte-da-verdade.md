# 0001. O portfólio é a fonte da verdade da identidade

Status: aceito

## Contexto

A identidade visual já existe em https://wenderu00.github.io (repositório `wenderu00/wenderu00.github.io`, Next 16.4, React 19.3, Tailwind v4). O DS precisa reproduzi-la e estendê-la para sistemas, sem reinventar.

O código do portfólio diverge do prompt em alguns pontos:

- `SectionTitle` usa `font-bold`; o prompt pede display em extrabold.
- Cards usam `rounded-lg`, `rounded-[10px]` e `rounded-xl`; o prompt pede `rounded-xl`.
- Os tokens ficam em `@theme` com hex direto, sem tema claro.

## Decisão

- Valores do tema escuro: exatamente os do `globals.css` do portfólio.
- Onde o código do portfólio e o prompt divergem, vale o prompt (display sempre 800, cards sempre `rounded-xl`).
- Padrões extraídos do código (tamanhos, tracking, durações, curva de easing, grade de pontos, keyframes `type`, `blink`, `glitch`, `drift`) entram no DS com os mesmos valores.
- O DS fica na raiz deste repositório (`mwds/`), que corresponde ao `marcio-ui/` do prompt. Pacote `@mw/ui`, namespace do registry `marcio`.

## Consequências

Quando o portfólio migrar para o DS, títulos de seção ficam um pouco mais pesados e os cards ganham raio uniforme.
