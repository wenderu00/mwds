import type { Metadata } from "next";
import { Badge } from "@/registry/marcio/ui/badge";
import { Link } from "@/registry/marcio/ui/link";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { CodeBlock } from "../_docs/code-block";
import { FoundationSection } from "../_docs/section";
import { container, SiteHeader } from "../_docs/site-header";
import { inline, readChangelog, type ChangelogBlock, type ChangelogSection } from "./changelog";

export const metadata: Metadata = { title: "Novidades · @mw/ui" };

const tones: Record<string, "accent" | "info" | "success" | "danger"> = {
  Novo: "accent",
  Mudou: "info",
  Corrigido: "success",
  "Quebra compatibilidade": "danger",
};

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });

const anchor = (version: string) => `v${version.replaceAll(".", "-")}`;

function Inline({ text }: { text: string }) {
  return (
    <>
      {inline(text).map((part, i) => {
        if (part.kind === "code") return <code key={i} className="rounded-mark bg-surface px-1 font-mono text-mono-sm text-ink">{part.value}</code>;
        if (part.kind === "strong") return <strong key={i} className="font-semibold text-ink">{part.value}</strong>;
        if (part.kind === "link") return <Link key={i} href={part.href}>{part.value}</Link>;
        return <span key={i}>{part.value}</span>;
      })}
    </>
  );
}

function Block({ block, version }: { block: ChangelogBlock; version: string }) {
  if (block.type === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-ink-muted">
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "code") return <CodeBlock title={`${version} · ${block.lang || "código"}`} code={block.code} />;
  const heading = block.text.match(/^\*\*([^*]+)\*\*$/);
  if (heading) return <h4 className="pt-2 font-mono text-mono-sm font-medium text-ink">{`// ${heading[1]!.toLowerCase()}`}</h4>;
  return (
    <p className="text-ink-soft">
      <Inline text={block.text} />
    </p>
  );
}

function Section({ section, version }: { section: ChangelogSection; version: string }) {
  const breaking = section.title === "Quebra compatibilidade";
  return (
    <div className={breaking ? "flex flex-col gap-4 rounded-card border border-danger-text p-5" : "flex flex-col gap-4"}>
      <h3>
        <Badge tone={tones[section.title]} appearance={breaking ? "solid" : "soft"}>
          {section.title.toLowerCase()}
        </Badge>
      </h3>
      {section.blocks.map((block, i) => (
        <Block key={i} block={block} version={version} />
      ))}
    </div>
  );
}

export default function ChangelogPage() {
  const releases = readChangelog();
  const current = releases[0]!;
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main id="conteudo">
        <div className={`${container} flex flex-col gap-6 pt-12 pb-4`}>
          <PageHeader
            kicker={`versão atual ${current.version}`}
            title="Novidades"
            description="O que mudou em cada versão do @mw/ui. Antes de atualizar um componente, confira se a versão nova quebra compatibilidade: cada quebra traz como migrar."
          />
          <nav aria-label="Versões">
            <ol className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-mono-xs">
              {releases.map((release) => (
                <li key={release.version}>
                  <a href={`#${anchor(release.version)}`} className="rounded-mark text-accent-text underline-offset-4 hover:underline">
                    {release.version}
                    {release.sections.some((section) => section.title === "Quebra compatibilidade") && <span className="text-ink-muted"> · quebra</span>}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {releases.map((release, i) => (
          <FoundationSection
            key={release.version}
            id={anchor(release.version)}
            index={String(releases.length - i).padStart(2, "0")}
            kicker={dateFormat.format(new Date(`${release.date}T00:00:00Z`))}
            title={release.version}
            band={i % 2 === 1}
          >
            <div className="flex max-w-measure flex-col gap-8">
              {release.sections.map((section) => (
                <Section key={section.title} section={section} version={release.version} />
              ))}
            </div>
          </FoundationSection>
        ))}
      </main>
    </div>
  );
}
