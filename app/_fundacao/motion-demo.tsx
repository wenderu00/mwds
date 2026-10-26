"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Button } from "@/registry/marcio/ui/button";

const tracks = [
  { label: "fast · standard", motionClass: "duration-fast ease-standard" },
  { label: "base · standard", motionClass: "duration-base ease-standard" },
  { label: "slow · enter", motionClass: "duration-slow ease-enter" },
  { label: "slow · exit", motionClass: "duration-slow ease-exit" },
];

export function MotionDemo() {
  const [moved, setMoved] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {tracks.map((track) => (
          <div key={track.label} className="grid grid-cols-[8rem_1fr] items-center gap-3">
            <span className="font-mono text-mono-xs text-ink-muted">{track.label}</span>
            <span className="relative h-3 rounded-full bg-surface">
              <span
                aria-hidden="true"
                className={cn("absolute top-0 left-0 size-3 rounded-full bg-accent transition-[left]", track.motionClass, moved && "left-[calc(100%-0.75rem)]")}
              />
            </span>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="sm" className="self-start" aria-pressed={moved} onClick={() => setMoved((value) => !value)}>
        Animar
      </Button>
    </div>
  );
}

export function MotionPrimitivesDemo() {
  const [flashes, setFlashes] = useState(0);
  const [denials, setDenials] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span key={`flash-${flashes}`} className={cn("rounded-control border border-line px-3 py-2 font-mono text-mono-xs text-ink", flashes > 0 && "motion-safe:animate-mw-flash")}>
          ouro: {(1200 + flashes * 50).toLocaleString("pt-BR")}
        </span>
        <span key={`glitch-${denials}`} className={cn("inline-block font-mono text-mono-xs text-danger-text", denials > 0 && "motion-safe:animate-mw-glitch")}>
          {denials > 0 ? "custo insuficiente" : "pronto"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => setFlashes((value) => value + 1)}>
          Saquear
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setDenials((value) => value + 1)}>
          Comprar sem ouro
        </Button>
      </div>
      <ol className="flex flex-col gap-1 font-mono text-mono-xs text-ink-muted">
        {[0, 1, 2, 3].map((i) => (
          <li key={`${flashes}-${i}`} className="mw-stagger motion-safe:animate-mw-shift" style={{ "--mw-i": i } as CSSProperties}>
            item {i + 1}
          </li>
        ))}
      </ol>
    </div>
  );
}
