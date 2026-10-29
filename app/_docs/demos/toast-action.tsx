"use client";

import { Button } from "@/registry/marcio/ui/button";
import { toast } from "@/registry/marcio/ui/toast";

export function ToastActionDemo() {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() =>
        toast({
          title: "Projeto arquivado",
          action: { label: "Desfazer", altText: "Desfazer arquivamento", onClick: () => toast({ tone: "info", title: "Arquivamento desfeito" }) },
        })
      }
    >
      Arquivar projeto
    </Button>
  );
}
