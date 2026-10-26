# 0024. Sistema de movimento

Status: aceito. Revisa a regra de bibliotecas do [ADR 0009](0009-movimento-e-efeitos.md) só para a camada 3.

## Contexto

O DS tinha animações soltas (`fade-in`, `glitch`, `typing`), cada uma criada para um componente. O Galadur precisa de feedback de evento (saque, compra, ação negada), e o portfólio precisa de efeitos pesados com shader. Se cada pedido virar uma animação nova, o conjunto perde coerência e fica sem regra de acessibilidade comum.

## Decisão

- **Modelo combinatório.** Um efeito é uma primitiva aplicada por um gatilho, com tokens:
  - **Primitivas:** revelar (`mw-reveal`), destacar (`mw-flash`), glitch (`mw-glitch`), digitar (`mw-typing`) e deslocar (`mw-shift`).
  - **Gatilhos:** montar, entrar na tela, mudar valor, hover e evento.
  - **Tokens:** tempo (`--mw-duration-*`), curva (`ease-*`), distância (`--mw-distance-sm/md/lg`) e stagger (`--mw-stagger`).
- **Camadas:**
  1. Tokens e primitivas em CSS puro, em `tokens.css`. Entregue agora.
  2. Gatilhos como hooks client (`useInView`, `useValueChange`, stagger). Futuro.
  3. Efeitos em canvas e WebGL como itens opcionais do registry, client-only e carregados sob demanda. Futuro.
- **Destacar (`flash`)** é o fundo `accent-soft` voltando ao normal em `--mw-duration-base`, uma vez. Só é disparado por evento discreto (saque, compra, recompensa), nunca por produção contínua. O `Meter` dispara com `highlightKey`.
- **Ação negada usa o `glitch`** existente. Não há `shake`.
- **Stagger:** a utility `mw-stagger` atrasa a animação em `var(--mw-i) * var(--mw-stagger)`. O índice `--mw-i` vem do consumidor.
- **Regras transversais:**
  - Toda primitiva é usada atrás de `motion-safe:`. Com movimento reduzido, os tempos já caem para 0,01ms.
  - Nada pisca mais de 3 vezes por segundo (WCAG 2.3.1). Nenhuma primitiva de destaque usa `infinite`, e limitar a frequência de eventos é responsabilidade de quem dispara.
  - Efeito é proibido em texto que a pessoa está lendo, em campo com foco e em feedback de erro de formulário.
- **Regras para a camada 3:**
  - Shader não declara cor própria. Os tokens chegam por uma ponte (por exemplo `useMwTokens()`) que reage à troca de tema.
  - A degradação é obrigatória: quadro estático com `prefers-reduced-motion`, versão CSS sem WebGL, pausa fora da tela e com a aba oculta, e DPR limitado no mobile.
  - No máximo um contexto de renderização por página.
  - A biblioteca fica para decidir quando a camada 3 tiver o primeiro efeito real: `ogl` para efeitos 2D com shader, ou `three` com `@react-three/fiber` só se houver cena 3D. É a única exceção à regra do ADR 0009 de não usar biblioteca de animação.

## Consequências

- As camadas 1 e 2 continuam sem dependência nova.
- Os consumidores reais previstos são o portfólio e o Galadur.
- `scripts/tokens-foundation.test.ts` garante que toda `--animate-mw-*` tem `@keyframes` e que o `flash` não repete.
