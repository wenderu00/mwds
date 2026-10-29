import { Kbd } from "@/registry/marcio/ui/kbd";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("kbd"),
  usage: {
    use: ["Mostrar atalhos de teclado em textos de ajuda, tooltips e gatilhos.", "Uma tecla por Kbd; combine com + no texto: Ctrl + K."],
    avoid: ["Atalhos dentro de itens de menu: use DropdownMenuShortcut ou CommandShortcut, que alinham à direita.", "Código ou nomes de variável: use code."],
  },
  props: [classNameProp],
  examples: [
    {
      title: "Atalhos",
      code: `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`,
      render: () => (
        <>
          <span className="flex items-center gap-1 text-ink-soft">
            <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
          </span>
          <span className="flex items-center gap-1 text-ink-soft">
            <Kbd>Esc</Kbd> fecha
          </span>
          <span className="flex items-center gap-1 text-ink-soft">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navegam
          </span>
        </>
      ),
    },
  ],
  a11y: ["Usa a tag kbd, que leitores de tela podem anunciar como entrada de teclado.", "Setas e símbolos: escreva também o nome por perto quando o símbolo sozinho não for claro."],
};
