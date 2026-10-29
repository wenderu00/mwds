import { TourDemo } from "../demos/tour";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("tour"),
  usage: {
    use: [
      "Apresentar de três a seis pontos de uma tela nova, no primeiro uso ou quando a pessoa pede.",
      "Mostrar onde fica um recurso que mudou de lugar, com o alvo destacado.",
    ],
    avoid: [
      "Explicar um campo ou botão sozinho: use Tooltip ou o texto de ajuda do FormField.",
      "Tarefa com etapas que a pessoa precisa cumprir: use Stepper.",
      "Aviso que vale para a tela inteira: use Alert.",
      "Conteúdo que a pessoa precisa para usar a tela: escreva na própria tela, não esconda num tour.",
    ],
  },
  props: [
    { name: "steps", type: "{ target?, title?, content, placement? }[]", description: "Passos em ordem. target é um seletor CSS ou uma ref; sem target, o balão fica no centro." },
    { name: "placement", type: '"top" | "bottom" | "left" | "right" | "center"', default: '"bottom"', description: "Lado do alvo em que o balão abre; center ignora o alvo. Sem espaço, o balão troca de lado." },
    { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open) => void", default: "- / false / -", description: "Uso controlado com open, ou só defaultOpen para abrir sozinho na primeira visita. Pular, Esc e Entendi fecham e chamam onOpenChange(false)." },
    { name: "step / onStepChange", type: "number / (step) => void", description: "Passo atual, a partir de 0. Sem step, o Tour guarda o passo e volta ao primeiro quando reabre." },
    { name: "onFinish", type: "() => void", description: "Entendi no último passo. Bom lugar para gravar que a pessoa já viu o tour." },
    { name: "onSkip", type: "(step) => void", description: "Pular ou Esc, com o passo em que a pessoa parou." },
    { name: "labels", type: "Partial<TourLabels>", default: '"Pular", "Voltar", "Avançar", "Entendi", "1 de 6"', description: "Rótulos dos botões, do contador (counter) e o nome do diálogo quando o passo não tem título (dialog)." },
    classNameProp,
  ],
  examples: [
    {
      title: "Primeiro uso",
      description: "O Tour não guarda se a pessoa já viu: grave isso no onFinish e no onSkip, no armazenamento do app.",
      className: "w-full",
      code: `const [open, setOpen] = useState(!jaViuOTour);

<Tour
open={open}
onOpenChange={setOpen}
onFinish={marcarComoVisto}
onSkip={marcarComoVisto}
steps={[
  { target: timerRef, title: "Tempo restante", content: "Cada ciclo de foco tem 25 minutos.", placement: "right" },
  { target: "#iniciar", title: "Comece por aqui", content: "Inicie o foco e o tempo começa a contar." },
  { title: "Tudo pronto", content: "Você pode rever este tour nas configurações." },
]}
/>`,
      render: () => <TourDemo />,
    },
  ],
  a11y: [
    "O balão é um diálogo modal (role dialog e aria-modal), nomeado pelo título do passo e descrito pelo conteúdo. Passo sem título usa labels.dialog.",
    "O foco fica preso no balão, começa no Avançar e volta ao elemento que tinha o foco quando o tour fecha.",
    "Contador, título e conteúdo ficam numa região status: cada passo novo é anunciado sem tirar o foco do botão.",
    "O alvo rola até o centro da tela; com movimento reduzido, a rolagem é imediata e o recorte não desliza entre os passos.",
    "Clique fora do balão não fecha o tour, para ninguém pular sem querer. Para sair, Pular ou Esc.",
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", action: "Percorre Pular, Voltar e Avançar, sem sair do balão." },
    { keys: "Enter / Espaço", action: "Aciona o botão com foco." },
    { keys: "Esc", action: "Pula o tour e devolve o foco." },
  ],
};
