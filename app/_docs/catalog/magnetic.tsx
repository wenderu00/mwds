import { Button } from "@/registry/marcio/ui/button";
import { Magnetic } from "@/registry/marcio/ui/magnetic";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("magnetic"),
  usage: {
    use: ["A ação principal de um hero, como o botão de contato."],
    avoid: ["Vários na mesma tela: o efeito perde a graça e cansa.", "Botões de formulário e de diálogo."],
  },
  props: [{ name: "strength", type: "number", default: "0.3", description: "Fração da distância ao centro que o filho acompanha." }, classNameProp],
  examples: [
    {
      title: "Botão",
      code: `<Magnetic>\n  <Button>Vamos conversar</Button>\n</Magnetic>`,
      render: () => (
        <Magnetic>
          <Button>Vamos conversar</Button>
        </Magnetic>
      ),
    },
  ],
  a11y: ["O alvo de clique continua sendo o filho: o deslocamento é visual.", "Só responde a mouse e fica parado com movimento reduzido."],
};
