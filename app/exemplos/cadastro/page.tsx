import type { Metadata } from "next";
import { Alert } from "@/registry/marcio/ui/alert";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { container, SiteHeader } from "../../_docs/site-header";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = { title: "Cadastro · @mw/ui" };

const steps = ["Preencha seus dados", "Confirme o e-mail", "Entre no painel"];

export default function SignupExample() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex flex-col gap-10 py-12`}>
        <PageHeader
          breadcrumb={<BreadcrumbTrail items={[{ label: "Exemplos", href: "/exemplos" }, { label: "Cadastro" }]} />}
          kicker="Nova conta"
          title="Criar sua conta"
          description="Leva menos de um minuto. Você pode mudar tudo depois nas configurações."
        />
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <aside className="relative isolate flex flex-col gap-6 overflow-hidden rounded-xl border border-line bg-band p-6">
            <DotGrid />
            <CodeComment>como funciona</CodeComment>
            <ol className="flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="font-mono text-mono-sm text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-display-sm font-extrabold">{step}</span>
                </li>
              ))}
            </ol>
            <Alert tone="info" title="Ambiente de demonstração">
              Os dados deste formulário não são enviados a lugar nenhum: ele existe para mostrar validação, estados e o toast de sucesso.
            </Alert>
          </aside>
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
