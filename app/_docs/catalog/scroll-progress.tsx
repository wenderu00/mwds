import { ScrollProgress } from "@/registry/marcio/ui/scroll-progress";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("scroll-progress"),
  usage: {
    use: ["Na base do cabeçalho de páginas longas de conteúdo."],
    avoid: ["Telas de sistema: a rolagem ali não é progresso de leitura.", "Mais de uma por página."],
  },
  props: [{ name: "className", type: "string", description: "Posicione com absolute ou fixed. Padrão: h-0.5, largura total, bg-accent." }],
  examples: [
    {
      title: "Na base do cabeçalho",
      code: `<header className="sticky top-0">\n  ...\n  <ScrollProgress className="absolute inset-x-0 bottom-0" />\n</header>`,
      className: "w-full",
      render: () => (
        <div className="relative w-full rounded-control border border-line px-4 py-3 font-mono text-mono-xs text-ink-muted">
          cabeçalho, role a página
          <ScrollProgress className="absolute inset-x-0 bottom-0" />
        </div>
      ),
    },
  ],
  a11y: ["É decorativa: tem aria-hidden.", "Com movimento reduzido, acompanha a rolagem sem spring."],
};
