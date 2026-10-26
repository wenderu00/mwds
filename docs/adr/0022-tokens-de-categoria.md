# 0022. Tokens de categoria

Status: aceito. Revisa a paleta categórica do [ADR 0019](0019-grafico-sobre-recharts.md).

## Contexto

A paleta `chart-1` a `chart-8` só servia a gráficos e só tinha um papel: a linha ou a barra da série. O Galadur precisa da mesma distinção de categoria fora de gráfico: o fundo de um tile de recurso, a borda de um card de unidade, o texto de uma etiqueta. Usar `chart-N` como fundo ou como texto quebra o contraste, porque a cor foi calibrada para 3:1 contra a superfície e não para ter texto em cima.

A ordem antiga começava pelo amarelo, que colide com o accent ([ADR 0003](0003-regra-do-amarelo.md)), e tinha o vermelho no fim, que colide com perigo. Com poucas séries, as duas primeiras cores eram justamente as mais ambíguas.

## Decisão

- **Os tokens `category-1` a `category-8` são a fonte.** Cada categoria tem três papéis:
  - `category-N-line`: barra, linha, borda e ícone. Tem pelo menos 3:1 sobre `ground`, `band` e `surface`.
  - `category-N-soft`: fundo de tile e de etiqueta.
  - `category-N-text`: texto. Tem pelo menos 4.5:1 sobre `ground`, `surface` e o próprio `category-N-soft`.
- **`chart-N` vira alias de `category-N-line`.** Gráficos continuam usando `chart-N`, e os dois nomes nunca divergem.
- **A ordem é:** azul, magenta, verde, laranja, turquesa, violeta, amarelo, vermelho. Amarelo e vermelho ficam no fim porque colidem com accent e perigo; só aparecem com sete séries ou mais.
- **`scripts/contrast.ts` valida os três papéis nos dois temas.** Os pares de `chart-N` saem, porque o alias já está coberto.
- **Regras de uso:**
  - Categoria nunca é a única pista: sempre vem com rótulo, ícone ou posição.
  - Categoria nunca indica status. Sucesso, alerta e perigo continuam com os tokens de estado.
  - No máximo 8 categorias numa tela. Acima disso, agrupe ou use outra codificação.

## Consequências

- Os gráficos mudam de cor: a série 1 deixa de ser amarela e passa a ser azul. Isso entra no CHANGELOG em Quebra compatibilidade.
- Quem precisa de uma cor fixa para uma série específica deve referenciar o token pelo número da nova ordem.
- `IconTile` e `Meter` usam `category-N-soft` e `category-N-line`.
