import type { Metadata } from "next";
import NextLink from "next/link";
import { AdminShell } from "@/registry/marcio/blocks/admin-shell/admin-shell";
import { deadlines, hoursByWeek, metrics, workstreams } from "@/registry/marcio/blocks/dashboard/data";
import { RecentActivity } from "@/registry/marcio/blocks/dashboard/recent-activity";
import { Alert } from "@/registry/marcio/ui/alert";
import { Badge } from "@/registry/marcio/ui/badge";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Chart } from "@/registry/marcio/ui/chart";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { StatCard } from "@/registry/marcio/ui/stat-card";

export const metadata: Metadata = { title: "Painel" };

const dateFormat = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" });

export default function DashboardPage() {
  const late = metrics.find((metric) => metric.label === "Entregas atrasadas");

  return (
    <AdminShell active="dashboard" breadcrumb={[{ label: "Início", href: "/dashboard" }, { label: "Painel" }]}>
      <PageHeader
        kicker="Visão geral"
        title="Painel"
        description="Como estão os projetos da equipe nesta semana."
        actions={
          <>
            <Button variant="secondary" asChild>
              <NextLink href="/configuracoes">Preferências</NextLink>
            </Button>
            <Button>Novo projeto</Button>
          </>
        }
      />

      {late && (
        <Alert
          tone="warning"
          title={`${late.value} entregas atrasadas`}
          action={
            <Button size="sm" variant="secondary" asChild>
              <a href="#prazos">Ver prazos</a>
            </Button>
          }
        >
          A homologação da Ouvidoria Digital passou do prazo combinado com o cliente.
        </Alert>
      )}

      <section aria-label="Métricas" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section id="horas" className="flex scroll-mt-24 flex-col gap-4">
        <SectionTitle index="01" as="h2" size="md">
          Horas por semana
        </SectionTitle>
        <Chart
          kind="area"
          stacked
          title="Produto concentra as horas desde setembro"
          description="Horas registradas por frente de trabalho nas últimas 8 semanas."
          data={hoursByWeek}
          categoryKey="semana"
          series={workstreams}
          unit="h"
          height={240}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section id="atividade" className="flex min-w-0 scroll-mt-24 flex-col gap-4">
          <SectionTitle index="02" as="h2" size="md">
            Atividade recente
          </SectionTitle>
          <RecentActivity />
        </section>

        <section id="prazos" className="flex scroll-mt-24 flex-col gap-4">
          <SectionTitle index="03" as="h2" size="md">
            Prazos da semana
          </SectionTitle>
          <ul className="flex flex-col gap-3">
            {deadlines.map((deadline) => (
              <li key={deadline.task}>
                <Card className="gap-2 p-4">
                  <CardHeader className="gap-1">
                    <div className="flex items-center justify-between gap-3">
                      <time dateTime={deadline.due} className="font-mono text-mono-xs text-ink-muted">
                        {dateFormat.format(new Date(deadline.due))}
                      </time>
                      <Badge tone={deadline.tone}>{deadline.status}</Badge>
                    </div>
                    <CardTitle className="text-base font-semibold font-sans">{deadline.task}</CardTitle>
                    <CardDescription className="text-sm">{deadline.project}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
