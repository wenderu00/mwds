import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("dot-grid"),
  usage: {
    use: ["Fundo de telas de destaque: hero, login, 404 e estados vazios decorados."],
    avoid: ["Atrás de tabelas, formulários ou texto longo: os pontos competem com o conteúdo.", "Mais de uma grade animada por tela."],
  },
  props: [
    { name: "animated", type: "boolean", default: "false", description: "Faz a máscara passear devagar. Desliga com movimento reduzido." },
    classNameProp,
  ],
  examples: [
    {
      title: "Atrás de um bloco",
      description: "O pai precisa de relative e isolate.",
      code: `<section className="relative isolate">\n  <DotGrid animated />\n  ...\n</section>`,
      className: "w-full",
      render: () => (
        <div className="relative isolate flex h-40 w-full items-center justify-center rounded-control border border-line">
          <DotGrid animated />
          <span className="font-mono text-mono-xs text-ink-muted">conteúdo</span>
        </div>
      ),
    },
  ],
  a11y: ["É decorativa: tem aria-hidden e não recebe ponteiro.", "Com prefers-reduced-motion: reduce, fica parada."],
};
