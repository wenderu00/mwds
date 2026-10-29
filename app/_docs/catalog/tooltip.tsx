import { Pencil } from "lucide-react";
import { Button } from "@/registry/marcio/ui/button";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("tooltip"),
  usage: {
    use: ["Nomear botões só com ícone, repetindo o aria-label.", "Uma dica curta de uma linha sobre um controle."],
    avoid: ["Informação essencial: no toque, o tooltip não aparece.", "Conteúdo interativo, como links ou botões: use Popover.", "Texto longo: use a descrição do FormField."],
  },
  keyboard: [
    { keys: "Tab", action: "Focar o gatilho mostra a dica." },
    { keys: "Esc", action: "Fecha a dica sem tirar o foco." },
  ],
  props: [
    { name: "TooltipProvider delayDuration", type: "number", default: "300", description: "Atraso para abrir. Coloque o provider no layout raiz." },
    { name: "TooltipContent side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Lado preferido." },
  ],
  examples: [
    {
      title: "Em botão de ícone",
      code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <IconButton aria-label="Editar projeto">\n      <Pencil aria-hidden="true" />\n    </IconButton>\n  </TooltipTrigger>\n  <TooltipContent>Editar projeto</TooltipContent>\n</Tooltip>`,
      render: () => (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton aria-label="Editar projeto">
                <Pencil aria-hidden="true" />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Editar projeto</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">
                Passe o mouse
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Aparece embaixo</TooltipContent>
          </Tooltip>
        </>
      ),
    },
  ],
  a11y: ["Abre também com foco de teclado e fecha com Esc.", "Não coloque conteúdo interativo dentro do tooltip.", "O tooltip abre no tema da página."],
};
