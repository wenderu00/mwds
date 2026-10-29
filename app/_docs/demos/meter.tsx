"use client";

import { Coins } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { Meter } from "@/registry/marcio/ui/meter";

export function MeterDemo() {
  const [gold, setGold] = useState(1234);
  const [loots, setLoots] = useState(0);
  return (
    <div className="flex w-full flex-col gap-4">
      <Meter label="Ouro" value={gold} max={5000} rate="+40/min" icon={<Coins />} highlightKey={loots} />
      <Button
        size="sm"
        variant="secondary"
        className="self-start"
        onClick={() => {
          setGold((value) => Math.min(5000, value + 250));
          setLoots((count) => count + 1);
        }}
      >
        Saquear
      </Button>
    </div>
  );
}
