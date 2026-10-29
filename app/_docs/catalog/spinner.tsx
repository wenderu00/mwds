import { Spinner } from "@/registry/marcio/ui/spinner";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("spinner"),
  usage: {
    use: ["Espera curta de uma ação, dentro de um botão ou ao lado de um texto.", "Carregamento de algo pequeno, quando o formato do conteúdo não é conhecido."],
    avoid: ["Carregamento de uma área inteira com formato conhecido: use Skeleton.", "Progresso que pode ser medido: use Progress."],
  },
  props: [
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "14, 16 ou 24px." },
    { name: "label", type: "string", default: '"Carregando"', description: "Texto anunciado no status." },
    { name: "decorative", type: "boolean", default: "false", description: "Remove o role status, para usar dentro de algo que já anuncia." },
    classNameProp,
  ],
  examples: [
    {
      title: "Tamanhos e cores",
      code: `<Spinner size="sm" />\n<Spinner />\n<Spinner size="lg" className="text-accent-text" />`,
      render: () => (
        <>
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" className="text-accent-text" />
        </>
      ),
    },
  ],
  a11y: ["Tem role status e rótulo escondido.", "Com movimento reduzido, para de girar e vira um anel estático."],
};
