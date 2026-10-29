"use client";

import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { CharacterStage, type CharacterAnimate } from "@/registry/marcio/ui/character-stage";

const quicar: CharacterAnimate = ({ gsap, part, tokens, reduced }) => {
  if (reduced) {
    gsap.to(part("bola"), { fill: tokens.color.success, duration: 0.3, repeat: 1, yoyo: true });
    return;
  }
  gsap.to(part("bola"), { y: -40, duration: 0.4, ease: "power2.out", repeat: 3, yoyo: true });
};

export function CharacterStageDemo() {
  const [round, setRound] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <CharacterStage width={120} height={80} animate={quicar} replay={round} className="max-w-40">
        <circle data-parte="bola" cx={60} cy={66} r={10} className="fill-accent" />
        <line x1={20} y1={77} x2={100} y2={77} className="stroke-line" strokeDasharray="2 6" />
      </CharacterStage>
      <Button size="sm" variant="secondary" onClick={() => setRound((n) => n + 1)}>
        Quicar de novo
      </Button>
    </div>
  );
}
