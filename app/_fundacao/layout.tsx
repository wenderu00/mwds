import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { FoundationSection, SpecTable, ThemePair } from "./shared";

const breakpoints = [
  ["sm", "640px", "formulários passam a duas colunas"],
  ["md", "768px", "exemplos lado a lado, tabelas completas"],
  ["lg", "1024px", "barra lateral fixa, pares de painéis em duas colunas"],
  ["xl", "1280px", "sem mudança de layout; o conteúdo para em 1200px"],
  ["2xl", "1536px", "sem mudança de layout"],
];

const widths = [
  ["max-w-content", "1200px", "largura máxima do conteúdo da página, com px-6 (24px) de margem lateral"],
  ["max-w-measure", "680px", "texto corrido, introduções e descrições"],
];

const grids = [
  ["1 coluna", "padrão no celular"],
  ["lg:grid-cols-2", "pares: tema escuro e claro, código e exemplo"],
  ["grid-cols-[repeat(auto-fill,minmax(150px,1fr))]", "coleções de amostras e cards, com gap-3 ou gap-4"],
];

export function LayoutSection() {
  return (
    <FoundationSection
      id="layout"
      index="09"
      kicker="layout"
      title="Largura, colunas e margens"
      band
      intro={<p>Os breakpoints são os do Tailwind, pensados de baixo para cima: tudo começa em uma coluna e ganha colunas conforme a tela cresce.</p>}
    >
      <ThemePair>
        {() => (
          <div className="flex flex-col gap-3">
            <CodeComment>max-w-content com px-6</CodeComment>
            <div className="rounded-card border border-line bg-band px-6 py-4">
              <div className="grid gap-3 lg:grid-cols-2">
                <span className="h-16 rounded-control border border-accent-line bg-accent-soft" />
                <span className="h-16 rounded-control border border-accent-line bg-accent-soft" />
              </div>
              <p className="mt-3 max-w-measure font-mono text-mono-xs text-ink-muted">{"// texto corrido para em max-w-measure"}</p>
            </div>
          </div>
        )}
      </ThemePair>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <CodeComment>breakpoints</CodeComment>
          <SpecTable head={["prefixo", "a partir de", "o que muda"]} rows={breakpoints} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <CodeComment>larguras</CodeComment>
            <SpecTable head={["classe", "valor", "uso"]} rows={widths} />
          </div>
          <div className="flex flex-col gap-3">
            <CodeComment>colunas</CodeComment>
            <SpecTable head={["grade", "uso"]} rows={grids} />
          </div>
        </div>
      </div>
    </FoundationSection>
  );
}
