# 0016. Versionamento

Status: aceito

## Contexto

O `package.json` ficou em 0.1.0 desde o primeiro commit, embora dez PRs tenham mudado tokens, componentes e blocos. Uma dessas mudanças quebrou quem já tinha componentes instalados: depois da Etapa 1, um componente novo precisava de tokens novos. A Etapa 7 pede versão semântica, um CHANGELOG e instruções de migração.

O registry do shadcn não tem versão por item. Quem instala recebe sempre o arquivo publicado no momento.

## Decisão

- **Uma versão para o conjunto.** Tokens, componentes e blocos sobem juntos. A versão fica no `package.json`, no topo do `CHANGELOG.md` e no site, e os dois arquivos precisam concordar (um teste garante).
- **Semver com a regra de antes do 1.0:**
  - **MINOR (0.x.0):** componente, token ou bloco novo, e também qualquer mudança que quebra compatibilidade.
  - **PATCH (0.x.y):** correção sem mudança de API nem mudança visual intencional.
  - **1.0.0:** quando a API dos primitivos estiver congelada e houver uso real em produção ([ADR 0018](0018-api-congelada.md)). A partir dali, quebra em componente estável sobe a MAJOR.
- **Quebra sempre com migração.** Toda entrada em Quebra compatibilidade traz um bloco Como migrar com os comandos e o antes e depois do código.
- **Status por componente continua valendo.** Componente beta pode mudar de API numa MINOR. Componente estável só muda de API com entrada em Quebra compatibilidade.
- **Formato fixo do CHANGELOG.** Cada versão é `## [x.y.z] - aaaa-mm-dd`, com as seções `### Novo`, `### Mudou`, `### Corrigido` e `### Quebra compatibilidade`, e textos em português sem travessão. A página Novidades lê esse arquivo no build, e um formato fora do esperado quebra o build.
- **Histórico reconstruído.** As versões 0.1.0 a 0.5.0 foram montadas a partir dos PRs #1 a #10, agrupando cada etapa mergeada.

## Consequências

- Todo PR que muda o registry acrescenta a sua entrada no topo do CHANGELOG e sobe a versão no `package.json`.
- Quem atualiza um componente consulta a página Novidades para saber se precisa atualizar os tokens ou outro componente junto.
