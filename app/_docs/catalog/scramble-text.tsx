import { ScrambleText } from "@/registry/marcio/ui/scramble-text";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("scramble-text"),
  usage: {
    use: ["O nome ou título de um hero, uma vez por tela."],
    avoid: ["Texto longo ou que a pessoa precisa ler para agir.", "Mais de um por tela."],
  },
  props: [
    { name: "text", type: "string", description: "Texto final. É o que o leitor de tela lê." },
    { name: "as", type: '"h1" | "h2" | "h3" | "p" | "span"', default: '"span"', description: "Elemento renderizado." },
    { name: "trigger", type: '"mount" | "hover"', default: '"mount"', description: "mount embaralha ao montar e no hover; hover só no hover." },
    { name: "duration", type: "number", default: "900", description: "Tempo em ms até o texto assentar." },
    { name: "glyphs", type: "string", default: '"01<>/{}[]#$*+=_"', description: "Caracteres usados no embaralhamento." },
    classNameProp,
  ],
  examples: [
    {
      title: "Título de hero",
      code: `<ScrambleText as="h3" text="Márcio Wendell" className="text-display-sm" />`,
      render: () => <ScrambleText as="h3" text="Márcio Wendell" trigger="hover" className="text-display-sm" />,
    },
  ],
  a11y: ["O leitor de tela lê sempre o texto final, numa cópia sr-only; os glifos ficam com aria-hidden.", "Com movimento reduzido, não embaralha."],
};
