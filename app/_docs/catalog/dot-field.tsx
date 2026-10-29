import { DotField } from "@/registry/marcio/ui/dot-field";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("dot-field"),
  usage: {
    use: ["Fundo do hero de páginas de conteúdo, como o portfólio."],
    avoid: ["Atrás de texto longo, tabelas ou formulários.", "Junto de outra cena na mesma página."],
  },
  props: [
    { name: "spacing", type: "number", default: "28", description: "Distância entre os pontos, em px." },
    { name: "radius", type: "number", default: "150", description: "Raio de repulsão do mouse, em px." },
    { name: "color", type: '"accent" | "category-1" ... "category-8"', default: '"accent"', description: "Cor dos pontos, lida dos tokens." },
    { name: "fallback", type: "ReactNode", default: "<DotGrid />", description: "Mostrado antes de carregar, sem WebGL e com movimento reduzido." },
    classNameProp,
  ],
  examples: [
    {
      title: "Atrás de um hero",
      description: "Como o DotGrid, o pai precisa de relative e isolate. Mexa o mouse e clique.",
      code: `<section className="relative isolate">\n  <DotField />\n  ...\n</section>`,
      className: "w-full",
      render: () => (
        <div className="relative isolate flex h-56 w-full items-center justify-center overflow-hidden rounded-control border border-line">
          <DotField />
          <span className="font-mono text-mono-xs text-ink-muted">conteúdo</span>
        </div>
      ),
    },
  ],
  a11y: ["É decorativo: aria-hidden e sem ponteiro. O conteúdo por cima continua clicável.", "Só o mouse empurra os pontos; toque só ondula.", "Com movimento reduzido, mostra o DotGrid parado."],
};
