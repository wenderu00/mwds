# scripts/lib

## Overview
Biblioteca de apoio dos scripts de build e verificação. Faz a matemática de cor (sRGB, luminância relativa, contraste WCAG e OKLCH) e lê os tokens `--mw-*` de `registry/marcio/tokens.css`, resolvendo `var()` até o valor final nos temas escuro e claro. Consumidores em código de produção: `scripts/contrast.ts` (`contrast`, `loadTokens`, `Theme`) e `scripts/accent-scale.ts` (`contrast`, `hexToOklch`, `maxChroma`, `oklchToHex`).

## Interface
- `color.ts:Oklch`: tupla `[l, c, h]`.
- `color.ts:hexToRgb(hex)`: converte `#rgb` ou `#rrggbb` (com ou sem `#`) em canais 0..1.
- `color.ts:luminance(hex)`: luminância relativa (coeficientes 0.2126, 0.7152 e 0.0722 sobre os canais linearizados).
- `color.ts:contrast(a, b)`: razão de contraste WCAG `(L1 + 0.05) / (L2 + 0.05)`, independente da ordem dos argumentos.
- `color.ts:hexToOklch(hex)`: hex para OKLCH, com matiz normalizado para 0..360.
- `color.ts:maxChroma(L, H)`: maior croma dentro do gamut sRGB para `L` e `H`, por busca binária (30 iterações, teto 0.4).
- `color.ts:oklchToHex([L, C, H])`: OKLCH para hex, limitando o croma a `maxChroma`.
- `tokens.ts:Theme`: `"dark" | "light"`.
- `tokens.ts:TokenMap`: `Record<string, string>` com nomes sem o prefixo `--mw-`.
- `tokens.ts:tokensPath`: caminho absoluto de `registry/marcio/tokens.css`, resolvido a partir de `import.meta.url` (não depende do `cwd`).
- `tokens.ts:loadTokens(css?)`: devolve `{ primitives, dark, light }` com valores resolvidos e em minúsculas. `dark` e `light` já trazem os primitivos mesclados (`{ ...primitives, ...dark }` e `{ ...primitives, ...light }`), por isso um nome de primitivo também vale como token de tema (ex.: em `scripts/contrast-pairs.ts:pairs`).

## Invariants
- `color.ts:hexToRgb` lança `Cor inválida` para qualquer valor que não tenha 3 ou 6 dígitos hexadecimais. Nomes de cor, hex com alfa e `rgb()` não são aceitos.
- `color.ts:oklchToHex` nunca devolve cor fora do gamut: o croma é cortado por `maxChroma` e cada canal fica preso em 0..1.
- `tokens.ts:loadTokens` depende de quatro seletores literais em `tokens.css`: `:root {`, `:root,\n[data-theme="dark"] {`, `:root:not([data-theme="dark"]) {` e `\n[data-theme="light"] {`. Se faltar algum, `blockAfter` lança `Bloco não encontrado em tokens.css`; se o bloco não fechar, lança `Bloco sem fechamento`. Mudar a formatação desses seletores quebra o loader.
- `tokens.ts:declarations` só lê declarações `--mw-*`; outras custom properties do bloco são ignoradas.
- `tokens.ts:loadTokens` exige que os blocos `:root:not([data-theme="dark"])` e `[data-theme="light"]` tenham as mesmas chaves e valores; se não tiverem, lança `Tema claro do sistema difere de [data-theme="light"]`.
- `tokens.ts:loadTokens` exige simetria entre os temas: todo token do tema escuro precisa existir no claro (`Tokens sem valor no tema claro`), e todo token do tema claro que não é primitivo precisa existir no escuro (`Tokens sem valor no tema escuro`).
- `tokens.ts:resolve` só segue referências `var(--mw-x)` que ocupam o valor inteiro. Token indefinido lança `Token indefinido`, e ciclo lança `Referência circular`.
- `tokens.ts:loadTokens` só troca CRLF por LF no valor padrão do parâmetro (leitura de `tokensPath`). Um `css` passado como argumento não é normalizado: com CRLF, os seletores com `\n` não são encontrados.

## Side Effects
- `tokens.ts:loadTokens` lê `registry/marcio/tokens.css` do disco (`readFileSync`) quando é chamado sem argumento.
- `color.ts`: None (funções puras).

## Verification
- Run: `npm test`
