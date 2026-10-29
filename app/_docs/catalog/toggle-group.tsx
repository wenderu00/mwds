import { Columns3, LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/marcio/ui/toggle-group";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("toggle-group"),
  usage: {
    use: ["Trocar a visualização dos mesmos dados: lista, grade, quadro.", "Filtros rápidos de duas a cinco opções sobre uma lista, com type multiple quando combinam.", "Formatação de texto, como negrito e itálico, com type multiple."],
    avoid: ["Trocar de painel de conteúdo: use Tabs.", "Valor de formulário enviado depois: use RadioGroup ou Checkbox.", "Mais de cinco opções: use Select."],
  },
  props: [
    { name: "type", type: '"single" | "multiple"', description: "Um item ativo por vez (radio) ou vários (botões de alternar)." },
    { name: "value / onValueChange", type: "string | string[] / (value) => void", description: "Uso controlado. Em single, clicar no ativo desmarca; passe o valor de volta para impedir." },
    { name: "aria-label", type: "string", description: "Obrigatório. Nome do grupo." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "md acompanha h-control e a densidade." },
    { name: "ToggleGroupItem value", type: "string", description: "Valor do item." },
  ],
  examples: [
    {
      title: "Visualização",
      code: `<ToggleGroup type="single" defaultValue="lista" aria-label="Visualização">\n  <ToggleGroupItem value="lista"><List aria-hidden="true" />Lista</ToggleGroupItem>\n  <ToggleGroupItem value="grade"><LayoutGrid aria-hidden="true" />Grade</ToggleGroupItem>\n  <ToggleGroupItem value="quadro"><Columns3 aria-hidden="true" />Quadro</ToggleGroupItem>\n</ToggleGroup>`,
      render: () => (
        <ToggleGroup type="single" defaultValue="lista" aria-label="Visualização">
          <ToggleGroupItem value="lista">
            <List aria-hidden="true" />
            Lista
          </ToggleGroupItem>
          <ToggleGroupItem value="grade">
            <LayoutGrid aria-hidden="true" />
            Grade
          </ToggleGroupItem>
          <ToggleGroupItem value="quadro">
            <Columns3 aria-hidden="true" />
            Quadro
          </ToggleGroupItem>
        </ToggleGroup>
      ),
    },
    {
      title: "Filtros combináveis",
      code: `<ToggleGroup type="multiple" size="sm" defaultValue={["ativos"]} aria-label="Filtrar projetos">\n  <ToggleGroupItem value="ativos">ativos</ToggleGroupItem>\n  <ToggleGroupItem value="pausados">pausados</ToggleGroupItem>\n  <ToggleGroupItem value="arquivados">arquivados</ToggleGroupItem>\n</ToggleGroup>`,
      render: () => (
        <ToggleGroup type="multiple" size="sm" defaultValue={["ativos"]} aria-label="Filtrar projetos">
          <ToggleGroupItem value="ativos">ativos</ToggleGroupItem>
          <ToggleGroupItem value="pausados">pausados</ToggleGroupItem>
          <ToggleGroupItem value="arquivados">arquivados</ToggleGroupItem>
        </ToggleGroup>
      ),
    },
  ],
  a11y: [
    "Com type single, o grupo é um radiogroup e cada item um radio com aria-checked. Com multiple, cada item é um botão com aria-pressed.",
    "Item só com ícone precisa de aria-label.",
    "O item ativo usa accent com texto on-accent: a diferença não depende só de cor, porque o fundo inteiro muda.",
  ],
  keyboard: [
    { keys: "Tab", action: "Entra no grupo pelo item ativo, ou pelo primeiro, e sai do grupo." },
    { keys: "Setas", action: "Movem o foco entre os itens." },
    { keys: "Home / End", action: "Vão para o primeiro e o último item." },
    { keys: "Espaço / Enter", action: "Ativa ou desativa o item com foco." },
  ],
};
