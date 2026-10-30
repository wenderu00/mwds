# 0028. Versões publicadas do registry

Status: aceito. Revisa a parte de distribuição do [ADR 0016](0016-versionamento.md).

## Contexto

O registry do shadcn não tem versão por item, e o GitHub Pages guarda só o último deploy. Quem instalava recebia sempre o que estivesse na `main`: dois sistemas instalados em dias diferentes tinham códigos diferentes, sem rollback e sem registro da versão usada. Além disso, os itens listavam os pacotes npm sem faixa, então um consumidor novo recebeu `react-day-picker` 10 enquanto o DS testava com a 9.

## Decisão

- **Cada versão vira um GitHub Release imutável.** Depois do deploy, o job `release` cria a tag `v<versão>` com os JSONs do registry como assets, gerados com `REGISTRY_ITEMS_URL` apontando para a pasta do próprio release. Versão que já tem release não é refeita.
- **O consumidor fixa a versão na URL.** `init` pela URL do release grava em `components.json` a entrada `@marcio` com aquela versão. Subir de versão é trocar essa linha e rodar `add --diff`.
- **A URL do Pages continua valendo**, sempre com a versão mais nova, para testar e para projetos que aceitam isso.
- **Os itens declaram a faixa do `package.json`**, como `react-day-picker@^9.14.0`. A faixa barra a major não testada e não rebaixa as atualizações menores que o consumidor já fez. Pacote fora de `dependencies` derruba o build do registry.
- **Instalar faz parte do CI.** O job `consumidor` instala o registry num app Next novo com o modo estrito e exige lint, tipos e build limpos antes de qualquer deploy. O job `release` repete o teste pela URL publicada.

## Consequências

- Só existem versões fixas a partir da 0.21.0.
- O release é criado antes do teste pela URL publicada. Se esse teste falhar, o release já existe e a correção sai numa versão nova.
- Minor e patch das dependências ainda variam entre instalações, dentro da faixa.
