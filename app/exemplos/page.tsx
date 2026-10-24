import type { Metadata } from "next";
import NextLink from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { container, SiteHeader } from "../_docs/site-header";
import { SiteFooter } from "../_docs/site-footer";

export const metadata: Metadata = { title: "Exemplos · @mw/ui" };

const examples = [
  {
    href: "/exemplos/listagem",
    kicker: "Listagem",
    title: "Projetos com filtros",
    description: "Busca, filtro por status, ordenação, seleção de linhas, tabela paginada, confirmação em diálogo e estado vazio.",
    uses: "PageHeader · FormField · Select · Table · Checkbox · Tooltip · Dialog · Toast · EmptyState",
  },
  {
    href: "/exemplos/cadastro",
    kicker: "Formulário",
    title: "Cadastro com validação",
    description: "React Hook Form com mensagens de erro acessíveis, Select e Checkbox controlados, termos em diálogo e toast de sucesso.",
    uses: "Card · FormField · Input · Textarea · Select · Switch · Checkbox · Dialog · Button loading · Toast",
  },
];

export default function ExamplesIndex() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex flex-col gap-10 py-12`}>
        <PageHeader
          kicker="Prova de uso"
          title="Telas de exemplo"
          description="Duas telas de sistema montadas só com componentes e tokens do @mw/ui."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {examples.map((example) => (
            <li key={example.href}>
              <Card interactive className="relative h-full">
                <CardHeader>
                  <Kicker className="text-mono-xs">{example.kicker}</Kicker>
                  <CardTitle as="h2">
                    <NextLink href={example.href} className="after:absolute after:inset-0 after:rounded-card">
                      {example.title}
                    </NextLink>
                  </CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CodeComment className="mt-auto">{example.uses}</CodeComment>
              </Card>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
