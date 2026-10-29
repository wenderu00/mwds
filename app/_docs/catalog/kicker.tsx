import { Kicker } from "@/registry/marcio/ui/kicker";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("kicker"),
  usage: {
    use: ["Rotular uma seção antes do título, com uma ou duas palavras.", "Indicar a categoria de uma página, como no topo das páginas de componente."],
    avoid: ["Frases inteiras: o kicker é lido como etiqueta, não como texto.", "Substituir o título: ele sempre vem acompanhado de um."],
  },
  props: [asChildProp, classNameProp],
  examples: [
    {
      title: "Acima de um título",
      code: `<Kicker>Produto próprio · cofundador</Kicker>\n<h3 className="font-display text-display-sm font-extrabold">ResenhaHub</h3>`,
      render: () => (
        <div className="flex flex-col gap-2">
          <Kicker>Produto próprio · cofundador</Kicker>
          <h3 className="font-display text-display-sm font-extrabold">ResenhaHub</h3>
        </div>
      ),
    },
  ],
  a11y: ["É texto comum, lido antes do título. Não use para conteúdo que só faça sentido visualmente."],
};
