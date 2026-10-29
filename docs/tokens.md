# Proposta de tokens (Fase 1)

Status: aceito em 2026-10-23. As decisões visuais não cobertas pelo prompt nem pelo portfólio foram tomadas com o Márcio e estão marcadas como **Decidido**.

Todas as razões de contraste abaixo foram calculadas pela fórmula de luminância relativa da WCAG 2.x.

## 1. Escala primitiva do accent

Gerada em OKLCH com o matiz do `#ece41f` (H ≈ 107), mantendo a mesma proporção de croma em relação ao limite do gamut sRGB em cada luminosidade. Três degraus foram fixados em valores que já existem na identidade.

| Degrau | Valor | Origem | vs preto | vs branco |
|---|---|---|---|---|
| accent-50 | #fbfbee | gerado | 20,1 | 1,0 |
| accent-100 | #f9f9cc | gerado | 19,5 | 1,1 |
| accent-200 | #f5ee6b | fixo (accent-hover do portfólio) | 17,3 | 1,2 |
| accent-300 | #ece41f | fixo (accent do portfólio) | 15,7 | 1,3 |
| accent-400 | #d2ca1a | gerado | 12,2 | 1,7 |
| accent-500 | #b3ad15 | gerado | 8,9 | 2,4 |
| accent-600 | #908b0e | gerado | 5,9 | 3,6 |
| accent-700 | #6e6600 | fixo (accent-text sugerido no prompt) | 3,6 | 5,9 |
| accent-800 | #58550f | gerado | 2,7 | 7,7 |
| accent-900 | #444213 | gerado | 2,0 | 10,3 |
| accent-950 | #29280d | gerado | 1,4 | 15,0 |

Os primitivos ficam em `tokens.css` como `--mw-accent-*`, mas os componentes só usam os semânticos abaixo. A regra `mw/no-raw-color` reprova `bg-accent-500` e as outras classes da escala; só a página de fundação mostra a escala, montando as classes fora do lint.

## 2. Neutros

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| ground | #000000 | #ffffff | Fundo da página |
| band | #0a0a0a | #fafafa | Faixas alternadas de seção |
| surface | #111111 | #f5f5f5 | Cards, inputs, popovers |
| line | #262626 | #e5e5e5 | Divisores e bordas decorativas |
| line-strong | #3a3a3a | #d4d4d4 | Bordas de cards e separadores mais visíveis |
| line-control **(novo)** | #737373 | #737373 | Bordas de controles interativos (input, checkbox, botão secundário) |
| ink | #ffffff | #000000 | Texto principal |
| ink-soft | #d4d4d4 | #404040 | Texto de corpo secundário |
| ink-muted | #a3a3a3 | #525252 | Metadados, legendas, `// comentários` |

**Decidido: fundos do claro espelham o escuro.** Página branca, faixas `#fafafa`, cards `#f5f5f5`.

**Decidido: `ink` no claro é `#000000`**, espelho exato do branco puro do escuro.

**Por que `line-control` existe:** `line-strong` (#3a3a3a) sobre `ground` dá 1,85:1 e não atende os 3:1 exigidos para bordas de componentes interativos. Como os valores do escuro não podem mudar, o DS ganha um token novo só para controles. `#737373` dá 4,43 sobre ground, 4,18 sobre band e 3,98 sobre surface no escuro; 4,74, 4,54 e 4,35 no claro. Ver ADR 0006.

## 3. Accent semântico

Regra única: **o amarelo puro é sempre preenchimento com texto preto. Quando o accent precisa ser linha ou texto, no claro ele vira accent-700.**

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| accent | #ece41f | #ece41f | Preenchimento: botão primário, LogoBlock, seleção, badge sólido |
| accent-hover | #f5ee6b | #d2ca1a | Hover do preenchimento |
| on-accent | #000000 | #000000 | Texto sobre accent |
| accent-text | #ece41f | #6e6600 | Links, Kicker, número de seção, ícones de destaque |
| accent-line | #ece41f | #6e6600 | Borda que acende no hover, aba ativa, cursor do terminal, DotGrid |
| accent-edge | #ece41f | #6e6600 | Contorno de 1px de todo preenchimento amarelo que marca estado: botão primário, checkbox, radio, switch, página atual, dia selecionado ([ADR 0017](adr/0017-contorno-do-accent.md)) |
| accent-soft | #29280d | #f9f9cc | Fundo suave: item selecionado, badge suave |
| focus | #ece41f | #6e6600 | Outline de foco (3px, offset 3px) |

**Decidido: `accent-hover` no claro escurece para accent-400 (`#d2ca1a`).** Clarear para #f5ee6b quase some no branco. Texto preto sobre ele: 12,2:1.

**Decidido: foco, borda de hover, cursor e DotGrid no claro usam oliva accent-700 (`#6e6600`, 5,9:1).** O amarelo sobre branco dá 1,3:1 e falharia os 3:1. Espessura e offset do foco não mudam.

Pares medidos: accent-text sobre accent-soft dá 11,2 no escuro e 5,5 no claro; accent-700 sobre surface claro dá 5,4.

## 4. Estados

Cada estado tem quatro tokens: `{estado}` (sólido), `on-{estado}` (texto sobre o sólido), `{estado}-soft` (fundo suave) e `{estado}-text` (texto e ícone sobre ground, band, surface e soft).

| Token | Escuro | Claro |
|---|---|---|
| danger | #ff5c5c | #ff5c5c |
| danger-hover **(Fase 3)** | #ff7874 | #e9474a |
| danger-soft | #381514 | #ffebe9 |
| danger-text | #ff958f | #b1001f |
| success | #4ade80 | #4ade80 |
| success-soft | #16261a | #d2fddc |
| success-text | #47d77b | #206f3d |
| warning **(novo)** | #fb923c | #fb923c |
| warning-soft | #2e1e12 | #feece0 |
| warning-text | #fb9e56 | #8c4a0e |
| info **(novo)** | #60a5fa | #60a5fa |
| info-soft | #132236 | #e7f1fe |
| info-text | #87bbfb | #0f5cae |
| on-danger, on-success, on-warning, on-info | #000000 | #000000 |

`danger-hover` é o hover do botão danger: clareia no escuro e escurece no claro, como o accent-hover. Texto preto sobre ele: 8,2 no escuro e 5,5 no claro.

Contraste mínimo medido de cada `-text` sobre ground, band, surface e o próprio soft:

| Estado | Escuro (pior caso) | Claro (pior caso) | Sólido com texto preto |
|---|---|---|---|
| danger | 7,7 | 6,3 | 6,9 |
| success | 8,5 | 5,5 | 12,1 |
| warning | 7,7 | 5,9 | 9,3 |
| info | 8,0 | 5,8 | 8,3 |

**Decidido: warning laranja `#fb923c` e info azul `#60a5fa`.** Warning não usa amarelo para não competir com o accent.

**Decidido: sólidos iguais nos dois temas, com texto preto**, seguindo a regra do amarelo (preenchimento claro, texto preto).

## 5. Identidade

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| mutant | #c084fc | #7e22ce | Só no efeito glitch (decorativo) |
| scrim **(Fase 4)** | #000000b3 (70%) | #00000066 (40%) | Fundo atrás do Dialog (ADR 0012) |

**Decidido: `mutant` no claro é `#7e22ce`** (7,0:1 sobre branco). É decorativo e fica fora da validação de texto.

## 6. Tipografia

| Token | Valor | Origem |
|---|---|---|
| font-display | Bricolage Grotesque (500, 700, 800) | portfólio |
| font-sans | IBM Plex Sans (400, 500, 600) | portfólio |
| font-mono | IBM Plex Mono (400, 500) | portfólio |
| text-base (corpo) | 17px / 1.6 | portfólio |
| text-lead | 21px / 1.5 | tagline do hero |
| text-display-2xl | clamp(96px, 20vw, 200px) / 1, tracking -0.04em | número do 404 |
| text-display-xl | clamp(48px, 7vw, 92px) / 0.98, tracking -0.03em | hero |
| text-display-lg | clamp(36px, 5vw, 52px) / 1.05, tracking -0.02em | SectionTitle |
| text-display-md | clamp(28px, 3.5vw, 36px) / 1.15, tracking -0.02em | título de card em destaque |
| text-display-sm | 22px / 1.25, tracking -0.01em | título de card |
| text-mono-sm | 14px | Kicker, número de seção, nav |
| text-mono-xs | 13px | metadados, `// comentários` |
| tracking-kicker | 0.04em | Kicker do hero |
| tracking-display | -0.02em | LogoBlock, com o mesmo espaçamento do display-lg |

Todo título em `font-display` usa peso 800 (extrabold), como pede o prompt.

## 7. Forma, movimento, camadas e densidade

Decisões e motivos no ADR 0015. A página de fundação mostra cada grupo nos dois temas.

| Token | Valor |
|---|---|
| rounded-mark | 4px: checkbox, link, item de menu |
| rounded-control | 6px: botões, inputs, badges, popover, tooltip, toast |
| rounded-card | 12px: cards, dialog, tabela, estado vazio |
| rounded-full | círculo: avatar, switch, rádio |
| sombra | nenhuma; elevação por superfície e borda, `bg-scrim` atrás de Dialog e Sheet |
| duration-fast / base / slow | 100ms / 200ms / 300ms (0,01ms com `prefers-reduced-motion: reduce`) |
| `--mw-duration-blink` / `-type` / `-glitch` / `-drift` | 900ms / 1800ms / 320ms / 18s: cursor, TypingText, GlitchText, DotGrid; só rodam com `motion-safe` |
| ease-standard | cubic-bezier(0.2, 0.7, 0.2, 1) |
| ease-enter | cubic-bezier(0, 0, 0.2, 1) |
| ease-exit | cubic-bezier(0.4, 0, 1, 1) |
| `--mw-distance-sm` / `-md` / `-lg` | 4px / 12px / 24px: deslocamento de entrada do Reveal e da ponte `mw-tokens` |
| `--mw-stagger` | 40ms entre itens, usado pelo utilitário `mw-stagger` e pelo Reveal |
| z-behind … z-tooltip | -1, 0, 10 (sticky), 20 (sheet), 30 (dialog), 40 (popover), 50 (toast), 60 (tooltip) |
| max-w-content / max-w-measure | 1200px / 680px |
| h-control | 44px; 36px com `data-density="compacta"`, 48px com `"ampla"`. Também é a altura mínima dos links da Navbar, do LogoBlock md e do item da AppShell |
| py-cell-y | 12px; 8px compacta, 16px ampla. Também separa as linhas da DescriptionList horizontal |
| ícones | lucide-react, `size-4` / `size-5` / `size-6` |
| dot-grid | pontos de 1.2px, passo 28px, `accent-line` a 55%, máscara radial 70% |

## 8. Gráficos

A paleta categórica vem dos tokens de categoria ([ADR 0022](adr/0022-tokens-de-categoria.md)): `chart-N` é alias de `category-N-line`. A ordem é fixa e foi validada com o validador da skill de visualização. Nas sete primeiras séries, o pior par vizinho com protanopia ou deuteranopia tem ΔE 11,6 no escuro e 16,2 no claro (meta 8). Com visão normal, o pior par fica em 15,8 e 18,6 (piso 15). O par 7 e 8 (amarelo e vermelho) fica em 6,1, aceito só porque legenda e tabela são obrigatórias.

Cada categoria tem três papéis: `-line` (barra, borda, ícone; 3:1 sobre ground, band e surface), `-soft` (fundo de tile) e `-text` (4.5:1 sobre ground, surface e o próprio soft).

| Categoria | Matiz | line escuro | line claro |
|---|---|---|---|
| category-1 | azul | #0961bb | #0554a3 |
| category-2 | verde | #378a21 | #1b6700 |
| category-3 | magenta | #a83876 | #c04e8a |
| category-4 | laranja | #b55508 | #863e07 |
| category-5 | turquesa | #018e7d | #0c9180 |
| category-6 | violeta | #7250ba | #5e3ba3 |
| category-7 | amarelo | #908b0e | #6e6600 |
| category-8 | vermelho | #c74a4d | #bd4045 |

A sequencial `seq-1` a `seq-5` usa a escala do accent: 500 a 900 no claro e 700 a 300 no escuro, onde o valor alto é o mais claro. O passo mais fraco passa 2:1, o piso para rampas; abaixo de 3:1, o gráfico precisa de rótulos ou da tabela.

Regras de categoria: nunca é a única pista, nunca indica status, no máximo 8 por tela.

Regras de gráfico: atribua as cores na ordem, sem pular nem reciclar; a partir da nona série, use Outros; a cor segue a entidade; texto nunca na cor da série; estados só para estado; um eixo y só.

