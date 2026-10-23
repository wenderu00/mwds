# 0007. Contraste validado por script a partir de uma lista de pares

Status: aceito

## Contexto

O axe roda em jsdom nos testes, mas jsdom não calcula estilos nem layout, então a regra `color-contrast` do axe não funciona ali. O contraste precisa ser garantido em outro lugar.

## Decisão

- `scripts/contrast.ts` lê `registry/marcio/tokens.css`, resolve os valores de cada tema e valida uma lista explícita de pares (texto sobre fundo, borda sobre fundo) com o requisito de cada um: 4,5 para texto normal, 3 para texto grande, bordas de controles e foco.
- A lista de pares fica em `scripts/contrast-pairs.ts` e cobre todo par usado pelos componentes. Ao criar um componente com um par novo, o par entra na lista.
- O script imprime uma tabela e sai com código 1 se algum par falhar. Roda em `npm run contrast` e dentro de `npm run test`.
- Tokens decorativos (`mutant`, pontos da DotGrid) ficam fora da lista, marcados como decorativos.
- Os testes de componente usam vitest-axe para o resto (nomes acessíveis, papéis ARIA, rótulos) e rodam com `data-theme` escuro e claro.

## Consequências

Mudar um token que quebre contraste falha o build. Contraste de cores combinadas ad hoc é impossível porque a regra de lint (ADR 0008) proíbe cores fora dos tokens.
