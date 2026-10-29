import { Separator } from "@/registry/marcio/ui/separator";
import { Text } from "@/registry/marcio/ui/typography";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("separator"),
  usage: {
    use: ["Separar grupos dentro de um card, menu ou barra de ferramentas.", "Linha vertical entre ações agrupadas."],
    avoid: ["Separar seções de página: espaço e títulos bastam.", "Linhas de tabela: a Table já traz as bordas."],
  },
  props: [
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção da linha. Na vertical, estica até a altura do pai." },
    { name: "decorative", type: "boolean", default: "true", description: "Sem semântica. Com false, vira role separator para leitores de tela." },
    classNameProp,
  ],
  examples: [
    {
      title: "Horizontal e vertical",
      className: "w-full flex-col items-stretch",
      code: `<Separator />\n<div className="flex h-6 items-center gap-3">\n  <span>Editar</span>\n  <Separator orientation="vertical" />\n  <span>Duplicar</span>\n</div>`,
      render: () => (
        <>
          <Text size="mono-sm" tone="muted">projetos</Text>
          <Separator />
          <div className="flex h-6 items-center gap-3 font-mono text-mono-sm text-ink-soft">
            <span>Editar</span>
            <Separator orientation="vertical" />
            <span>Duplicar</span>
            <Separator orientation="vertical" />
            <span>Arquivar</span>
          </div>
        </>
      ),
    },
  ],
  a11y: ["Por padrão é decorativo e fica fora da árvore de acessibilidade.", "Use decorative={false} só quando a divisão tiver significado, como entre grupos de um menu."],
};
