import { Castle, Coins, Trees } from "lucide-react";
import { IconTile } from "@/registry/marcio/ui/icon-tile";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("icon-tile"),
  usage: {
    use: ["Ícone que identifica um item numa lista ou card: edifício, recurso, tipo de arquivo.", "Distinguir categorias junto do nome, com category de 1 a 8."],
    avoid: ["Ícone dentro de botão ou de texto: use o ícone direto, em size-4 ou size-5.", "Indicar status com a cor da categoria: use Badge com tone.", "Categoria como única pista: sempre ao lado de um nome."],
  },
  props: [
    { name: "size", type: '"md" | "lg"', default: '"md"', description: "size-10 ou size-12. O ícone fica em size-6 nos dois." },
    { name: "category", type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8", description: "Fundo category-N-soft e ícone category-N-text. Sem ela, surface." },
    classNameProp,
  ],
  examples: [
    {
      title: "Categorias",
      code: `<IconTile category={1}><Castle /></IconTile>\n<IconTile category={2} size="lg"><Trees /></IconTile>\n<IconTile><Coins /></IconTile>`,
      render: () => (
        <div className="flex items-center gap-3">
          <IconTile category={1}>
            <Castle />
          </IconTile>
          <IconTile category={2} size="lg">
            <Trees />
          </IconTile>
          <IconTile>
            <Coins />
          </IconTile>
        </div>
      ),
    },
  ],
  a11y: ["O tile é decorativo e fica escondido do leitor de tela; o nome do item vem do texto ao lado.", "O ícone usa category-N-text, que passa 4.5:1 sobre o fundo suave da categoria."],
};
