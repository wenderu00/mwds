"use client";

import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { Progress } from "@/registry/marcio/ui/progress";

export function ProgressDemo() {
  const [value, setValue] = useState(35);
  return (
    <div className="flex w-full flex-col gap-4">
      <Progress value={value} label="Enviando 3 arquivos" showValue />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.max(0, v - 15))}>
          -15%
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.min(100, v + 15))}>
          +15%
        </Button>
      </div>
    </div>
  );
}
