import { Progress } from "@/registry/marcio/ui/progress";
import { ProgressDemo } from "../demos/progress";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("progress"),
  usage: {
    use: ["Tarefas que demoram e podem ser medidas: envio de arquivo, importação, etapas.", "Sem valor, quando a tarefa demora mas não dá para medir."],
    avoid: ["Esperas curtas: use Spinner.", "Mostrar uma quantidade, como espaço usado em disco, quando não há tarefa em andamento: prefira texto."],
  },
  props: [
    { name: "value", type: "number | null", default: "null", description: "Progresso; null deixa indeterminado." },
    { name: "max", type: "number", default: "100", description: "Valor máximo." },
    { name: "label", type: "ReactNode", description: "Rótulo visível que nomeia a barra." },
    { name: "showValue", type: "boolean", default: "false", description: "Mostra a porcentagem em mono." },
    { name: "valueText", type: "string", description: "Texto no lugar da porcentagem, como um tempo restante. O leitor de tela anuncia o mesmo texto." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Altura da barra." },
    classNameProp,
  ],
  examples: [
    {
      title: "Determinado",
      className: "w-full",
      code: `<Progress value={35} label="Enviando 3 arquivos" showValue />`,
      render: () => <ProgressDemo />,
    },
    {
      title: "Indeterminado",
      className: "w-full",
      code: `<Progress label="Processando relatório" />`,
      render: () => <Progress label="Processando relatório" className="w-full" />,
    },
    {
      title: "Com tempo restante",
      className: "w-full",
      code: `<Progress value={45} max={120} label="Treino de lanceiros" showValue valueText="1 min 15 s" />`,
      render: () => <Progress value={45} max={120} label="Treino de lanceiros" showValue valueText="1 min 15 s" className="w-full" />,
    },
  ],
  a11y: [
    "Tem role progressbar com aria-valuenow; sem valor, o leitor de tela anuncia progresso indeterminado.",
    "Com movimento reduzido, a barra indeterminada fica parada e esmaecida.",
  ],
};
