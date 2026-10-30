# 0018. API congelada dos primitivos e status do 1.0

Status: aceito. Revisa a regra do 1.0 do [ADR 0016](0016-versionamento.md).

## Contexto

O roadmap até o 1.0 pede que a 0.10 seja a última versão que pode quebrar os primitivos. O ADR 0016 dizia que o 1.0 sai quando nenhum componente estiver em beta, mas o sistema sempre vai ter componentes novos amadurecendo. O que quem instala precisa saber é quais APIs não mudam mais.

Antes da 0.10, os primitivos tinham nomes diferentes para a mesma coisa: só o Button tinha `size`, os gatilhos de Select, Combobox e DatePicker copiavam a mesma lista de classes, e Switch e Radio não mostravam o estado de erro.

## Decisão

**Convenções de todos os primitivos:**

- `size`: `"sm" | "md" | "lg"`, padrão `"md"`. sm tem 36px e lg 48px; md segue `--mw-control-h` da densidade.
- `variant`: peso visual de uma ação (Button, IconButton, Link). `tone`: cor de estado de algo que informa (Badge, Alert, StatCard). Os dois nomes não se misturam.
- Erro: o controle usa `aria-invalid`; o FormField recebe `error` e repassa `aria-invalid` e `aria-describedby` ao controle.
- `loading`: só em Button e IconButton. Campo carregando fica desabilitado.
- Conteúdo dentro de um campo vai nos slots `start` e `end` do Input.

**API congelada até o 2.0** (props, nomes de export, `data-slot` e papéis ARIA):

| componente | props congeladas |
|---|---|
| Button | `variant`, `size`, `loading`, `loadingLabel`, `asChild` |
| IconButton | `variant`, `size`, `loading`, `aria-label` obrigatório |
| Input | `size`, `start`, `end`, `aria-invalid`, props nativas |
| Textarea | `aria-invalid`, props nativas |
| Select | `SelectTrigger size`, `value`, `defaultValue`, `onValueChange`, partes `Select*` |
| Checkbox | `checked`, `defaultChecked`, `onCheckedChange`, `aria-invalid` |
| RadioGroup | `value`, `defaultValue`, `onValueChange`, `orientation`, `RadioGroupOption label/description`, `aria-invalid` |
| Switch | `checked`, `defaultChecked`, `onCheckedChange`, `aria-invalid` |
| FormField | `label`, `description`, `error`, `required`, `id`, `orientation`, `useFormField` |
| Dialog | `open`, `onOpenChange`, `DialogContent size/showClose/closeLabel`, partes `Dialog*` |

Mudar uma dessas props depois da 0.10 exige uma MAJOR.

**Status no 1.0:** o selo `estável` marca o que entra no 1.0 com API garantida: os primitivos acima e os componentes que não mudam de API há pelo menos uma versão. O resto continua `beta` e pode mudar numa MINOR, sempre com Como migrar. O 1.0 pode sair com componentes beta.

## Consequências

- O 1.0 depende do congelamento e do uso real, não de zerar os beta.
- A 0.11 e a 0.12 não mudam props dos componentes da tabela; um teste de API (`registry/marcio/ui/__tests__/api-estavel.test.tsx`) cobre size, slots e erro.
- Componente novo entra como beta e só vira estável depois de uma versão sem mudar de API.

## Revisão na 0.20

Uma auditoria da API encontrou componentes fora das convenções. Ficou assim:

- `size` segue `sm | md | lg` com padrão `md` também fora dos campos. SectionTitle ganhou `sm` e passou o padrão de `lg` para `md`; Pagination passou o padrão de `sm` para `md` e ganhou `lg`; Meter trocou `compact` por `sm`, com `compact` aceito até a 0.22.
- Itens de DropdownMenu e ContextMenu usam `tone="danger"`. `variant="danger"` continua aceito até a 0.22.
- O AlertDialog continua mais estreito que o Dialog no mesmo `size` (md 448px e lg 512px, contra 512px e 672px). Alerta é curto, e a largura menor é de propósito.
- Alert e Toast não têm `tone="accent"`: falam de estado, e o amarelo não é um estado. O ponto concluído do Timeline usa `accent` por padrão, como progresso da marca.
- No Spinner e no Progress, `className` vai para o elemento visual (o anel e o contêiner da barra) e as props nativas vão para o elemento com papel acessível. É de propósito: `aria-*` precisa chegar ao `role="status"` e à barra.
- Componentes de movimento têm API fechada desde a 0.19.0 e não repassam props nativas: só as props da tabela de cada página.
