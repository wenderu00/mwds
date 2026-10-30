# Exemplos / Wizard

## Overview
Rota `/exemplos/wizard`: cadastro em quatro etapas (dados pessoais, endereço, interesses, revisão) com `Stepper`, validação por etapa, foco no título da etapa nova e revisão em `DescriptionList` antes de enviar. A página (servidor) monta o cabeçalho; o formulário é um componente cliente com React Hook Form.

## Interface
- `app/exemplos/wizard/page.tsx:default` (`WizardExample`) - `SiteHeader`, `PageHeader` com `BreadcrumbTrail` (Exemplos > Cadastro em etapas), `WizardForm` e `SiteFooter`.
- `app/exemplos/wizard/page.tsx:metadata` - título "Cadastro em etapas · @mw/ui".
- `app/exemplos/wizard/wizard-form.tsx:WizardForm` - formulário cliente (`"use client"`) com `useForm<WizardValues>` (`mode: "onTouched"`, `shouldFocusError: true`), `Stepper` com `onStepChange={go}` e botões "Voltar" e "Continuar"/"Enviar cadastro".

## Invariants
- `steps` define as etapas e os campos validados em cada uma: `["name", "cpf", "email"]`, `["cep", "number", "city"]`, `["areas"]` e nenhum na revisão.
- Só avança se os campos da etapa atual forem válidos: `next` chama `trigger(steps[current].fields, { shouldFocus: true })` antes de `go(current + 1)`.
- O envio real (`handleSubmit(onSubmit)`) só acontece na última etapa (`review`); nas outras, o submit do `<form>` chama `next`.
- Toda troca de etapa passa por `go`, que move o foco para o título da etapa (`headingRef`, `tabIndex={-1}`) num `requestAnimationFrame`. "Voltar" fica desabilitado na etapa 0.
- Regras: nome com pelo menos 3 letras, CPF válido por `isValidCpf` de `registry/marcio/lib/br`, e-mail no padrão `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, CEP com 8 dígitos, número e cidade obrigatórios, pelo menos uma área em `areas`.
- Depois do envio o formulário é limpo e volta para a etapa 0 (`onSubmit` chama `reset()` e `go(0)`).

## Side Effects
- `onSubmit` espera 600 ms (`setTimeout`) para simular a requisição e chama `toast` de `registry/marcio/ui/toast`. `go` move o foco do documento. Sem rede nem armazenamento.

## Verification
- Run: `npm test`
