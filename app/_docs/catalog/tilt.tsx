import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Tilt } from "@/registry/marcio/ui/tilt";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("tilt"),
  usage: {
    use: ["Cards de projeto e vitrines em páginas de conteúdo."],
    avoid: ["Cards com formulário ou muitos controles: a inclinação atrapalha a mira.", "Listas longas: vira ruído."],
  },
  props: [{ name: "max", type: "number", default: "6", description: "Inclinação máxima em graus." }, classNameProp],
  examples: [
    {
      title: "Card",
      code: `<Tilt>\n  <Card>...</Card>\n</Tilt>`,
      render: () => (
        <Tilt>
          <Card className="w-64">
            <CardHeader>
              <CardTitle>BioQuest</CardTitle>
              <CardDescription>Passe o mouse por cima.</CardDescription>
            </CardHeader>
          </Card>
        </Tilt>
      ),
    },
  ],
  a11y: ["Só responde a mouse: toque e caneta não inclinam.", "Com movimento reduzido, fica parado."],
};
