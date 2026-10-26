# 0013. Formato do registry e fluxo de instalação

Status: aceito. Detalha e substitui a parte de itens do ADR 0010. A parte de resets foi substituída pelo [ADR 0021](0021-modo-estrito.md).

## Contexto

O critério de aceite pede que instalar um componente num projeto Next.js vazio funcione de primeira. Testando o shadcn 4.22 descobrimos três limitações:

1. `shadcn add` num projeto sem `components.json` dispara o `init` padrão do shadcn, que pergunta a biblioteca de componentes e instala o tema do shadcn por cima do nosso.
2. No campo `css` de um item, chaves dentro de at-rules genéricas (`@theme inline`, `@layer`, `@media`) viram regras, não declarações. Variáveis de `@theme` só entram pelo campo `cssVars.theme`.
3. `cssVars.light` e `cssVars.dark` escrevem em `:root` e `.dark`, e não em `data-theme`.

## Decisão

- `marcio-tokens` é um item `registry:base` com `extends: "none"` e um `config` completo. `npx shadcn init <url>/r/marcio-tokens.json` cria o `components.json` sem perguntas, registra o namespace `@marcio`, instala fontes, `cn` e tokens, e não instala o tema do shadcn.
- `scripts/build-registry.ts` gera o `registry.json` a partir do código:
  - `@theme inline` de `tokens.css` vai para `cssVars.theme`;
  - o resto (seletores de tema, `@media`, `@utility`, `@keyframes`, `@layer base`) vai para `css`;
  - `html` e `body` saem do `@layer base` no registry, para substituir o `body` sem camada que o create-next-app gera;
  - o reset `--color-*: initial` fica fora do registry para não apagar a paleta de projetos existentes. Ele continua no site do DS e aparece no README como opcional.
- Fontes são três itens `registry:font`. O CLI adiciona o `next/font` no layout e a variável no `<html>`.
- Dependências de cada componente (npm e outros itens) são lidas dos imports do arquivo. Todo componente depende de `marcio-tokens`, então `add` também funciona num projeto que só tem `components.json`.
- Títulos e descrições vêm de `app/_docs/catalog.tsx`, a mesma fonte das páginas de documentação.
- A URL base vem de `REGISTRY_URL` (padrão `http://localhost:3000`).
- `scripts/build-registry.test.ts` falha se um componente não tiver item, se uma dependência apontar para item inexistente ou se o `registry.json` estiver desatualizado.

## Consequências

- A instalação num projeto novo tem dois comandos: `init` com os tokens, uma vez, e depois `add` por componente.
- Testado em projetos criados com `create-next-app@16.4.3`: `init`, `add` por URL e por `@marcio/...`, `tsc` e `next build` passaram, e a página renderizou com as fontes e cores certas nos dois temas.
- Se o shadcn passar a aceitar declarações em at-rules no campo `css`, o gerador pode ser simplificado.
