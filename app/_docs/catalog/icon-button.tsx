import { Pencil, Trash2 } from "lucide-react";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("icon-button"),
  usage: {
    use: ["Ações repetidas em linhas de tabela e listas, como editar e excluir.", "Ações de barra de ferramentas cujo ícone é conhecido: fechar, menu, buscar.", "Sempre com Tooltip quando o ícone não for óbvio."],
    avoid: ["A ação principal da tela: use Button com texto.", "Ícones ambíguos sem Tooltip."],
  },
  props: [
    { name: "aria-label", type: "string", description: "Obrigatório. É o nome do botão para leitor de tela e comando de voz." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "36px, altura de controle (acompanha a densidade) ou 48px." },
    { name: "variant", type: '"ghost" | "secondary" | "primary" | "danger"', default: '"ghost"', description: "As mesmas variantes do Button." },
    { name: "loading", type: "boolean", default: "false", description: "Troca o ícone pelo spinner, desabilita e marca aria-busy." },
    asChildProp,
    classNameProp,
  ],
  examples: [
    {
      title: "Tamanhos",
      code: `<IconButton size="sm" variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton size="lg" variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>`,
      render: () => (
        <>
          <IconButton size="sm" variant="secondary" aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
          <IconButton variant="secondary" aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
          <IconButton size="lg" variant="secondary" aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
        </>
      ),
    },
    {
      title: "Variantes",
      code: `<IconButton aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="primary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="danger" aria-label="Excluir projeto"><Trash2 aria-hidden="true" /></IconButton>`,
      render: () => (
        <>
          <IconButton aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
          <IconButton variant="secondary" aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
          <IconButton variant="primary" aria-label="Editar projeto">
            <Pencil aria-hidden="true" />
          </IconButton>
          <IconButton variant="danger" aria-label="Excluir projeto">
            <Trash2 aria-hidden="true" />
          </IconButton>
        </>
      ),
    },
    {
      title: "Com Tooltip",
      description: "O Tooltip repete o aria-label para quem usa o mouse. Os dois textos devem ser iguais.",
      code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <IconButton aria-label="Editar projeto">\n      <Pencil aria-hidden="true" />\n    </IconButton>\n  </TooltipTrigger>\n  <TooltipContent>Editar projeto</TooltipContent>\n</Tooltip>`,
      render: () => (
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>Editar projeto</TooltipContent>
        </Tooltip>
      ),
    },
    {
      title: "Carregando",
      code: `<IconButton variant="secondary" aria-label="Salvar" loading><Pencil aria-hidden="true" /></IconButton>`,
      render: () => (
        <IconButton variant="secondary" aria-label="Salvar" loading>
          <Pencil aria-hidden="true" />
        </IconButton>
      ),
    },
  ],
  a11y: [
    "O nome vem do aria-label, que o tipo exige: sem ele o código não compila.",
    "O ícone leva aria-hidden, para o leitor de tela anunciar só o nome.",
    "Use o mesmo texto no aria-label e no Tooltip.",
    "Em loading, o ícone dá lugar ao spinner e o botão fica com aria-busy.",
  ],
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao botão. Com Tooltip, mostra a dica." },
    { keys: "Enter / Espaço", action: "Ativa o botão." },
    { keys: "Esc", action: "Fecha o Tooltip, quando houver." },
  ],
};
