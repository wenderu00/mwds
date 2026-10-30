# landing

## Overview
Landing page de portfólio pessoal (hero, sobre, serviços, stack, trabalhos e rodapé de contato). O conteúdo em `data.ts` é de exemplo e deve ser trocado por quem instala o bloco. `page.tsx` é publicado como `registry:page` com destino `app/page.tsx`, ou seja, substitui a home do projeto consumidor; `data.ts` vai para `components/blocks/landing/`.

## Interface
- `page.tsx`: default `LandingPage`, `metadata`; internos `icons`, `container` e `ProfileLinks` — página de servidor; compõe `Navbar`, `LogoBlock`, `ThemeToggle`, `Hero`, `SectionTitle`, `FeatureGrid`, `Badge`, `Card`, `Kicker`, `Button`, `Footer`.
- `data.ts`: `profile`, `highlights`, `contact`, `sections`, `services`, `stack`, `projects`; tipos `ServiceIcon`, `Project`.

## Invariants
- `data.ts:ServiceIcon` é `"terminal" | "shield" | "flow" | "spark"`, e `page.tsx:icons` é um `Record<ServiceIcon, ReactNode>` com todas as chaves.
- `data.ts:sections` usa âncoras (`#quem-sou`, `#o-que-faco`, `#stack`, `#trabalhos`) que precisam casar com os ids das seções em `page.tsx:LandingPage`; o `Hero` tem `id="topo"`, alvo do `LogoBlock` e do `backToTop` do `Footer`.
- `page.tsx:LandingPage` passa `size="lg"` explicitamente aos quatro `SectionTitle`, então o novo padrão `md` da 0.20.0 não muda o bloco.
- `page.tsx:LandingPage` só torna o `Card` interativo e linkado quando `data.ts:Project.href` existe.

## Side Effects
- `page.tsx:ProfileLinks` e os links de projetos abrem URLs externas em nova aba (`target="_blank"`, com aviso sr-only); `Hero` e `Footer` usam `mailto:` com `contact.email`.
- `page.tsx:LandingPage` usa `new Date().getFullYear()` no copyright.

## Verification
- Run: `npm test`
