# eslint-rules

## Overview
Regras ESLint locais do design system, em módulos ES com `export default` de um objeto de regra (`meta` + `create`). Elas impõem o uso dos tokens de fundação (cores, raio, duração, easing, camada, sombra, medidas e tracking), a escala de tamanho de ícones e o carregamento sob demanda de pixi.js e gsap. `class-context.js` concentra os utilitários de detecção de contexto de classe. O registro das regras sob o prefixo `mw/` acontece fora deste diretório: `eslint.mw.mjs:mwPlugin` agrupa as regras, e `eslint.config.mjs` liga as quatro em `app/**` e `registry/**`.

Estes arquivos também são publicados para os projetos consumidores: `scripts/build-registry.ts:lintFiles` coloca `eslint.mw.mjs` e todo `eslint-rules/*.js` no item `marcio-strict`, com `target` igual ao caminho de origem. No consumidor, a config padrão de `eslint.mw.mjs` usa `sources: ["lucide-react", "@/components/icons/"]` em `mw/icon-size`.

## Interface
- `class-context.js:isClassContext(node, attributes)`: sobe pelos pais do nó e retorna `true` se o literal está em um `JSXAttribute` cujo nome está em `attributes`, em uma chamada a `cn`, `cva`, `clsx` ou `twMerge` (`classFunctions`) ou em um `VariableDeclarator` cujo nome termina em `class`, `classes`, `className`, `sizes`, `heights` ou `tones`, sem diferenciar maiúsculas (ex.: `buttonClasses`, `iconSizes`, `rowHeights`, `badgeTones`).
- `class-context.js:utilityOf(className)`: remove as variantes (prefixos até o último `:` fora de colchetes) e o `!` inicial ou final, devolvendo a utilidade Tailwind pura.
- `class-context.js:classRule({ description, message, inspect, attributes })`: fábrica de regras do tipo `problem`, sem opções (`schema: []`), com `messageId` `raw`; aplica `inspect(text)` a nós `Literal` e `TemplateElement` em contexto de classe e reporta o valor devolvido.
- `no-raw-color.js` (default, `mw/no-raw-color`): construída com `classRule`, nos atributos `className`, `style`, `color`, `fill` e `stroke`. `checks` proíbe hex (`#` com 3 a 8 dígitos, desde que o `#` não venha logo após letra, dígito, `_`, `&` ou `/`), funções de cor (`rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `oklch`, `oklab`, `lab`, `lch`, `color-mix`), valores arbitrários de cor nas utilidades de cor (`bg-[#...]`, `text-[var(...)]`, `bg-[color:...]` etc.), a escala numérica da paleta Tailwind e a escala primitiva do acento (`bg-red-500`, `bg-accent-500`) e `black`/`white` nas utilidades de cor.
- `no-raw-token.js` (default, `mw/no-raw-token`): construída com `classRule`, só em `className`. Reporta a primeira classe que casa `forbidden` e não casa `allowed`. `forbidden`: qualquer `rounded*`, `duration-*`, `ease-*`, `z-*` e `-z-*`, `shadow`, `drop-shadow` e `inset-shadow`; espaçamento (`p*`, `m*`, `gap`, `space-x/y`), medidas (`min-w`, `max-w`, `min-h`, `max-h`, `size`, `w`, `h`) e larguras de borda (`border`, `border-x/y/t/r/b/l/s/e`) com valor arbitrário em `px` ou `rem`; `text-[...]` e `tracking-[...]`. `allowed`: `rounded-(none|full|mark|control|card)` (também com lado, como `rounded-t-control`), `duration-(fast|base|slow)`, `ease-(standard|enter|exit)` e `z-(behind|base|sticky|sheet|dialog|popover|toast|tooltip)`.
- `icon-size.js` (default, `mw/icon-size`): mensagens `scale` e `prop`; opções `{ allow?: string[], sources?: string[] }` (padrão de `sources`: `["lucide-react"]`; entrada terminada em `/` vale como prefixo). Rastreia ícones importados dessas origens (inclusive namespace e variáveis que recebem um ícone ou um ternário entre ícones, `isIconValue`), reporta as props `size`, `width` e `height` nesses ícones e qualquer utilidade `size-`, `w-` ou `h-` no `className` deles fora de `size-4`, `size-5`, `size-6` e de `allow`.
- `no-scene-lib.js` (default, `mw/no-scene-lib`): mensagem `runtime`, sem opções; reporta import estático, `import()` com literal, `export ... from` e `export * from` de `gsap`, `@gsap/*` ou `pixi.js` (e subcaminhos), conforme `sceneLib`.

## Invariants
- `no-scene-lib.js:noSceneLib` libera imports só de tipo: `importKind === "type"` na declaração ou em todos os especificadores, e `exportKind === "type"` nos re-exports (o comentário cita a ADR 0026). `eslint.config.mjs` e `eslint.mw.mjs` desligam a regra só nos arquivos de `scene-canvas.tsx` e `character-stage.tsx`.
- `no-scene-lib.js:ImportExpression` só verifica `import()` cujo argumento é um `Literal`; expressões dinâmicas não são analisadas.
- `class-context.js:isClassContext` para no primeiro `JSXAttribute` ancestral: se o nome do atributo não estiver em `attributes`, o literal é ignorado mesmo dentro de `cn(...)`.
- `class-context.js:classRule` e `icon-size.js:check` ignoram valores que não são `string`.
- `no-raw-token.js:inspect` testa `allowed` antes de `forbidden`; uma utilidade permitida nunca é reportada. Valores da escala do Tailwind sem colchetes (`min-w-160`, `border-3`) não são reportados.
- `icon-size.js:check` reporta no máximo uma classe fora da escala por literal e só quando o literal pertence ao atributo `className` do próprio elemento de ícone (`iconAttributeOf` para no primeiro `JSXElement`).
- `icon-size.js:allowed` sempre contém `size-4`, `size-5` e `size-6`; `allow` só acrescenta valores (`checkbox.tsx` acrescenta `size-3.5`, em `registry/marcio/ui/` no repositório e em `components/ui/` no consumidor).
- Como `scripts/build-registry.ts:lintFiles` copia só `eslint.mw.mjs` e `eslint-rules/*.js` para o consumidor, as regras precisam continuar em `.js` e só importar umas às outras (hoje o único import é `./class-context.js`). Qualquer `.js` novo neste diretório passa a ser publicado automaticamente.
- `eslint.mw.mjs` ignora `eslint-rules/**` e `eslint.config.mjs` só liga as regras `mw/*` em `app/**` e `registry/**`, então as regras não se aplicam aos próprios arquivos deste diretório.

## Side Effects
- None. As regras só chamam `context.report` durante a travessia da AST; não há I/O, rede ou estado global mutável (os `Set`s de `icon-size.js:create` são locais a cada arquivo analisado).

## Verification
- Run: `npm test`
- Run: `npm run lint`
