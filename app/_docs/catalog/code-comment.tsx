import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("code-comment"),
  usage: {
    use: ["Metadados, legendas, caminhos de arquivo e estados vazios curtos.", "Rótulos de painel, como // escuro e // claro nas prévias."],
    avoid: ["Mensagens de erro ou avisos: use FormField, Alert ou Toast.", "Texto que a pessoa precisa ler para agir: o tom de comentário diz que é secundário."],
  },
  props: [classNameProp],
  examples: [
    {
      title: "Legenda",
      code: `<CodeComment>disponível para projetos full-stack</CodeComment>`,
      render: () => <CodeComment>disponível para projetos full-stack</CodeComment>,
    },
  ],
  a11y: ["As barras ficam com aria-hidden: o leitor de tela lê só o texto."],
};
