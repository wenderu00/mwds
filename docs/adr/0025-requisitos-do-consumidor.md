# 0025. Requisitos do projeto consumidor

Status: aceito

## Contexto

O Galadur roda em Vite com React 18. O DS assume Next e React 19 sem dizer isso em lugar nenhum:
- os componentes recebem `ref` como prop, sem `forwardRef`;
- a instalação depende do `next/font` que os itens de fonte escrevem no layout.

Instalar num projeto fora desse perfil falha de formas que não apontam a causa.

## Decisão

- **Todos os projetos consumidores são Next com App Router**, pelo menos por enquanto. Um projeto em Vite migra para Next antes de adotar o DS; o DS não ganha suporte a Vite.
- **React 19 e Tailwind 4 são requisitos.** Os dois estão em Primeiros passos e no README.
- **`peerDependencies` no `package.json`** declara `react` e `react-dom` `^19`. Isso é só registro: o pacote é privado e o registry do shadcn não confere peers, então a garantia real é o requisito documentado.

## Consequências

- Um app estático usa `output: "export"`. Telas interativas usam `"use client"`.
- Se um dia houver consumidor fora do Next, isso vira um ADR novo.
