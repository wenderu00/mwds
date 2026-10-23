import type { Metadata } from "next";
import NextLink from "next/link";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { docs, groups } from "../_docs/catalog";
import { container, SiteHeader } from "../_docs/site-header";

export const metadata: Metadata = { title: "Componentes · @mw/ui" };

export default function ComponentsIndex() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex flex-col gap-16 py-16`}>
        <div className="flex flex-col gap-4">
          <SectionTitle as="h1" kicker="catálogo">
            Componentes
          </SectionTitle>
          <p className="max-w-measure text-lead text-ink-soft">
            Cada página mostra o componente nos dois temas, as variantes, as props e as notas de acessibilidade.
          </p>
        </div>
        {groups.map((group, i) => (
          <section key={group.id} className="flex flex-col gap-6">
            <SectionTitle index={String(i + 1).padStart(2, "0")} as="h2" size="md" id={`grupo-${group.id}`}>
              {group.title}
            </SectionTitle>
            <CodeComment>{group.description}</CodeComment>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
              {docs
                .filter((doc) => doc.group === group.id)
                .map((doc) => (
                  <li key={doc.slug}>
                    <NextLink
                      href={`/componentes/${doc.slug}`}
                      className="flex h-full flex-col gap-2 rounded-card border border-line bg-surface p-5 no-underline transition-colors duration-base hover:border-accent-line"
                    >
                      <span className="font-display text-display-sm font-extrabold text-ink">{doc.name}</span>
                      <span className="text-base text-ink-muted">{doc.summary}</span>
                    </NextLink>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
