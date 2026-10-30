# dashboard

## Overview
Página de painel com métricas, gráfico de horas por frente, tabela de atividade recente e prazos da semana, dentro do [admin-shell](../admin-shell/EGM.md). Todos os dados são mock estático. `page.tsx` é publicado como `registry:page` com destino `app/dashboard/page.tsx` (`app/_docs/blocks.ts`); `data.ts` e `recent-activity.tsx` vão para `components/blocks/dashboard/`.

## Interface
- `page.tsx`: default `DashboardPage`, `metadata` — página de servidor; compõe `AdminShell`, `PageHeader`, `Alert`, `StatCard`, `SectionTitle`, `Chart` (área empilhada), `Card`, `Badge`, `Button` e `RecentActivity`.
- `data.ts`: tipos `Tone`, `Metric`, `Deadline`, `Activity`; constantes `metrics`, `hoursByWeek`, `workstreams`, `deadlines`, `activities`.
- `recent-activity.tsx` (`"use client"`): `RecentActivity({ delay? })` — tabela com carregamento simulado; compõe `LoadingRegion`, `Skeleton`, `Table`, `Avatar`, `Badge`.

## Invariants
- `data.ts:Tone` é `"neutral" | "accent" | "danger" | "success" | "warning" | "info"`, os mesmos tons do `Badge`.
- `data.ts:hoursByWeek` usa as chaves `semana`/`produto`/`suporte`/`gestao`, que precisam casar com `workstreams[].key` e com `categoryKey="semana"` em `page.tsx:DashboardPage`.
- `page.tsx:DashboardPage` só mostra o `Alert` se houver métrica com label exato `"Entregas atrasadas"`.
- `page.tsx:DashboardPage` passa `size="md"` explicitamente aos `SectionTitle`, então a troca do padrão para `md` na 0.20.0 não muda o bloco.
- Os ids de seção `#horas`, `#atividade` e `#prazos` em `page.tsx:DashboardPage` são alvos de âncora: `admin-shell.tsx:navigation` usa `/dashboard#atividade` e o `Alert` linka `#prazos`.
- `page.tsx:dateFormat` formata datas em pt-BR com `timeZone: "UTC"`; `data.ts:Deadline.due` é string de data ISO.
- `recent-activity.tsx:RecentActivity` aceita `delay` (padrão 700 ms); `delay <= 0` desliga o carregamento.

## Side Effects
- `recent-activity.tsx:RecentActivity` usa `setTimeout` em `useEffect` para encerrar o carregamento, com `clearTimeout` no cleanup.
- `page.tsx:DashboardPage`: botão "Novo projeto" sem handler; nenhum acesso a rede.

## Verification
- Run: `npm test`
