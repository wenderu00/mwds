# 0027. Comentários no código

Status: aceito

## Contexto

A convenção do repositório é código sem comentários. Mesmo assim, 35 arquivos em `registry/marcio` tinham comentários de dois tipos:
- JSDoc em props e funções exportadas, que aparece no editor de quem instala o componente;
- comentários de linha explicando uma decisão interna, que só quem mantém o DS lê.

Os componentes são copiados para o projeto consumidor pelo shadcn. O JSDoc vai junto e vira a ajuda do editor; o comentário de linha vira ruído num arquivo que a pessoa não escreveu.

## Decisão

- **JSDoc (`/** ... */`) só na API pública:** props, tipos e funções exportados, e os dados de exemplo dos blocos que a pessoa deve trocar.
- **Sem comentários de linha (`//`) nem de bloco (`/* */`)** em `registry/marcio/ui`, `lib` e `blocks`. O que explica uma decisão vai para o ADR do assunto; o que explica o uso vai para a página do componente.
- **Ficam de fora:** diretivas como `eslint-disable`, o `tema.css` (o comentário é o próprio conteúdo do item `marcio-tema`), os testes, `scripts/`, as configs e o site em `app/`.

## Consequências

- Na revisão, um `//` novo em `registry/marcio` vira JSDoc, ADR ou documentação, ou sai.
- Os comentários que existiam foram convertidos ou removidos; os que explicavam regra já registrada, como uma cena por página (ADR 0024) e a moeda digitada pela direita (página do CurrencyInput), não perderam informação.
