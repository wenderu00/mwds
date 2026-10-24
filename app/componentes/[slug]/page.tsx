import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/registry/marcio/lib/utils";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { docs, getDoc, groups } from "../../_docs/catalog";
import { CodeBlock } from "../../_docs/code-block";
import { installInfo } from "../../_docs/install";
import { StatusBadge } from "../../_docs/status-badge";
import { Preview } from "../../_docs/preview";
import { container, SiteHeader } from "../../_docs/site-header";
import { SiteFooter } from "../../_docs/site-footer";

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
  const install = installInfo(doc.file.replace(/\.tsx$/, ""));

  const sections = ["uso", "exemplos", "props", ...(doc.keyboard ? ["teclado"] : []), "acessibilidade"];
  const index = (id: string) => String(sections.indexOf(id) + 1).padStart(2, "0");

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
            <StatusBadge status={doc.status} className="self-start" />
            <p className="max-w-measure text-lead text-ink-soft">{doc.summary}</p>
            <CodeComment>{`registry/marcio/ui/${doc.file}`}</CodeComment>
            {install && (
              <div className="flex max-w-measure flex-col gap-3">
                <CodeBlock title="terminal · instalar" code={install.command} />
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 font-mono text-mono-xs">
                  <dt className="text-ink-muted">{"// pacotes npm"}</dt>
                  <dd className="text-ink-soft">{install.dependencies.join(", ") || "nenhum"}</dd>
                  <dt className="text-ink-muted">{"// componentes"}</dt>
                  <dd className="text-ink-soft">{install.registryDependencies.join(", ") || "nenhum"}</dd>
                </dl>
              </div>
            )}
          </div>

          <section className="flex flex-col gap-6">
            <SectionTitle index={index("uso")} as="h2" size="md" id="uso">
              Quando usar
            </SectionTitle>
            <div className="grid gap-6 md:grid-cols-2">
              {(
                [
                  ["use quando", doc.usage.use, "marker:text-success-text"],
                  ["prefira outro quando", doc.usage.avoid, "marker:text-danger-text"],
                ] as const
              ).map(([title, rules, marker]) => (
                <div key={title} className="flex flex-col gap-3 rounded-card border border-line p-5">
                  <h3 className="font-mono text-mono-sm text-ink-muted">{`// ${title}`}</h3>
                  <ul className={cn("flex list-disc flex-col gap-2 pl-5 text-ink-soft", marker)}>
                    {rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {doc.dosDonts?.map((pair) => (
              <div key={pair.do.caption} className="grid gap-6 md:grid-cols-2">
                {(
                  [
                    ["certo", pair.do, "border-t-success-text", "text-success-text"],
                    ["errado", pair.dont, "border-t-danger-text", "text-danger-text"],
                  ] as const
                ).map(([label, sample, border, text]) => (
                  <figure key={label} className={cn("flex flex-col overflow-hidden rounded-card border border-line border-t-2", border)}>
                    <div className="flex flex-1 flex-wrap items-center gap-3 p-6">{sample.render()}</div>
                    <figcaption className="flex flex-col gap-1 border-t border-line bg-band px-5 py-4">
                      <span className={cn("font-mono text-mono-xs", text)}>{`// ${label}`}</span>
                      <span className="text-ink-soft">{sample.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-8">
            <SectionTitle index={index("exemplos")} as="h2" size="md" id="exemplos">
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
            <SectionTitle index={index("props")} as="h2" size="md" id="props">
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
              <SectionTitle index={index("teclado")} as="h2" size="md" id="teclado">
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
            <SectionTitle index={index("acessibilidade")} as="h2" size="md" id="acessibilidade">
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
      <SiteFooter />
    </div>
  );
}
