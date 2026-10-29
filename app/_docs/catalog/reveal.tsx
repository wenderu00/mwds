import { Reveal } from "@/registry/marcio/ui/reveal";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("reveal"),
  usage: {
    use: ["Seções e cards de páginas de conteúdo, como o portfólio e landing pages.", "Listas curtas, com index para entrarem em sequência."],
    avoid: ["Telas de sistema e formulários: o conteúdo precisa estar lá quando a pessoa chega.", "Texto que a pessoa está lendo ou campo com foco (ADR 0024)."],
  },
  props: [
    { name: "as", type: '"div" | "section" | "article" | "li"', default: '"div"', description: "Elemento renderizado." },
    { name: "index", type: "number", default: "0", description: "Posição na lista. Atrasa a entrada em index × --mw-stagger." },
    { name: "distance", type: '"sm" | "md" | "lg"', default: '"lg"', description: "Quanto sobe, de --mw-distance-*." },
    { name: "once", type: "boolean", default: "true", description: "Anima só na primeira entrada na tela." },
    classNameProp,
  ],
  examples: [
    {
      title: "Cards em sequência",
      code: `{items.map((item, i) => (\n  <Reveal key={item} as="li" index={i}>...</Reveal>\n))}`,
      className: "w-full",
      render: () => (
        <ul className="grid w-full grid-cols-3 gap-3">
          {["Requisito", "Teste", "Deploy"].map((item, i) => (
            <Reveal key={item} as="li" index={i} className="rounded-control border border-line bg-surface p-4 font-mono text-mono-xs text-ink-muted">
              {item}
            </Reveal>
          ))}
        </ul>
      ),
    },
  ],
  a11y: ["Com movimento reduzido, o conteúdo já nasce visível, sem deslocamento.", "Só mexe em opacidade e posição: a ordem de leitura e o foco não mudam."],
};
