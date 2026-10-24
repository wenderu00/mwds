# 0015. Tokens de fundação além da cor

Status: aceito

## Contexto

Até aqui só cor, tipografia e animação eram tokens. Raio, duração, z-index e sombra eram classes padrão do Tailwind escritas direto nos componentes (`rounded-xl`, `duration-200`, `z-50`). A Etapa 1 do plano de próximos passos pede tokens para espaçamento, raio, elevação, movimento, camadas, layout, ícones e densidade, sem valores soltos nos componentes.

## Decisão

- **Onde moram.** Valores que mudam em tempo de execução ficam como `--mw-*` no `:root` de `tokens.css`: durações, curvas e medidas de densidade. O `@theme inline` só aponta para eles. Um valor escrito direto no `@theme inline` é embutido nas classes, e um override por `@media` ou por atributo não teria efeito.
- **Namespaces do Tailwind zerados.** `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*` e `--ease-*` começam com `initial`, como já acontecia com `--color-*`. `rounded-xl` e `shadow-md` deixam de existir no site. Os resets não vão para o registry: o projeto que instala mantém os padrões dele.
- **Raio semântico:**
  - `rounded-mark` (4px): checkbox, link, item de menu
  - `rounded-control` (6px): botão, campo, badge, popover, tooltip, toast
  - `rounded-card` (12px): card, dialog, tabela
  - `rounded-full`: continua disponível
- **Elevação.** Não há sombra. Cada camada se separa por superfície e borda; Dialog e Sheet usam `bg-scrim`.
- **Movimento.**
  - Durações: `duration-fast` 100ms, `duration-base` 200ms, `duration-slow` 300ms.
  - Curvas: `ease-standard`, `ease-enter`, `ease-exit`.
  - Transição sem duração explícita usa base e standard.
  - Com `prefers-reduced-motion: reduce`, as três durações viram 0,01ms. Animações de deslocamento e os loops decorativos continuam atrás de `motion-safe`.
- **Camadas.** A ordem é: behind (-1) < base (0) < sticky (10) < sheet (20) < dialog (30) < popover (40) < toast (50) < tooltip (60).
  - O plano pedia popover abaixo de sheet e dialog. Isso esconderia um Select aberto dentro de um Dialog e um Combobox dentro de um Sheet, os dois casos que o próprio plano manda testar. Por isso flutuantes ficam acima de modais.
  - O Sheet passa `z-sheet` também para o scrim.
- **Espaçamento.** Mantém a base de 4px do Tailwind. A escala recomendada e os usos estão na página de fundação. Meios degraus continuam permitidos dentro de controles; só valores arbitrários (`p-[13px]`) são barrados.
- **Layout.** Usa os breakpoints padrão do Tailwind, `max-w-content` (1200px) para o conteúdo e `max-w-measure` (680px) para texto corrido.
- **Ícones.**
  - A biblioteca é `lucide-react`, com traço 2.
  - Tamanhos: `size-4`, `size-5` e `size-6`.
  - A exceção é a marca do Checkbox, com 14px.
- **Densidade.** O atributo `data-density="compacta"` ou `"ampla"`, em qualquer ancestral, muda `h-control` (36, 44 ou 48px) e `py-cell-y` (8, 12 ou 16px). Sem atributo, vale a densidade normal.
- **Lint.** A regra `mw/no-raw-token` reprova raio, duração, easing, z-index e sombra fora dos nomes acima, além de espaçamento, `max-w` e `size` arbitrários em px ou rem.
- **Testes.**
  - `scripts/tokens-foundation.test.ts` verifica as relações entre tokens no pacote que o registry entrega: a ordem das camadas, a ordem das durações, reduced-motion e a densidade.
  - Também verifica que todo `var()` do tema aponta para uma variável que existe em tempo de execução.

## Consequências

- **Mudança que quebra compatibilidade para quem já instalou componentes.** Os componentes novos usam `rounded-control`, `z-dialog`, `duration-base` e `h-control`. Quem atualizar um componente precisa atualizar também `marcio-tokens`.
- **Mudança visual pequena.** Fade e pop passam de 160 e 200ms para 200ms; slide e Sheet, de 240 e 260ms para 300ms. Badge passa a ícone de 16px e EmptyState a 24px.
- A densidade compacta deixa controles com 36px. Isso passa no mínimo do WCAG 2.5.8 (24px), mas fica abaixo dos 44px recomendados para toque.
