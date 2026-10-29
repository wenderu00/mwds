import { ToastActionDemo } from "../demos/toast-action";
import { ToastDemo } from "../demos/toast";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("toast"),
  usage: {
    use: ["Resultado passageiro de uma ação: Salvo, Projeto excluído, Convite enviado.", "Uma ação rápida opcional, como Desfazer."],
    avoid: ["Erro que impede continuar ou estado que continua valendo: use Alert.", "Informação essencial ou que pede decisão: o toast some sozinho.", "Erro de campo: use o error do FormField."],
  },
  keyboard: [
    { keys: "F8", action: "Leva o foco à região de notificações." },
    { keys: "Tab", action: "Percorre a ação e o botão de fechar do toast." },
    { keys: "Esc", action: "Fecha o toast com foco." },
  ],
  props: [
    { name: "toast({ title })", type: "ReactNode", description: "Título obrigatório." },
    { name: "toast({ description })", type: "ReactNode", description: "Texto de apoio." },
    { name: "toast({ tone })", type: '"neutral" | "success" | "danger" | "warning" | "info"', default: '"neutral"', description: "Cor da faixa. danger interrompe o leitor de tela." },
    { name: "toast({ action })", type: "{ label, altText, onClick }", description: "Botão de ação, como Desfazer." },
    { name: "toast({ duration })", type: "number", default: "5000", description: "Tempo em ms antes de sumir." },
    { name: "<Toaster />", type: "componente", description: "Coloque uma vez no layout raiz." },
  ],
  examples: [
    {
      title: "Tons",
      description: "Os toasts aparecem no tema da página.",
      code: `toast({ tone: "success", title: "Conta criada", description: "Você já pode entrar no painel." })`,
      render: () => <ToastDemo />,
    },
    {
      title: "Com ação",
      code: `toast({\n  title: "Projeto arquivado",\n  action: { label: "Desfazer", altText: "Desfazer arquivamento", onClick: desfazer },\n})`,
      render: () => <ToastActionDemo />,
    },
  ],
  a11y: [
    "Os toasts ficam numa região rotulada Notificações, alcançável com F8.",
    "O tempo pausa com mouse em cima ou foco dentro.",
    "Não coloque informação essencial só no toast: ele some.",
  ],
};
