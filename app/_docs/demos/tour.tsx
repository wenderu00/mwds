"use client";

import { useRef, useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { Tour } from "@/registry/marcio/ui/tour";

export function TourDemo() {
  const [open, setOpen] = useState(false);
  const timer = useRef<HTMLParagraphElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p ref={timer} className="font-mono text-display-sm text-ink">
        25:00
      </p>
      <div className="flex gap-2">
        <Button ref={start} size="sm">
          Iniciar foco
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Ver tour
        </Button>
      </div>
      <Tour
        open={open}
        onOpenChange={setOpen}
        steps={[
          { target: timer, title: "Tempo restante", content: "Cada ciclo de foco tem 25 minutos.", placement: "right" },
          { target: start, title: "Comece por aqui", content: "Inicie o foco e o tempo começa a contar." },
          { title: "Tudo pronto", content: "Você pode rever este tour nas configurações." },
        ]}
      />
    </div>
  );
}

// Envio simulado: 20% a cada 300ms; o segundo arquivo da lista cai em 60% na primeira tentativa.
