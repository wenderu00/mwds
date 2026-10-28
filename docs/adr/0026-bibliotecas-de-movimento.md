# 0026. Bibliotecas de movimento

Status: aceito. Revisa a regra de bibliotecas do [ADR 0009](0009-movimento-e-efeitos.md) e a escolha de biblioteca da camada 3 do [ADR 0024](0024-sistema-de-movimento.md). As regras transversais e de degradação do 0024 continuam valendo.

## Contexto

O objetivo é montar sites como o portfólio só com o DS. O portfólio já usa três bibliotecas fora do DS:
- **Motion**: entrada na tela, tilt, botão magnético, barra de progresso de scroll e presença.
- **PixiJS**: as cenas em canvas do hero e do jardim de sementes, com o contrato `Scene` em `pixi-canvas.tsx`.
- **GSAP**: os personagens em SVG do "Mate o mutante", com timelines, MorphSVG e DrawSVG.

Esse código funciona e está testado. Hoje, porém, cada projeto teria de copiá-lo. Ele também tem cores em hex fixo, que não seguem o tema e violam o [ADR 0008](0008-sem-cores-fora-dos-tokens.md).

O ADR 0024 deixou a camada 3 em aberto entre `ogl` e `three`. Na prática, os efeitos reais são 2D com muitos sprites e interação, e o Pixi atende melhor que shader puro.

## Decisão

- **Cada biblioteca tem um papel, sem sobreposição:**
  | Camada | Ferramenta | Para quê |
  |---|---|---|
  | 1 | CSS (`tokens.css`) | Componentes do dia a dia e primitivas do ADR 0024. Continua sendo o padrão |
  | 2 | Motion (`motion/react`) | Animação de interface declarativa em React: entrada na tela, hover e ponteiro, spring, presença (montar e desmontar) e scroll |
  | 3a | PixiJS 8 | Cenas em canvas: campos de partículas, fundos interativos, mini cenas |
  | 3b | GSAP 3 (`gsap`, `@gsap/react`) | Personagens e cenas em SVG com timeline sequenciada e plugins de SVG (MorphSVG, DrawSVG) |
- **Fronteiras:**
  - GSAP não anima componente de interface; Motion não monta cena nem personagem.
  - Uma regra `mw/*` do lint impede importar `gsap` ou `pixi.js` fora de itens de cena e de personagem.
  - Componentes de `ui/` não dependem de nenhuma das três.
- **Ponte de tokens.** Nenhuma das três bibliotecas recebe cor, duração ou curva literal:
  - `useMwTokens()` lê os CSS vars do tema e devolve as cores como string (Motion e GSAP) e como número (tint do Pixi), além das durações e curvas.
  - Ele reage à troca de `data-theme`.
  - As durações já caem para 0,01ms com movimento reduzido, então quem usa a ponte herda o comportamento.
- **Distribuição.**
  - Cada efeito é um item do registry. As dependências npm são lidas dos imports (ADR 0013), então quem não instala uma cena não baixa Pixi nem GSAP.
  - Personagens são itens opcionais, como os pacotes de ícones do [ADR 0023](0023-pacotes-de-icones.md).
- **Carregamento.**
  - Pixi e GSAP entram sempre por `import()` dinâmico, em módulo client-only, depois que a página fica ociosa.
  - Plugins do GSAP são registrados dentro desse módulo, nunca no servidor.
  - Os componentes da camada 2 usam `motion.*` completo, não `LazyMotion` com `m`. Com `m` e sem o provider, o conteúdo ficaria preso no estado inicial, invisível. Cada componente também checa o movimento reduzido sozinho, então funciona mesmo sem o `MotionProvider`.
- **Movimento reduzido:**
  - **Motion:** o `MotionProvider` com `reducedMotion="user"` fica na raiz e cobre os `motion.*` do próprio projeto. Os componentes do DS não dependem dele para respeitar o reduce.
  - **Pixi:** a cena não inicia com `reduce`, a menos que seja interativa e mostre um quadro estático. Nesse caso nada se move sozinho.
  - **GSAP:** toda timeline fica dentro de `gsap.matchMedia`, com uma versão reduzida que só faz troca de opacidade e cor.
- **Contrato de cena (Pixi).** O `SceneCanvas` vem do `pixi-canvas.tsx` do portfólio e:
  - carrega a cena sob demanda;
  - limita o DPR a 2;
  - pausa fora da tela e com a aba oculta;
  - mostra um fallback CSS (por exemplo o `DotGrid`) sem WebGL ou antes de carregar;
  - garante no máximo um contexto de renderização ativo por página.
- **Contrato de personagem (GSAP).** O personagem é um SVG com partes marcadas por `data-parte` em nomes padronizados (`corpo`, `olhos`, `braco-esq`, `braco-dir`, `perna-esq`, `perna-dir`). As animações são poses e timelines que o DS fornece por um hook, e o desenho é do pacote de personagem.
- **Licença.** O GSAP é gratuito, com todos os plugins, desde a 3.13 (licença padrão da Webflow), o que permite distribuí-lo pelo registry. Se a licença mudar, este ADR é revisto.

## Consequências

- A camada 2 passa a depender de `motion`. As camadas 3a e 3b dependem de `pixi.js` e `gsap` só nos itens que as usam.
- Testes em jsdom não têm canvas nem WebGL. Eles cobrem o contrato e a degradação (reduce, fallback, pausa), não o render. O e2e captura o quadro estático com reduce emulado, para a regressão visual ser estável.
- A entrega segue em etapas:
  - camada 2 com Motion e `useMwTokens`;
  - camada 3a com `SceneCanvas` e as cenas;
  - camada 3b com o contrato de personagem;
  - por fim, a migração do portfólio para o DS, que é a prova de que o objetivo foi atingido.
