"use client";

import { Button } from "@/registry/marcio/ui/button";
import { toast, type ToastTone } from "@/registry/marcio/ui/toast";

const samples: { tone: ToastTone; label: string; title: string; description: string }[] = [
  { tone: "success", label: "Sucesso", title: "Conta criada", description: "Você já pode entrar no painel." },
  { tone: "danger", label: "Erro", title: "Não foi possível salvar", description: "Verifique a conexão e tente de novo." },
  { tone: "warning", label: "Aviso", title: "Sessão expira em 5 minutos", description: "Salve o que estiver editando." },
  { tone: "info", label: "Info", title: "Nova versão disponível", description: "Recarregue a página para atualizar." },
  { tone: "neutral", label: "Neutro", title: "Rascunho salvo", description: "Última alteração agora." },
];

export function ToastDemo() {
  return (
    <>
      {samples.map((sample) => (
        <Button
          key={sample.tone}
          variant="secondary"
          size="sm"
          onClick={() => toast({ tone: sample.tone, title: sample.title, description: sample.description })}
        >
          {sample.label}
        </Button>
      ))}
    </>
  );
}
