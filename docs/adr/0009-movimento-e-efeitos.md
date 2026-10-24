# 0009. Efeitos são opcionais e desligam com movimento reduzido

Status: aceito

## Decisão

- Componentes do dia a dia só animam cor e borda (`duration-base`, ver ADR 0015). Nada se move por padrão.
- Efeitos da identidade são componentes separados, para telas de destaque (login, vazio, 404): `DotGrid` (com prop `animated`), `TypingText` (digitação e cursor), `GlitchText`.
- Toda animação fica dentro de `@media (prefers-reduced-motion: no-preference)`. Com `reduce`, o texto aparece completo, o cursor fica estático e a grade fica parada.
- Componentes com animação disparada por JS checam `matchMedia("(prefers-reduced-motion: reduce)")`.
- Teste de cada efeito simula `reduce` e verifica que não há animação nem conteúdo escondido.
- Sem dependência de GSAP, Motion ou Pixi: os efeitos são CSS puro, como no portfólio.

## Consequências

`GlitchText` não estava na lista de componentes do prompt; entra como componente de identidade opcional porque o item 5 do prompt pede o glitch disponível.
