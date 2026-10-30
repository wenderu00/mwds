# 0029. Controle de versões nos sistemas

Status: aceito. Complementa o [ADR 0028](0028-versoes-publicadas.md).

## Contexto

O código do DS é copiado para cada sistema, e nada atualiza essas cópias sozinho. Sem acompanhamento, uma correção publicada só chega a um sistema se alguém lembrar de instalá-la, e não há como ver qual versão cada um usa.

## Decisão

- **Cada sistema acompanha a si mesmo.** O item `marcio-versao` instala `.github/workflows/mw-versao.yml`, que toda semana chama o workflow reutilizável `verificar-versao.yml` do `mwds`. Ele compara o `components.json` com os releases e mantém uma única issue com o rótulo `mw-ds-versao`, fechada quando o sistema fica em dia.
- **A instalação do aviso é opcional.** O item não entra no `init`, para o DS não colocar um workflow num projeto sem o projeto pedir.
- **A visão geral não tem lista manual.** `npm run sistemas` encontra os `components.json` com `@marcio` pela busca de código do GitHub, com o login do `gh` de quem roda. Assim o CI não precisa de token com acesso a todos os repositórios.
- **A ordem dos releases dispensa comparar semver.** A API lista do mais novo para o mais antigo, então as versões pendentes são as que vêm antes da instalada. O aviso de quebra vem da seção `### Quebra compatibilidade` nas notas de cada release.

## Consequências

- A versão mostra o que o `components.json` escolheu, não o código de cada arquivo. Quem troca a URL sem rodar `add --overwrite` aparece em dia com componentes antigos. Comparar os arquivos daria falso alarme, porque os sistemas os editam de propósito.
- O GitHub desliga workflows agendados depois de 60 dias sem atividade em repositórios públicos. Um sistema parado deixa de receber a issue, mas continua em `npm run sistemas`.
- A busca de código cobre só a branch padrão e pode atrasar em repositórios novos.
- Todo sistema executa o workflow pela `main` do `mwds`, com `issues: write` no próprio repositório. Quem altera a `main` altera o que roda em todos eles.
