import type { Metadata } from "next";
import NextLink from "next/link";
import { Badge } from "@/registry/marcio/ui/badge";
import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { blocks } from "../_docs/blocks";
import { container, SiteHeader } from "../_docs/site-header";

export const metadata: Metadata = { title: "Blocos · @mw/ui" };

export default function BlocksIndex() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} flex flex-col gap-14 py-12`}>
        <PageHeader
          kicker="Telas prontas"
          title="Blocos"
          description="Páginas completas que entram no seu projeto com um comando. Os arquivos ficam no seu código: adapte à vontade."
        />
        {blocks.map((block, index) => {
          const preview = block.route ?? block.previewPath;
          return (
            <section key={block.slug} id={block.slug} className="flex scroll-mt-24 flex-col gap-5">
              <SectionTitle index={String(index + 1).padStart(2, "0")} as="h2" size="md">
                {block.name}
              </SectionTitle>
              <p className="max-w-measure text-ink-soft">{block.summary}</p>
              <pre className="overflow-x-auto rounded-control border border-line bg-band p-4 font-mono text-mono-xs text-ink-soft">
                <code>npx shadcn@latest add @marcio/{block.slug}</code>
              </pre>
              <div className="flex flex-wrap items-center gap-2">
                {Object.values(block.targets).map((target) => (
                  <Badge key={target} appearance="outline">
                    {target}
                  </Badge>
                ))}
                {block.setup && <CodeComment>{block.setup}</CodeComment>}
              </div>
              {preview && (
                <>
                  <div className="overflow-hidden rounded-card border border-line">
                    <iframe src={preview} title={`Prévia do bloco ${block.name}`} loading="lazy" className="block h-[560px] w-full bg-ground" />
                  </div>
                  <Button asChild variant="secondary" className="self-start">
                    <NextLink href={preview}>Abrir em tela cheia</NextLink>
                  </Button>
                </>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
