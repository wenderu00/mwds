import { Textarea } from "@/registry/marcio/ui/textarea";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("textarea"),
  usage: {
    use: ["Texto de várias linhas: descrição, comentário, mensagem.", "Mostre o limite de caracteres na descrição do FormField quando houver."],
    avoid: ["Texto curto de uma linha: use Input."],
  },
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao campo. Dentro dele, Tab sai do campo, não insere tabulação." },
    { keys: "Enter", action: "Quebra a linha; não envia o formulário." },
  ],
  props: [{ name: "rows", type: "number", default: "4", description: "Linhas visíveis iniciais." }, classNameProp],
  examples: [
    {
      title: "Mensagem",
      className: "w-full",
      code: `<Textarea placeholder="Conte um pouco sobre o projeto" />`,
      render: () => <Textarea aria-label="Mensagem" placeholder="Conte um pouco sobre o projeto" />,
    },
  ],
  a11y: ["Mesmas regras do Input: rótulo visível e erro indicado também por texto."],
};
