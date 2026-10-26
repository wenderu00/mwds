# 0021. Modo estrito no projeto consumidor (`marcio-strict`)

Status: aceito. Substitui a parte de resets do [ADR 0013](0013-formato-do-registry.md) e do [ADR 0015](0015-tokens-de-fundacao.md).

## Contexto

Os ADRs 0013 e 0015 deixaram os resets dos namespaces do Tailwind (`--color-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--ease-*`) fora do registry, para não quebrar projetos existentes na instalação. As regras de lint `mw/*` também só existiam dentro do repositório do DS.

Com isso, um projeto consumidor tinha `bg-red-500`, `rounded-md` e `shadow-lg` disponíveis, e nada o impedia de usá-los. O Galadur precisa seguir o DS à risca, e "à risca" precisa ser verificável por máquina.

O caminho óbvio, os resets em `cssVars.theme`, foi testado e falha. O shadcn 4.22 escreve as chaves novas no fim do `@theme inline`, depois dos tokens do DS. No Tailwind 4, `--color-*: initial` apaga tudo que foi declarado antes dele, então o reset apagava as cores do próprio DS: num projeto de teste, nem `bg-ground` gerava CSS.

## Decisão

- **Item novo `marcio-strict`**, que depende de `marcio-tokens` e entrega os resets e o lint juntos. `marcio-tokens` continua sem resets.
- **Os resets vão num arquivo próprio.** O item publica `app/mw-strict.css` com um `@theme` que zera os seis namespaces. O campo `css` do item adiciona `@import "./mw-strict.css"`, que o shadcn insere logo depois de `@import "tailwindcss"`. O reset fica entre os padrões do Tailwind e os tokens do DS, então apaga só os padrões.
- **O lint vai como arquivos.** O item publica `eslint-rules/*.js` e um `eslint.mw.mjs` com a config flat pronta. O shadcn não edita o `eslint.config.mjs`, então o consumidor acrescenta uma linha. O `eslint.config.mjs` do DS importa o mesmo `eslint.mw.mjs`, e as regras têm uma fonte só.
- **Quando rodar:**
  - Projeto novo: logo depois do `init`.
  - Projeto existente: no fim da migração. Passar no lint com o modo estrito é o critério de migração concluída.

## Consequências

- `mw-strict.css` é publicado em `app/`, ao lado do `globals.css` padrão do Next. Um projeto com o CSS em outro lugar (`src/app/`) precisa mover o arquivo e ajustar o import.
- Num projeto existente, o modo estrito tira de propósito todas as cores, raios, sombras e curvas do Tailwind. Qualquer uso que restar quebra o visual, e por isso ele vem por último.
- A página Primeiros passos deixa de tratar o reset como opcional e passa a explicar o modo estrito.
