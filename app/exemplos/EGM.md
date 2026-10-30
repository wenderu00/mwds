# Exemplos

## Overview
Rota `/exemplos`: índice das telas de sistema montadas só com componentes e tokens do `@mw/ui`, servindo de prova de uso. Cada tela fica num subdiretório; `detalhe` é um bloco do registry reexportado, as outras são composições próprias do site.

## Interface
- `app/exemplos/page.tsx:default` (`ExamplesIndex`) - `PageHeader` e um `Card interactive` por item de `examples`, com o link cobrindo o card (`after:absolute after:inset-0`).
- `app/exemplos/page.tsx:metadata` - título "Exemplos · @mw/ui".
- Subdiretórios:
  - [cadastro](./cadastro/EGM.md) - `/exemplos/cadastro`, formulário de criação de conta com React Hook Form.
  - [detalhe](./detalhe/EGM.md) - `/exemplos/detalhe`, reexporta o bloco `record-detail`.
  - [listagem](./listagem/EGM.md) - `/exemplos/listagem`, projetos com busca, filtros, `DataTable` e ações.
  - [wizard](./wizard/EGM.md) - `/exemplos/wizard`, cadastro em etapas com `Stepper`.

## Invariants
- `examples` em `app/exemplos/page.tsx` lista exatamente as quatro rotas filhas (`/exemplos/listagem`, `/exemplos/cadastro`, `/exemplos/detalhe`, `/exemplos/wizard`); uma tela nova precisa entrar nessa lista para aparecer no índice.
- As telas de exemplo não chamam rede nem gravam dados: todo estado é React local e o feedback é por `toast`.

## Side Effects
- None no índice. As telas filhas chamam `toast` de `registry/marcio/ui/toast` e simulam espera com `setTimeout`.

## Verification
- Run: `npm test`
