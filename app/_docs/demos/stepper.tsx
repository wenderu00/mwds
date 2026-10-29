"use client";

import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { Stepper } from "@/registry/marcio/ui/stepper";

const demoSteps = [
  { title: "Dados", description: "Nome e documento" },
  { title: "Endereço", description: "CEP e número" },
  { title: "Revisão", description: "Confira e envie" },
];

export function StepperDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper steps={demoSteps} current={current} onStepChange={setCurrent} aria-label="Cadastro" />
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Voltar
        </Button>
        <Button size="sm" disabled={current === demoSteps.length} onClick={() => setCurrent(current + 1)}>
          {current >= demoSteps.length - 1 ? "Concluir" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
