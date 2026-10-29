import { Alert } from "@/registry/marcio/ui/alert";
import { AlertDismissDemo } from "../demos/alert-dismiss";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("alert"),
  usage: {
    use: ["Um estado que continua valendo enquanto a pessoa está na página: sessão expirando, conta pendente, erro ao carregar.", "Avisos que pedem ação, com o botão dentro do Alert."],
    avoid: ["Resultado passageiro de uma ação, como Salvo: use Toast.", "Erro de um campo: use o error do FormField.", "Confirmar uma ação: use AlertDialog."],
  },
  dosDonts: [
    {
      do: {
        caption: "Um estado que continua valendo e pede ação fica na tela.",
        render: () => (
          <Alert tone="warning" title="Sessão expirando" className="w-full">
            Salve o rascunho: a sessão termina em 5 minutos.
          </Alert>
        ),
      },
      dont: {
        caption: "Confirmação passageira presa na página vira ruído. Use Toast.",
        render: () => (
          <Alert tone="success" title="Salvo" className="w-full">
            As alterações foram salvas.
          </Alert>
        ),
      },
    },
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre a ação e o botão de fechar, quando houver." },
    { keys: "Enter / Espaço", action: "Ativa o botão com foco." },
  ],
  props: [
    { name: "tone", type: '"neutral" | "info" | "success" | "warning" | "danger"', default: '"neutral"', description: "Estado." },
    { name: "title", type: "ReactNode", description: "Título no tom do estado." },
    { name: "action", type: "ReactNode", description: "Botões abaixo do texto." },
    { name: "onDismiss", type: "() => void", description: "Mostra o botão de fechar." },
    { name: "icon", type: "ReactNode | false", description: "Troca ou remove o ícone." },
    { name: "role", type: '"alert" | "status"', description: "Só quando o aviso aparece depois de uma ação, para ser anunciado." },
    classNameProp,
  ],
  examples: [
    {
      title: "Estados",
      className: "w-full flex-col items-stretch",
      code: `<Alert tone="success" title="Pagamento confirmado">O recibo foi enviado por e-mail.</Alert>`,
      render: () => (
        <>
          <Alert title="Manutenção programada">Domingo, das 2h às 4h.</Alert>
          <Alert tone="info" title="Nova versão disponível">Recarregue para atualizar.</Alert>
          <Alert tone="success" title="Pagamento confirmado">O recibo foi enviado por e-mail.</Alert>
          <Alert tone="warning" title="Plano perto do limite">Você usou 90% do armazenamento.</Alert>
          <Alert tone="danger" title="Falha na sincronização">Os dados de ontem não foram importados.</Alert>
        </>
      ),
    },
    {
      title: "Com ação e fechar",
      className: "w-full",
      code: `<Alert tone="warning" title="Sua sessão expira em 5 minutos" onDismiss={fechar} action={<Button size="sm" variant="secondary">Continuar conectado</Button>}>\n  Salve o que estiver editando.\n</Alert>`,
      render: () => <AlertDismissDemo />,
    },
  ],
  a11y: [
    "Por padrão não tem role: avisos que já estão na página ao carregar não devem interromper o leitor de tela.",
    "Ícone e título dizem o estado: a cor não é a única pista.",
  ],
};
