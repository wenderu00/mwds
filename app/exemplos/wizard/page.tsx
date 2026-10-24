import type { Metadata } from "next";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { container, SiteHeader } from "../../_docs/site-header";
import { SiteFooter } from "../../_docs/site-footer";
import { WizardForm } from "./wizard-form";

export const metadata: Metadata = { title: "Cadastro em etapas · @mw/ui" };

export default function WizardExample() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex max-w-3xl flex-col gap-10 py-12`}>
        <PageHeader
          breadcrumb={<BreadcrumbTrail items={[{ label: "Exemplos", href: "/exemplos" }, { label: "Cadastro em etapas" }]} />}
          kicker="Inscrição"
          title="Cadastro em etapas"
          description="Cada etapa é validada antes de seguir. Na revisão, as etapas concluídas do Stepper levam de volta para corrigir."
        />
        <WizardForm />
      </main>
      <SiteFooter />
    </div>
  );
}
