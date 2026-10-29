"use client";

import { useState } from "react";
import { Alert } from "@/registry/marcio/ui/alert";
import { Button } from "@/registry/marcio/ui/button";
import { toast } from "@/registry/marcio/ui/toast";

export function AlertDismissDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
        Mostrar aviso de novo
      </Button>
    );
  }
  return (
    <Alert
      tone="warning"
      title="Sua sessão expira em 5 minutos"
      onDismiss={() => setVisible(false)}
      action={
        <Button size="sm" variant="secondary" onClick={() => toast({ tone: "success", title: "Sessão renovada" })}>
          Continuar conectado
        </Button>
      }
      className="w-full"
    >
      Salve o que estiver editando para não perder alterações.
    </Alert>
  );
}
