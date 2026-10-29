"use client";

import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { Sentinel, type SentinelPose } from "@/registry/marcio/ui/character-sentinel";

const poseLabels: Record<SentinelPose, string> = { idle: "Parada", celebrar: "Celebrar", duvida: "Dúvida" };

export function SentinelDemo() {
  const [pose, setPose] = useState<SentinelPose>("idle");
  return (
    <div className="flex flex-col items-center gap-4">
      <Sentinel pose={pose} label={`Sentinela, pose ${poseLabels[pose].toLowerCase()}`} />
      <div className="flex gap-2">
        {(Object.keys(poseLabels) as SentinelPose[]).map((name) => (
          <Button key={name} size="sm" variant={pose === name ? "primary" : "secondary"} aria-pressed={pose === name} onClick={() => setPose(name)}>
            {poseLabels[name]}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Animação própria: a bola quica; com movimento reduzido, só acende.
