# login

## Overview
Tela de login em duas colunas com formulário de e-mail e senha validado por `react-hook-form` e login de demonstração sem rede. `page.tsx` é publicado como `registry:page` com destino `app/login/page.tsx`; `login-form.tsx` vai para `components/blocks/login/`.

## Interface
- `page.tsx`: default `LoginPage`, `metadata` — compõe `DotGrid`, `LogoBlock`, `Kicker`, `TypingText`, `CodeComment` e `LoginForm`.
- `login-form.tsx` (`"use client"`): `LoginForm`, tipos `LoginValues`, `LoginFormProps` — compõe `Alert`, `FormField`, `Input`, `PasswordInput`, `Link`, `Checkbox`, `Button` e `toast`.

## Invariants
- `login-form.tsx:LoginValues` é `{ email: string; password: string; remember: boolean }`.
- `login-form.tsx:LoginFormProps` tem `onLogin` (padrão `demoLogin`) e `forgotPasswordHref` (padrão `"#"`), ambos opcionais.
- `login-form.tsx:LoginForm` exige e-mail no padrão `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` e senha não vazia, com `mode: "onTouched"`.
- `login-form.tsx:demoLogin` só aceita a senha `mw-demo-123`, exibida em `page.tsx:LoginPage`.
- `page.tsx:LoginPage` marca o `TypingText` (`"// acesso restrito à equipe"`) como `aria-hidden` e põe ao lado um trecho sr-only sem o `// `, para o leitor de tela não ler o prefixo.

## Side Effects
- `login-form.tsx:demoLogin` espera 700 ms (`setTimeout`) e lança erro com senha errada.
- `login-form.tsx:onSubmit` dispara `toast` de boas-vindas no sucesso ou mostra `Alert` com a mensagem de erro; não navega nem acessa rede.

## Verification
- Run: `npm test`
