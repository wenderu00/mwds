# Exemplos / Cadastro

## Overview
Rota `/exemplos/cadastro`: tela de exemplo de criação de conta montada só com componentes do `@mw/ui`. A página (servidor) desenha o cabeçalho, um painel lateral com os passos e um `Alert` avisando que é ambiente de demonstração; o formulário é um componente cliente com React Hook Form, validação acessível e toast de sucesso. Nada é enviado para fora do navegador.

## Interface
- `app/exemplos/cadastro/page.tsx:default` (`SignupExample`) - página com `SiteHeader`, `PageHeader` com `BreadcrumbTrail` (Exemplos > Cadastro), painel com `DotGrid` e `steps`, e `SignupForm`.
- `app/exemplos/cadastro/page.tsx:metadata` - título "Cadastro · @mw/ui".
- `app/exemplos/cadastro/signup-form.tsx:SignupForm` - formulário cliente (`"use client"`) com `useForm<SignupValues>` em `mode: "onTouched"`: nome, CPF (`MaskedInput`), e-mail, senha, confirmação, perfil (`Select`), bio (`Textarea`), avisos (`Switch`) e aceite de termos (`Checkbox` com `Dialog`).

## Invariants
- Regras de validação em `SignupForm`: nome obrigatório com pelo menos 3 letras; CPF obrigatório e válido por `isValidCpf` de `registry/marcio/lib/br`; e-mail obrigatório no padrão `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; senha obrigatória com pelo menos 8 caracteres e um dígito (`minLength: 8`, `pattern: /\d/`); confirmação igual à senha; perfil obrigatório; bio com no máximo `bioLimit` (280) caracteres; termos precisam estar aceitos.
- O contador da bio vem de `useWatch({ control, name: "bio" })` e é exibido como "`{n}` de 280 caracteres.".
- Envio inválido mostra `toast` danger "Revise o formulário" (segundo argumento de `handleSubmit`); envio válido espera `wait(900)`, mostra o toast "Conta criada", chama `reset()` e devolve o foco ao campo `name` com `setFocus`.
- O botão "Aceitar termos" do `Dialog` marca o checkbox via `field.onChange(true)`; o botão "Limpar" chama `reset()` e fica desabilitado durante `isSubmitting`.

## Side Effects
- `SignupForm` chama `toast` de `registry/marcio/ui/toast` e usa `setTimeout` (por `wait`) para simular a requisição. Move o foco com `setFocus`. Sem rede nem armazenamento.

## Verification
- Run: `npm test`
