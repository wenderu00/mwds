import type { Metadata } from "next";
import { AdminShell } from "@/registry/marcio/blocks/admin-shell/admin-shell";
import { history, record } from "@/registry/marcio/blocks/record-detail/data";
import { RecordActions } from "@/registry/marcio/blocks/record-detail/record-actions";
import { Badge } from "@/registry/marcio/ui/badge";
import { Card, CardContent } from "@/registry/marcio/ui/card";
import { DescriptionList } from "@/registry/marcio/ui/description-list";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { Timeline } from "@/registry/marcio/ui/timeline";

export const metadata: Metadata = { title: `${record.name} · Projetos` };

export default function RecordDetailPage() {
  return (
    <AdminShell
      active="projetos"
      breadcrumb={[{ label: "Início", href: "/dashboard" }, { label: "Projetos", href: "/dashboard#atividade" }, { label: record.name }]}
    >
      <PageHeader kicker={record.id} title={record.name} description={record.summary} actions={<RecordActions name={record.name} />} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section className="flex min-w-0 flex-col gap-4">
          <SectionTitle index="01" as="h2" size="md">
            Dados do projeto
          </SectionTitle>
          <Card>
            <CardContent>
              <DescriptionList
                columns={2}
                items={[
                  { term: "status", description: <Badge tone={record.status.tone}>{record.status.label}</Badge> },
                  { term: "cliente", description: record.client },
                  { term: "responsável", description: record.owner },
                  { term: "equipe", description: record.team },
                  { term: "início", description: record.startedAt },
                  { term: "prazo", description: record.dueAt },
                  { term: "orçamento", description: record.budget },
                  { term: "horas", description: record.hours },
                ]}
              />
            </CardContent>
          </Card>
        </section>

        <section className="flex min-w-0 flex-col gap-4">
          <SectionTitle index="02" as="h2" size="md">
            Histórico
          </SectionTitle>
          <Card>
            <CardContent>
              <Timeline aria-label="Trâmite do projeto" items={history} />
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminShell>
  );
}
