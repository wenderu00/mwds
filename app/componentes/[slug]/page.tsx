import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/registry/marcio/lib/utils";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { docs, getDoc, groups } from "../../_docs/catalog";
import { Preview } from "../../_docs/preview";
import { container, SiteHeader } from "../../_docs/site-header";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  return { title: doc ? `${doc.name} · @mw/ui` : "@mw/ui", description: doc?.summary };
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <div className={`${container} grid gap-12 py-12 lg:grid-cols-[200px_minmax(0,1fr)]`}>
        <nav aria-label="Componentes" className="lg:sticky lg:top-24 lg:self-start">
          {groups.map((group) => (
            <div key={group.id} className="mb-6">
              <p className="mb-2 font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{group.title}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col">
                {docs
                  .filter((item) => item.group === group.id)
                  .map((item) => (
                    <li key={item.slug}>
                      <NextLink
                        href={`/componentes/${item.slug}`}
                        aria-current={item.slug === doc.slug ? "page" : undefined}
                        className={cn(
                          "font-mono text-mono-sm text-ink-soft transition-colors duration-base hover:text-accent-text",
                          item.slug === doc.slug && "text-accent-text",
                        )}
                      >
                        {item.name}
                      </NextLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <main id="conteudo" className="flex min-w-0 flex-col gap-14">
          <div className="flex flex-col gap-4">
            <SectionTitle as="h1" kicker={doc.group}>
              {doc.name}
            </SectionTitle>
            <p className="max-w-measure text-lead text-ink-soft">{doc.summary}</p>
            <CodeComment>{`registry/marcio/ui/${doc.file}`}</CodeComment>
          </div>

          <section className="flex flex-col gap-8">
            <SectionTitle index="01" as="h2" size="md" id="exemplos">
              Exemplos
            </SectionTitle>
            {doc.examples.map((example) => (
              <div key={example.title} className="flex flex-col gap-3">
                <h3 className="font-display text-display-sm font-extrabold">{example.title}</h3>
                {example.description && <p className="text-ink-soft">{example.description}</p>}
                <Preview render={example.render} code={example.code} className={example.className} stacked={example.stacked} />
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-6">
            <SectionTitle index="02" as="h2" size="md" id="props">
              Props
            </SectionTitle>
            <CodeComment>além destas, todas as props nativas do elemento e ref são repassadas</CodeComment>
            <div className="overflow-x-auto rounded-card border border-line">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead className="bg-surface font-mono text-mono-xs text-ink-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">prop</th>
                    <th scope="col" className="px-4 py-3 font-medium">tipo</th>
                    <th scope="col" className="px-4 py-3 font-medium">padrão</th>
                    <th scope="col" className="px-4 py-3 font-medium">descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop) => (
                    <tr key={prop.name} className="border-t border-line align-top">
                      <td className="px-4 py-3 font-mono text-mono-xs text-accent-text">{prop.name}</td>
                      <td className="px-4 py-3 font-mono text-mono-xs text-ink-soft">{prop.type}</td>
                      <td className="px-4 py-3 font-mono text-mono-xs text-ink-muted">{prop.default ?? "-"}</td>
                      <td className="px-4 py-3 text-base text-ink-soft">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {doc.keyboard && (
            <section className="flex flex-col gap-6">
              <SectionTitle index="03" as="h2" size="md" id="teclado">
                Teclado
              </SectionTitle>
              <div className="overflow-x-auto rounded-card border border-line">
                <table aria-labelledby="teclado" className="w-full min-w-[480px] border-collapse text-left">
                  <thead className="bg-surface font-mono text-mono-xs text-ink-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">tecla</th>
                      <th scope="col" className="px-4 py-3 font-medium">ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.keyboard.map((entry) => (
                      <tr key={entry.keys} className="border-t border-line align-top">
                        <td className="px-4 py-3 font-mono text-mono-xs whitespace-nowrap text-accent-text">{entry.keys}</td>
                        <td className="px-4 py-3 text-base text-ink-soft">{entry.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="flex flex-col gap-6">
            <SectionTitle index={doc.keyboard ? "04" : "03"} as="h2" size="md" id="acessibilidade">
              Acessibilidade
            </SectionTitle>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
              <li>Foco visível com outline de 3px na cor focus e offset de 3px.</li>
              {doc.a11y.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
