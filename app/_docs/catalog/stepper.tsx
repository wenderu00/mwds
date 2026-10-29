import { Stepper } from "@/registry/marcio/ui/stepper";
import { StepperDemo } from "../demos/stepper";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("stepper"),
  usage: {
    use: ["Formulários longos divididos em etapas que seguem uma ordem.", "Mostrar onde a pessoa está e quanto falta, de três a seis etapas.", "Com onStepChange, voltar a uma etapa já concluída."],
    avoid: ["Seções que podem ser visitadas em qualquer ordem: use Tabs.", "Progresso de uma tarefa automática: use Progress.", "Duas etapas só: um título com Etapa 1 de 2 basta."],
  },
  props: [
    { name: "steps", type: "{ title, description? }[]", description: "Etapas em ordem." },
    { name: "current", type: "number", description: "Índice da etapa atual, a partir de 0. As anteriores ficam concluídas." },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "No celular, a horizontal empilha." },
    { name: "onStepChange", type: "(index) => void", description: "Torna as etapas concluídas clicáveis." },
    { name: "aria-label", type: "string", default: '"Etapas"', description: "Nome da lista." },
  ],
  examples: [
    {
      title: "Fluxo de cadastro",
      className: "w-full",
      stacked: true,
      code: `<Stepper\n  aria-label="Cadastro"\n  current={etapa}\n  onStepChange={setEtapa}\n  steps={[\n    { title: "Dados", description: "Nome e documento" },\n    { title: "Endereço", description: "CEP e número" },\n    { title: "Revisão", description: "Confira e envie" },\n  ]}\n/>`,
      render: () => <StepperDemo />,
    },
    {
      title: "Vertical",
      code: `<Stepper orientation="vertical" current={1} steps={etapas} />`,
      render: () => (
        <Stepper
          orientation="vertical"
          current={1}
          aria-label="Implantação"
          steps={[
            { title: "Contrato assinado", description: "12/10/2026" },
            { title: "Configuração", description: "em andamento" },
            { title: "Treinamento" },
          ]}
        />
      ),
    },
  ],
  a11y: [
    "É uma lista ordenada; a etapa atual tem aria-current step e cada etapa diz o estado em texto (concluída, etapa atual, pendente).",
    "O estado não depende só de cor: concluída mostra o check, atual tem borda e número, pendente fica em ink-muted.",
    "Só as etapas concluídas viram botão. As pendentes não são clicáveis para não pular validações.",
  ],
  keyboard: [
    { keys: "Tab", action: "Com onStepChange, percorre as etapas concluídas." },
    { keys: "Enter / Espaço", action: "Volta para a etapa concluída com foco." },
  ],
};
