import type { Metadata } from "next";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { container, SiteHeader } from "../_docs/site-header";
import { SiteFooter } from "../_docs/site-footer";
import { IconCatalog } from "./icon-catalog";

export const metadata: Metadata = { title: "Ícones · @mw/ui" };

export default function IconsPage() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex flex-col gap-10 pt-12 pb-16`}>
        <PageHeader
          kicker="pacotes autorais"
          title="Ícones"
          description="Ícones que o lucide não tem, desenhados na mesma grade de 24, traço 2 e pontas arredondadas. Cada um aparece nos três tamanhos da escala, ao lado dos parecidos do lucide, para conferir se combinam."
        />
        <IconCatalog />
      </main>
      <SiteFooter />
    </div>
  );
}
