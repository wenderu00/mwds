import { Avatar, AvatarGroup } from "@/registry/marcio/ui/avatar";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("avatar"),
  usage: {
    use: ["Identificar uma pessoa ao lado do nome, em listas, comentários e no cabeçalho.", "AvatarGroup para mostrar quem participa de algo, com contagem do resto."],
    avoid: ["Logos de empresa ou ícones de categoria: avatar é para pessoas.", "Sozinho sem o nome por perto, quando o nome importa para a tarefa."],
  },
  props: [
    { name: "name", type: "string", description: "Nome da pessoa: vira o nome acessível e as iniciais." },
    { name: "src", type: "string", description: "Foto. Se falhar ou não existir, mostra as iniciais." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "32, 40 ou 56px." },
    { name: "decorative", type: "boolean", default: "false", description: "Esconde do leitor de tela quando o nome já aparece ao lado." },
    classNameProp,
  ],
  examples: [
    {
      title: "Tamanhos e grupo",
      code: `<Avatar name="Márcio Wendell" size="lg" />\n<AvatarGroup>\n  <Avatar name="Ana Lima" size="sm" />\n  <Avatar name="Bruno Souza" size="sm" />\n</AvatarGroup>`,
      render: () => (
        <>
          <Avatar name="Márcio Wendell" size="lg" />
          <Avatar name="Ana Lima" />
          <Avatar name="Bruno Souza" size="sm" />
          <AvatarGroup>
            <Avatar name="Carla Dias" size="sm" />
            <Avatar name="Diego Melo" size="sm" />
            <Avatar name="Elisa Rocha" size="sm" />
          </AvatarGroup>
        </>
      ),
    },
    {
      title: "Com nome ao lado",
      code: `<div className="flex items-center gap-3">\n  <Avatar name="Márcio Wendell" decorative />\n  <span>Márcio Wendell</span>\n</div>`,
      render: () => (
        <div className="flex items-center gap-3">
          <Avatar name="Márcio Wendell" decorative />
          <span className="flex flex-col leading-tight">
            <span className="font-medium">Márcio Wendell</span>
            <span className="font-mono text-mono-xs text-ink-muted">desenvolvedor</span>
          </span>
        </div>
      ),
    },
  ],
  a11y: ["Sem decorative, tem role img com o nome da pessoa.", "As iniciais ficam escondidas: o leitor de tela ouve o nome completo."],
};
